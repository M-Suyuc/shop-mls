import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
// import { useProductsStore } from "@/store";
import { initialData } from "@/seed/seed";

interface Props {
  params: { slug: string };
}

export default async function ProductSlug({ params }: Props) {
  const { slug } = await params;
  // mens_chill_crew_neck_sweatshirt
  // const products = useProductsStore((state) => state.products);
  const products = initialData.products;

  const product = products.find((product) => product.slug === slug);

  if (!product) notFound();

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

        {/* xs:px-6 mx-auto max-w-screen-lg px-4 sm:px-8 lg:px-0 */}
        {/* Details product */}
        <section className="col-span-3 pt-4 px-4 sm:px-8 h-[150vh]">
          <h1
            className={`${titleFont.className} text-2xl font-semibold antialiased`}
          >
            {product.title}
          </h1>

          <p className="text-lg mb-4">{product.price}</p>
          {product?.sizes.length >= 1 && (
            <SizeSelector
              availableSize={product?.sizes}
              selectedSize={product?.sizes[0]}
            />
          )}

          <QuantitySelector quantity={1} />

          <button className="btn-add w-fit md:w-full my-4 ">
            Añadir a la cesta
          </button>

          <h3 className="font-bold text-sm">Descripción</h3>
          <p className="font-light text-sm md:text-base">
            INTRODUCING THE TESLA RAVEN COLLECTION. THE MEN S RAVEN LIGHTWEIGHT
            HOODIE HAS A PREMIUM, RELAXED SILHOUETTE MADE FROM A SUSTAINABLE
            BAMBOO COTTON BLEND. THE HOODIE FEATURES SUBTLE THERMOPLASTIC
            POLYURETHANE TESLA LOGOS ACROSS THE CHEST AND ON THE SLEEVE WITH A
            FRENCH TERRY INTERIOR FOR VERSATILITY IN ANY SEASON. MADE FROM 70%
            BAMBOO AND 30% COTTON.
          </p>
        </section>
      </div>
      {/* <div className="min-h-screen bg-orange-600 w-full"></div> */}
    </>
  );
}
