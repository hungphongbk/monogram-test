import { HTMLProps, PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  variant?: "default" | "contained";
  size?: "small" | "normal" | "large";
  rounded?: boolean;
}> &
  Pick<HTMLProps<HTMLButtonElement>, "onClick">;
export default function Button(props: ButtonProps): JSX.Element {
  const {
    className,
    variant = "default",
    size = "normal",
    disabled,
    children,
    rounded = false,
    ...others
  } = props;
  return (
    <button
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center",
        variant === "default" && "border border-gray-300",
        variant === "contained" && "bg-[#6a73c5] text-white",
        size === "small" && "py-0.5 px-2.5 text-sm",
        size === "normal" && "p-2.5",
        size === "large" && "px-8 py-3",
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
      {...others}
    >
      {children}
    </button>
  );
}
