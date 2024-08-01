import { classNames } from '../../lib/helpers';

type HeaderSectionProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export function HeaderSection(props: HeaderSectionProps) {
  return (
    <div className={classNames('px-6 py-24 sm:py-32 lg:px-8', props.className)}>
      <div className="mx-auto max-w-2xl text-center">
        {props.subtitle && (
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {props.subtitle}
          </h2>
        )}
        {props.title && (
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {props.title}
          </h1>
        )}
        {props.description && (
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {props.description}
          </p>
        )}
      </div>
    </div>
  );
}
