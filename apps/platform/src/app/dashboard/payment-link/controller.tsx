'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button, HeaderSection, Table, Wrapper } from '@repo/components';
import axios from 'axios';
import { usePaymentLinks } from '@hooks/index';
import { StripePaymentLink } from '@tsTypes/index';
import Link from 'next/link';
import { mutate } from 'swr';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: string;
  }>({});
  const { links, isLoading } = usePaymentLinks({});

  async function onClickPaymentLink(e: React.FormEvent<HTMLFormElement>) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      e.preventDefault();
      setState((prev) => ({ ...prev, fetching: 'create' }));
      const form = new FormData(e.currentTarget);
      const price = form.get('price');

      const { data, status } = await axios({
        url: '/api/v1/stripe/on-click/create-payment-link',
        method: 'POST',
        data: { price: Number(price) },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error?.raw?.message);
      }

      mutate(`/api/v1/stripe/on-click/retrieve-payment-links`);
      toast.success(`Payment Link created successfully`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  return (
    <Wrapper>
      <HeaderSection
        title="Generate Payment Links with Ease!"
        description={[
          "Quickly create secure and customizable payment links using our Stripe APIs. Whether you're handling single transactions or multiple items, our tool simplifies the process, allowing you to generate payment links in just a one click. Empower your business with seamless payment solutions that you can share with customers effortlessly.",
        ]}
        subtitle="Empowering your Secure Transactions!"
        type="page-header"
      />

      <form
        className="card max-w-4xl lg:px-10 lg:py-8 bg-base-100 lg:shadow-xl"
        onSubmit={onClickPaymentLink}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Payment link Price
          </label>
          <div className="mt-2 mb-10">
            <input
              name="price"
              type="number"
              placeholder="example: 24.55"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <section className="flex justify-end">
          <Button
            title="Create Payment Link"
            type="submit"
            fetching={state.fetching === 'create'}
            className="bg-gradient-to-r from-amber-500 to-pink-500 text-white"
          />
        </section>
      </form>

      {!!links?.length && (
        <HeaderSection
          title="Recently Generated Payments Links."
          type="page-header"
          className="mt-0 lg:mt-16"
        />
      )}
      <Table
        fetching={isLoading}
        header={[{ item: 'ID' }, { item: 'Link' }, { item: 'Copy' }]}
        data={links?.map((item: StripePaymentLink) => {
          return {
            row: [
              {
                item: (
                  <section className="max-w-48">
                    <p className="truncate">{item.id}</p>
                  </section>
                ),
                className: 'md:table-cell-auto min-w-28',
              },
              {
                item: (
                  <Link
                    href={item.url!}
                    passHref
                    target="_blank"
                    className="text-indigo-600"
                  >
                    Payment Link
                  </Link>
                ),
                // className: 'hidden lg:table-cell',
              },
              {
                item: (
                  <Button
                    title="Copy"
                    style="secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(item.url!);
                      toast.success('Link copied to clipboard');
                    }}
                  />
                ),
              },
            ],
          };
        })}
        hidden={!links?.length}
      />

      <HeaderSection
        description={[
          <p key="1">
            *In order to enable{' '}
            <span className="text-indigo-500">One Click Payment Links</span>{' '}
            Please make sure that API for Payment Links is set to{' '}
            <span className="font-bold">write permissions</span> in your Stripe
            account.
          </p>,
        ]}
        className="mt-5 lg:mt-16"
        type="page-header"
      />
    </Wrapper>
  );
}
