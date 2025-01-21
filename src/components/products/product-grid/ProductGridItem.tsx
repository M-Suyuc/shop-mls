"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const { images, price, slug, title } = product;

  const [displaImage, setDisplaImage] = useState(images[0]);

  return (
    <div className="rounded-md overflow-hidden border border-violet-900/20 fade-in">
      <Link href={`/product/${slug}`}>
        <Image
          priority
          src={`/products/${displaImage}`}
          alt={title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplaImage(images[1] ?? images[0])}
          onMouseLeave={() => setDisplaImage(images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${slug}`}>
          {title}
        </Link>
        <span className="font-bold">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};
