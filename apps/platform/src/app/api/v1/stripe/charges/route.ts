import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { keys as strKeys, users } from '@db/schema';
import { eq } from 'drizzle-orm';
import { FETCH_LIMIT } from '@config/index';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Client db record
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const id = body?.id;
    const starting_after =
      body?.starting_after !== null ? body?.starting_after : undefined;
    const ending_before =
      body?.ending_before !== null ? body?.ending_before : undefined;

    if (!id) {
      throw new Error('User ID is required');
    }

    const dbUser = await db.select().from(users).where(eq(users.id, id!));
    console.log('👤 User ', id, dbUser);

    // --------------------------------------------------------------------------------
    // 📌  Client db api key
    // --------------------------------------------------------------------------------
    const apiKeys = await db
      .select()
      .from(strKeys)
      .where(eq(strKeys.userId, id!));
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
    const user = await currentUser();
    const stripe = require('stripe')(apiKey);

    const customer = await stripe.customers.list({
      email: user?.emailAddresses?.[0]?.emailAddress!,
      limit: 1,
    });
    const customerId = customer?.data?.[0]?.id;
    console.log('👤 Customer', customer);
    // TODO: check how to handle multiple customers with same email

    if (!customerId) {
      return NextResponse.json({
        error: 'Customer not found',
        isValidKey: true,
      });
    }

    const charges = await stripe.charges.list({
      limit: FETCH_LIMIT,
      starting_after, // charge identifier aka ch_1JZ9Zv2eZvKYlo2C5Z2ZQ2ZQ
      ending_before,
      expand: ['data.customer'],
      customer: customerId,
    });

    let has_previous = false;
    let has_more = charges?.has_more;
    if (!!ending_before) {
      has_previous = charges?.has_more;
      has_more = charges?.data?.length === FETCH_LIMIT;
    }
    if (starting_after) {
      has_previous = true;
    }

    charges.has_previous = has_previous; // add pagination flag
    charges.has_more = has_more; // add pagination flag

    return NextResponse.json({ charges, isValidKey: true });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message, isValidKey: false },
      { status: error?.status || 500 }
    );
  }
}
