'use client';

import { default as NextLink, LinkProps } from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getFromLocalStorage, isString } from '@repo/lib';

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  title?: string;
  rel?: string;
  chargeid?: string;
  hash?: string;
} & LinkProps;

export default function Link(props: Props) {
  const searchParams = useSearchParams()!;
  const chargeid = searchParams.get('chargeid') || props.chargeid;
  const storage = getFromLocalStorage(process.env.NEXT_PUBLIC_APP_URL!) as {
    id: string;
  };
  const id = isString(searchParams.get('id'))
    ? searchParams.get('id')
    : storage?.id;

  let query: { id?: string; chargeid?: string } = {};
  if (id) {
    query.id = id;
  }
  if (chargeid) {
    query.chargeid = chargeid;
  }

  return (
    <NextLink
      {...props}
      href={{
        pathname: props.href || '/',
        query,
        hash: props.hash,
      }}
    >
      {props.children}
    </NextLink>
  );
}
