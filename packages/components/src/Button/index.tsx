'use client';

import { classNames } from '../../lib/helpers';
import './styles.css';

type Props = {
  title?: string | React.ReactNode;
  onClick?: (props?: any) => void;
  children?: React.ReactNode;
  fetching?: boolean;
  disabled?: boolean;
  className?: string;
  style?: 'primary' | 'secondary' | 'ghost' | 'badge' | 'link'; // Defaults to 'primary'
  type?: 'button' | 'submit' | 'reset';
  hide?: boolean;
  dataAttribute?: string;
};

export function Button(props: Props): React.ReactElement | null {
  if (props.hide) {
    return null;
  }

  const content = props.children || props.title || 'Button';

  const styles = {
    primary:
      'rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    secondary:
      'rounded-md bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    ghost:
      'bg-transparent inline-flex items-center border-b-2 border-transparent px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-transparent shadow-none',
    badge:
      'center relative inline-block select-none whitespace-nowrap rounded-lg bg-amber-500 text-white py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none',
    link: 'bg-transparent items-center px-0 text-sm font-semibold text-indigo-600 shadow-none hover:bg-transparent hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  };

  const spinnerStyles = {
    primary: 'border-slate-200 border-l-[#ffffff50]',
    secondary: 'border-indigo-600 border-l-[#ffffff50]',
    link: 'border-gray-400 border-l-indigo-600',
    ghost: 'border-gray-400 border-l-indigo-600',
    badge: 'border-gray-400 border-l-indigo-600',
  };

  function onClickHandler() {
    props.onClick?.();
  }

  return (
    <button
      type={props.type}
      className={classNames(
        'flex flex-row gap-2 relative truncate items-center',
        styles[props.style || 'primary'],
        props.disabled && 'bg-opacity-45 cursor-not-allowed',
        props.fetching && 'bg-opacity-45 cursor-wait',
        props.className
      )}
      disabled={props.disabled || props.fetching}
      onClick={onClickHandler}
      data-cy={props.dataAttribute}
    >
      {props.fetching && (
        <section
          className={classNames(
            'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
          )}
        >
          <svg
            className={classNames(
              'animate-spin border-4 border-solid rounded-full h-5 w-5 bg-transparent',
              spinnerStyles[props.style || 'primary']
            )}
            viewBox="0 0 24 24"
          ></svg>
        </section>
      )}
      <section className="w-fill truncate mx-auto">
        <span className={classNames(props.fetching && 'opacity-45')}>
          {content}
        </span>
      </section>
    </button>
  );
}
