export const revalidate = 60
// false | 0 | number

import { ProductGrid, Title } from "@/components"
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination"
import { redirect } from "next/navigation"
import Pagination from "@/components/ui/pagination/Pagination"
// import { initialData } from "../../seed/seed";
// const products = initialData.products;

// TODO: link documentation to the searchParams: https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  // console.log(searchParams)
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  })

  // console.log(currentPage, totalPages);
  if (products.length === 0) {
    redirect("/")
  }

  return (
    <>
      <Title title="Best Sellers" subTitle="All products" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
