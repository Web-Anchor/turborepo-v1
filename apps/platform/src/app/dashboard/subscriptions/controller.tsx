'use client';

import { convertToYearMonthDay, isSubActive } from '@helpers/index';
import { useSubscription } from '@hooks/index';
import { useState } from 'react';
import { mutate } from 'swr';
import { toast } from 'sonner';
import Tiers from '@components/Tiers';
import { Button, HeaderSection, Table, Wrapper } from '@repo/components';
import axios from 'axios';

export default function Page() {
  const [state, setState] = useState<{ fetching?: number | string }>({});
  const { subscriptions, isLoading } = useSubscription({});
  console.log('🔑 Subscriptions', subscriptions);

  async function cancelSubscription(id: string) {
    try {
      setState({ fetching: id });

      const { data, status } = await axios({
        url: `/api/v1/stripe/subscriptions/cancel`,
        method: 'POST',
        data: { id },
      });

      if (status !== 200) {
        throw new Error(data?.message);
      }

      console.log('🔑 Data', data);
      toast.success('Subscription cancelled successfully');
      mutate(`/api/v1/stripe/subscriptions`);
    } catch (error: any) {
      console.error('🔑 Error', error);
      toast.error(error?.message);
    } finally {
      setState({ fetching: undefined });
    }
  }

  return (
    <Wrapper>
      <HeaderSection
        title="Your subscriptions. Unlock Premium Features & Exclusive Content."
        description={[
          'Subscribe to access your premium features, exclusive content, and member benefits tailored to enhance your experience. Choose a subscription plan that suits your needs and enjoy a seamless journey with our platform. Elevate your experience with our subscription services today.',
        ]}
        subtitle="Unlock Premium Perks, Elevate Your Experience!"
        type="page-header"
      />

      <Table
        fetching={isLoading}
        header={[
          { item: 'Plan' },
          { item: 'Amount' },
          { item: 'Currency', className: 'hidden lg:table-cell' },
          { item: 'Period End Date', className: 'hidden lg:table-cell' },
          { item: 'Created', className: 'hidden lg:table-cell' },
          { item: 'Active' },
          { item: 'Ending', className: 'hidden lg:table-cell' },
          { item: '' },
        ]}
        data={subscriptions?.map((subscription) => {
          return {
            row: [
              { item: planName(subscription?.plan?.amount!) },
              { item: convertToCurrency(subscription?.plan?.amount!) },
              {
                item: subscription.currency,
                className: 'hidden lg:table-cell',
              },
              {
                item: convertToYearMonthDay(subscription.current_period_end!),
                className: 'hidden lg:table-cell',
              },
              {
                item: convertToYearMonthDay(subscription.created!),
                className: 'hidden lg:table-cell',
              },
              {
                item: isSubActive(subscription) ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M8.5 12.5L10.5 14.5L15.5 9.5"
                        stroke="#059669"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{' '}
                      <path
                        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                        stroke="#059669"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{' '}
                    </g>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#059669"
                    className="h-5 w-5 text-red-500 opacity-75"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <title>Blocked</title>{' '}
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        {' '}
                        <g id="Blocked">
                          {' '}
                          <rect
                            id="Rectangle"
                            fillRule="nonzero"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          >
                            {' '}
                          </rect>{' '}
                          <circle
                            id="Oval"
                            stroke="#0C0310"
                            strokeWidth="2"
                            strokeLinecap="round"
                            cx="12"
                            cy="12"
                            r="9"
                          >
                            {' '}
                          </circle>{' '}
                          <line
                            x1="6"
                            y1="6"
                            x2="18"
                            y2="18"
                            id="Path"
                            stroke="#0C0310"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            {' '}
                          </line>{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>
                  </svg>
                ),
              },
              {
                item: subscription.ended_at
                  ? convertToYearMonthDay(subscription.ended_at)
                  : '-',
                className: 'hidden lg:table-cell',
              },
              {
                item: (
                  <Button
                    title="Cancel"
                    style="ghost"
                    onClick={() => cancelSubscription(subscription.id!)}
                    fetching={state.fetching === subscription.id}
                    hide={subscription.status === 'canceled'}
                  />
                ),
              },
            ],
          };
        })}
        footer={
          <section className="flex flex-wrap gap-5 mt-16">
            <p className="font-bold text-xl leading-6 text-gray-600 w-full mb-3">
              Your subscription plan determines the features you have access to.
            </p>
            <Tiers />
          </section>
        }
      />
    </Wrapper>
  );
}

function planName(price: number): string {
  switch (price) {
    case 4900:
      return 'Freelancer';
    case 6900:
      return 'Startup';
    case 24900:
      return 'Enterprise';
    default:
      return 'Unknown';
  }
}

function convertToCurrency(value: number): string {
  return `$${(value / 100).toFixed(2)}`;
}
