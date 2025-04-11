export const revalidate = 0;

import Link from "next/link";

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { ProductImage, Title } from "@/components";
import Pagination from "@/components/ui/pagination/Pagination";
import { currencyFormat } from "@/utils/currencyFormat";

// https://tailwindcomponents.com/component/hoverable-table

// TODO: link documentation to the searchParams: https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  // console.log(searchParams)
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  return (
    <>
      <Title title="Product maintenance" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          New Product
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Gender
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                inventory
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sizes
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0].url}
                      width={80}
                      height={80}
                      alt={product.title}
                      className="size-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className=" text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className=" text-sm font-light text-gray-900 px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>
                <td className=" text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>
                <td className=" text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}
