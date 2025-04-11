"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsInCart = () => {
  const router = useRouter();

  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  const handleDelete = (product: CartProduct) => {
    removeProductFromCart(product);
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (productsInCart.length === 0) router.replace("/empty");
    setLoaded(true);
  }, [productsInCart.length, router]);

  if (!loaded) return <ProductListSkeleton />;

  return (
    <div>
      {productsInCart.map((item) => (
        <div key={`${item.slug}-${item.size}`} className="flex mb-5">
          <ProductImage
            src={item.image}
            alt={`image ${item.title}`}
            width={100}
            height={100}
            className="mr-5 size-20 rounded object-cover"
          />
          <div>
            <Link href={`/product/${item.slug}`} className="hover:underline">
              {item.size} - {item.title}
            </Link>
            <p>{currencyFormat(item.price)}</p>

            <QuantitySelector
              quantity={item.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(item, quantity)
              }
            />
            <button
              className="underline mt-3 cursor-pointer"
              onClick={() => handleDelete(item)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductsInCart;

const ProductListSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="flex mb-5">
          <div className="mr-5 size-20 rounded bg-gray-200"></div>

          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>

            <div className="h-4 w-16 bg-gray-200 rounded"></div>

            <div className="flex items-center gap-2">
              <div className="size-6 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-8 bg-gray-200 rounded"></div>
              <div className="size-6 bg-gray-200 rounded-full"></div>
            </div>

            <div className="h-4 w-20 bg-gray-200 rounded mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
