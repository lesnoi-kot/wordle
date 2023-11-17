import clsx from 'clsx';

import './Button.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
};

export function Button({ primary, className = '', ...props }: Props) {
  const extraStyles = clsx(primary && 'border-gray-300', className);

  return (
    <button
      className={`btn p-2 md:py-4 md:px-8 rounded-lg border border-transparent transition-colors ${extraStyles}`}
      {...props}
    />
  );
}
