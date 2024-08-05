'use client';

import { Wrapper, LoadingDots } from '@repo/components';
import { HeaderSection } from '@repo/components';
import { SignIn, useUser } from '@clerk/nextjs';
import Link from '@components/Link';
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
      <Wrapper className="h-full">
        <Wrapper className="items-center h-[400px] w-[400px]">
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
        <Wrapper className="flex-row gap-5 w-[400px] text-nowrap items-center">
          <HeaderSection
            description={["Don't have an account?"]}
            className="w-fit"
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
