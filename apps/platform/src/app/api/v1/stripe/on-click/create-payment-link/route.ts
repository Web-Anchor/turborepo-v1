import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users, keys as strKeys } from '@db/schema';
import { v4 as uuidv4 } from 'uuid';

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
    const stripe = require('stripe')(apiKey);

    // --------------------------------------------------------------------------------
    // 📌  Get price
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const price = body?.price * 100 || 0;

    let stripePrice: any;
    let pricePermissionError: boolean = false;
    let throwError: any;

    try {
      /**
       * @description Create a new price & new product if not exists
       * @date 2024-08-15
       * @author Ed Ancerys
       */
      const res = await stripe.prices.search({
        query: `active:'true' AND metadata['name']:'invoicio.io' AND metadata['price']:'${price}'`,
      });
      stripePrice = res?.data?.[0];
    } catch (error: any) {
      pricePermissionError = error?.type === 'StripePermissionError';
      throwError = error;
    }

    return NextResponse.json({
      price: stripePrice,
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
