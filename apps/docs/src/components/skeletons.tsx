'use client';

import { Skeleton } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-2xl font-semibold text-gray-800">Skeletons</h1>
      <Skeleton />
      <Skeleton type="user" />
      <Skeleton type="list" />
      <Skeleton type="table" />
    </section>
  );
}
