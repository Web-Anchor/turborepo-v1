'use client';

import { Accordion, Divider } from '@repo/components';

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10">
      <Divider text="Accordions" textAlign="center" />
      <section className="flex flex-row flex-wrap gap-5">
        <Accordion
          items={[
            {
              title: 'Ex dolor sint sit tempor Lorem magna fugiat.',
              body: 'Duis ex laboris ad incididunt eiusmod qui veniam consequat minim. Dolor laborum duis amet enim esse quis incididunt dolore. Exercitation mollit elit elit velit id amet. Anim elit anim fugiat irure ullamco. Officia dolor quis laboris incididunt aliqua veniam. Consectetur fugiat reprehenderit incididunt ipsum eiusmod sit fugiat commodo duis ullamco ullamco et sunt. Nisi sit ex pariatur veniam exercitation sit id.',
            },
            {
              title:
                'Labore cillum laboris nisi consequat sunt incididunt Lorem deserunt duis laboris mollit sint.',
              body: 'Officia sunt occaecat pariatur occaecat minim aliquip non cillum eu in sit incididunt non.',
              open: true,
            },
            {
              title: 'React Node',
              body: (
                <section className="flex flex-row gap-5">
                  <p>
                    React is a JavaScript library for building user interfaces.
                    It is maintained by Facebook and a community of individual
                    developers and companies. React can be used as a base in the
                    development of single-page or mobile applications.
                  </p>
                  <p>
                    Node.js is an open-source, cross-platform, back-end
                    JavaScript runtime environment that runs on the V8 engine
                    and executes JavaScript code outside a web browser.
                  </p>
                </section>
              ),
              open: true,
            },
          ]}
        />
      </section>
    </section>
  );
}
