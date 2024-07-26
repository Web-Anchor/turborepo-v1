import './styles.css';

type Props = {
  type?: 'card' | 'user' | 'list' | 'table';
};

export function Skeleton(props: Props): React.ReactElement | null {
  if (props.type === 'user') {
    return (
      <div className="flex flex-row gap-2 items-center max-w-sm w-full">
        <div>
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="h-2 bg-slate-700 rounded w-2/6"></div>
          <div className="h-2 bg-slate-700 rounded w-1/6"></div>
        </div>
      </div>
    );
  }

  if (props.type === 'list') {
    return (
      <div className="flex flex-col gap-2 items-center max-w-sm w-full">
        <div className="h-2 bg-slate-700 rounded w-full"></div>
        <div className="h-2 bg-slate-700 rounded w-full"></div>
        <div className="h-2 bg-slate-700 rounded w-4/6"></div>
        <div className="h-2 bg-slate-700 rounded w-3/6"></div>
        <div className="h-2 bg-slate-700 rounded w-5/6"></div>
      </div>
    );
  }

  if (props.type === 'table') {
    return (
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded w-4/6"></div>
            <div className="space-y-2">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
