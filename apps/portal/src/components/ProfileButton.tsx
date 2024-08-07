import Link from '@components/Link';
import { classNames } from '@repo/lib';
import Image from 'next/image';
import { memo } from 'react';

type Props = {
  href: string;
  imgSrc?: string;
  imgAlt?: string;
  name?: string;
  description?: string;
  order?: 'revere';
  className?: string;
};

function ProfileButton(props: Props) {
  return (
    <Link href={props?.href} className={classNames(props.className)}>
      <div className="flex flex-row gap-3 items-center">
        <div
          className={classNames(
            props?.order === 'revere' ? 'order-2' : 'order-1'
          )}
        >
          {!props?.imgSrc && (
            <span className="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          )}
          {props?.imgSrc && (
            <section className="relative h-9 w-9 rounded-full overflow-hidden">
              <Image
                className="object-cover w-full h-full"
                src={props?.imgSrc}
                alt={props?.imgAlt ?? 'user-profile'}
                fill
              />
            </section>
          )}
        </div>
        <div
          className={classNames(
            'max-w-xs',
            props?.order === 'revere' ? 'order-1 text-revere' : 'order-2'
          )}
        >
          <p className="truncate max-w-28 text-sm font-semibold text-gray-600 group-hover:text-gray-800">
            {props?.name}
          </p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
            {props?.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProfileButton);
