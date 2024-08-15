import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users, keys as strKeys } from '@db/schema';
import { stripePrice } from '@server/stripe-products';

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
    const apiKey = keys?.[0]?.restrictedAPIKey;

    // --------------------------------------------------------------------------------
    // 📌  Get price
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const price = body?.price * 100 || 0;

    const {
      price: priceRes,
      pricesPermissionError,
      error,
    } = await stripePrice(price, apiKey);

    return NextResponse.json({
      price: priceRes,
      pricesPermissionError,
      error,
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
