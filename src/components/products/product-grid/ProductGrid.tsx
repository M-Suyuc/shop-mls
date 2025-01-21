import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  // console.log(products);
  // const isLoading = useProductsStore((state) => state.isLoading)

  return (
    <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
      {
        // isLoading ? (
        //   <div className='text-center text-lg'>Loading...</div>
        // ) : (
        products.map((product) => {
          return <ProductGridItem product={product} key={product.slug} />;
        })
        // )
      }
    </div>
  );
};
