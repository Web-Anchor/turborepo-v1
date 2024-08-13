'use client';

import Pricing from '@components/Pricing';
import { Component } from '@tsTypes/index';
import { maxLength } from '@config/index';
import { getTimeAgo } from '@helpers/index';
import { useComponents } from '@hooks/useComponents';
import { useSubscription } from '@hooks/useSubscriptions';
import { useUser } from '@hooks/useUsers';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';
import axios from 'axios';
import {
  Badge,
  Button,
  HeaderSection,
  MediaScreenTitle,
  Select,
  Table,
  Wrapper,
} from '@repo/components';

export const dummyData = {
  invoiceNumber: 'INV12345',
  date: '01/05/2023',
  billToName: 'John Doe',
  billToAddress: '123 Main St.',
  items: [
    {
      description: 'Product 1',
      amount: '$100.00',
      quantity: 1,
    },
    {
      description: 'Product 2',
      amount: '$100.00',
      quantity: 1,
      units: 2,
    },
    {
      description: 'Product 3',
      amount: '$225.00',
      quantity: 1,
    },
  ],
  subtotal: '$425.00',
  tax: '$25.50',
  total: '$450.50',
  dueDate: '01/30/2023',
  companyName: 'Your Company Name',
};

export default function Page() {
  const [state, setState] = useState<{ fetching?: string; type?: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const { count, components, isLoading } = useComponents({});
  const { advanced, pro, subscription } = useSubscription({});
  const { user } = useUser({});

  const isCompanyComponent = state?.type === 'Company';

  const selected = components?.find(
    (item: Component) => item.type === state?.type
  );

  async function submit(form: any) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: 'submit' }));
      const type = form.get('type');
      const slogan = form.get('slogan');
      const description = form.get('description');
      const title = form.get('title');
      const link = form.get('link');

      if (!type) {
        throw new Error('Please select a component type!');
      }

      const { data, status } = await axios({
        url: '/api/v1/components/add',
        method: 'POST',
        data: { slogan, description, title, type, link },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      toast.success(data?.message ?? 'Component added successfully! 🙌');
      formRef.current?.reset(); // Reset form ref after successful submission
      mutate(`/api/v1/components/components`);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  function formHandler(e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    e.preventDefault();
    submit(new FormData(e.currentTarget));
  }

  async function deleteComponent(id: string) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Delete Component
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: id }));

      const { data, status } = await axios({
        url: `/api/v1/components/delete?id=${id}`,
        method: 'DELETE',
        data: { id },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      toast.success(data?.message ?? 'Component deleted successfully! 🙌');
      mutate(`/api/v1/components/components`);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  return (
    <Wrapper>
      {!(advanced || pro) && !isLoading && (
        <>
          <HeaderSection
            title={
              <p className="text-center mt-2 text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
                Upgrade to access advanced features and unlock premium invoice
                templates.
              </p>
            }
            type="page-header"
          />
          <Pricing hideTiers={['Freelancer']} />
        </>
      )}

      <HeaderSection
        title="Promote Your Brand Message! Build Your Own Components."
        description="Customize your platform by adding unique components tailored to your needs. Select the type of component you want to add and provide the necessary content. Showcase your company's logo, tagline, or special offers in the header section of our customer portal. Reach your audience as soon as they log in to enhance brand visibility and engagement."
        subtitle="Empower Your Platform, Your Way!"
        type="page-header"
      />
      {/* "Promote Your Brand Message! Showcase your company's logo, tagline, or special offers in the header section of our customer portal. Reach your audience as soon as they log in to enhance brand visibility and engagement." */}
      {/* "Capture Customer Attention! Utilize the footer section of our customer portal to display contact information, social media links, or personalized messages to connect with your audience effortlessly. Make a lasting impression and foster customer relationships with every interaction." */}
      {/* "Header Section Advertisement!" */}

      <Wrapper>
        <form
          ref={formRef}
          className="card max-w-4xl lg:px-10 lg:py-8 bg-base-100 lg:shadow-xl"
          onSubmit={formHandler}
        >
          <div className="space-y-12">
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex flex-1 flex-col gap-2 max-w-full lg:max-w-xs">
                <h2 className="text-base font-semibold leading-7 text-gray-800">
                  Customize your Customer Portal your way
                </h2>
                <Badge
                  title={count ?? 0}
                  description={`Total Custom Components`}
                />
                <p className="text-sm leading-6 text-gray-600">
                  We are excited to announce that you can now customize your
                  Customer Portal by adding new components to your landing page
                  & dashboard. Please fill out the form below with your section
                  component content, and live preview it!.
                </p>
              </div>

              <div className="flex flex-col gap-5 flex-1">
                <Select
                  label="Component Type"
                  name="type"
                  data={[
                    {
                      value: 'landing-page-header-section',
                      title: 'Landing Page Header Section',
                    },
                    // {
                    //   value: 'landing-page-features-section',
                    //   title: 'Landing Page Features Section',
                    // },
                    // {
                    //   value: 'landing-page-testimonials-section',
                    //   title: 'Landing Page Testimonials Section',
                    // },
                    // {
                    //   value: 'landing-page-pricing-section',
                    //   title: 'Landing Page Pricing Section',
                    // },
                    // {
                    //   value: 'landing-page-faq-section',
                    //   title: 'Landing Page FAQ Section',
                    // },
                    // {
                    //   value: 'landing-page-contact-section',
                    //   title: 'Landing Page Contact Section',
                    // },
                    {
                      value: 'landing-page-footer-section',
                      title: 'Landing Page Footer Section',
                    },
                    {
                      value: 'Company',
                      title: 'Company',
                    },
                  ]}
                  onChange={(props) => {
                    setState((prev) => ({ ...prev, type: props }));
                  }}
                />

                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  maxLength={maxLength?.comment}
                  defaultValue={selected?.title ?? ''}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  Description
                </label>
                <textarea
                  rows={5}
                  name="description"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Description"
                  defaultValue={selected?.description ?? ''}
                  maxLength={maxLength?.description}
                />

                {!isCompanyComponent && (
                  <section className="flex flex-col gap-5 flex-1">
                    <label
                      htmlFor="slogan"
                      className="block text-sm font-medium leading-6 text-gray-800"
                    >
                      Slogan
                    </label>
                    <input
                      type="text"
                      placeholder="Slogan"
                      name="slogan"
                      maxLength={maxLength?.message}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={selected?.slogan ?? ''}
                    />
                  </section>
                )}

                {isCompanyComponent && (
                  <section className="flex flex-col gap-5 flex-1">
                    <label
                      htmlFor="link"
                      className="block text-sm font-medium leading-6 text-gray-800"
                    >
                      Link
                    </label>
                    <input
                      type="url"
                      placeholder="Company Link"
                      name="link"
                      maxLength={maxLength?.message}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={selected?.link ?? ''}
                    />
                  </section>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              fetching={state?.fetching === 'submit'}
              type="submit"
              disabled={!!state.fetching}
            >
              Add Component
            </Button>
          </div>
        </form>

        <HeaderSection
          title="Your Component Library List"
          description="Explore and manage your custom components in one convenient place. Easily delete or live preview your components to optimize your platform's layout and functionality."
          subtitle="Manage Your Components with Ease!"
          type="page-header"
        />

        <Table
          fetching={isLoading}
          header={[
            { item: 'Type' },
            { item: 'Created At', className: 'hidden lg:table-cell' },
            { item: 'Delete' },
            { item: 'Preview' },
          ]}
          data={components?.map((item: Component) => {
            return {
              row: [
                {
                  item: item.type,
                  className: 'truncate max-w-40',
                },
                {
                  item: getTimeAgo(item.createdAt!),
                  className: 'hidden lg:table-cell',
                },
                {
                  item: (
                    <Button
                      onClick={() => {
                        deleteComponent(item.id!);
                      }}
                      fetching={state?.fetching === item.id}
                      disabled={!!state?.fetching}
                    >
                      Delete
                    </Button>
                  ),
                },
                {
                  item: (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_PORTAL_URL}?id=${user?.id}`}
                      className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                      target="_blank"
                    >
                      <MediaScreenTitle large="Live Preview" small="Preview" />
                    </Link>
                  ),
                },
              ],
            };
          })}
        />
      </Wrapper>
    </Wrapper>
  );
}
