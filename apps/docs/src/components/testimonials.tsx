'use client';

import { TestimonialCard, Divider, Wrapper } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10">
      <Divider text="Testimonial Cards" textAlign="center" />
      <section className="flex flex-row flex-wrap gap-5">
        <TestimonialCard
          body="I love the new design system! It's so easy to use and it looks great."
          author={{
            handle: 'johnny',
            name: 'Johnny Appleseed',
            imageUrl: 'https://picsum.photos/100',
          }}
        />
        <TestimonialCard
          author={{
            handle: 'johnny',
            name: 'Johnny Appleseed',
            imageUrl: 'https://picsum.photos/100',
          }}
        />
        <TestimonialCard
          body="I love the new design system! It's so easy to use and it looks great. Irure ex ea anim laboris duis commodo nisi irure. I love the new design system! It's so easy to use and it looks great. Irure ex ea anim laboris duis commodo nisi irure. I love the new design system! It's so easy to use and it looks great. Irure ex ea anim laboris duis commodo nisi irure."
          author={{
            handle: 'johnny',
            name: 'Johnny Appleseed',
            imageUrl: 'https://picsum.photos/100',
          }}
        />
      </section>
      <p className="text-gray-800 font-bold">
        This is a testimonial card component pool.
      </p>
      <Wrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <TestimonialCard
            key={index}
            body="I love the new design system! It's so easy to use and it looks great."
            author={{
              handle: 'johnny',
              name: 'Johnny Appleseed',
              imageUrl: 'https://picsum.photos/100',
            }}
          />
        ))}
      </Wrapper>
    </section>
  );
}
