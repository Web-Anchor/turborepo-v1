import { classNames } from '../../lib/helpers';

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
};

export function Button(props: Props): React.ReactElement | null {
  if (props.hide) {
    return null;
  }

  const content = props.children || props.title;

  const styles = {
    primary:
      'rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    secondary:
      'rounded-md bg-indigo-600 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    ghost:
      'bg-transparent inline-flex items-center border-b-2 border-transparent px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-transparent shadow-none',
    badge:
      'center relative inline-block select-none whitespace-nowrap rounded-lg bg-amber-500 text-white py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none',
    link: 'bg-transparent items-center px-0 text-sm font-semibold text-indigo-600 shadow-none hover:bg-transparent hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  };

  return (
    <button
      type={props.type}
      className={classNames(
        styles[props.style || 'primary'],
        props.disabled && 'opacity-45 cursor-not-allowed',
        props.fetching && 'bg-opacity-45 cursor-wait',
        props.className
      )}
      disabled={props.disabled || props.fetching}
      onClick={props.onClick}
    >
      {props.fetching && (
        <span
          className={classNames(
            'loading loading-spinner bg-white z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white',
            (props.style === 'ghost' || props.style === 'link') &&
              'bg-indigo-600'
          )}
        ></span>
      )}
      <span className={classNames(props.fetching && 'opacity-45')}>
        {content}
      </span>
    </button>
  );
}
