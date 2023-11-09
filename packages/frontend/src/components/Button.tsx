type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
};

export function Button({ primary, ...props }: Props) {
  return (
    <button
      className={`py-4 px-8 ${
        primary ? 'border' : ''
      } rounded-lg cursor-pointer bg-slate-50 dark:bg-zinc-900 transition-colors hover:bg-slate-100 dark:hover:bg-zinc-800`}
      {...props}
    />
  );
}
