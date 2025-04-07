export const revalidate = 0;

import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import { Title } from "@/components";
import Pagination from "@/components/ui/pagination/Pagination";
// https://tailwindcomponents.com/component/hoverable-table

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

// TODO: link documentation to the searchParams: https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function OrdersPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  // console.log(searchParams)
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const {
    totalPages,
    ok,
    orders = [],
  } = await getPaginatedOrders({
    page,
  });

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="All Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split("-").at(-1)}1
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.isPaid ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </>
                  )}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages!} />
    </>
  );
}
