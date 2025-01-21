import { ProductGrid, Title } from "@/components";
// import { useProductsStore } from "@/store";
import { initialData } from "../../seed/seed";

export default function Home() {
  const products = initialData.products;
  // const products = useProductsStore.getState().products

  // const fetchData = useProductsStore.getState().fetchData
  // fetchData()

  return (
    <>
      <Title
        title="Best Sellers
"
        subTitle="All products"
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
