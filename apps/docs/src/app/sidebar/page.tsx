'use client';

import { Breadcrumb, Button, Sidebar } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section>
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
        userSideBar={
          <Button
            title="Profile Link"
            style="link"
            onClick={() => {}}
            className="px-2 my-5"
          />
        }
        logoSrc={{
          component: (
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          ),
        }}
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
          <p>Page content goes here...</p>
        </section>
      </Sidebar>
    </section>
  );
}
