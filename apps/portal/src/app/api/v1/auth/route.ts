import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { db } from '@db/index';
import { users } from '@db/schema';
import { eq } from 'drizzle-orm';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET(request: NextRequest) {
  auth().protect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));

    if (!dbUser?.length) {
      console.log('No user record found. Creating record in database');

      return new Response(null, {
        status: 302,
        // post data to create user
        headers: {
          Location: APP_URL + `/api/v1/create-user?id=${id}`,
        },
      });
    }

    console.log('👤 User record found: ', dbUser);
    return new Response(null, {
      status: 302,
      headers: {
        Location: APP_URL + `/dashboard?id=${id}`,
      },
    });
  } catch (error: any) {
    console.error(error);

    return new Response(null, {
      status: 302,
      headers: {
        Location: APP_URL + `/sign-in?id=${id}`,
      },
    });
  }
}
