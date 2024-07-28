import { classNames } from '../../lib/helpers';

type DividerProps = {
  text?: string;
  textAlign?: 'left' | 'center' | 'right';
};

export function Divider({ text, textAlign = 'left' }: DividerProps) {
  const textAlignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      <div
        className={classNames(
          'w-full border-t border-gray-300',
          textAlign === 'left' && 'hidden'
        )}
      />
      <div
        className={classNames('relative flex', textAlignmentClasses[textAlign])}
      >
        <span className="px-3 text-base font-semibold leading-6 text-gray-900 truncate">
          {text}
        </span>
      </div>
      <div
        className={classNames(
          'w-full border-t border-gray-300',
          textAlign === 'right' && 'hidden'
        )}
      />
    </div>
  );
}
