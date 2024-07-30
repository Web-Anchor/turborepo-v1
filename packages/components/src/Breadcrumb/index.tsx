import React from 'react';
import { classNames } from '../../lib/helpers';

type Props = {
  components?: React.ReactElement[];
  homeComponent?: React.ReactElement;
  className?: string;
};

export function Breadcrumb({
  components = [],
  className,
  homeComponent,
}: Props) {
  const home = (
    <div>
      <a href="/" className="text-gray-400 hover:text-gray-500">
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
              d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{' '}
            <path
              d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{' '}
          </g>
        </svg>
        <span className="sr-only">Home</span>
      </a>
    </div>
  );

  return (
    <nav
      data-cy="Breadcrumb"
      className={classNames(
        'flex bg-slate-200 px-3 py-2 rounded-md',
        className
      )}
    >
      <ol role="list" className="flex items-center space-x-4">
        <li>{homeComponent || home}</li>
        {components.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 text-gray-400"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M9.5 7L14.5 12L9.5 17"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{' '}
                </g>
              </svg>
              {item}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
