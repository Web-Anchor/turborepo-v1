import { classNames } from '../../lib/helpers';

type HeaderSectionProps = {
  title?: string;
  subtitle?: string;
  description?: string[];
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'small';
  type?: 'page-header';
  id?: string;
};

export function HeaderSection(props: HeaderSectionProps) {
  if (!props.title && !!props.description?.length && !props.subtitle)
    return null;

  return (
    <div
      className={classNames(
        'px-6 py-10 sm:py-16 lg:px-8 text-left lg:text-center',
        props.theme === 'dark' && 'bg-gray-800',
        props.type === 'page-header' && 'lg:text-left',
        props.className
      )}
      id={props.id}
    >
      <div className={classNames('flex flex-col mx-auto max-w-4xl')}>
        {props.subtitle && (
          <h2
            className={classNames(
              'text-base font-semibold leading-7 text-indigo-600',
              props.theme === 'dark' && 'text-indigo-400',
              props.type === 'page-header' &&
                'text-indigo-600 font-xs leading-6 order-3'
            )}
          >
            {props.subtitle}
          </h2>
        )}
        {props.title && (
          <h1
            className={classNames(
              'mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl',
              props.theme === 'dark' && 'text-white',
              props.size === 'small' && 'lg:text-4xl',
              props.type === 'page-header' &&
                'text-xl font-bold tracking-tight text-gray-800 order-1'
            )}
          >
            {props.title}
          </h1>
        )}
        {props.description?.length && (
          <div className={classNames('mt-6')}>
            {props.description?.map((desc, index) => (
              <p
                key={index}
                className={classNames(
                  'text-lg leading-8 text-gray-600',
                  props.theme === 'dark' && 'text-gray-200',
                  props.type === 'page-header' &&
                    'text-sm leading-6 text-gray-600 order-2'
                )}
              >
                {desc}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
