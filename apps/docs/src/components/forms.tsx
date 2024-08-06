'use client';

import { Select, Divider } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10">
      <Divider text="Forms" textAlign="center" />
      <section className="flex flex-row flex-wrap gap-10">
        <Select
          label="In do ex culpa esse deserunt eu."
          data={[
            { value: '1', title: 'Option 1' },
            { value: '2', title: 'Option 2' },
            { value: '3', title: 'Option 3' },
          ]}
        />
      </section>
    </section>
  );
}
