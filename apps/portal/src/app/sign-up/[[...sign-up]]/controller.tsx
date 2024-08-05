'use client';

import { Wrapper, LoadingDots } from '@repo/components';
import { HeaderSection } from '@repo/components';
import { SignUp, ClerkLoading, ClerkLoaded, useUser } from '@clerk/nextjs';
import Link from '@components/Link';
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

  return (
    <Wrapper className="h-full">
      <ClerkLoading>
        <Wrapper className="items-center h-[400px] w-[400px]">
          <LoadingDots />
        </Wrapper>
      </ClerkLoading>

      <ClerkLoaded>
        <Wrapper className="items-center">
          <CardWrapper>
            <SignUp fallbackRedirectUrl={redirect || `/api/v1/auth?id=${id}`} />
          </CardWrapper>
          <Wrapper className="flex-row text-nowrap items-center">
            <HeaderSection
              description={['Already have an account?']}
              className="w-fit"
            />
            <Link
              href={`/sign-in`}
              className="bg-transparent items-center px-0 text-sm font-semibold text-indigo-600 shadow-none hover:bg-transparent hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </Link>
          </Wrapper>
        </Wrapper>
      </ClerkLoaded>
    </Wrapper>
  );
}
