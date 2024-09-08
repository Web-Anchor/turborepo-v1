'use client';

import { useEffect, useState } from 'react';
import {
  Listbox,
  Label,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { classNames } from '../../lib/helpers';

type OptionTypes = {
  title: string;
  value?: string | number;
};

type SelectTypes = {
  label?: string;
  data?: OptionTypes[];
  placeholder?: string;
  callBack?: (...args: any[]) => void;
  name: string;
  multiple?: boolean;
  selected?: string[];
  disabled?: boolean;
  dropDownPosition?: 'top' | 'bottom';
  fetching?: boolean;
};

export function Select(props: SelectTypes) {
  const [selected, setSelected] = useState<string[] | undefined>();
  const selectedTitle =
    props?.data?.find((item) =>
      isSelectedValues(selected, item.value?.toString())
    )?.title || 'Select an option';
  const VALUE = selectedTitle || props.selected || [];

  useEffect(() => {
    setSelected(() => {
      return props.multiple
        ? props.selected
        : returnFirstlySelectedValue(props.selected);
    });
  }, [props.multiple, props.selected]);

  // --------------------------------------------------------------------------------
  // 📌  Fall back error msg if there no options provided
  // --------------------------------------------------------------------------------
  let options = props?.data;
  if (!options?.length) {
    options = [{ title: 'No options available' }];
  }

  return (
    <section className="relative flex flex-1 flex-col h-fit w-full">
      <div className="w-full">
        <Listbox
          value={selected || props.selected || ['']}
          onChange={setSelected}
          name={props.name}
        >
          <ListboxButton
            className={classNames(
              'min-h-8 rounded-xl border border-gray-200 p-1 relative block w-full rounded-lg py-1.5 pr-8 pl-3 text-left text-sm/6 text-gray-600',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-400'
            )}
          >
            {VALUE}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 -mt-1.5 h-3 w-3 text-gray-600"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={classNames(
              'mt-3 w-[var(--button-width)] rounded-xl border border-gray-200 p-1 bg-white [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
            )}
          >
            {options.map((item, key) => (
              <ListboxOption
                key={key}
                value={item.value || ''}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none text-gray-600 data-[focus]:bg-gray-200 data-[focus]:text-indigo-600 cursor-pointer"
              >
                <div className="text-sm/6">{item.title || key}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </section>
  );
}

function isSelectedValues(
  options?: OptionTypes | OptionTypes[] | string | string[],
  value?: string | string[]
) {
  if (Array.isArray(options)) {
    return (options as string[])?.some((option) => option === value);
  }

  if (typeof options === 'object') {
    return options?.value === value;
  }

  return options === value;
}

function returnFirstlySelectedValue(options?: string[]) {
  return !!options?.length && options[0] ? [options[0]] : [];
}
