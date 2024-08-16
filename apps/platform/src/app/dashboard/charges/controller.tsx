'use client';

import { useCharges, useSubscription, useUser } from '@hooks/index';
import { Charge, Template } from '@tsTypes/index';
import { getTimeAgo, stripeAmountToCurrency } from '@helpers/index';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { fakerCharges } from '@lib/faker';
import { buildTemplate, getTemplate } from '@server/templates';
import { plans } from '@config/index';
import { mutate } from 'swr';
import {
  Badge,
  Button,
  HeaderSection,
  MediaScreenTitle,
  Table,
  Wrapper,
} from '@repo/components';
import { classNames } from '@repo/lib';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: string;
    charges?: Charge[];
    has_more?: boolean;
    has_previous?: boolean;
  }>({});
  const { user } = useUser({});
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const starting_after = searchParams.get('starting_after')!;
  const ending_before = searchParams.get('ending_before')!;

  let { has_more, has_previous, charges, isLoading } = useCharges({
    starting_after,
    ending_before,
  });
  const { product } = useSubscription({});
  // charges = fakerCharges(); // faker data
  // console.log('🔑 DATA', user, product);

  const response = state?.charges || charges;
  const hasMoreRes = state?.has_more ?? has_more;
  const hasPreviousRes = state?.has_previous ?? has_previous;
  const plan = plans?.[product?.name];

  async function nexPage() {
    try {
      setState((prev) => ({ ...prev, fetching: 'page-change' }));
      const starting_after = response?.[charges?.length - 1]?.id;
      const { data } = await axios.post('/api/v1/stripe/charges', {
        starting_after,
      });
      router.push(`/dashboard/charges?starting_after=${starting_after}`);

      setState((prev) => ({
        ...prev,
        charges: data?.charges?.data,
        has_more: data?.charges?.has_more,
        has_previous: data?.charges?.has_previous,
      }));
    } catch (error: any) {
      console.error('🔑 error', error);
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function prevPage() {
    try {
      setState((prev) => ({ ...prev, fetching: 'page-change' }));
      const ending_before = response?.[0]?.id;
      const { data } = await axios.post('/api/v1/stripe/charges', {
        ending_before,
      });
      router.push(`/dashboard/charges?ending_before=${ending_before}`);

      setState((prev) => ({
        ...prev,
        charges: data?.charges?.data,
        has_more: data?.charges?.has_more,
        has_previous: data?.charges?.has_previous,
      }));
    } catch (error: any) {
      console.error('🔑 error', error);
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function emailCustomerInvoice(props: {
    email: string;
    name: string;
    id: string; // Stripe charge id
  }) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: `send-invoice-${props.id}` }));
      const charge = charges?.find((charge) => charge.id === props.id);

      const template = await getTemplate({
        templateName: 'email-template-one.hbs',
      });
      const html = await buildTemplate({
        template,
        data: {
          name: props.name ?? 'Customer',
          portalUrl: `${process.env.NEXT_PUBLIC_PORTAL_URL}?id=${user?.id}`,
          platformUrl: process.env.NEXT_PUBLIC_APP_URL,
        },
      });

      const chargeData: Template = {
        invoiceNumber: charge?.id,
        date: new Date(charge?.created! * 1000).toDateString(),
        billToName: charge?.customer?.name,
        billToAddressLine1:
          charge?.billing_details?.address?.line1 ||
          charge?.customer?.address?.line1,
        billToAddressLine2:
          charge?.billing_details?.address?.line2 ||
          charge?.customer?.address?.line2,
        billToCity:
          charge?.billing_details?.address?.city ||
          charge?.customer?.address?.city,
        billToState:
          charge?.billing_details?.address?.state ||
          charge?.customer?.address?.state,
        billToCountry:
          charge?.billing_details?.address?.country ||
          charge?.customer?.address?.country,
        billToPostalCode:
          charge?.billing_details?.address?.postal_code ||
          charge?.customer?.address?.postal_code,
        items: [
          {
            description: charge?.description,
            quantity: undefined,
            units: undefined,
            amount: stripeAmountToCurrency(charge?.amount, charge?.currency!),
          },
        ],
        dueDate: undefined,
        subtotal: stripeAmountToCurrency(charge?.amount, charge?.currency!),
        tax: undefined,
        total: stripeAmountToCurrency(charge?.amount, charge?.currency!),
      };

      const { data, status } = await callApiWithRetry({
        email: props.email,
        name: props.name,
        id: props.id,
        html,
        chargeData,
      });

      if (status !== 200 || data?.error) {
        console.log('🚨 Error sending email:', data, status);

        throw new Error(
          data?.error ||
            `Failed to send email to ${props?.name || props?.email}!`
        );
      }
      console.log('📧 Email sent to:', data);

      toast.success(`Invoice sent to ${props?.name || props.email} ✨`);
      mutate(`/api/v1/user`);
    } catch (error) {
      console.error(error);
      toast.error(
        (error as Error).message ||
          `Failed to send invoice to ${
            props?.name || props.email
          }! Please try again.`
      );
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function callApiWithRetry(props: {
    email: string;
    name: string;
    id: string;
    html: string;
    chargeData: Template;
  }) {
    const MAX_RETRIES = 5;
    const RETRY_INTERVAL = 2000; // delay between retries in ms
    let retries = 0;

    async function attempt(): Promise<{ data?: any; status?: any }> {
      try {
        const { data, status } = await axios.post('/api/v2/send-invoice-pdf', {
          id: user.id, // use to gen user template
          email: props.email,
          subject: 'Find attached invoice! invoicio.io Customer Portal ✨',
          html: props.html,
          name: props.name,
          chargeId: props.id,
          chargeData: props.chargeData,
          fileName: `invoice-${props.id}.pdf`,
        });

        return { data, status };
      } catch (error) {
        if (retries < MAX_RETRIES) {
          retries++;
          console.log(`Retrying API call (${retries}/${MAX_RETRIES})...`);
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              attempt().then(resolve).catch(reject);
            }, RETRY_INTERVAL);
          });
        } else {
          console.error('Max retries reached. Unable to call API.');
          throw new Error('Max retries reached. Unable to call API.');
        }
      }
    }

    return attempt();
  }

  return (
    <Wrapper>
      <HeaderSection
        title="Stripe Charges: Monitor and Manage Your Payment Activity."
        description={[
          'Stay informed and in control of your payment activity with our Stripe Charges page. Monitor transaction details, track payment statuses, and manage charges effectively to ensure smooth financial operations. Streamline your payment monitoring process and gain valuable insights into your transaction history effortlessly.',
        ]}
        subtitle="Tracking Transactions, Empowering Financial Clarity!"
        type="page-header"
      />

      <Badge
        title={
          <MediaScreenTitle
            large={`Total Invoices Sent: ${
              user?.invoiceSendCount ?? 0
            } ${`out of ${plan?.invoiceEmailCap} 🧾`}`}
            small={`Total Invoices Sent: ${user?.invoiceSendCount ?? 0}`}
          />
        }
        type="info"
        description={
          user?.lastInvoiceSendDate
            ? `Sent: ${getTimeAgo(user?.lastInvoiceSendDate!)}`
            : undefined
        }
      />

      <Table
        fetching={isLoading || state.fetching === 'page-change'}
        header={[
          { item: 'Customer', className: 'truncate' },
          { item: 'Amount' },
          { item: 'Phone', className: 'hidden xl:table-cell' },
          { item: 'Status', className: 'hidden md:table-cell' },
          { item: 'Created At', className: 'text-nowrap hidden xl:table-cell' },
          { item: 'Address', className: 'hidden xl:table-cell' },
          { item: 'View', className: 'hidden lg:table-cell' },
          { item: 'Send Invoice' },
        ]}
        data={response?.map((item: Charge) => {
          return {
            row: [
              {
                item: (
                  <section className="flex flex-col max-w-40 lg:max-w-56">
                    <section className="text-sm font-medium text-gray-800 truncate text-ellipsis">
                      {item?.billing_details?.name || item?.customer?.name}
                    </section>
                    {item?.customer?.description && (
                      <section className="mt-1 text-xs text-gray-500 truncate text-ellipsis">
                        {item?.customer?.description}
                      </section>
                    )}
                    <section className="mt-1 text-xs text-indigo-400 truncate text-ellipsis">
                      {item?.billing_details?.email || item?.description}
                    </section>
                  </section>
                ),
              },
              {
                item: <section>{priceToDisplay(item?.amount)}</section>,
              },
              {
                item: <section>{item?.billing_details?.phone}</section>,
                className: 'hidden xl:table-cell',
              },
              {
                item: (
                  <div
                    className={classNames(
                      'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset w-fit',
                      item?.paid
                        ? 'text-green-700 bg-green-50 ring-green-600/20'
                        : 'text-red-700 bg-red-50 ring-red-600/10'
                    )}
                  >
                    {item.status}
                  </div>
                ),
                className: 'hidden md:table-cell',
              },
              {
                item: <section>{getTimeAgo(item?.created! * 1000)}</section>,
                className: 'hidden xl:table-cell',
              },
              {
                item: (
                  <section>
                    {item?.billing_details?.address?.line1 ||
                      item?.customer?.address?.line1}
                  </section>
                ),
                className: 'hidden xl:table-cell',
              },
              {
                item: (
                  <section>
                    <Link
                      href={item.receipt_url!}
                      className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                      target="_blank"
                    >
                      View
                      <section className="hidden sm:inline">
                        {' '}
                        transaction receipt
                      </section>
                      <section className="sr-only">
                        , invoice #{item?.id}, {item?.billing_details?.name}
                      </section>
                    </Link>
                    <div className="mt-1 text-xs leading-5 text-gray-500">
                      Invoice{' '}
                      <section className="truncate hidden lg:flex text-gray-800">
                        {item.id}
                      </section>
                    </div>
                  </section>
                ),
                className: 'hidden lg:table-cell',
              },
              {
                item: (
                  <Button
                    title={<MediaScreenTitle large="Send Invoice" />}
                    onClick={() =>
                      emailCustomerInvoice({
                        email: item?.customer?.email!,
                        name: item?.customer?.name!,
                        id: item?.id!,
                      })
                    }
                    fetching={state?.fetching === `send-invoice-${item.id}`}
                    disabled={!!state?.fetching}
                    style="link"
                  />
                ),
              },
            ],
          };
        })}
        hasMore={hasMoreRes}
        hasPrevious={hasPreviousRes}
        nextCallback={nexPage}
        prevCallback={prevPage}
      />
    </Wrapper>
  );
}

function priceToDisplay(price?: number) {
  if (!price) return `0.00`;
  return `${(price / 100).toFixed(2)}`;
}
