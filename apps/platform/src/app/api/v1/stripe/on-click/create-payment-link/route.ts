import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users, keys as strKeys } from '@db/schema';
import {
  createProductWithPrice,
  stripePaymentLink,
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

    // --------------------------------------------------------------------------------
    // 📌  Get price
    // --------------------------------------------------------------------------------
    const body = await request.json();
    let priceId: string | undefined;
    let error: string | undefined;

    // --------------------------------------------------------------------------------
    // 📌  Retrieve Stripe price from api
    // --------------------------------------------------------------------------------
    const { price, error: resError } = await stripePrice({
      ...body,
      apiKey,
    });
    priceId = price?.id;
    error = resError;

    if (!priceId) {
      const { price, error: createError } = await createProductWithPrice({
        ...body,
        apiKey,
      });
      priceId = price?.id;
      error = createError;
    }

    const { link, error: linkError } = await stripePaymentLink({
      priceId,
      apiKey,
    });
    error = linkError;

    return NextResponse.json({
      priceId,
      error,
      link,
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
