import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';

type Props = ComponentPropsWithRef<'dialog'> & {
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
          'p-4 rounded-md shadow-xl max-w-md backdrop:opacity-25 backdrop:bg-gray-100 dark:backdrop:bg-gray-800 border z-[9999]',
          className,
        )}
        {...props}
      >
        {canClose && (
          <button
            className="absolute top-0 right-0 w-10 h-10 active:scale-90"
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
