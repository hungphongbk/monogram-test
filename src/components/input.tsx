import { HTMLProps, ReactNode, useRef } from "react";
import { uniqueId } from "lodash";
import clsx from "clsx";

type InputProps = {
  inputClassName?: string;
  label?: ReactNode;
} & HTMLProps<HTMLInputElement>;
export default function Input({
  className,
  inputClassName,
  type,
  label,
  ...props
}: InputProps): JSX.Element {
  const idRef = useRef(uniqueId("input-")),
    calculatedInputClassName = clsx(
      "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm placeholder:text-slate-400",
      inputClassName
    );

  return (
    <div className={className}>
      {label && (
        <label htmlFor={idRef.current} className="mb-1 text-sm text-gray-700">
          {label}
        </label>
      )}
      <input
        id={idRef.current}
        className={calculatedInputClassName}
        {...props}
      />
    </div>
  );
}
