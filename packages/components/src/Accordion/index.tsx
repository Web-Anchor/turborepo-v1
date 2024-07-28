import { classNames } from '../../lib/helpers';
import './styles.css';

type AccordionItem = {
  title?: string;
  body?: string;
  open?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  return (
    <section className="w-full divide-y rounded divide-slate-200">
      {items.map((item, index) => (
        <details className="p-4 group" key={index} open={item.open}>
          <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900 [&::-webkit-details-marker]:hidden">
            {item.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby={`title-ac${index + 1} desc-ac${index + 1}`}
            >
              <title id={`title-ac${index + 1}`}>Open icon</title>
              <desc id={`desc-ac${index + 1}`}>
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-500">{item.body}</p>
        </details>
      ))}
    </section>
  );
}
