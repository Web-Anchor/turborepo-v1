'use client';

import { useUser } from '@clerk/nextjs';
import Logo from '@components/Logo';
import { Header } from '@repo/components';
import { Component } from '@tsTypes/index';
import { usePathname } from 'next/navigation';
import ProfileButton from '@components/ProfileButton';
import Link from 'next/link';

type Props = {
  company?: Component;
};

export default function Page(props: Props) {
  let { isSignedIn, user, isLoaded } = useUser();
  const path = usePathname()!;

  let menu = isSignedIn
    ? [
        {
          title: 'Dashboard',
          link: '/dashboard',
        },
      ]
    : [];

  menu = addToArray({
    isTrue: path === '/',
    value: { title: 'Facts', link: '/#facts' },
    arr: menu,
  });
  menu = addToArray({
    isTrue: path === '/',
    value: { title: 'Pricing', link: '/#pricing' },
    arr: menu,
  });
  menu = addToArray({
    isTrue: path === '/',
    value: {
      title: 'Contact',
      link: isSignedIn ? '/dashboard/support' : '/contact',
    },
    arr: menu,
  });

  return (
    <Header
      logo={<Logo />}
      menuList={menu.map((item, key) => {
        return (
          <Link
            key={key}
            href={item.link}
            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            {item?.title}
          </Link>
        );
      })}
      callsToAction={
        isSignedIn
          ? [
              <ProfileButton
                key={1}
                order="revere"
                href="/dashboard"
                name={`${user?.firstName} ${user?.lastName}`}
                imgSrc={user?.imageUrl}
              />,
            ]
          : [
              <Link
                href="/sign-in"
                key={1}
                className="mr-5 sm:mr-0 rounded-md self-center ml-auto bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
              >
                Sign in
              </Link>,
            ]
      }
      footer={
        <p className="mx-4 my-2 text-xs leading-5 text-gray-500 md:order-1 md:mt-0 border-t border-gray-300 pt-4">
          &copy; {new Date()?.getFullYear()}{' '}
          <span className="text-indigo-600">invoicio</span>. All rights
          reserved.
        </p>
      }
    />
  );
}

export type Menu = {
  title: string;
  link: string;
  icon?: JSX.Element;
  initial?: string;
};

export function addToArray({
  isTrue,
  value,
  arr,
}: {
  isTrue: boolean;
  value: Menu;
  arr: Menu[];
}) {
  if (isTrue && value) {
    arr.push(value);
  }

  return arr;
}
