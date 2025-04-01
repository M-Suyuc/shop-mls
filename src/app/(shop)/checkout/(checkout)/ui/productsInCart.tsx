"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useRouter } from "next/navigation";

const ProductsInCart = () => {
  const router = useRouter();
  const productsInCart = useCartStore((state) => state.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (productsInCart.length === 0) router.push("/empty");
    setLoaded(true);
  }, [productsInCart, router]);

  if (!loaded) return <ProductListSkeleton productsInCart={productsInCart} />;

  return (
    <div>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            priority
            src={`/products/${product.image}`}
            alt={`image ${product.title}`}
            width={100}
            height={100}
            className="mr-5 size-20 rounded object-cover"
          />
          <div>
            <span>
              {product.size} - {product.title} - ({product.quantity})
            </span>

            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductsInCart;

type Products = {
  productsInCart: CartProduct[];
};
const ProductListSkeleton: React.FC<Products> = ({}) => {
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
