import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { Title } from "@/components";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils/currencyFormat";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = await params;

  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const orderAdderss = order!.OrderAddress;
  const orderItems = order!.OrderItem;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`Order #${id.split("-").at(1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart Items */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />

              <span className="mx-2">
                {order!.isPaid ? "Pagada" : "Pendiente de pago"}
              </span>
            </div>
            {orderItems?.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  style={{ width: "100px", height: "100px" }}
                  priority
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={`image ${item.product.title}`}
                  width={100}
                  height={100}
                  className="mr-5 size-20 rounded object-cover"
                />
                <div>
                  <span>{item.product.title}</span> -{" "}
                  <span className="font-semibold underline">{item.size}</span>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold ">
                    SubTotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* orderAdderss */}
          <div className="bg-white rounded-xl shadow-xl p-6 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{orderAdderss?.firstName}</p>
              <p>{orderAdderss?.address}</p>
              <p>{orderAdderss?.address2}</p>
              <p>{orderAdderss?.city}</p>
              <p>{orderAdderss?.country.name}</p>
              <p>CP - {orderAdderss?.postalCode}</p>
              <p>{orderAdderss?.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de Orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order!.itemsInOrder}{" "}
                {order!.itemsInOrder === 1 ? "Articulo" : "Articulos"}
              </span>

              <span>SubTotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right"> {currencyFormat(order!.tax)}</span>

              <span className="text-2xl mt-5 ">Total</span>
              <span className="text-right mt-5 text-2xl">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !order?.isPaid,
                    "bg-green-700": order?.isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} />

                <span className="mx-2">
                  {order?.isPaid ? "Pagada" : "Pendiente de pago"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
