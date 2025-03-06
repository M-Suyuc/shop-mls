"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { useState } from "react";
import type { CartProduct, Product, Size } from "@/interfaces/index";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);
  const addProducToCart = useCartStore((state) => state.addProducToCart);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    // console.log(quantity, size);
    // console.log(product);
    const productToCart: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProducToCart(productToCart);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <p className="text-sm text-red-500 fade-in">You must select a size</p>
      )}
      {/* {product?.sizes.length >= 1 && ( */}
      <SizeSelector
        selectedSize={size}
        availableSize={product?.sizes}
        onSizeChange={setSize}
      />
      {/* )} */}

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button
        onClick={addToCart}
        className="bg-black hover:bg-black/80 text-white font-semibold py-3 px-6 rounded-lg transition-all w-fit my-4 "
      >
        Añadir a la cesta
      </button>
    </>
  );
};
