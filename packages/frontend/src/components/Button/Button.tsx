import clsx from "clsx";

type Props = {
  primary?: boolean;
  className?: string;
} & React.ComponentProps<"button">;

export function Button({ primary, className, ...props }: Props) {
  return (
    <button
      className={clsx("btn", primary && "border-gray-500", className)}
      {...props}
    />
  );
}
