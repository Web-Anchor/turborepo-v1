'use client';

import { classNames } from '../../lib/helpers';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import React, { useState } from 'react';

type NavItem = {
  component?: React.ReactElement;
  name?: string;
  href?: string;
  icon?: React.ReactElement;
  current?: boolean;
};

type SecondaryNavItem = {
  component?: React.ReactElement;
  name?: string;
  href?: string;
  initial?: string;
  current?: boolean;
};

type LogoSrc = {
  component?: React.ReactElement;
  imageUrl?: string;
  linkUrl?: string;
};

type MobileNavMainMenu = {
  component?: React.ReactElement;
};

type Props = {
  navigation?: NavItem[];
  navigationFooter?: React.ReactElement;
  secondaryNav?: SecondaryNavItem[];
  secondaryNavFooter?: React.ReactElement;
  mobileNavMenu?: MobileNavMainMenu[];
  secondaryNavTitle?: string;
  userSideBar?: React.ReactElement;
  userHeader?: React.ReactElement;
  logoSrc?: LogoSrc;
  children?: React.ReactNode;
  footer?: React.ReactElement;
};

export function Sidebar({
  navigation = [],
  secondaryNav = [],
  mobileNavMenu = [],
  secondaryNavTitle = 'Your teams',
  userHeader,
  userSideBar,
  logoSrc,
  children,
  footer,
  navigationFooter,
  secondaryNavFooter,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <section>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
              data-cy="Sidebar"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                    data-cy="Close sidebar"
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
                        stroke="#fff"
                        strokeWidth="1.5"
                      ></circle>
                      <path
                        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <LogoContainer logo={logoSrc} />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        <Menu navigation={navigation} />
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">
                        {secondaryNavTitle}
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        <SecondaryMenu navigation={secondaryNav} />
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 border-r border-gray-200 px-6 overflow-y-auto">
            <div className="flex h-16 shrink-0 items-center">
              <LogoContainer logo={logoSrc} />
            </div>
            <nav className="relative flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    <Menu navigation={navigation} />
                  </ul>
                  {navigationFooter && <ul>{navigationFooter}</ul>}
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    {secondaryNavTitle}
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    <SecondaryMenu navigation={secondaryNav} />
                  </ul>
                  {secondaryNavFooter && <ul>{secondaryNavFooter}</ul>}
                </li>
                <li className="mt-auto">{userSideBar}</li>
                {footer && <li>{footer}</li>}
              </ul>
            </nav>
          </div>
        </div>

        {/* mobile header */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            data-cy="Open sidebar"
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
          <div className="flex flex-1 flex-row flex-wrap text-sm font-semibold leading-6 text-gray-900">
            {mobileNavMenu.map((item, key) => (
              <section key={key}>{item.component}</section>
            ))}
          </div>

          {userHeader}
        </div>

        <main className="py-6 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8 overflow-y-auto">{children}</div>
        </main>
      </section>
    </>
  );
}

function Menu({ navigation }: { navigation: NavItem[] }) {
  return (
    <>
      {navigation.map((item, key) => (
        <li key={key} data-cy="Sidebar Main Navigation">
          {item.component || (
            <a
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
              )}
            >
              {item.icon}
              {item.name}
            </a>
          )}
        </li>
      ))}
    </>
  );
}

function SecondaryMenu({ navigation }: { navigation: SecondaryNavItem[] }) {
  return (
    <>
      {navigation.map((item, key) => (
        <li key={key} data-cy="Sidebar Secondary Navigation">
          {item.component || (
            <a
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
              )}
            >
              {item.initial && (
                <span
                  className={classNames(
                    item.current
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
                  )}
                >
                  {item.initial}
                </span>
              )}
              <span className="truncate">{item.name}</span>
            </a>
          )}
        </li>
      ))}
    </>
  );
}

function LogoContainer({ logo }: { logo?: LogoSrc }) {
  if (logo?.component) {
    return logo.component;
  }

  return (
    <a
      href={logo?.linkUrl || '#'}
      className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
      data-cy="Logo Container"
    >
      {logo?.imageUrl && (
        <img alt="Your Company" src={logo.imageUrl} className="h-8 w-auto" />
      )}
    </a>
  );
}
