'use client';

import Link from 'next/link';
import { Breadcrumb, Sidebar, SkeletonLine } from '@repo/components';
import Logo from '@components/Logo';
import { ProfileButtonWrapper } from '@app/dashboard/client-side-components';
import { usePathname } from 'next/navigation';
import { classNames } from '@repo/lib';
import { useSubscription } from '@hooks/useSubscriptions';
import { addToArray, Menu } from '@app/header';

type Props = {
  children: React.ReactNode;
};

export function AuthWrapper({ children }: Props) {
  const path = usePathname();
  const crumbs = path?.split('/')?.filter(Boolean);

  const pages = crumbs?.map((part, index) => {
    return {
      name: part,
      href: `/${crumbs.slice(0, index + 1).join('/')}`,
      current: index === crumbs.length - 1,
    };
  });

  const { active, basic, advanced, pro, isLoading } = useSubscription({});

  let mainMenu: Menu[] = [
    {
      title: 'Dashboard',
      link: '/dashboard',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
            <path
              d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
          </g>
        </svg>
      ),
    },
  ];

  mainMenu = addToArray({
    isTrue: active,
    value: {
      title: 'Charges',
      link: '/dashboard/charges',
      icon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
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
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m14.5 10-.035-.139A2.457 2.457 0 0 0 12.082 8h-.522a1.841 1.841 0 0 0-.684 3.55l2.248.9A1.841 1.841 0 0 1 12.44 16h-.521a2.457 2.457 0 0 1-2.384-1.861L9.5 14M12 6v2m0 8v2m9-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            ></path>{' '}
          </g>
        </svg>
      ),
    },
    arr: mainMenu,
  });
  mainMenu = addToArray({
    isTrue: true,
    value: {
      title: 'Profile',
      link: '/dashboard/profile',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
              d="M14.4399 19.05L15.9599 20.57L18.9999 17.53"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{' '}
            <path
              d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{' '}
            <path
              d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{' '}
          </g>
        </svg>
      ),
    },
    arr: mainMenu,
  });

  let secondaryMenu: Menu[] = [
    {
      title: 'Help & Support',
      link: '/dashboard/support',
      initial: 'H',
    },
    {
      title: 'Subscriptions',
      link: '/dashboard/subscriptions',
      initial: 'S',
    },
    {
      title: 'Settings',
      link: '/dashboard/settings',
      initial: 'S',
    },
  ];

  secondaryMenu = addToArray({
    isTrue: active,
    value: {
      title: 'Feature Request',
      link: '/dashboard/new-features',
      initial: 'F',
    } as any,
    arr: secondaryMenu,
  });

  return (
    <Sidebar
      navigation={mainMenu?.map((item, key) => {
        return {
          component: (
            <Link
              href={item.link}
              className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
            >
              {item.icon}
              {item.title}
            </Link>
          ),
        };
      })}
      navigationFooter={
        isLoading ? (
          <section className="flex flex-col gap-2">
            <SkeletonLine height="h-4" width="w-1/2" />
            <SkeletonLine height="h-4" width="w-4/5" />
            <SkeletonLine height="h-4" width="w-1/3" />
            <SkeletonLine height="h-4" width="w-5/6" />
          </section>
        ) : undefined
      }
      secondaryNavFooter={
        isLoading ? (
          <section className="flex flex-col gap-2">
            <SkeletonLine height="h-4" width="w-1/3" />
            <SkeletonLine height="h-4" width="w-5/6" />
          </section>
        ) : undefined
      }
      footer={
        <section className="flex flex-col md:order-1 mb-5">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date()?.getFullYear()}{' '}
            <span className="text-indigo-600">invoicio</span>. All rights
            reserved.
          </p>
          <p className="text-xs leading-5 text-gray-500 md:order-1">
            Modern invoicing with Stripe-powered APIs.
          </p>
        </section>
      }
      secondaryNavTitle="Manage & Support"
      secondaryNav={secondaryMenu?.map((item, key) => {
        const current = item.link === path;
        const isSupport = item.title === 'Help & Support';

        return {
          component: (
            <Link
              href={item.link}
              className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
            >
              <span
                className={classNames(
                  'relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                  current
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                  item.title === 'Help & Support' &&
                    'border-green-500 text-green-500 bg-green-50',
                  isSupport && 'rounded-tr-[4px]'
                )}
              >
                {item.initial}
                {isSupport && (
                  <svg
                    className={classNames(
                      'absolute top-0 -right-0 h-1.5 w-1.5 fill-green-500'
                    )}
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                )}
              </span>
              {item.title}
            </Link>
          ),
        };
      })}
      mobileNavMenu={mainMenu?.map((item, key) => {
        return {
          component: (
            <Link
              href={item.link}
              className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-indigo-600 leading-6"
            >
              {item.title}
            </Link>
          ),
        };
      })}
      userSideBar={
        <section>
          <ProfileButtonWrapper />
        </section>
      }
      userHeader={<ProfileButtonWrapper order="revere" />}
      logoSrc={{ component: <Logo /> }}
    >
      <section className="flex flex-col gap-10 font-semibold">
        <Breadcrumb
          homeComponent={
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-gray-500"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{' '}
                  <path
                    d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{' '}
                </g>
              </svg>
              <span className="sr-only">Home</span>
            </Link>
          }
          components={pages?.map((page) => {
            return (
              <Link
                href={page.href}
                key={page.name}
                aria-current={page.current ? 'page' : undefined}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {page.name}
              </Link>
            );
          })}
        />
        {children}
      </section>
    </Sidebar>
  );
}
