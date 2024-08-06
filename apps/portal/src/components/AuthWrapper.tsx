'use client';

import Link from '@components/Link';
import { Breadcrumb, Button, Sidebar } from '@repo/components';
import Logo from '@components/Logo';

type Props = {
  children: React.ReactNode;
};

export function AuthWrapper({ children }: Props) {
  return (
    <Sidebar
      navigation={[
        {
          component: (
            <Button
              title="Home Link"
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        },
        {
          component: (
            <Button
              title="About Link"
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        },
        {
          component: (
            <Button
              title="Contact Link"
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        },
      ]}
      secondaryNavTitle="Secondary Navigation"
      secondaryNav={[
        {
          component: (
            <Button
              title="Home Link"
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        },
        {
          component: (
            <Button
              title="About Link"
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        },
        {
          component: (
            <Button
              title="Contact Link"
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        },
      ]}
      user={{
        name: 'Jane Doe',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }}
      logoSrc={{ component: <Logo /> }}
      mobileNavMenu={[
        {
          component: (
            <Button
              title="Home Link"
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        },
        {
          component: (
            <Button
              title="About Link"
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        },
      ]}
    >
      <section className="flex flex-col gap-10 font-semibold">
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
        {children}
      </section>
    </Sidebar>
  );
}
