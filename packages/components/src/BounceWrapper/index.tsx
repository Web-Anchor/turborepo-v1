import { classNames } from '../../lib/helpers';
import './styles.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function BounceWrapper(props: Props): React.ReactElement | null {
  return (
    <section className={classNames('animate-bounce', props.className)}>
      {props.children}
    </section>
  );
}
