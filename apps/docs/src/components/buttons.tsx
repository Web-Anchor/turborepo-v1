'use client';

import { serverAction } from '@server/actions';
import { Button } from '@repo/components';

export default function Page(): JSX.Element {
  async function onClickHandler() {
    const count = await serverAction({ a: 1, b: 2 });

    console.log('🚀 COUNT:', count);
  }

  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-2xl font-semibold text-gray-800">Buttons</h1>
      <section className="flex flex-row gap-5">
        <Button
          onClick={onClickHandler}
          title="Primary"
          className="w-24"
          dataAttr="button-primary"
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
