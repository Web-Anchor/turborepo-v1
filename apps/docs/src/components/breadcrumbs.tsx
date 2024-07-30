'use client';

import { Divider, Breadcrumb } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10">
      <Divider text="Bounce Wrappers" textAlign="center" />
      <section>
        <Breadcrumb
          components={[
            <a
              href="#"
              key="Projects"
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Projects
            </a>,
            <a
              href="#"
              key="ProjectNero"
              aria-current="page"
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Project Nero
            </a>,
          ]}
        />
      </section>
    </section>
  );
}
