import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
// import { useProductsStore } from "@/store";

interface Props {
  params: { id: Category };
}

export default async function Home({ params }: Props) {
  const { id } = await params;
  // const products = useProductsStore((state) => state.products)
  // const products = useProductsStore.getState().products;
  const products = initialData.products;
  // const decodedId = id ? decodeURIComponent(id) : "";
  const filterProducts = products.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "men",
    women: "women",
    kid: "kids",
    unisex: "",
  };

  // if (id === 'kids') {
  //   notFound()
  // }
  return (
    <div>
      <Title title={labels[id]} subTitle="All products" className="mb-2" />
      <ProductGrid products={filterProducts} />
    </div>
  );
}
