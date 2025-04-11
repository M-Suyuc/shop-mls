"use client";

import { ProductImage } from "@/components/product/product-image/productImage";
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
        <ProductImage
          src={displaImage}
          alt={title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          setDisplaImage={setDisplaImage}
          images={images}
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
