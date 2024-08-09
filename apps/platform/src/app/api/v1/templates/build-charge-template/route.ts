import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq, and } from 'drizzle-orm';
import { keys, templates } from '@db/schema';
import { buildTemplate, getTemplate } from '@server/templates';
import { Template } from '@tsTypes/index';
import { stripeAmountToCurrency } from '@repo/lib';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Check if customer exist in Stripe
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const id = body?.id; // user db id
    const chargeid = body?.chargeid; // stripe charge id

    if (!id || !chargeid) {
      throw new Error('User ID and Charge ID is required');
    }

    // --------------------------------------------------------------------------------
    // 📌  Client db api key
    // --------------------------------------------------------------------------------
    const apiKeys = await db.select().from(keys).where(eq(keys.userId, id!));
    const apiKey = apiKeys[0]?.restrictedAPIKey;
    console.log('🔑 API Key', apiKey);

    if (!apiKey) {
      return NextResponse.json({
        error: 'API Key not found',
        isValidKey: false,
      });
    }

    // --------------------------------------------------------------------------------
    // 📌  Get User Customer
    // --------------------------------------------------------------------------------
    const stripe = require('stripe')(apiKey);
    const charge = await stripe.charges.retrieve(chargeid, {
      expand: ['customer'],
    });
    console.log('🔑 ssr_Charge', charge);

    // --------------------------------------------------------------------------------
    // 📌  Retrieve customers templates
    // --------------------------------------------------------------------------------
    const dbTemplates = await db
      .select()
      .from(templates)
      .where(and(eq(templates.userId, id)));
    const dbTemplateMain = (dbTemplates?.[0] as Template) || {};

    const template = await getTemplate({ templateName: 'template-one.hbs' });
    const html = await buildTemplate({
      template,
      data: {
        ...dbTemplateMain,
        // dummy data prefill
        date: new Date(charge?.created! * 1000).toDateString(),
        billToName: charge?.customer?.name,
        billToAddressLine1:
          charge?.billing_details?.address?.line1 ||
          charge?.customer?.address?.line1,
        billToAddressLine2:
          charge?.billing_details?.address?.line2 ||
          charge?.customer?.address?.line2,
        billToCity:
          charge?.billing_details?.address?.city ||
          charge?.customer?.address?.city,
        billToState:
          charge?.billing_details?.address?.state ||
          charge?.customer?.address?.state,
        billToCountry:
          charge?.billing_details?.address?.country ||
          charge?.customer?.address?.country,
        billToPostalCode:
          charge?.billing_details?.address?.postal_code ||
          charge?.customer?.address?.postal_code,
        items: [
          {
            description: charge?.description,
            quantity: undefined,
            units: undefined,
            amount: stripeAmountToCurrency(charge?.amount, charge?.currency!),
          },
        ],
        dueDate: undefined,
        subtotal: stripeAmountToCurrency(charge?.amount, charge?.currency!),
        tax: undefined,
        total: stripeAmountToCurrency(charge?.amount, charge?.currency!),
      },
    });

    return NextResponse.json({
      status: 200,
      template,
      html,
      charge,
      dbTemplate: dbTemplateMain,
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
