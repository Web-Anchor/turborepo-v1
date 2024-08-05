import './styles.css';

export function LoadingDots() {
  return (
    <div className="flex space-x-2">
      <div className="animate-bounce bg-indigo-600 h-4 w-4 rounded-full"></div>
      <div className="animate-bounce bg-indigo-600 h-4 w-4 rounded-full animation-delay-200"></div>
      <div className="animate-bounce bg-indigo-600 h-4 w-4 rounded-full animation-delay-400"></div>
    </div>
  );
}
