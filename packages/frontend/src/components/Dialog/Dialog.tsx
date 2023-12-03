import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";
import clsx from "clsx";

type Props = ComponentPropsWithRef<"dialog"> & {
  canClose?: boolean;
  onClose?(): void;
};

export const Dialog = forwardRef(
  (
    { children, className, canClose, onClose, ...props }: Props,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    return (
      <dialog
        onClose={onClose}
        ref={ref}
        className={clsx(
          "z-[9999] max-w-md rounded-md border p-4 shadow-xl backdrop:bg-gray-100 backdrop:opacity-25 dark:backdrop:bg-gray-800",
          className,
        )}
        {...props}
      >
        {canClose && (
          <button
            className="absolute right-0 top-0 h-10 w-10 text-lg active:scale-90"
            title="Закрыть"
            aria-label="Закрыть"
            onClick={onClose}
          >
            ⨯
          </button>
        )}
        {children}
      </dialog>
    );
  },
);
