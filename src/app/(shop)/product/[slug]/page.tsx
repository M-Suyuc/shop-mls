export const revalidate = 604800 // 7 dias

import { notFound } from "next/navigation"
import { titleFont } from "@/config/fonts"
import { ProductMobileSlideshow, ProductSlideshow } from "@/components"
import { getProductBySlug } from "@/actions/products/get-product-by-slug"
import { StockLabel } from "@/components/product/stock-label/StockLabel"
import { Metadata, ResolvingMetadata } from "next"
import { AddToCart } from "./ui/AddToCart"
import { currencyFormat } from "@/utils/currencyFormat"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug

  const product = await getProductBySlug(slug)

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      // images: [],
      images: [`/products/${product?.images[1]}`, ...previousImages],
    },
  }
}

export default async function ProductSlug({ params }: Props) {
  const slug = (await params).slug

  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return (
    <>
      <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-7">
        {/* slideShow */}
        <section className="col-span-1 md:col-span-4">
          {/* DesktopslideShow */}
          <ProductSlideshow
            title={product.title}
            images={product.images}
            className="hidden md:flex md:flex-row-reverse md:gap-3"
          />

          {/* MobileSlideShow */}
          <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            className="block md:hidden px-0"
          />
        </section>

        {/* Details product */}
        <section className="col-span-3 pt-4 px-4 sm:px-8 h-[150vh]">
          <StockLabel slug={product.slug} />

          <h1
            className={`${titleFont.className} text-2xl font-semibold antialiased`}
          >
            {product.title}
          </h1>

          <p className="text-lg mb-4">{currencyFormat(product.price)}</p>

          <AddToCart product={product} />

          <h3 className="font-bold text-lg">Descripción</h3>
          <p className="font-light">{product.description}</p>
        </section>
      </div>
    </>
  )
}
