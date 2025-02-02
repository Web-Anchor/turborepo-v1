import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { tickets, users } from '@db/schema';
import { TicketStatus } from '@config/index';
import { v4 as uuidv4 } from 'uuid';
import { email } from '@server/email-client';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Check if customer exist in Stripe
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User: ', dbUser);

    // --------------------------------------------------------------------------------
    // 📌  Add support ticket
    // --------------------------------------------------------------------------------
    const body = await request.json();

    await db.insert(tickets).values({
      id: uuidv4(),
      userId: dbUser[0].id, // TODO: Add userId
      clerkId: dbUser[0].clerkId.toString(),
      subject: body.subject,
      message: body.message,
      type: 'platform',
      status: TicketStatus?.Open,
    });

    // --------------------------------------------------------------------------------
    // 📌  Flag admins
    // --------------------------------------------------------------------------------
    await email({
      email: ['lookatemail@gmail.com'],
      subject: 'Support Ticket Added',
      html: `
        <p>Support Ticket Added on Platform</p>
        <p>Support ticket added by ${dbUser[0].emailAddress}</p>
        <p>User id: ${dbUser[0].id}</p>
        <p>Subject: <strong>${body.subject}</strong></p>
        <p>Message: <strong>${body.message}</strong></p>
      `,
    });
    // --------------------------------------------------------------------------------
    // 📌  Notify user about ticket added by ${dbUser[0].emailAddress
    // --------------------------------------------------------------------------------
    await email({
      email: [dbUser[0].emailAddress],
      subject: `${body.subject} Support Ticket Added. invoicio.io`,
      html: `
        <p>Thanks for submitting a message! We will get back to you shortly.</p>
        <p>Subject: <strong>${body.subject}</strong></p>
        <p>Message: <strong>${body.message}</strong></p>
      `,
    });

    return NextResponse.json({
      status: 200,
      data: 'Ticket added successfully',
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
