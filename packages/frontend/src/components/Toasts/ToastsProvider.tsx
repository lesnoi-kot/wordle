import { nanoid } from 'nanoid';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type Toast = {
  id: string;
  text: string;
  ttl?: number;
};

type AddToastOptions = Pick<Toast, 'text' | 'ttl'>;

type ToastsContextState = {
  toasts: Toast[];
  addToast(toast: AddToastOptions): void;
};

const ToastsContext = createContext<ToastsContextState | null>(null);

const TOAST_TTL = 5000;

export function ToastsProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: AddToastOptions) => {
    setTimeout(() => {
      setToasts(([_, ...toasts]) => toasts);
    }, toast.ttl ?? TOAST_TTL);

    setToasts((toasts) => toasts.concat({ ...toast, id: nanoid() }));
  }, []);

  const value = useMemo(() => ({ toasts, addToast }), [toasts]);

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
