import { classNames } from '../../lib/helpers';
import './styles.css';

type Props = {
  type?: 'card' | 'user' | 'list' | 'table' | 'table-large';
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  hide?: boolean;
  dataAttribute?: string;
};

export function Skeleton({
  type = 'card',
  width = 'max-w-sm',
  height = 'w-full',
  borderRadius = 'rounded',
  className,
  hide,
  dataAttribute,
}: Props): React.ReactElement | null {
  if (hide) return null;

  if (type === 'user') {
    return (
      <div
        className={classNames(
          `flex flex-row gap-2 items-center ${width} ${height}`,
          className
        )}
        data-cy={dataAttribute}
      >
        <SkeletonCircle />
        <div className="flex flex-col w-full gap-2">
          <SkeletonLine width="w-2/6" />
          <SkeletonLine width="w-1/6" />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div
        className={classNames(
          `flex flex-col gap-2 items-center ${width} ${height}`,
          className
        )}
        data-cy={dataAttribute}
      >
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine width="w-4/6" />
        <SkeletonLine width="w-3/6" />
        <SkeletonLine width="w-5/6" />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div
        className={classNames(
          `border border-blue-200 shadow ${borderRadius} p-4 w-hull`,
          className
        )}
        data-cy={dataAttribute}
      >
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <SkeletonLine />
            <SkeletonLine width="w-4/6" />
            <div className="space-y-2">
              <SkeletonLine />
              <SkeletonLine width="w-5/6" />
            </div>
            <div className="space-y-2">
              <SkeletonLine width="w-3/6" />
              <SkeletonLine width="w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table-large') {
    return (
      <div
        className={classNames(
          `animate-pulse border border-gray-200 shadow ${borderRadius} p-4 w-hull bg-gray-200`,
          className
        )}
        data-cy={dataAttribute}
      >
        <div className="flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <SkeletonLine height="h-4" />
            <SkeletonLine width="w-4/6" height="h-4" />
            <div className="space-y-2">
              <SkeletonLine height="h-4" />
              <SkeletonLine width="w-5/6" height="h-4" />
            </div>
            <div className="space-y-2">
              <SkeletonLine width="w-3/6" height="h-4" />
              <SkeletonLine width="w-4/6" height="h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        `border border-blue-200 shadow ${borderRadius} p-4 ${width} ${height}`,
        className
      )}
      data-cy={dataAttribute}
    >
      <div className="animate-pulse flex space-x-4">
        <SkeletonCircle />
        <div className="flex-1 space-y-6 py-1">
          <SkeletonLine />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <SkeletonLine width="col-span-2" />
              <SkeletonLine width="col-span-1" />
            </div>
            <SkeletonLine />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonLine({
  width = 'w-full',
  height = 'h-2',
  borderRadius = 'rounded',
  additionalClasses = '',
  bgColor = 'bg-slate-400',
}) {
  return (
    <div
      className={classNames(
        `animate-pulse`,
        height,
        width,
        bgColor,
        borderRadius,
        additionalClasses
      )}
    ></div>
  );
}

export function SkeletonCircle({
  borderRadius = 'rounded-full',
  additionalClasses = '',
  bgColor = 'bg-slate-400',
  height = 'h-10',
  width = 'w-10',
}) {
  return (
    <section>
      <div
        className={classNames(
          `animate-pulse`,
          height,
          width,
          bgColor,
          borderRadius,
          additionalClasses
        )}
      ></div>
    </section>
  );
}
