import './styles.css';

type Props = {
  children: React.ReactNode;
};

export function BounceWrapper(props: Props): React.ReactElement | null {
  return <section className="animate-bounce">{props.children}</section>;
}
