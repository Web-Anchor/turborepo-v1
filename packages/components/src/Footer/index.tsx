import { classNames } from '../../lib/helpers';

type Props = {
  copy?: React.ReactElement;
  links?: React.ReactElement;
  socialMedia?: React.ReactElement;
  className?: string;
};

export function Footer(props: Props) {
  return (
    <footer className={classNames(props.className)}>
      <h2 className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="border-t border-gray-900/10 mt-10 pt-10 gap-5 flex flex-col md:flex-row md:items-center md:justify-between">
          {props.socialMedia && (
            <div className="flex space-x-6 order-2 md:order-3">
              {props.socialMedia}
            </div>
          )}
          {props.links && (
            <div className="flex space-x-6 order-1 md:order-2">
              {props.links}
            </div>
          )}

          {props.copy && (
            <section className="flex flex-col order-3 md:order-1">
              {props.copy}
            </section>
          )}
        </div>
      </div>
    </footer>
  );
}
