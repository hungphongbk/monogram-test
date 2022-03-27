import { ForwardedRef, forwardRef, HTMLProps, ReactNode, useRef } from "react";
import { uniqueId } from "lodash";
import clsx from "clsx";

type InputProps = {
  inputClassName?: string;
  label?: ReactNode;
} & HTMLProps<HTMLInputElement>;
const Input = forwardRef(function Input(
  { className, inputClassName, type, label, ...props }: InputProps,
  ref: ForwardedRef<any>
): JSX.Element {
  const idRef = useRef(uniqueId("input-")),
    calculatedInputClassName = clsx(
      "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm placeholder:text-slate-400 disabled:bg-gray-300 disabled:text-gray-500",
      inputClassName
    );

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={idRef.current}
          className="mb-1 block text-sm text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={idRef.current}
        className={calculatedInputClassName}
        {...props}
      />
    </div>
  );
});

export default Input;
