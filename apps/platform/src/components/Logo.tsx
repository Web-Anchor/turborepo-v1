import Link from 'next/link';
import { classNames } from '@repo/lib';
import { Play } from 'next/font/google';

const font = Play({
  subsets: ['latin'],
  weight: '400',
});

export default function Logo() {
  return (
    <Link
      href="/"
      className={(font.className, classNames('inline-flex items-center'))}
    >
      <h1 className="text-2xl font-bold text-gray-800">
        invoic<span className="text-indigo-600">io</span>
      </h1>
    </Link>
  );
}
