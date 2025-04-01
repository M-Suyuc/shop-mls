import Link from "next/link";
import { Title } from "@/components";
import ProductsInCart from "./ui/productsInCart";
import PlaceOrder from "./ui/place-order";

export default function Home() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Check Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar Elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>

            <ProductsInCart />
          </div>

          {/* checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
