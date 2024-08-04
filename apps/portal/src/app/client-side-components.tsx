'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export function GetStarted() {
  const { user, isLoaded } = useUser();

  return (
    <div className="mt-10 flex items-center gap-x-6">
      {!user && (
        <Link
          href="/sign-in"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get started
        </Link>
      )}
      {user && (
        <Link
          href="/dashboard"
          className="text-sm font-semibold leading-6 text-gray-800"
        >
          Go to dashboard <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
