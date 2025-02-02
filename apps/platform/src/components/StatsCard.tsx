import Link from 'next/link';
import { classNames } from '@repo/lib';
import { Skeleton } from '@repo/components';

type Props = {
  currentTotal?: number;
  previousTotal?: number | string;
  percentage?: number;
  isLoading?: boolean;
  type?: 'customers' | 'payments';
  link?: string;
  linkTitle?: string;
  title?: string;
  description?: string;
};

const ICON = {
  customers: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M7.43361 9.90622C5.34288 10.3793 4.29751 10.6158 4.04881 11.4156C3.8001 12.2153 4.51276 13.0487 5.93808 14.7154L6.30683 15.1466C6.71186 15.6203 6.91438 15.8571 7.00548 16.1501C7.09659 16.443 7.06597 16.759 7.00474 17.3909L6.94899 17.9662C6.7335 20.19 6.62575 21.3019 7.27688 21.7962C7.928 22.2905 8.90677 21.8398 10.8643 20.9385L11.3708 20.7053C11.927 20.4492 12.2052 20.3211 12.5 20.3211C12.7948 20.3211 13.073 20.4492 13.6292 20.7053L14.1357 20.9385C16.0932 21.8398 17.072 22.2905 17.7231 21.7962C18.3742 21.3019 18.2665 20.19 18.051 17.9662M19.0619 14.7154C20.4872 13.0487 21.1999 12.2153 20.9512 11.4156C20.7025 10.6158 19.6571 10.3793 17.5664 9.90622L17.0255 9.78384C16.4314 9.64942 16.1343 9.5822 15.8958 9.40114C15.6573 9.22007 15.5043 8.94564 15.1984 8.3968L14.9198 7.89712C13.8432 5.96571 13.3048 5 12.5 5C11.6952 5 11.1568 5.96571 10.0802 7.89712"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{' '}
        <path
          d="M4.98987 2C4.98987 2 5.2778 3.45771 5.90909 4.08475C6.54037 4.71179 8 4.98987 8 4.98987C8 4.98987 6.54229 5.2778 5.91525 5.90909C5.28821 6.54037 5.01013 8 5.01013 8C5.01013 8 4.7fff 6.54229 4.09091 5.91525C3.45963 5.28821 2 5.01013 2 5.01013C2 5.01013 3.45771 4.7fff 4.08475 4.09091C4.71179 3.45963 4.98987 2 4.98987 2Z"
          stroke="#fff"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M18 5H20M19 6L19 4"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{' '}
      </g>
    </svg>
  ),
  payments: (
    <svg
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      color="#fff"
      className="h-6 w-6"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title id="dolarIconTitle">Dolar</title>{' '}
        <path d="M12 4L12 6M12 18L12 20M15.5 8C15.1666667 6.66666667 14 6 12 6 9 6 8.5 7.95652174 8.5 9 8.5 13.140327 15.5 10.9649412 15.5 15 15.5 16.0434783 15 18 12 18 10 18 8.83333333 17.3333333 8.5 16"></path>{' '}
      </g>
    </svg>
  ),
};

export default function StatsCard(props: Props): React.ReactElement {
  const percentage = props?.percentage ?? 0;
  const Icon = ICON[props?.type ?? 'customers'];
  // console.log('📊 StatsCard', props);

  if (props.isLoading) {
    return <Skeleton type="card" className="max-w-xs" />;
  }

  return (
    <div className="flex flex-col gap-2 relative w-full sm:w-fit sm:min-w-72 overflow-hidden rounded-lg px-4 py-5 shadow sm:px-6">
      <section className="flex flex-row gap-5">
        <div className="rounded-md w-fit h-fit bg-indigo-500 p-3">{Icon}</div>
        <section className="flex flex-col">
          {props.title && (
            <section className="max-w-xs truncate text-sm font-semibold text-gray-600">
              {props.title}
            </section>
          )}

          <section className="flex items-baseline">
            {props?.currentTotal && (
              <section className="text-2xl font-semibold text-gray-800">
                {props?.currentTotal}
              </section>
            )}
            <section
              className={classNames(
                percentage >= 0 ? 'text-green-600' : 'text-red-600',
                'ml-2 flex items-baseline text-sm font-semibold'
              )}
            >
              {percentage >= 0 ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 self-center"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 6V18M12 6L7 11M12 6L17 11"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 self-center"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 6V18M12 18L7 13M12 18L17 13"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>
                </svg>
              )}

              <section className="flex gap-2">
                <section className="sr-only">
                  {percentage >= 0 ? 'Increased' : 'Decreased'} by{' '}
                </section>
                {percentage}
                {props?.previousTotal && (
                  <section className="stat-desc text-indigo-600 self-end">
                    {props?.previousTotal}
                  </section>
                )}
              </section>
            </section>
          </section>
        </section>
      </section>
      {props.description && (
        <section className="stat-desc">{props.description}</section>
      )}
      {props.link && (
        <div className="text-sm">
          <Link
            href={props?.link}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {props?.linkTitle ?? 'View all'}
            <section className="sr-only"> stats</section>
          </Link>
        </div>
      )}
    </div>
  );
}
