import { PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
}>;
export default function Button(props: ButtonProps): JSX.Element {
  const { className, disabled, children } = props;
  return (
    <button
      disabled={disabled}
      className={clsx(
        "border border-gray-300 rounded-md flex items-center justify-center p-2.5",
        className
      )}
    >
      {children}
    </button>
  );
}
