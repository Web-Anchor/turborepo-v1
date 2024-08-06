type Props = {
  large: string | number | React.ReactNode;
  small?: string | number | React.ReactNode;
  className?: string;
};

export function MediaScreenTitle({ large, small, className }: Props) {
  return (
    <section className={className}>
      <section
        className="truncate flex sm:hidden"
        data-cy="media-screen-title-small"
      >
        {small ?? large}
      </section>
      <section
        className="truncate hidden sm:flex"
        data-cy="media-screen-title-large"
      >
        {large}
      </section>
    </section>
  );
}
