import clsx from "clsx";
import Image, { ImageProps } from "next/image";

type AvatarProps = ImageProps & {
  className?: string;
};
export default function Avatar({
  className,
  height,
  width,
  ...props
}: AvatarProps): JSX.Element {
  return (
    <div
      className={clsx(
        "inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden",
        className
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image height={height ?? 32} width={width ?? 32} {...props} />
    </div>
  );
}
