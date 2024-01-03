import { useRemoveToast, useToasts } from "./ToastsProvider";

export function Toasts() {
  const toasts = useToasts();
  const removeToast = useRemoveToast();

  return (
    <div className="flex flex-col gap-4 p-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`Toasts-${toast.id}`}
          onClick={() => {
            removeToast(toast.id);
          }}
          className="animate-fade select-none rounded-md bg-slate-100 p-2 px-4 dark:bg-slate-800"
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
}
