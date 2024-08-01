'use client';

import { useUser } from '@clerk/nextjs';
import Logo from '@components/Logo';
import { Header } from '@repo/components';
import Link from '@components/Link';
import { useVerticalScroll } from '@repo/lib';

export default function Page() {
  let { isSignedIn, user, isLoaded } = useUser();
  const menu = isSignedIn ? ['Dashboard', 'Facts'] : ['Facts'];

  function scrollUp(props: any) {
    console.log('scrolling up', props);
  }

  function scrollDown(props: any) {
    console.log('scrolling down', props);
  }

  useVerticalScroll({
    onScrollUp: (props) => scrollUp(props),
    onScrollDown: (props) => scrollDown(props),
    // threshold: 10,
  });

  return (
    <Header
      logo={<Logo />}
      menuList={menu.map((item) => {
        let link: string | undefined = item.toLowerCase();
        let hash: string | undefined;

        if (item === 'Dashboard') {
          link = '/';
        }
        if (item === 'Facts') {
          link = '/';
          hash = '#facts';
        }

        return (
          <Link
            key={item}
            href={link}
            hash={hash}
            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            {item}
          </Link>
        );
      })}
      callsToAction={[
        <Link
          href="/sign-in"
          key={1}
          className="mr-5 sm:mr-0 rounded-md self-center ml-auto bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
        >
          Sign in
        </Link>,
      ]}
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
