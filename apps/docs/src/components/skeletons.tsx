'use client';

import { serverAction } from '@server/actions';
import { Skeleton } from '@repo/components';

export default function Page(): JSX.Element {
  async function onClickHandler() {
    const count = await serverAction({ a: 1, b: 2 });

    console.log('🚀 COUNT:', count);
  }

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
