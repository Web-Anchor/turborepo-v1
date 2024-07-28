'use client';

import { serverAction } from '@server/actions';
import { Badge, Divider } from '@repo/components';

export default function Page(): JSX.Element {
  async function onClickHandler() {
    const count = await serverAction({ a: 1, b: 2 });

    console.log('🚀 COUNT:', count);
  }

  return (
    <section className="flex flex-col gap-10">
      <Divider text="Badges" textAlign="center" />
      <section className="flex flex-row flex-wrap gap-5">
        <Badge
          type="default"
          title="Default"
          description="Default badge description!"
          tooltip="Default tooltip bottom"
          tooltipPosition="tooltip-bottom"
          onClick={onClickHandler}
        />
        <Badge
          type="success"
          title="Success"
          description="Success badge description!"
          tooltip="Success tooltip left"
          tooltipPosition="tooltip-left"
          onClick={onClickHandler}
        />
        <Badge
          type="warning"
          title="Warning"
          description="Warning badge description!"
          tooltip="Warning tooltip right"
          tooltipPosition="tooltip-right"
          onClick={onClickHandler}
        />
        <Badge
          type="error"
          title="Error"
          description="Error badge description!"
          tooltip="Error tooltip top"
          tooltipPosition="tooltip-top"
          onClick={onClickHandler}
        />
        <Badge
          type="info"
          title="Info"
          description="Info badge description!"
          tooltip="Info tooltip"
          tooltipPosition="tooltip-bottom"
          onClick={onClickHandler}
        />
        <Badge
          type="indigo"
          title="Indigo"
          description="Indigo badge description!"
          tooltip="Indigo tooltip"
          tooltipPosition="tooltip-bottom"
          onClick={onClickHandler}
        />
        <Badge
          type="purple"
          title="Purple"
          description="Purple badge description!"
          tooltip="Purple tooltip"
          tooltipPosition="tooltip-bottom"
          onClick={onClickHandler}
        />
        <Badge
          type="pink"
          title="Pink"
          description="Pink badge description!"
          tooltip="Pink tooltip"
          tooltipPosition="tooltip-bottom"
          onClick={onClickHandler}
        />
      </section>
    </section>
  );
}
