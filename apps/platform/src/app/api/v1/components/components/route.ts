import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq, and } from 'drizzle-orm';
import { users, components } from '@db/schema';
import {
  subscription,
  validateActiveSubMiddleware,
  validateAdvancedSubMiddleware,
} from '@server/subscription';

export async function POST(request: NextRequest) {
  try {
    auth().protect();

    // --------------------------------------------------------------------------------
    // 📌  Custom components
    // --------------------------------------------------------------------------------
    const { userId } = auth();

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const subRes = await subscription({ userId });
    validateActiveSubMiddleware({ status: subRes?.subscription?.status });
    validateAdvancedSubMiddleware({ name: subRes?.product?.name });

    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User: ', dbUser);

    // --------------------------------------------------------------------------------
    // 📌  User custom component list
    // --------------------------------------------------------------------------------
    let userComponents = await db
      .select()
      .from(components)
      .where(and(eq(components.userId, dbUser[0].id)));

    return NextResponse.json({
      components: userComponents,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
