import { HTMLProps, useRef } from "react";
import { uniqueId } from "lodash";
import clsx from "clsx";

type TextArea = {
  inputClassName?: string;
} & HTMLProps<HTMLTextAreaElement>;
export default function TextArea({
  className,
  inputClassName,
  type,
  ...props
}: TextArea): JSX.Element {
  const idRef = useRef(uniqueId("input-")),
    calculatedInputClassName = clsx(
      "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm placeholder:text-slate-400",
      inputClassName
    );

  return (
    <div className={className}>
      <label htmlFor={idRef.current} className="sr-only">
        Email address
      </label>
      <textarea
        id={idRef.current}
        className={calculatedInputClassName}
        {...props}
      />
    </div>
  );
}
