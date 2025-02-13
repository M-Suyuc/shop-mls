export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination"
import { ProductGrid, Title } from "@/components"
import Pagination from "@/components/ui/pagination/Pagination"
import { Gender } from "@prisma/client"
import { redirect } from "next/navigation"

type Params = Promise<{ gender: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const gender = params.gender
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({
    gender: gender as Gender,
    page,
  })

  // const products = initialData.products
  const filterProducts = products.filter((product) => product.gender === gender)

  const labels: Record<string, string> = {
    men: "men",
    women: "women",
    kid: "kids",
    unisex: "",
  }

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  // if (gender === 'kids') {
  //   notFound()
  // }

  return (
    <div>
      <Title title={labels[gender]} subTitle="All products" className="mb-2" />
      <ProductGrid products={filterProducts} />
      <Pagination totalPages={totalPages} />
    </div>
  )
}
