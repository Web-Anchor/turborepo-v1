import { classNames } from '../../lib/helpers';

type Author = {
  handle: string;
  name: string;
  imageUrl: string;
};

type Props = {
  body: string;
  author: Author;
  timestamp?: string;
  imageComponent?: React.ReactNode;
  className?: string;
};

export function TestimonialCard(props: Props) {
  return (
    <div
      key={props.author.handle}
      className={classNames(
        'sm:inline-block sm:w-full px-4 w-full sm:max-w-md min-h-xs rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5',
        props.className
      )}
      data-cy="testimonial-card"
    >
      {props.body && (
        <blockquote className="text-gray-900">
          <p className="line-clamp-6" data-cy="body">{`"${props.body}"`}</p>
        </blockquote>
      )}

      <figcaption
        className={classNames(
          'flex items-center gap-x-4',
          props.body && 'mt-6'
        )}
      >
        {!props.imageComponent && (
          <img
            alt={props.author.name}
            src={props.author.imageUrl}
            className="h-10 w-10 rounded-full bg-gray-50"
          />
        )}
        {props.imageComponent}
        <div>
          <div className="font-semibold text-gray-900" data-cy="author">
            {props.author.name}
          </div>
          <div
            className="text-gray-600"
            data-cy="handle"
          >{`@${props.author.handle}`}</div>
          {props.timestamp && (
            <div className="text-gray-500 text-xs mt-1" data-cy="timestamp">
              {props.timestamp}
            </div>
          )}
        </div>
      </figcaption>
    </div>
  );
}
