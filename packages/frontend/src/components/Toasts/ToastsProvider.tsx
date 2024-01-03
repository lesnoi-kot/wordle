import { nanoid } from "nanoid";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Toast = {
  id: string;
  text: string;
  ttl?: number;
};

type AddToastOptions = Pick<Toast, "text" | "ttl">;

type ToastsContextState = {
  toasts: Toast[];
  addToast(toast: AddToastOptions): void;
  removeToast(toastId: string): void;
};

const ToastsContext = createContext<ToastsContextState | null>(null);

const DEFAULT_TOAST_TTL = 5000;

export function ToastsProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((toastId: string) => {
    document
      .getElementById(`Toasts-${toastId}`)
      ?.classList.add("animate-jump-out", "animate-duration-200");

    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
    }, 200);
  }, []);

  const addToast = useCallback((toastOptions: AddToastOptions) => {
    const toast: Toast = { ...toastOptions, id: nanoid() };

    setTimeout(() => {
      removeToast(toast.id);
    }, toast.ttl ?? DEFAULT_TOAST_TTL);

    setToasts((toasts) => toasts.concat(toast));
  }, []);

  const value = useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast],
  );

  return (
    <ToastsContext.Provider value={value}>{children}</ToastsContext.Provider>
  );
}

function useToastsContext() {
  return useContext(ToastsContext)!;
}

export function useToasts() {
  const { toasts } = useToastsContext();
  return toasts;
}

export function useAddToast() {
  const { addToast } = useToastsContext();
  return addToast;
}

export function useRemoveToast() {
  const { removeToast } = useToastsContext();
  return removeToast;
}
