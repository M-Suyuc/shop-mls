import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
];

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
                  <p className="font-bold">SubTotal: ${item.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-6 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-5">
              <p className="text-xl">Marlon Suyuc</p>
              <p>Av. Chimaltenango</p>
              <p>Col. Centro</p>
              <p>Alcandia. centro</p>
              <p>Ciudad de Guatemala</p>
              <p>CP. 978675656756</p>
              <p>123.123.123</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />

            <h2 className="text-2xl mb-2">Resumen de Orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>

              <span>SubTotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="text-2xl mt-5 ">Total</span>
              <span className="text-right mt-5 text-2xl">$ 100</span>
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
              <Link
                href="/orders/123"
                className="flex justify-center items-center btn-primary"
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
