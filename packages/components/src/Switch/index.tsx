import { Switch as SwitchUI } from '@headlessui/react';
import { classNames } from '../../lib/helpers';

type Props = {
  enabled?: boolean;
  disabled?: boolean;
  className?: string; // Use 'className' instead of 'class' to avoid React's reserved keyword.
  onChange?: (enabled: boolean) => void;
};

export function Switch({
  enabled = false,
  disabled = false,
  className,
  onChange,
}: Props) {
  const handleChange = () => {
    if (!disabled) {
      onChange?.(!enabled);
    }
  };

  return (
    <SwitchUI
      checked={enabled}
      onChange={handleChange}
      className={classNames(
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
    >
      <span
        aria-hidden="true"
        className={classNames(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          enabled ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </SwitchUI>
  );
}
