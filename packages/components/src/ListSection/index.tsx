import { classNames } from '../../lib/helpers';

type HeaderSectionProps = {
  list?: string | React.ReactNode[];
  className?: string;
  theme?: 'light' | 'dark';
  dataAttribute?: string;
};

export function ListSection(props: HeaderSectionProps) {
  if (!props.list?.length) {
    return null;
  }

  return (
    <div
      className={classNames(
        'lg:mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl',
        props.theme === 'dark' && 'bg-gray-800',
        props.className
      )}
      data-cy={props.dataAttribute}
    >
      <dl className="grid px-6 max-w-xl grid-cols-1 gap-x-8 gap-y-5 lg:max-w-none lg:grid-cols-2 lg:gap-y-10">
        {Array.isArray(props.list) &&
          props.list?.map((item, key) => (
            <div key={key} className="relative">
              {typeof item === 'string' ? <dt>{item}</dt> : item}
            </div>
          ))}
      </dl>
    </div>
  );
}
