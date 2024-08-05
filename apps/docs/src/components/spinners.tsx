'use client';

import { LoadingDots, Divider } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10">
      <Divider text="Spinners" textAlign="center" />
      <section className="flex flex-row flex-wrap gap-10">
        <LoadingDots />
      </section>
    </section>
  );
}
