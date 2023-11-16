import { useToasts } from './ToastsProvider';

export function Toasts() {
  const toasts = useToasts();

  return (
    <div className="flex flex-col gap-4 p-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="p-2 px-4 rounded-md bg-slate-100 dark:bg-slate-800"
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
}
