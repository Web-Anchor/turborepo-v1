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

  /**
   * @description Main menu items
   * @date 2024-08-13
   * @author Ed Ancerys
   */
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
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M12 17V17.5V18"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
            <path
              d="M12 6V6.5V7"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
            <path
              d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
          </g>
        </svg>
      ),
    },
    arr: mainMenu,
  });
  mainMenu = addToArray({
    isTrue: active,
    value: {
      title: 'Customers',
      link: '/dashboard/customers',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C9.37665 1.25 7.25 3.37665 7.25 6C7.25 8.62335 9.37665 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75 6C8.75 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75 7.79493 8.75 6Z"
              fill="#222"
            ></path>{' '}
            <path
              d="M18 3.25C17.5858 3.25 17.25 3.58579 17.25 4C17.25 4.41421 17.5858 4.75 18 4.75C19.3765 4.75 20.25 5.65573 20.25 6.5C20.25 7.34427 19.3765 8.25 18 8.25C17.5858 8.25 17.25 8.58579 17.25 9C17.25 9.41421 17.5858 9.75 18 9.75C19.9372 9.75 21.75 8.41715 21.75 6.5C21.75 4.58285 19.9372 3.25 18 3.25Z"
              fill="#222"
            ></path>{' '}
            <path
              d="M6.75 4C6.75 3.58579 6.41421 3.25 6 3.25C4.06278 3.25 2.25 4.58285 2.25 6.5C2.25 8.41715 4.06278 9.75 6 9.75C6.41421 9.75 6.75 9.41421 6.75 9C6.75 8.58579 6.41421 8.25 6 8.25C4.62351 8.25 3.75 7.34427 3.75 6.5C3.75 5.65573 4.62351 4.75 6 4.75C6.41421 4.75 6.75 4.41421 6.75 4Z"
              fill="#222"
            ></path>{' '}
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M12 12.25C10.2157 12.25 8.56645 12.7308 7.34133 13.5475C6.12146 14.3608 5.25 15.5666 5.25 17C5.25 18.4334 6.12146 19.6392 7.34133 20.4525C8.56645 21.2692 10.2157 21.75 12 21.75C13.7843 21.75 15.4335 21.2692 16.6587 20.4525C17.8785 19.6392 18.75 18.4334 18.75 17C18.75 15.5666 17.8785 14.3608 16.6587 13.5475C15.4335 12.7308 13.7843 12.25 12 12.25ZM6.75 17C6.75 16.2242 7.22169 15.4301 8.17338 14.7956C9.11984 14.1646 10.4706 13.75 12 13.75C13.5294 13.75 14.8802 14.1646 15.8266 14.7956C16.7783 15.4301 17.25 16.2242 17.25 17C17.25 17.7758 16.7783 18.5699 15.8266 19.2044C14.8802 19.8354 13.5294 20.25 12 20.25C10.4706 20.25 9.11984 19.8354 8.17338 19.2044C7.22169 18.5699 6.75 17.7758 6.75 17Z"
              fill="#222"
            ></path>{' '}
            <path
              d="M19.2674 13.8393C19.3561 13.4347 19.7561 13.1787 20.1607 13.2674C21.1225 13.4783 21.9893 13.8593 22.6328 14.3859C23.2758 14.912 23.75 15.6352 23.75 16.5C23.75 17.3648 23.2758 18.088 22.6328 18.6141C21.9893 19.1407 21.1225 19.5217 20.1607 19.7326C19.7561 19.8213 19.3561 19.5653 19.2674 19.1607C19.1787 18.7561 19.4347 18.3561 19.8393 18.2674C20.6317 18.0936 21.2649 17.7952 21.6829 17.4532C22.1014 17.1108 22.25 16.7763 22.25 16.5C22.25 16.2237 22.1014 15.8892 21.6829 15.5468C21.2649 15.2048 20.6317 14.9064 19.8393 14.7326C19.4347 14.6439 19.1787 14.2439 19.2674 13.8393Z"
              fill="#222"
            ></path>{' '}
            <path
              d="M3.83935 13.2674C4.24395 13.1787 4.64387 13.4347 4.73259 13.8393C4.82132 14.2439 4.56525 14.6439 4.16065 14.7326C3.36829 14.9064 2.73505 15.2048 2.31712 15.5468C1.89863 15.8892 1.75 16.2237 1.75 16.5C1.75 16.7763 1.89863 17.1108 2.31712 17.4532C2.73505 17.7952 3.36829 18.0936 4.16065 18.2674C4.56525 18.3561 4.82132 18.7561 4.73259 19.1607C4.64387 19.5653 4.24395 19.8213 3.83935 19.7326C2.87746 19.5217 2.0107 19.1407 1.36719 18.6141C0.724248 18.088 0.25 17.3648 0.25 16.5C0.25 15.6352 0.724248 14.912 1.36719 14.3859C2.0107 13.8593 2.87746 13.4783 3.83935 13.2674Z"
              fill="#222"
            ></path>{' '}
          </g>
        </svg>
      ),
    },
    arr: mainMenu,
  });
  mainMenu = addToArray({
    isTrue: active,
    value: {
      title: 'Templates',
      link: '/dashboard/invoices',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M10 14H12M12 14H14M12 14V16M12 14V12"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
            <path
              d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
          </g>
        </svg>
      ),
    },
    arr: mainMenu,
  });
  mainMenu = addToArray({
    isTrue: active,
    value: {
      title: 'Portal Components',
      link: '/dashboard/components',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
            <path
              d="M13.9868 5L12.9934 8.70743M11.8432 13L10.0132 19.8297"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
            <path
              d="M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{' '}
          </g>
        </svg>
      ),
    },
    arr: mainMenu,
  });
  mainMenu = addToArray({
    isTrue: active,
    value: {
      title: 'Stripe API keys',
      link: '/dashboard/api-keys',
      icon: (
        <svg
          fill="#000000"
          height="200px"
          width="200px"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g id="integration">
              {' '}
              <path d="M24,22H5v-2h17V10H5V8h19V22z M19,16H0V2h19v2H2v10h17V16z"></path>{' '}
            </g>{' '}
          </g>
        </svg>
      ),
    },
    arr: mainMenu,
  });
  mainMenu = addToArray({
    isTrue: active,
    value: {
      title: 'Reports',
      link: '/dashboard/reports',
      icon: (
        <svg
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          fill="#494c4e"
          className="h-5 w-5"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g fill="#494c4e" fill-rule="evenodd">
              {' '}
              <rect x="15" rx="1" width="3" height="18"></rect>{' '}
              <rect x="10" y="5" width="3" height="13" rx="1"></rect>{' '}
              <rect x="5" y="9" width="3" height="9" rx="1"></rect>{' '}
              <rect y="13" width="3" height="5" rx="1.001"></rect>{' '}
            </g>{' '}
          </g>
        </svg>
      ),
    },
    arr: mainMenu,
  });
  mainMenu = addToArray({
    isTrue: active,
    value: {
      title: 'Analytics',
      link: '/dashboard/analytics',
      icon: (
        <svg
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          className="h-5 w-5"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <title>Analytics</title>{' '}
            <g
              id="Analytics"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fill-rule="evenodd"
              strokeDasharray="0,0"
              strokeLinecap="round"
            >
              {' '}
              <path
                d="M4,18.9999905 L7.75407946,11.491832 C7.8680565,11.2638231 8.06482016,11.0879651 8.30413884,11.0001847 C9.11356935,10.7032911 9.60000359,10.8000012 9.76344156,11.2903152 L11.1190224,15.3570574 C11.1996482,15.5988744 11.3695623,15.8007859 11.5940587,15.9215227 C12.3533352,16.3298705 12.8485386,16.3029137 13.079669,15.8406525 L18,5.99999082 M13,6.46409237 L17.2774408,5.31795559 C17.4347269,5.27579637 17.5999292,5.27269863 17.7586883,5.30891799 C18.3183612,5.43660193 18.6397719,5.65560146 18.7229204,5.96591657 L19.9282036,10.4640923"
                id="Vector"
                stroke="#030819"
                strokeWidth="2"
              >
                {' '}
              </path>{' '}
            </g>{' '}
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

  /**
   * @description Secondary menu items
   * @date 2024-08-13
   * @author Ed Ancerys
   */
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
        const current = item.link === path;

        return {
          component: (
            <Link
              key={key}
              href={item.link}
              className={classNames(
                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                current
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-500'
              )}
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
              className={classNames(
                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                current
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-500'
              )}
            >
              <span
                className={classNames(
                  'relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                  current
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-gray-600 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
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
