interface Props {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export function Button(props: Props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed ${props.className}`}
    >
      {props.text}
    </button>
  );
}
