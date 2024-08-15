import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users, keys as strKeys } from '@db/schema';

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
    console.log('👤 User ', userId);

    // --------------------------------------------------------------------------------
    // 📌  user Account API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(strKeys)
      .where(eq(strKeys.userId, dbUser[0].id));
    console.log('🔑 keys', keys);

    const apiKey = keys?.[0]?.restrictedAPIKey;
    const stripe = require('stripe')(apiKey);

    // --------------------------------------------------------------------------------
    // 📌  Get price
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const price = body?.price * 100 || 0;

    let prices: any;
    let pricesPermissionError: boolean = false;
    let throwError: any;

    try {
      prices = await stripe.prices.search({
        query: `active:'true' AND metadata['name']:'invoicio.io' AND metadata['price']:'${price}'`,
      });

      console.log('🔑 prices', prices);
    } catch (error: any) {
      pricesPermissionError = error?.type === 'StripePermissionError';
      throwError = error;
    }

    return NextResponse.json({
      prices,
      pricesPermissionError,
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
