import React from 'react';
import { classNames } from '../../lib/helpers';
import './styles.css';

export type Props = {
  title?: string | number | React.ReactNode;
  description?: string | React.ReactElement;
  tooltip?: string;
  tooltipPosition?:
    | 'tooltip-right'
    | 'tooltip-left'
    | 'tooltip-top'
    | 'tooltip-bottom';
  type?:
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'indigo'
    | 'purple'
    | 'pink';
  onClick?: (props?: any) => void;
  hasCloseCta?: boolean;
  className?: string;
  hide?: boolean;
};

export function Badge({
  title,
  description,
  tooltip,
  tooltipPosition = 'tooltip-bottom',
  type = 'default',
  onClick,
  className,
  hide = false,
  hasCloseCta = true,
}: Props) {
  const [state, setState] = React.useState<{ hidden?: boolean }>({});

  if (hide || state?.hidden) {
    return null;
  }

  const typeClasses = {
    default: 'bg-gray-200 text-gray-600',
    success: 'bg-green-200 text-green-700',
    warning: 'bg-yellow-200 text-yellow-800',
    error: 'bg-red-200 text-red-700',
    info: 'bg-blue-200 text-blue-700',
    indigo: 'bg-indigo-200 text-indigo-700',
    purple: 'bg-purple-200 text-purple-700',
    pink: 'bg-pink-200 text-pink-700',
  };

  const iconClasses = {
    default: 'fill-gray-400',
    success: 'fill-green-500',
    warning: 'fill-yellow-500',
    error: 'fill-red-500',
    info: 'fill-blue-500',
    indigo: 'fill-indigo-500',
    purple: 'fill-purple-500',
    pink: 'fill-pink-500',
  };

  const tooltipClasses = {
    'tooltip-right': 'left-full ml-2',
    'tooltip-left': 'right-full mr-2',
    'tooltip-top': 'bottom-full mb-2 -ml-2',
    'tooltip-bottom': 'top-full mt-2 -ml-2',
  };

  return (
    <section className={classNames('flex flex-row gap-2')} data-tip={tooltip}>
      <span
        className={classNames(
          'relative has-tooltip inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium',
          onClick && 'cursor-pointer',
          typeClasses[type],
          className
        )}
        onClick={() => onClick?.()}
        data-cy="badge"
      >
        <svg
          className={classNames('h-1.5 w-1.5', iconClasses[type])}
          viewBox="0 0 6 6"
          aria-hidden="true"
        >
          <circle cx={3} cy={3} r={3} />
        </svg>
        <section>{title}</section>

        {hasCloseCta && (
          <button
            type="button"
            className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
            onClick={(e) => {
              e.stopPropagation();
              setState((prev) => ({ ...prev, hidden: true }));
            }}
          >
            <span className="sr-only">Remove</span>
            <svg
              viewBox="0 0 14 14"
              className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75"
            >
              <path d="M4 4l6 6m0-6l-6 6" />
            </svg>
            <span className="absolute -inset-1" />
          </button>
        )}

        {tooltip && (
          <span
            className={classNames(
              'tooltip truncate bg-gray-800 text-white text-xs py-1 px-2 rounded-md',
              tooltipClasses[tooltipPosition]
            )}
          >
            {tooltip}
          </span>
        )}
      </span>

      {description && (
        <span className="text-xs text-gray-500 self-center">{description}</span>
      )}
    </section>
  );
}

export default Badge;
