'use client';

import { Divider, Button } from '@repo/components';
import { useRouter } from 'next/navigation';

export default function Page(): JSX.Element {
  const router = useRouter();

  function redirect() {
    router.push('/sidebar');
  }

  return (
    <section className="flex flex-col gap-10">
      <Divider text="Bounce Wrappers" textAlign="center" />
      <section>
        <Button
          title="SideBar Component Link"
          style="link"
          onClick={redirect}
        />
      </section>
    </section>
  );
}
