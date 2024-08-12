'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { plans } from '@config/index';
import { classNames } from '@repo/lib';
import axios from 'axios';
import { Button } from '@repo/components';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
];
export const TIER_PLANS = [
  {
    name: 'Freelancer',
    id: process.env.NEXT_PUBLIC_FREELANCER_PROD_ID,
    price: { monthly: '$49', annually: '$144' },
    description: 'The essentials to provide your best work for clients.',
    features: [
      'Unlimited invoicing',
      'Self-print feature',
      'Basic analytics',
      '48-hour support response time',
      'Connect your Stripe account with your API key',
      `Send up to ${plans['Freelancer']?.invoiceEmailCap} invoices to customers`,
      `Send up to ${plans['Freelancer']?.emailCap} email invites to customers`,
    ],
    featured: false,
    cta: 'Buy plan',
  },
  {
    name: 'Startup',
    id: process.env.NEXT_PUBLIC_STARTUP_PROD_ID,
    price: { monthly: '$69', annually: '$288' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      'All features in Freelancer plan',
      'Customizable invoice templates',
      'Advanced analytics',
      '24-hour support response time',
      `Email up to ${plans['Startup']?.invoiceEmailCap} invoices to customers`,
      `Send up to ${plans['Startup']?.emailCap} email invites to customers`,
      'Customer Portal branding & customization',
    ],
    featured: true,
    cta: 'Buy plan',
  },
  {
    name: 'Enterprise',
    id: process.env.NEXT_PUBLIC_STARTUP_PROD_ID,
    price: '$349',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'All features in Startup plan',
      'Unlimited invoices',
      'Custom domain',
      'Priority support',
      'Send unlimited invoices to customers',
      'Send unlimited email invites to customers',
      'Custom integrations & features',
    ],
    featured: false,
    cta: 'Buy plan',
  },
  {
    name: 'Tester',
    id: process.env.NEXT_PUBLIC_TESTER_PROD_ID,
    price: '$1',
    description:
      'This is the tester plan. It will be used for testing purposes only.',
    features: [
      'All features in Startup plan',
      'Unlimited invoices',
      'Custom domain',
      'Priority support',
      'Send up to 50 invoices to customers',
      'Send up to 50 email invites to customers',
      'Custom integrations & features',
    ],
    featured: false,
    cta: 'Buy plan',
  },
];

type Props = {
  hideTiers?: string[];
  cardWrapperClass?: string;
};

export default function Pricing(props: Props) {
  const [state, setState] = useState<{ fetching?: string }>({});
  const [frequency, setFrequency] = useState(frequencies[0]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode')!;
  const { isSignedIn, user, isLoaded } = useUser();

  async function createSubscription(id?: string) {
    if (!id) throw new Error('No plan ID provided!');
    console.log('🔑 Creating subscription for plan:', id);

    try {
      setState({ fetching: id });

      if (!isSignedIn) {
        const redirect = encodeURIComponent(`/#pricing`);
        router.push(`/sign-in?redirect=${redirect}`); // Redirect to sign-in if no user is logged in
        return;
      }

      const { data, status } = await axios({
        url: `/api/v1/stripe/subscriptions/create`,
        method: 'POST',
        data: { id },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      if (data?.url) {
        router.push(data?.url); // Redirect to Stripe Checkout
      }

      console.log('🔑 Data', data);
    } catch (error: any) {
      console.error('🔑 Error', error);
      toast.error(`Failed to create subscription!`);
    } finally {
      setState({ fetching: undefined });
    }
  }

  return (
    <div id="pricing" className="lg:mx-auto my-16 sm:mt-20 lg:my-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:text-center">
          <h2 className="text-xl font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Choose the plan that best suits your needs and enjoy the increasing
          benefits as you scale up from Freelancer to Startup and Enterprise
          plans.
        </p>

        {/* <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div> */}

        <div
          className={classNames(
            'mt-10 flex flex-row flex-wrap xl:flex-nowrap gap-10',
            props.cardWrapperClass
          )}
        >
          {TIER_PLANS.map((tier, key) => {
            const fetching = state?.fetching === tier.id;
            const isEnterprise = tier.name === 'Enterprise';
            const isTester = tier.name === 'Tester';

            const isTesterMode = mode === 'tester'; // 🚨 TODO: remove this when not needed
            if (isTesterMode && isEnterprise) return null; // Hide all tiers except tester plan
            if (isTester && !isTesterMode) return null; // Hide tester plan if not in tester mode

            if (props.hideTiers?.includes(tier.name)) return null; // Hide desired tiers

            return (
              <div
                key={key}
                className={classNames(
                  'rounded-3xl p-8 ring-1 xl:p-10 w-full lg:w-auto',
                  tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200'
                )}
              >
                <h3
                  id={key.toString()}
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-gray-800',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={classNames(
                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                    'mt-4 text-sm leading-6'
                  )}
                >
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={classNames(
                      tier.featured ? 'text-white' : 'text-gray-800',
                      'text-4xl font-bold tracking-tight'
                    )}
                  >
                    {typeof tier.price === 'string'
                      ? tier.price
                      : tier.price[frequency.value as keyof typeof tier.price]}
                  </span>
                  {typeof tier.price !== 'string' ? (
                    <span
                      className={classNames(
                        tier.featured ? 'text-gray-300' : 'text-gray-600',
                        'text-sm font-semibold leading-6'
                      )}
                    >
                      {frequency.priceSuffix}
                    </span>
                  ) : null}
                </p>
                <Button
                  title={tier.cta}
                  aria-describedby={key}
                  className={classNames(
                    'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    tier.featured
                      ? 'bg-white text-gray-600 hover:bg-indigo-600 hover:text-white focus-visible:outline-white'
                      : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                    isEnterprise && 'opacity-100 cursor-default'
                  )}
                  onClick={() => createSubscription(tier.id)}
                  fetching={fetching}
                  disabled={!!state?.fetching}
                  hide={isEnterprise}
                />
                {isEnterprise && (
                  <p className="mt-4 font-extrabold text-sm text-indigo-600">
                    Coming soon
                  </p>
                )}
                <ul
                  role="list"
                  className={classNames(
                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                    'mt-8 space-y-3 text-sm leading-6 xl:mt-10'
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.0303 8.78039L8.99993 16.8107L5.4696 13.2804L6.53026 12.2197L8.99993 14.6894L15.9696 7.71973L17.0303 8.78039Z"
                            fill="#080341"
                          ></path>{' '}
                        </g>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
