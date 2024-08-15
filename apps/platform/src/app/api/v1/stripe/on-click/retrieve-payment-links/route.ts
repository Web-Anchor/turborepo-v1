import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users, keys as strKeys } from '@db/schema';
import {
  createProductWithPrice,
  createStripePaymentLink,
  retrieveStripePaymentLinks,
  stripePrice,
} from '@server/stripe-products';

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
    const body = await request.json();

    // --------------------------------------------------------------------------------
    // 📌  Retrieve Stripe price from api
    // --------------------------------------------------------------------------------
    const { links, error } = await retrieveStripePaymentLinks({
      ...body,
      apiKey,
    });

    return NextResponse.json({
      error,
      links,
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
