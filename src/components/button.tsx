import { HTMLProps, PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  variant?: "default" | "contained";
  size?: "normal" | "large";
}> &
  Pick<HTMLProps<HTMLButtonElement>, "onClick">;
export default function Button(props: ButtonProps): JSX.Element {
  const {
    className,
    variant = "default",
    size = "normal",
    disabled,
    children,
    ...others
  } = props;
  return (
    <button
      disabled={disabled}
      className={clsx(
        "rounded-md flex items-center justify-center",
        variant === "default" && "border border-gray-300",
        variant === "contained" && "bg-[#6a73c5] text-white",
        size === "normal" && "p-2.5",
        size === "large" && "px-8 py-3",
        className
      )}
      {...others}
    >
      {children}
    </button>
  );
}
