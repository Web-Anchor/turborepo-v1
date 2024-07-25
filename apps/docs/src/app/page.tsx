'use client';

import { serverAction } from '../server/actions';
import { Button } from '@repo/components';
import { Footer, Header } from '@components/landing-page';

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${
        small ? 'blur-[32px]' : 'blur-[75px]'
      } ${conic ? 'bg-glow-conic' : ''} ${className}`}
    />
  );
}

export default function Page(): JSX.Element {
  async function onClickHandler() {
    const count = await serverAction({ a: 1, b: 2 });

    console.log('🚀 COUNT:', count);
  }

  return (
    <main className="flex flex-col gap-10 justify-between min-h-screen py-24 px-10 overflow-hidden bg-transparent">
      <Header />

      <section className="bg-slate-100 p-5 rounded-lg">
        <Button
          onClick={onClickHandler}
          title="Primary"
          className="w-24"
          // fetching
        />
      </section>

      <Footer />
    </main>
  );
}
