import Link from "next/link";
import { Title } from "@/components";
import ProductsInCart from "./ui/productsInCart";
import SummaryProducts from "./ui/summaryProducts";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-start px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            <ProductsInCart />
          </div>

          {/* summary */}
          <div className="bg-white rounded-xl shadow-xl p-6 h-fit">
            <h2 className="text-2xl mb-2">Resumen de Orden</h2>

            <SummaryProducts />

            <div className="mt-5 mb-2">
              <Link
                href="/checkout/address"
                className="flex justify-center items-center btn-primary"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
