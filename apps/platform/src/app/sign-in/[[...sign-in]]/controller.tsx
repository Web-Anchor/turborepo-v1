'use client';

import { Wrapper, LoadingDots } from '@repo/components';
import { HeaderSection } from '@repo/components';
import { SignIn, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { setToLocalStorage } from '@repo/lib';

export default function Page() {
  const searchParams = useSearchParams()!;
  const redirect = searchParams.get('redirect');
  const id = searchParams.get('id');
  const router = useRouter();

  let { isSignedIn, user, isLoaded } = useUser();
  setToLocalStorage(process.env.NEXT_PUBLIC_APP_URL!, { id });

  if (!isLoaded) {
    return (
      <Wrapper className="relative h-full">
        <Wrapper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingDots />
        </Wrapper>
      </Wrapper>
    );
  }

  if (isSignedIn) {
    router.push(`/dashboard?id=${id}`);
  }

  return (
    <Wrapper className="h-full">
      <Wrapper className="items-center">
        <CardWrapper>
          <SignIn
            fallbackRedirectUrl={redirect || `/api/v1/auth?id=${id}`}
            path="/sign-in"
          />
        </CardWrapper>
        <Wrapper className="flex-row gap-5 text-nowrap items-center">
          <HeaderSection
            description={["Don't have an account?"]}
            className="w-fit"
            type="page-header"
          />
          <Link
            href={`/sign-up`}
            className="bg-transparent items-center px-0 text-sm font-semibold text-indigo-600 shadow-none hover:bg-transparent hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </Link>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

export function CardWrapper(props: { children: React.ReactNode }) {
  return <section className="shadow-md rounded-2xl">{props.children}</section>;
}
