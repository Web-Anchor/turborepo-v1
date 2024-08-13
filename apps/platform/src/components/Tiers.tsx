import { TIER_PLANS } from '@components/Pricing';
import { Wrapper } from '@repo/components';
import { classNames } from '@repo/lib';

type Props = {
  class?: string;
};

export default function Tiers(props: Props): React.ReactElement {
  return (
    <Wrapper className={classNames('flex-row flex-wrap gap-5', props.class)}>
      {TIER_PLANS?.map((tier, key) => {
        if (tier.name === 'Tester') {
          return null; // Skip this tier
        }

        return (
          <section
            key={key}
            className={classNames(
              'flex flex-col gap-2 rounded-3xl p-8 ring-1 card w-full lg:w-72 bg-base-100 py-6 px-4',
              tier.featured
                ? 'bg-gray-900 bg-opacity-90 ring-gray-900'
                : 'ring-gray-200'
            )}
          >
            <h2
              className={classNames(
                'text-xl font-medium text-gray-800',
                tier.featured ? 'text-white' : ''
              )}
            >
              {tier.name}
            </h2>
            <p
              className={classNames(
                'text-sm text-gray-500',
                tier.featured ? 'text-white' : ''
              )}
            >
              {tier.description}
            </p>
            {tier.features.map((feature) => (
              <li
                key={feature}
                className={classNames(
                  'flex text-sm gap-x-3',
                  tier.featured ? 'text-white' : ''
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 opacity-75"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
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
          </section>
        );
      })}
    </Wrapper>
  );
}
