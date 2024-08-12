import {
  Accordion,
  BottomBackground,
  ConnectSectionWithStickyImg,
  ListSection,
  Footer,
  HeaderSection,
  TopBackground,
  Wrapper,
} from '@repo/components';
import Header from '@app/header';
import Link from 'next/link';
import Image from 'next/image';
import { GetStarted, Testimonials } from '@app/client-side-components';
import Pricing from '@components/Pricing';

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/invoicio/',
    icon: (
      <svg
        fill="#fff"
        viewBox="-5.5 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>linkedin</title>{' '}
          <path d="M0 8.219v15.563c0 1.469 1.156 2.625 2.625 2.625h15.563c0.719 0 1.406-0.344 1.844-0.781 0.469-0.469 0.781-1.063 0.781-1.844v-15.563c0-1.469-1.156-2.625-2.625-2.625h-15.563c-0.781 0-1.375 0.313-1.844 0.781-0.438 0.438-0.781 1.125-0.781 1.844zM2.813 10.281c0-1 0.813-1.875 1.813-1.875 1.031 0 1.875 0.875 1.875 1.875 0 1.031-0.844 1.844-1.875 1.844-1 0-1.813-0.813-1.813-1.844zM7.844 23.125v-9.531c0-0.219 0.219-0.406 0.375-0.406h2.656c0.375 0 0.375 0.438 0.375 0.719 0.75-0.75 1.719-0.938 2.719-0.938 2.438 0 4 1.156 4 3.719v6.438c0 0.219-0.188 0.406-0.375 0.406h-2.75c-0.219 0-0.375-0.219-0.375-0.406v-5.813c0-0.969-0.281-1.5-1.375-1.5-1.375 0-1.719 0.906-1.719 2.125v5.188c0 0.219-0.219 0.406-0.438 0.406h-2.719c-0.156 0-0.375-0.219-0.375-0.406zM2.875 23.125v-9.531c0-0.219 0.219-0.406 0.375-0.406h2.719c0.25 0 0.406 0.156 0.406 0.406v9.531c0 0.219-0.188 0.406-0.406 0.406h-2.719c-0.188 0-0.375-0.219-0.375-0.406z"></path>{' '}
        </g>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
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
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            fill-rule="evenodd"
            clipRule="evenodd"
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            fill="#0F0F0F"
          ></path>{' '}
          <path
            d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
            fill="#0F0F0F"
          ></path>{' '}
          <path
            fill-rule="evenodd"
            clipRule="evenodd"
            d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
            fill="#0F0F0F"
          ></path>{' '}
        </g>
      </svg>
    ),
  },
];

const features = [
  {
    name: 'Effortless Invoicing',
    description:
      'Seamlessly connect your Stripe account via API and send invoices directly to your customers with ease.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
            d="M18.125 9.03333C17.5583 6.15833 15.0333 4 12 4C9.59167 4 7.5 5.36667 6.45833 7.36667C3.95 7.63333 2 9.75833 2 12.3333C2 15.0917 4.24167 17.3333 7 17.3333H17.8333C20.1333 17.3333 22 15.4667 22 13.1667C22 10.9667 20.2917 9.18333 18.125 9.03333ZM17.8333 15.6667H7C5.15833 15.6667 3.66667 14.175 3.66667 12.3333C3.66667 10.625 4.94167 9.2 6.63333 9.025L7.525 8.93333L7.94167 8.14167C8.73333 6.61667 10.2833 5.66667 12 5.66667C14.1833 5.66667 16.0667 7.21667 16.4917 9.35833L16.7417 10.6083L18.0167 10.7C19.3167 10.7833 20.3333 11.875 20.3333 13.1667C20.3333 14.5417 19.2083 15.6667 17.8333 15.6667ZM10.7917 11.5H8.66667L12 8.16667L15.3333 11.5H13.2083V14H10.7917V11.5Z"
            fill="#fff"
          ></path>{' '}
        </g>
      </svg>
    ),
  },
  {
    name: 'Convenient Self-Printing',
    description:
      'Enable easy access to invoices through a dedicated customer portal. Empower users to access and download their invoices at their convenience.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
            d="M12 1.25C9.37665 1.25 7.25 3.37665 7.25 6C7.25 8.62335 9.37665 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75 6C8.75 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75 7.79493 8.75 6Z"
            fill="#fff"
          ></path>{' '}
          <path
            d="M18 3.25C17.5858 3.25 17.25 3.58579 17.25 4C17.25 4.41421 17.5858 4.75 18 4.75C19.3765 4.75 20.25 5.65573 20.25 6.5C20.25 7.34427 19.3765 8.25 18 8.25C17.5858 8.25 17.25 8.58579 17.25 9C17.25 9.41421 17.5858 9.75 18 9.75C19.9372 9.75 21.75 8.41715 21.75 6.5C21.75 4.58285 19.9372 3.25 18 3.25Z"
            fill="#fff"
          ></path>{' '}
          <path
            d="M6.75 4C6.75 3.58579 6.41421 3.25 6 3.25C4.06278 3.25 2.25 4.58285 2.25 6.5C2.25 8.41715 4.06278 9.75 6 9.75C6.41421 9.75 6.75 9.41421 6.75 9C6.75 8.58579 6.41421 8.25 6 8.25C4.62351 8.25 3.75 7.34427 3.75 6.5C3.75 5.65573 4.62351 4.75 6 4.75C6.41421 4.75 6.75 4.41421 6.75 4Z"
            fill="#fff"
          ></path>{' '}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 12.25C10.2157 12.25 8.56645 12.7308 7.34133 13.5475C6.12146 14.3608 5.25 15.5666 5.25 17C5.25 18.4334 6.12146 19.6392 7.34133 20.4525C8.56645 21.2692 10.2157 21.75 12 21.75C13.7843 21.75 15.4335 21.2692 16.6587 20.4525C17.8785 19.6392 18.75 18.4334 18.75 17C18.75 15.5666 17.8785 14.3608 16.6587 13.5475C15.4335 12.7308 13.7843 12.25 12 12.25ZM6.75 17C6.75 16.2242 7.22169 15.4301 8.17338 14.7956C9.11984 14.1646 10.4706 13.75 12 13.75C13.5294 13.75 14.8802 14.1646 15.8266 14.7956C16.7783 15.4301 17.25 16.2242 17.25 17C17.25 17.7758 16.7783 18.5699 15.8266 19.2044C14.8802 19.8354 13.5294 20.25 12 20.25C10.4706 20.25 9.11984 19.8354 8.17338 19.2044C7.22169 18.5699 6.75 17.7758 6.75 17Z"
            fill="#fff"
          ></path>{' '}
          <path
            d="M19.2674 13.8393C19.3561 13.4347 19.7561 13.1787 20.1607 13.2674C21.1225 13.4783 21.9893 13.8593 22.6328 14.3859C23.2758 14.912 23.75 15.6352 23.75 16.5C23.75 17.3648 23.2758 18.088 22.6328 18.6141C21.9893 19.1407 21.1225 19.5217 20.1607 19.7326C19.7561 19.8213 19.3561 19.5653 19.2674 19.1607C19.1787 18.7561 19.4347 18.3561 19.8393 18.2674C20.6317 18.0936 21.2649 17.7952 21.6829 17.4532C22.1014 17.1108 22.25 16.7763 22.25 16.5C22.25 16.2237 22.1014 15.8892 21.6829 15.5468C21.2649 15.2048 20.6317 14.9064 19.8393 14.7326C19.4347 14.6439 19.1787 14.2439 19.2674 13.8393Z"
            fill="#fff"
          ></path>{' '}
          <path
            d="M3.83935 13.2674C4.24395 13.1787 4.64387 13.4347 4.73259 13.8393C4.82132 14.2439 4.56525 14.6439 4.16065 14.7326C3.36829 14.9064 2.73505 15.2048 2.31712 15.5468C1.89863 15.8892 1.75 16.2237 1.75 16.5C1.75 16.7763 1.89863 17.1108 2.31712 17.4532C2.73505 17.7952 3.36829 18.0936 4.16065 18.2674C4.56525 18.3561 4.82132 18.7561 4.73259 19.1607C4.64387 19.5653 4.24395 19.8213 3.83935 19.7326C2.87746 19.5217 2.0107 19.1407 1.36719 18.6141C0.724248 18.088 0.25 17.3648 0.25 16.5C0.25 15.6352 0.724248 14.912 1.36719 14.3859C2.0107 13.8593 2.87746 13.4783 3.83935 13.2674Z"
            fill="#fff"
          ></path>{' '}
        </g>
      </svg>
    ),
  },
  {
    name: 'Seamless Stripe API Integration',
    description:
      'Enjoy the security of Stripe`s robust API`s integrated into our app, ensuring safe and reliable interactions.',
    icon: (
      <svg
        fill="#fff"
        viewBox="0 0 256 256"
        id="Flat"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M232.00586,128.00842a298.25279,298.25279,0,0,1-5.59277,57.54688,7.99962,7.99962,0,0,1-15.69727-3.09375,282.27848,282.27848,0,0,0,5.29-54.45313,88,88,0,0,0-176,0,103.74958,103.74958,0,0,1-5.91992,34.666A8.00025,8.00025,0,0,1,19,157.34241a87.786,87.786,0,0,0,5.00586-29.334,104,104,0,0,1,208,0ZM93.00977,84.2887A8.00025,8.00025,0,0,0,83.00195,71.80432,71.69909,71.69909,0,0,0,56.00586,128.0094,118.80142,118.80142,0,0,1,43.52637,181.361,7.99964,7.99964,0,1,0,57.85254,188.484,134.64637,134.64637,0,0,0,72.00586,128.0094,55.77314,55.77314,0,0,1,93.00977,84.2887Zm34.99609,35.7207a8.00039,8.00039,0,0,0-8,8A184.12954,184.12954,0,0,1,97.03418,217.11a7.99993,7.99993,0,1,0,13.99219,7.75977,200.16824,200.16824,0,0,0,24.97949-96.86035A8.00039,8.00039,0,0,0,128.00586,120.0094Zm0-32a40.04583,40.04583,0,0,0-40,40,8,8,0,0,0,16,0,24,24,0,0,1,48,0,214.09658,214.09658,0,0,1-20.51074,91.99512,8,8,0,1,0,14.47265,6.82226,229.98738,229.98738,0,0,0,22.03809-98.81738A40.04583,40.04583,0,0,0,128.00586,88.0094ZM94.39648,152.16858a8.00778,8.00778,0,0,0-9.43066,6.249,150.78976,150.78976,0,0,1-17.2041,45.4375,8.00031,8.00031,0,1,0,13.85937,7.9961,166.73312,166.73312,0,0,0,19.02442-50.252A7.99971,7.99971,0,0,0,94.39648,152.16858ZM128.00586,56.0094a72.92874,72.92874,0,0,0-8.99121.55664A8.00012,8.00012,0,1,0,120.99707,72.443a56.70946,56.70946,0,0,1,7.00879-.43359,56.0629,56.0629,0,0,1,56,56,251.41194,251.41194,0,0,1-1.919,31.00879,8,8,0,1,0,15.877,1.98047,267.59018,267.59018,0,0,0,2.042-32.98926A72.08124,72.08124,0,0,0,128.00586,56.0094Zm57.92969,128.252a7.99377,7.99377,0,0,0-9.74121,5.75293c-1.46485,5.68848-3.15332,11.39063-5.01856,16.94824a7.9999,7.9999,0,1,0,15.168,5.0918c1.9873-5.91992,3.78613-11.99316,5.34473-18.05176A7.999,7.999,0,0,0,185.93555,184.26135Z"></path>{' '}
        </g>
      </svg>
    ),
  },
  {
    name: 'User-Friendly Interface',
    description:
      'Navigate our intuitive platform with ease, making invoicing a smooth and efficient experience for both you and your customers.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M7.43361 9.90622C5.34288 10.3793 4.29751 10.6158 4.04881 11.4156C3.8001 12.2153 4.51276 13.0487 5.93808 14.7154L6.30683 15.1466C6.71186 15.6203 6.91438 15.8571 7.00548 16.1501C7.09659 16.443 7.06597 16.759 7.00474 17.3909L6.94899 17.9662C6.7335 20.19 6.62575 21.3019 7.27688 21.7962C7.928 22.2905 8.90677 21.8398 10.8643 20.9385L11.3708 20.7053C11.927 20.4492 12.2052 20.3211 12.5 20.3211C12.7948 20.3211 13.073 20.4492 13.6292 20.7053L14.1357 20.9385C16.0932 21.8398 17.072 22.2905 17.7231 21.7962C18.3742 21.3019 18.2665 20.19 18.051 17.9662M19.0619 14.7154C20.4872 13.0487 21.1999 12.2153 20.9512 11.4156C20.7025 10.6158 19.6571 10.3793 17.5664 9.90622L17.0255 9.78384C16.4314 9.64942 16.1343 9.5822 15.8958 9.40114C15.6573 9.22007 15.5043 8.94564 15.1984 8.3968L14.9198 7.89712C13.8432 5.96571 13.3048 5 12.5 5C11.6952 5 11.1568 5.96571 10.0802 7.89712"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>{' '}
          <path
            d="M4.98987 2C4.98987 2 5.2778 3.45771 5.90909 4.08475C6.54037 4.71179 8 4.98987 8 4.98987C8 4.98987 6.54229 5.2778 5.91525 5.90909C5.28821 6.54037 5.01013 8 5.01013 8C5.01013 8 4.7222 6.54229 4.09091 5.91525C3.45963 5.28821 2 5.01013 2 5.01013C2 5.01013 3.45771 4.7222 4.08475 4.09091C4.71179 3.45963 4.98987 2 4.98987 2Z"
            stroke="#fff"
            stroke-linejoin="round"
          ></path>{' '}
          <path
            d="M18 5H20M19 6L19 4"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>{' '}
        </g>
      </svg>
    ),
  },
  {
    name: 'Customizable Templates',
    description:
      'Personalize your invoices with customizable templates to reflect your brand identity and create a professional image for your business.',
    icon: (
      <svg
        fill="#fff"
        height="200px"
        width="200px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 230.795 230.795"
        className="h-6 w-6"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path d="M60.357,63.289c-2.929-2.929-7.678-2.93-10.606-0.001L2.197,110.836C0.79,112.243,0,114.151,0,116.14 c0,1.989,0.79,3.896,2.196,5.303l47.348,47.35c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196 c2.93-2.929,2.93-7.678,0.001-10.606L18.107,116.14l42.25-42.245C63.286,70.966,63.286,66.217,60.357,63.289z"></path>{' '}
            <path d="M228.598,110.639l-47.355-47.352c-2.928-2.928-7.677-2.929-10.606,0.001c-2.929,2.929-2.929,7.678,0.001,10.607 l42.051,42.048l-42.249,42.243c-2.93,2.929-2.93,7.678-0.001,10.606c1.465,1.465,3.384,2.197,5.304,2.197 c1.919,0,3.839-0.732,5.303-2.196l47.554-47.547c1.407-1.406,2.197-3.314,2.197-5.304 C230.795,113.954,230.005,112.046,228.598,110.639z"></path>{' '}
            <path d="M155.889,61.302c-3.314-2.484-8.017-1.806-10.498,1.51l-71.994,96.184c-2.482,3.316-1.807,8.017,1.51,10.498 c1.348,1.01,2.925,1.496,4.488,1.496c2.282,0,4.537-1.038,6.01-3.006L157.398,71.8C159.881,68.484,159.205,63.784,155.889,61.302z"></path>{' '}
          </g>{' '}
        </g>
      </svg>
    ),
  },
  {
    name: 'Comprehensive Reporting & Analytics',
    description:
      'Gain insights into your invoicing activities with detailed reporting features, allowing you to track payments, pending invoices, and overall financial performance easily.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M21 7L13 15L9 11L3 17M21 7H15M21 7V13"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{' '}
        </g>
      </svg>
    ),
  },
];

function stripeBrand() {
  return <span className="font-bold text-indigo-600">Stripe</span>;
}

export default async function Home(params: { searchParams: { id: string } }) {
  return (
    <Wrapper className="pt-16 lg:pt-24">
      <TopBackground />
      <Header />

      <HeaderSection
        title={
          <p key={0}>
            Streamline Your Invoicing Process with {stripeBrand()} Integration
          </p>
        }
        description={[
          <p className="mt-6 text-lg leading-8 text-gray-600" key={1}>
            Streamline your invoicing process with our dedicated, user-friendly
            platform, powered by {stripeBrand()}. Effortlessly connect your{' '}
            {stripeBrand()} account via API to integrate with all your customers
            and payments. Empower your customers to access invoices at their
            convenience, making the billing process hassle-free and efficient.
          </p>,
          <p className="mt-6 text-lg leading-8 text-gray-600" key={2}>
            Our platform, built on the robust and secure {stripeBrand()}{' '}
            infrastructure, empowers you to take full control of your invoicing
            services. Featuring a dedicated customer portal, secure integration
            with the {stripeBrand()} API, customizable templates, and detailed
            reporting & analytics, you can ensure a seamless invoicing
            experience.
          </p>,
        ]}
        subtitle="Invoicing Made Easy"
      />
      <ListSection
        list={features.map((feature, key) => {
          return (
            <section key={key} className="flex flex-row gap-3">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3 h-fit">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </section>
          );
        })}
        className="mt-0 lg:mt-0"
      />
      <Pricing />
      <HeaderSection
        description={[
          'Experience the convenience and efficiency of modern invoicing with our Stripe-powered platform. Join us today and discover how our platform simplifies your billing process. From viewing transactions, invoicing and more to making necessary adjustments, our invoicing solution ensures that your financial management is both efficient and effective. Empower yourself with modern invoicing - start simplifying your billing process now!',
        ]}
        theme="dark"
      />
      <ConnectSectionWithStickyImg
        header={{
          subtitle: 'Empowering Your Financial Success',
          title: 'Effortless Financial Management Features',
          description: [
            'Experience an efficient and convenient platform designed to simplify your invoicing process. Handle invoices, download documents, and track transactions effortlessly. Our intuitive interface ensures you stay in control with ease.',
          ],
        }}
        image={
          <section className="relative bg-indigo-400 -ml-8 lg:ml-10 py-12 lg:rounded-tl-3xl overflow-hidden">
            <div className="relative ml-12 h-96 w-full z-20">
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_CDN}/FfNPG8nwlceFcbMGt6p3LQBCOwKpvx1jA5UlWR5mT8g.png`}
                alt="Product screenshot"
                layout="fill"
                className="rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
              />
            </div>
            <div
              className="absolute -inset-y-px -left-3 z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
              aria-hidden="true"
            />
          </section>
        }
        perks={[
          {
            title: 'Document Management.',
            description:
              'Access and download important documents anytime, anywhere. Organize and store your financial records securely in your dedicated space. Stay in control of your documents with our easy-to-use platform.',
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
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 9.5V15.5M12 9.5L10 11.5M12 9.5L14 11.5M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{' '}
                </g>
              </svg>
            ),
          },
          {
            title: 'User-Friendly Interface.',
            description:
              'Monitor your transactions effortlessly with our intuitive interface. Keep track of payments and expenses seamlessly. Stay informed about your financial activities with our real-time updates feature.',
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
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M12 1.25C9.37665 1.25 7.25 3.37665 7.25 6C7.25 8.62335 9.37665 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75 6C8.75 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75 7.79493 8.75 6Z"
                    fill="#4f46e5"
                  ></path>{' '}
                  <path
                    d="M18 3.25C17.5858 3.25 17.25 3.58579 17.25 4C17.25 4.41421 17.5858 4.75 18 4.75C19.3765 4.75 20.25 5.65573 20.25 6.5C20.25 7.34427 19.3765 8.25 18 8.25C17.5858 8.25 17.25 8.58579 17.25 9C17.25 9.41421 17.5858 9.75 18 9.75C19.9372 9.75 21.75 8.41715 21.75 6.5C21.75 4.58285 19.9372 3.25 18 3.25Z"
                    fill="#4f46e5"
                  ></path>{' '}
                  <path
                    d="M6.75 4C6.75 3.58579 6.41421 3.25 6 3.25C4.06278 3.25 2.25 4.58285 2.25 6.5C2.25 8.41715 4.06278 9.75 6 9.75C6.41421 9.75 6.75 9.41421 6.75 9C6.75 8.58579 6.41421 8.25 6 8.25C4.62351 8.25 3.75 7.34427 3.75 6.5C3.75 5.65573 4.62351 4.75 6 4.75C6.41421 4.75 6.75 4.41421 6.75 4Z"
                    fill="#4f46e5"
                  ></path>{' '}
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M12 12.25C10.2157 12.25 8.56645 12.7308 7.34133 13.5475C6.12146 14.3608 5.25 15.5666 5.25 17C5.25 18.4334 6.12146 19.6392 7.34133 20.4525C8.56645 21.2692 10.2157 21.75 12 21.75C13.7843 21.75 15.4335 21.2692 16.6587 20.4525C17.8785 19.6392 18.75 18.4334 18.75 17C18.75 15.5666 17.8785 14.3608 16.6587 13.5475C15.4335 12.7308 13.7843 12.25 12 12.25ZM6.75 17C6.75 16.2242 7.22169 15.4301 8.17338 14.7956C9.11984 14.1646 10.4706 13.75 12 13.75C13.5294 13.75 14.8802 14.1646 15.8266 14.7956C16.7783 15.4301 17.25 16.2242 17.25 17C17.25 17.7758 16.7783 18.5699 15.8266 19.2044C14.8802 19.8354 13.5294 20.25 12 20.25C10.4706 20.25 9.11984 19.8354 8.17338 19.2044C7.22169 18.5699 6.75 17.7758 6.75 17Z"
                    fill="#4f46e5"
                  ></path>{' '}
                  <path
                    d="M19.2674 13.8393C19.3561 13.4347 19.7561 13.1787 20.1607 13.2674C21.1225 13.4783 21.9893 13.8593 22.6328 14.3859C23.2758 14.912 23.75 15.6352 23.75 16.5C23.75 17.3648 23.2758 18.088 22.6328 18.6141C21.9893 19.1407 21.1225 19.5217 20.1607 19.7326C19.7561 19.8213 19.3561 19.5653 19.2674 19.1607C19.1787 18.7561 19.4347 18.3561 19.8393 18.2674C20.6317 18.0936 21.2649 17.7952 21.6829 17.4532C22.1014 17.1108 22.25 16.7763 22.25 16.5C22.25 16.2237 22.1014 15.8892 21.6829 15.5468C21.2649 15.2048 20.6317 14.9064 19.8393 14.7326C19.4347 14.6439 19.1787 14.2439 19.2674 13.8393Z"
                    fill="#4f46e5"
                  ></path>{' '}
                  <path
                    d="M3.83935 13.2674C4.24395 13.1787 4.64387 13.4347 4.73259 13.8393C4.82132 14.2439 4.56525 14.6439 4.16065 14.7326C3.36829 14.9064 2.73505 15.2048 2.31712 15.5468C1.89863 15.8892 1.75 16.2237 1.75 16.5C1.75 16.7763 1.89863 17.1108 2.31712 17.4532C2.73505 17.7952 3.36829 18.0936 4.16065 18.2674C4.56525 18.3561 4.82132 18.7561 4.73259 19.1607C4.64387 19.5653 4.24395 19.8213 3.83935 19.7326C2.87746 19.5217 2.0107 19.1407 1.36719 18.6141C0.724248 18.088 0.25 17.3648 0.25 16.5C0.25 15.6352 0.724248 14.912 1.36719 14.3859C2.0107 13.8593 2.87746 13.4783 3.83935 13.2674Z"
                    fill="#4f46e5"
                  ></path>{' '}
                </g>
              </svg>
            ),
          },
          {
            title: 'Access Your Finances Anytime, Anywhere.',
            description:
              'Stay in control of your financial activities with 24/7 access to your invoicing portal. Whether you`re in the office or on the go, you can manage transactions, view documents, and handle invoices at your convenience.',
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
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M6 3V14.8C6 15.9201 6 16.4802 6.21799 16.908C6.40973 17.2843 6.71569 17.5903 7.09202 17.782C7.51984 18 8.0799 18 9.2 18H15M21 18H18M18 21V9.2C18 8.0799 18 7.51984 17.782 7.09202C17.5903 6.71569 17.2843 6.40973 16.908 6.21799C16.4802 6 15.9201 6 14.8 6H9M3 6H6"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{' '}
                </g>
              </svg>
            ),
          },
          {
            title: 'Secure and Reliable.',
            description:
              'Monitor your invoicing and payments in real-time, confident in the knowledge that your data is protected!',
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
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M13.1427 20.9999C10.8077 19.5438 9.25254 16.9522 9.25254 13.9968C9.25254 12.4783 10.4833 11.2476 12.0008 11.2476C13.5184 11.2476 14.7491 12.4783 14.7491 13.9968C14.7491 15.5153 15.9798 16.746 17.4974 16.746C19.0149 16.746 20.2457 15.5153 20.2457 13.9968C20.2457 9.44139 16.5544 5.74922 12.0017 5.74922C7.44907 5.74922 3.75781 9.44139 3.75781 13.9968C3.75781 15.0122 3.87145 16.001 4.08038 16.954M8.49027 20.2989C7.23938 18.5138 6.50351 16.3419 6.50351 13.9968C6.50351 10.9599 8.96405 8.49844 11.9992 8.49844C15.0343 8.49844 17.4948 10.9599 17.4948 13.9968M17.7927 19.4806C17.6937 19.4861 17.5966 19.4953 17.4967 19.4953C14.4616 19.4953 12.0011 17.0338 12.0011 13.9969M19.6734 6.47682C17.7993 4.34802 15.0593 3 12.0004 3C8.94141 3 6.20138 4.34802 4.32734 6.47682"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{' '}
                </g>
              </svg>
            ),
          },
        ]}
      />
      <HeaderSection
        description={[
          'Our platform is designed to provide you with a seamless and efficient invoicing experience. With our Customer Portal, you can easily manage your financial activities, view transactions, and download invoices with just a few clicks. Our user-friendly interface ensures that you can stay in control of your finances without any hassle. Join now to start enjoying the benefits of a streamlined invoicing process and experience the convenience of managing your financial activities in one central location.',
        ]}
        theme="dark"
      />
      <ConnectSectionWithStickyImg
        header={{
          subtitle: 'Join the Community of Happy Users!',
          title: 'Ready to Simplify Your Invoicing?',
          description: [
            'Welcome to Your Personalized Invoicing Platform, designed to make managing your financial activities effortless and intuitive. With our portal, you can easily view transactions from your vendor, download and adjust invoices, and keep all your financial records organized. Sign up now to start experiencing the benefits of a streamlined invoicing process. Enjoy seamless and efficient financial management that saves you time and effort, allowing you to focus on what truly matters. Take the next step towards smarter financial control today!',
          ],
        }}
        image={
          <section className="-ml-8 lg:ml-10 lg:-mt-36 lg:ml-none overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
              alt="Product screenshot"
              width={800}
              height={600}
              className="w-full max-w-none bg-gray-900 shadow-xl ring-1 ring-gray-400/10 lg:w-[36rem] object-cover object-center lg:h-[740px]"
            />
          </section>
        }
        actions={<GetStarted />}
        className="lg:pt-36"
      />
      <Testimonials />
      <HeaderSection
        title="Frequently asked questions"
        subtitle="FAQ"
        id="facts"
      />
      <Wrapper className="relative mx-8">
        <BottomBackground />
        <Accordion
          items={[
            {
              title: 'Is the customer portal free to use?',
              body: 'Yes, the customer portal is free to use. You can access your account and manage your financial activities without any additional charges. Simply follow the link provided by your vendor to access your invoices or add it via the portals dashboard page.',
            },
            {
              title: 'How do I access my invoices?',
              body: 'To access your invoices, you can log in to your account via the customer portal. Once you are logged in, you can view your transactions, download invoices, and make any necessary adjustments. If you have any questions or need assistance, please contact your vendor for more information.',
            },
            {
              title: 'Where do I get my API key?',
              body: 'Your API key is provided by your vendor. If you do not have one, please contact your vendor to request an API key. Once you have your API key, you can use it to access your account and manage your financial activities via the customer portal.',
            },
            {
              title: 'Can I edit my invoice billing details?',
              body: 'Yes, you can edit your invoice billing details directly within the portal. This includes updating your address, contact information, and any other relevant billing details.',
            },
            {
              title: 'How secure is my financial information on the portal?',
              body: 'We take the security of your financial information very seriously. Our platform uses the authentication and security protocols to ensure that your data is safe and secure.',
            },
            {
              title: 'What if I have multiple vendors using the platform?',
              body: 'You can easily manage invoices from multiple vendors within the same portal. Each vendor will provide you with a unique API key or link to access their specific invoices.',
            },
            {
              title: 'How do I download my invoices?',
              body: 'You can download your invoices directly from the portal. Simply navigate to the invoice section and select the invoices you wish to download. You can then choose to download them as a PDF file for your records. If you have any questions or need assistance, please contact your vendor for more information.',
            },
            {
              title: 'Can I track my transactions on the portal?',
              body: 'Yes, the portal allows you to track all your transactions in real-time. You can view the status of your invoices and payments at any time. This makes it easy to stay up-to-date on your financial activities and manage your records effectively.',
            },
            {
              title: 'How do I get support if I encounter an issue?',
              body: 'Our support team is available to assist you with any issues you may encounter. You can reach out to us via the contact information provided within the portal. We are here to help you with any questions or concerns you may have.',
            },
            {
              title: 'Can I customize my invoices?',
              body: "While you can edit billing details, customization options for the invoice layout itself may be limited based on the vendor's settings. Please check with your vendor for specific customization options.",
            },
            {
              title: 'Do I need to download any software to use the portal?',
              body: 'No, there is no need to download any software. The portal is web-based and can be accessed from any device with an internet connection. Simply follow the link provided by your vendor to get started.',
            },
            // More questions...
          ]}
        />
      </Wrapper>

      <Footer
        className="mt-auto"
        copy={
          <section className="flex flex-col md:order-1">
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
        socialMedia={
          <div className="flex space-x-6 md:order-2">
            {socials.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                {item.icon}
              </Link>
            ))}
          </div>
        }
      />
    </Wrapper>
  );
}
