import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';

export const Dialog = forwardRef(
  (
    { children, className, ...props }: ComponentPropsWithRef<'dialog'>,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    return (
      <dialog
        ref={ref}
        className={clsx(
          'p-4 rounded-md shadow-xl max-w-md backdrop-opacity-60 backdrop:bg-gray-100 border z-10',
          className,
        )}
        {...props}
      >
        {children}
      </dialog>
    );
  },
);
