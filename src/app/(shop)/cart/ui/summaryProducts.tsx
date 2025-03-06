"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormat";

const SummaryProducts = () => {
  const { getSummaryInformation } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <OrderSummarySkeleton />;

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart} {itemsInCart === 1 ? "Articulo" : "Articulos"}
      </span>

      <span>SubTotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right"> {currencyFormat(tax)}</span>

      <span className="text-2xl mt-5 ">Total</span>
      <span className="text-right mt-5 text-2xl"> {currencyFormat(total)}</span>
    </div>
  );
};
export default SummaryProducts;

const OrderSummarySkeleton = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="grid grid-cols-2 gap-y-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded justify-self-end"></div>

        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded justify-self-end"></div>

        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded justify-self-end"></div>

        <div className="h-7 w-16 bg-gray-200 rounded mt-5"></div>
        <div className="h-7 w-28 bg-gray-200 rounded mt-5 justify-self-end"></div>
      </div>
    </div>
  );
};
