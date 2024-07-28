'use client';

import { Divider, Skeleton } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10">
      <Divider text="Skeletons" textAlign="center" />
      <section className="flex flex-row flex-wrap gap-10">
        <Skeleton type="user" />
        <Skeleton type="list" />
        <Skeleton
          type="table"
          width="max-w-md"
          height="w-full"
          borderRadius="rounded-lg"
        />
        <Skeleton type="card" />
      </section>
    </section>
  );
}
