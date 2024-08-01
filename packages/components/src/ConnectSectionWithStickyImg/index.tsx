import { classNames } from '../../lib/helpers';
import { HeaderSection } from '../HeaderSection';

type Perk = {
  icon: React.ReactElement;
  title: string;
  description: string;
};

type Content = {
  title?: string;
  subtitle?: string;
  description?: string[];
};

type Props = {
  header?: Content;
  footer?: Content;
  image?: React.ReactElement;
  className?: string;
  perks?: Perk[];
  theme?: 'light' | 'dark';
};

export function ConnectSectionWithStickyImg(props: Props) {
  return (
    <div
      className={classNames(
        'relative isolate px-6 py-24 lg:py-32 lg:overflow-visible lg:px-0',
        props.theme === 'dark' && 'bg-gray-800',
        props.className
      )}
    >
      <CheckBg />
      <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        {props.header && (
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <HeaderSection
                  {...props.header}
                  theme={props.theme}
                  className="lg:text-left py-0 sm:py-0 px-0 lg:px-0"
                  size="small"
                />
              </div>
            </div>
          </div>
        )}

        {props.image && (
          <div className="-ml-8 lg:-ml-12 -mt-12 lg:p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <section>{props.image}</section>
          </div>
        )}

        {props.perks && (
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  {props.perks?.map((perk, index) => (
                    <li key={index} className="flex gap-x-3">
                      <section className="mt-1">{perk.icon}</section>
                      <p>
                        <strong
                          className={classNames(
                            'font-bold text-gray-900',
                            props.theme === 'dark' && 'text-white'
                          )}
                        >
                          {perk.title}
                        </strong>
                        <span
                          className={classNames(
                            'text-gray-600',
                            props.theme === 'dark' && 'text-gray-200'
                          )}
                        >
                          {' '}
                          {perk.description}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>

                {props.footer && (
                  <HeaderSection
                    {...props.footer}
                    theme={props.theme}
                    className="lg:text-left py-0 sm:py-0"
                    size="small"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckBg() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        aria-hidden="true"
        className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
    </div>
  );
}
