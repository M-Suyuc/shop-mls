"use client";

import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  setDisplaImage?: React.Dispatch<React.SetStateAction<string>>;
  images?: string[];
}

export const ProductImage = ({
  setDisplaImage,
  alt,
  height,
  width,
  className,
  src,
  images,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      priority
      className={className}
      onMouseEnter={() =>
        setDisplaImage?.(images?.[1] ?? images?.[0] ?? "/imgs/placeholder.jpg")
      }
      onMouseLeave={() =>
        setDisplaImage?.(images?.[0] ?? "/imgs/placeholder.jpg")
      }
    />
  );
};
