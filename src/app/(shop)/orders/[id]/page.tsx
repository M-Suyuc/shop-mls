import Image from "next/image";
import { Title } from "@/components";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils/currencyFormat";
import PaypalButton from "@/components/paypal/paypalButton";
import { OrderStatus } from "@/components/orders/ordet-status";

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
            <OrderStatus isPaid={order?.isPaid ?? false} />

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
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <PaypalButton
                  amount={order!.total.toString()}
                  orderId={order!.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
