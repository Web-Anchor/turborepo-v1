import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users, keys as strKeys } from '@db/schema';
import { v4 as uuidv4 } from 'uuid';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  db user
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));

    // --------------------------------------------------------------------------------
    // 📌  user Account API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(strKeys)
      .where(eq(strKeys.userId, dbUser[0].id));

    const apiKey = keys?.[0]?.restrictedAPIKey;
    console.log('🔑 apiKey', apiKey);
    const stripe = require('stripe')(apiKey);

    // --------------------------------------------------------------------------------
    // 📌  Get price
    // --------------------------------------------------------------------------------
    const body = await request.json();

    let price: any;
    let pricePermissionError: boolean = false;
    let throwError: any;

    try {
      /**
       * @description Create a new price & new product
       * @date 2024-08-15
       * @author Ed Ancerys
       */
      price = await stripe.prices.create({
        currency: body?.currency || 'usd',
        unit_amount: body?.price * 100, // convert to cents
        // recurring: {
        //   interval: 'month',
        // },
        product_data: {
          name: body?.name || `invoicio.io`,
          active: true,
          statement_descriptor: body?.statement_descriptor || `invoicio.io`,
          unit_label: body?.unit_label || `invoicio.io`,
          metadata: {
            name: body?.name || 'invoicio.io',
            order_id: body?.order_id || uuidv4(),
            price_info: body?.price_info || 'One Time Payment Product',
            price: body?.price * 100,
          },
        },
      });
      console.log('🔑 prices', price);
    } catch (error: any) {
      pricePermissionError = error?.type === 'StripePermissionError';
      throwError = error;
    }

    return NextResponse.json({
      price,
      pricePermissionError,
      error: throwError,
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}

function validateString(value: string | undefined | null) {
  return typeof value === 'string' && value.length > 0 && value
    ? value
    : undefined;
}
