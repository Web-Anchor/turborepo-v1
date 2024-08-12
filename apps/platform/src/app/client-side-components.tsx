'use client';

/**
 * @description Client side components for the landing page
 * @date 2024-08-07
 * @author Ed Ancerys
 */

import { useUser } from '@clerk/nextjs';
import { useTestimonials } from '@hooks/index';
import {
  HeaderSection,
  LoadingDots,
  TestimonialCard,
  Wrapper,
} from '@repo/components';
import Link from 'next/link';
import placeholder from '../../public/images/avatar.png';

export function GetStarted() {
  const { user, isLoaded } = useUser();

  return (
    <div className="lg:mt-10 flex items-center gap-x-6">
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

export function Testimonials() {
  const { testimonials, isLoading } = useTestimonials({});

  if (!testimonials?.length && !isLoading) {
    return null;
  }

  return (
    <Wrapper>
      {isLoading && (
        <Wrapper className="items-center">
          <LoadingDots />
        </Wrapper>
      )}
      {!isLoading && (
        <Wrapper>
          <HeaderSection
            title="Testimonials"
            description={['We have worked with bunch of amazing people']}
            subtitle="Testimonials"
          />

          <Wrapper className="flex-row flex-wrap">
            {testimonials?.map((item, index) => (
              <TestimonialCard
                key={index}
                body={item.comments}
                author={{
                  name: `${item.firstName} ${item.lastName}`,
                  imageUrl:
                    item?.imageUrl || (placeholder as unknown as string),
                }}
                timestamp="2021-09-01"
                className="mx-auto"
              />
            ))}
          </Wrapper>
        </Wrapper>
      )}
    </Wrapper>
  );
}
