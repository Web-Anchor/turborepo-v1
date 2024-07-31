'use client';

import { serverAction } from '@server/actions';
import { Button, Divider } from '@repo/components';

export default function Page(): JSX.Element {
  async function onClickHandler() {
    const count = await serverAction({ a: 1, b: 2 });

    console.log('🚀 COUNT:', count);
  }

  return (
    <section className="flex flex-col gap-10">
      <Divider text="Buttons" textAlign="center" />
      <section className="flex flex-row flex-wrap gap-5">
        <Button
          onClick={onClickHandler}
          title="Primary"
          className="w-24"
          dataAttribute="button-primary"
        />
        <Button
          onClick={onClickHandler}
          title="Secondary"
          style="secondary"
          className="w-24"
        />
        <Button
          onClick={onClickHandler}
          title="Link"
          style="link"
          className="w-24"
        />
        <Button
          onClick={onClickHandler}
          title="Ghost"
          style="ghost"
          className="w-24"
        />
        <Button
          onClick={onClickHandler}
          title="Badge"
          style="badge"
          className="w-24"
        />
        <Button onClick={onClickHandler} title="Primary Fetching" fetching />
        <Button
          onClick={onClickHandler}
          title="Link"
          style="link"
          className="w-24"
          fetching
        />
      </section>
    </section>
  );
}
