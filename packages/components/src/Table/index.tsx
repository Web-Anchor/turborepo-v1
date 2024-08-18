import { classNames } from '../../lib/helpers';
import { Skeleton } from '../Skeleton';
import { Button } from '../Button';

type Row = { item?: string | React.ReactElement; className?: string };

type Props = {
  footer?: React.ReactElement;
  header?: Row[];
  data?: { row: Row[]; className?: string }[];
  fetching?: boolean;
  noData?: { title?: string; description?: string };
  hasMore?: boolean;
  hasPrevious?: boolean;
  nextCallback?: () => void;
  prevCallback?: () => void;
  hidden?: boolean;
};

export function Table({
  footer,
  header,
  data,
  fetching,
  noData,
  hasMore,
  hasPrevious,
  nextCallback,
  prevCallback,
  hidden,
}: Props): React.ReactElement | null {
  if (fetching) {
    return (
      <Skeleton
        type="table-large"
        dataAttribute="table-skeleton"
        className="max-w-4xl"
      />
    );
  }

  if (hidden) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div className="-mx-4 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {header?.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className={classNames(
                    'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-800 sm:pl-0',
                    item.className
                  )}
                >
                  {item.item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={header?.length ?? 1}>
                  <section className="flex flex-col items-center justify-center p-4 text-gray-400">
                    {noData?.title ?? "You don't have any data."}
                    {noData?.description ?? 'Add new data to see here.'}
                  </section>
                </td>
              </tr>
            )}

            {data?.map((rows, rowIndex) => (
              <tr key={rowIndex} className={rows.className}>
                {rows.row.map((item, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={classNames(
                      'px-3 py-3.5 text-sm text-gray-800',
                      item.className
                    )}
                  >
                    {item.item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {(hasMore || hasPrevious) && (
          <div className="flex justify-end my-5">
            {hasPrevious && (
              <Button
                onClick={prevCallback}
                fetching={fetching}
                className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                Previous
              </Button>
            )}
            {hasMore && (
              <Button
                onClick={nextCallback}
                fetching={fetching}
                className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                Next
              </Button>
            )}
          </div>
        )}
      </div>

      {footer && <div className="sm:flex sm:items-center">{footer}</div>}
    </div>
  );
}
