'use client';

import { Fragment, useEffect, useState } from 'react';
import {
  Listbox,
  Transition,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
} from '@headlessui/react';
import { classNames } from '../../lib/helpers';

type Props = {
  data: { title: string | number; value: string | number | React.ReactNode }[];
  label?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  onChange?: (value?: string) => void;
  className?: string;
};

export function Select({
  data,
  label,
  placeholder = 'Select an option',
  name,
  disabled,
  onChange,
  className,
}: Props) {
  const [selected, setSelected] = useState<string | undefined>();
  const selectedTitle = data?.filter((select) => select.value === selected)?.[0]
    ?.title;

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  return (
    <section className={classNames('w-full', className)}>
      <Listbox
        name={name}
        disabled={disabled}
        value={selected}
        onChange={setSelected}
      >
        {({ open }) => (
          <>
            {label && (
              <label className="block text-sm font-medium leading-6 text-gray-800 mb-2">
                {label}
              </label>
            )}
            <div className="relative">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">
                  {selectedTitle || selected || placeholder}
                </span>
                <span
                  className={classNames(
                    'pointer-events-none absolute inset-y-0 right-0 flex items-center transition transform duration-300',
                    open ? 'rotate-180' : 'rotate-0'
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mx-2"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <rect width="24" height="24" fill="white"></rect>{' '}
                      <path
                        d="M17 9.5L12 14.5L7 9.5"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{' '}
                    </g>
                  </svg>
                </span>
              </ListboxButton>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {data?.map((item, key) => (
                    <ListboxOption
                      key={key}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-800',
                          'relative cursor-default select-none py-2 pl-8 pr-4'
                        )
                      }
                      value={item.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {item.title || item.value}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                              )}
                            >
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
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.0303 8.78039L8.99993 16.8107L5.4696 13.2804L6.53026 12.2197L8.99993 14.6894L15.9696 7.71973L17.0303 8.78039Z"
                                    fill="#080341"
                                  ></path>{' '}
                                </g>
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </section>
  );
}
