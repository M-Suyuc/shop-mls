import Link from "next/link";
import Image from "next/image";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [initialData.products[0], initialData.products[1]];

export default function Home() {
  // redirect('/empty')

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

            {productsInCart.map((item) => (
              <div key={item.slug} className="flex mb-5">
                <Image
                  // style={{ width: "100px", height: "100px" }}
                  priority
                  src={`/products/${item.images[0]}`}
                  alt={`image ${item.title}`}
                  width={100}
                  height={100}
                  className="mr-5 size-20 rounded object-cover"
                />
                <div>
                  <p>{item.title}</p>
                  <p>{item.price}</p>

                  <QuantitySelector quantity={3} />
                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>
          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-6 h-fit">
            <h2 className="text-2xl mb-2">Resumen de Orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {productsInCart.length} articulos
              </span>

              <span>SubTotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="text-2xl mt-5 ">Total</span>
              <span className="text-right mt-5 text-2xl">$ 100</span>
            </div>

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
