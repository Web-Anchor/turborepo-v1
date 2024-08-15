import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users, keys as strKeys } from '@db/schema';

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

    let products: any;
    let productsPermissionError: boolean = false;
    let throwError: any;

    try {
      products = await stripe.products.search({
        query: `active:'true' AND metadata['name']:'invoicio.io' AND metadata['price']:'${price}'`,
      });

      console.log('🔑 products', products);
    } catch (error: any) {
      productsPermissionError = error?.type === 'StripePermissionError';
      throwError = error;
    }

    return NextResponse.json({
      products,
      productsPermissionError,
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
