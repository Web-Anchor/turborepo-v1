import { Template } from '@appTypes/index';
import { auth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { templates, users } from '@db/schema';
import { subscription, validateActiveSubMiddleware } from '@lib/subscription';
import { generateTemplate } from '@lib/templates';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic'; // force dynamic request
// --------------------------------------------------------------------------------
// 📌 https://github.com/gruckion/puppeteer-running-in-vercel/tree/main
// --------------------------------------------------------------------------------

const CHROMIUM_PATH =
  'https://vomrghiulbmrfvmhlflk.supabase.co/storage/v1/object/public/chromium-pack/chromium-v123.0.0-pack.tar';
// https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar

async function getBrowser() {
  if (!process.env.CHROME_EXECUTABLE_PATH) {
    const chromium = await import('@sparticuz/chromium-min').then(
      (mod) => mod.default
    );

    const puppeteerCore = await import('puppeteer-core').then(
      (mod) => mod.default
    );

    const executablePath = await chromium.executablePath(CHROMIUM_PATH);

    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: true,
    });
    return browser;
  } else {
    const puppeteer = await import('puppeteer').then((mod) => mod.default);

    const browser = await puppeteer.launch();
    return browser;
  }
}

export async function POST(request: NextRequest) {
  try {
    auth().protect();

    const body = await request.json();
    const clientId = body?.id; // User db id
    const invoiceData = (body?.invoiceData as Template) ?? {};

    if (!clientId) {
      throw new Error('Client API key is required');
    }

    // --------------------------------------------------------------------------------
    // 📌  Validate client subscription & subscription
    // --------------------------------------------------------------------------------
    const dbUser = await db.select().from(users).where(eq(users.id, clientId!));
    console.log('👤 User: ', dbUser?.[0]?.id);

    const subRes = await subscription({ userId: dbUser[0]?.clerkId });
    validateActiveSubMiddleware({ status: subRes?.subscription?.status! });

    // --------------------------------------------------------------------------------
    // 📌  Retrieve customers templates
    // --------------------------------------------------------------------------------
    const dbTemplates = await db
      .select()
      .from(templates)
      .where(eq(templates.userId, dbUser[0].id))
      .limit(1);
    const template = dbTemplates?.[0] ?? {};

    // --------------------------------------------------------------------------------
    // 📌  Get template form platform
    // --------------------------------------------------------------------------------
    const { data: hbsTemplate } = await axios.post(
      process.env.NEXT_PUBLIC_PLATFORM_APP_URL + '/api/v1/templates/template',
      {
        template: 'template-one.hbs',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
        },
      }
    );

    const html = generateTemplate({
      data: {
        ...template, // Custom Template data
        ...invoiceData, // User charge data | 🚧 place second to overwrite template defaults
      },
      template: hbsTemplate?.template,
    });

    const { pdfBuffer } = await callApiWithRetry({
      html,
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse((error as Error).message, { status: 500 });
  }
}

async function callApiWithRetry(props: { html: string }) {
  const MAX_RETRIES = 2;
  const RETRY_INTERVAL = 2000; // delay between retries in ms
  let retries = 0;

  async function attempt(): Promise<{ pdfBuffer?: Buffer }> {
    try {
      console.log('📄 Generating PDF template...');
      const browser = await getBrowser();
      if (!browser) {
        throw new Error('Failed to launch browser!');
      }

      const page = await browser.newPage();
      if (!props.html) {
        throw new Error('No HTML content available to generate PDF.');
      }

      // Ensure HTML is properly encoded to prevent XSS attacks
      const encodedHTML = encodeURIComponent(props.html);

      await page.goto(`data:text/html,${encodedHTML}`, {
        waitUntil: 'networkidle0',
        timeout: 10000, // Increased timeout for more complex pages
      });

      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
      await browser.close();

      return { pdfBuffer };
    } catch (error) {
      if (retries < MAX_RETRIES) {
        retries++;
        console.log(`Retrying API call (${retries}/${MAX_RETRIES})...`);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            attempt().then(resolve).catch(reject);
          }, RETRY_INTERVAL);
        });
      } else {
        console.error('Max retries reached. Unable to call API.');
        throw new Error('Max retries reached. Unable to call API.');
      }
    }
  }

  return attempt();
}
