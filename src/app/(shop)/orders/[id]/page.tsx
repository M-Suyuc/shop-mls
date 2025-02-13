import Image from "next/image"
import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"
import { Title } from "@/components"
import { initialData } from "@/seed/seed"

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
]

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Home({ params }: Props) {
  const { id } = await params

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className='mx-2'>Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>
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
            <div className="mb-10">
              <p className="text-xl">Marlon Suyuc</p>
              <p>Av. Chimaltenango</p>
              <p>Col. Centro</p>
              <p>Alcandia. centro</p>
              <p>Ciudad de Guatemala</p>
              <p>CP. 978675656756</p>
              <p>123.123.123</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className='mx-2'>Pendiente de pago</span> */}
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
