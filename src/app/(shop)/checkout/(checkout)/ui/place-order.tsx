"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { useCartStore } from "@/store";
import { useAddressStore } from "@/store/address/address-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { placeOrder } from "@/actions/order/place-order";
import { sleep } from "@/utils/sleep";
import { useRouter } from "next/navigation";

const PlaceOrder = () => {
  const router = useRouter();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const [loaded, setLoaded] = useState(false);
  // Este loaded se utiliza para no tener prblemas de discrepancian entro lo que genera el servidor y el cliente
  useEffect(() => {
    setLoaded(true);
  }, []);

  const address = useAddressStore((state) => state.address);
  const { getSummaryInformation } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    await sleep(2);
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const res = await placeOrder(productsToOrder, address);
    // console.log("🚀 ~ onPlaceOrder ~ res:", res);

    if (!res.ok) {
      setIsPlacingOrder(false);
      seterrorMessage(res.message);
      return;
    }
    clearCart();
    router.replace("/orders/" + res.order!.id);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 h-fit">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-5">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city} {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />

      <h2 className="text-2xl mb-2">Resumen de Orden</h2>
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
        <span className="text-right mt-5 text-2xl">
          {" "}
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer clic en &quot;Colocar Orden&quot;, aceptas nuestras
            <a href="#" className="underline">
              términos y condiciones
            </a>
            y
            <a href="#" className="underline">
              políticas de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-500">{errorMessage}</p>
        <button
          // href="/orders/123"
          onClick={onPlaceOrder}
          className={clsx("", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
