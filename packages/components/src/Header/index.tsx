'use client';

import { useState } from 'react';
import { Dialog, DialogPanel, Popover, PopoverGroup } from '@headlessui/react';
import { classNames } from '../../lib/helpers';

type HeaderProps = {
  menuList?: React.ReactElement[];
  logo?: React.ReactElement;
  footer?: React.ReactElement;
  callsToAction?: React.ReactElement[];
  className?: string;
};

export function Header(props: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={classNames(props.className)}>
      <nav
        aria-label="Global"
        className="flex flex-row gap-10 mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {props.logo && (
          <div className="flex" data-cy="logo-container">
            {props.logo}
          </div>
        )}

        {/* hamburger menu cta */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            data-cy="open-sidebar"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <PopoverGroup
          className="hidden lg:flex lg:gap-x-12"
          data-cy="desktop-menu"
        >
          {props.menuList?.map((item, index) => (
            <Popover key={index} className="relative">
              {item}
            </Popover>
          ))}
        </PopoverGroup>
        {props.callsToAction && (
          <div
            className="hidden lg:flex lg:flex-1 lg:justify-end"
            data-cy="desktop-cta"
          >
            {props.callsToAction?.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        )}
      </nav>

      {/* mobile component */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="p-6">
            <div className="flex items-center justify-between">
              {props.logo}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 p-2.5"
                data-cy="close-sidebar"
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#222"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                    stroke="#222"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {props.menuList && (
                  <div
                    className="flex flex-col gap-5 py-10"
                    data-cy="mobile-menu"
                  >
                    {props.menuList?.map((item) => (
                      <div key={item.key}>{item}</div>
                    ))}
                  </div>
                )}
                {props.callsToAction && (
                  <div className="py-6" data-cy="mobile-cta">
                    {props.callsToAction?.map((item, key) => (
                      <div key={key}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {props.footer && (
            <div className="sticky bottom-0" data-cy="footer">
              {props.footer}
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </header>
  );
}
