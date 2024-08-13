'use client';

import { Wrapper, LoadingDots } from '@repo/components';
import { HeaderSection } from '@repo/components';
import { SignUp, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CardWrapper } from '@app/sign-in/[[...sign-in]]/controller';

export default function Page() {
  const searchParams = useSearchParams()!;
  const redirect = searchParams.get('redirect');
  const id = searchParams.get('id');
  const router = useRouter();

  let { isSignedIn, user, isLoaded } = useUser();

  if (isSignedIn) {
    router.push(`/dashboard?id=${id}`);
  }

  if (!isLoaded) {
    return (
      <Wrapper className="relative h-full">
        <Wrapper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingDots />
        </Wrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="items-center">
      <CardWrapper>
        <SignUp fallbackRedirectUrl={redirect || `/api/v1/auth?id=${id}`} />
      </CardWrapper>
      <Wrapper className="flex-row text-nowrap items-center">
        <HeaderSection
          description={['Already have an account?']}
          className="w-fit"
          type="page-header"
        />
        <Link
          href={`/sign-in`}
          className="bg-transparent items-center px-0 text-sm font-semibold text-indigo-600 shadow-none hover:bg-transparent hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign In
        </Link>
      </Wrapper>
    </Wrapper>
  );
}
