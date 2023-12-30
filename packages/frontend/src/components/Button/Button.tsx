import clsx from "clsx";

type Props = React.ComponentProps<"button"> & { primary?: boolean };

export function Button({ primary, className, ...props }: Props) {
  return (
    <button
      className={clsx("btn", primary && "btn-primary", className)}
      {...props}
    />
  );
}
