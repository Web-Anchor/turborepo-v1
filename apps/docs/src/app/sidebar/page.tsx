'use client';

import { Button, Sidebar } from '@repo/components';

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
        user={{
          name: 'Jane Doe',
          imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        }}
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
          <p>Page content goes here...</p>
        </section>
      </Sidebar>
    </section>
  );
}
