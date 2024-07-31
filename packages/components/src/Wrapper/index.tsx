import { classNames } from '../../lib/helpers';

type Props = {
  className?: string;
  children: React.ReactNode;
  id?: string;
  dataAttribute?: string;
};

export function Wrapper(props: Props) {
  return (
    <section
      className={classNames('flex flex-col gap-5', props.className)}
      id={props.id}
      data-cy={props.dataAttribute}
    >
      {props.children}
    </section>
  );
}
