import { Template } from '@tsTypes/index';
import { auth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { templates, users } from '@db/schema';
import { generateTemplate } from '@lib/templates';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import {
  subscription,
  validateActiveSubMiddleware,
} from '@server/subscription';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    const body = await request.json();
    const chargeid = body?.chargeid;
    const clientId = body?.clientId; // User db id
    const invoiceData = (body?.data as Template) ?? {};

    if (!chargeid) {
      throw new Error('Charge ID is required');
    }

    if (!clientId) {
      throw new Error('Client API key is required');
    }

    // --------------------------------------------------------------------------------
    // 📌  Validate client subscription & subscription
    // --------------------------------------------------------------------------------
    const dbUser = await db.select().from(users).where(eq(users.id, clientId!));
    console.log('👤 User: ', dbUser);

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
    console.log('📄 Templates: ', invoiceData, template);

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

    // --------------------------------------------------------------------------------
    // 📌  Generate PDF
    // --------------------------------------------------------------------------------
    const uniqueId = uuidv4();
    const data = await callApiWithRetry({ html, uniqueId });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('🚨 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}

async function callApiWithRetry(props: { html: string; uniqueId: string }) {
  const MAX_RETRIES = 10;
  const RETRY_INTERVAL = 2000; // delay between retries in ms
  let retries = 0;

  async function attempt(): Promise<{ url: string }> {
    try {
      const { data, status } = await axios.post(
        `${process.env.NETLIFY_FUNCTIONS}/puppet-pdf-gen`,
        {
          html: props.html,
          id: props.uniqueId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
          },
        }
      );
      console.log('📄 PDF_Data: ', data);

      if (status !== 200 || !data?.url) {
        throw new Error('Failure: ' + status);
      }

      return data as { url: string };
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
