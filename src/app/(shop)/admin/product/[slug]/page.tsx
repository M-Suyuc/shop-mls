import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/productForm";
import { getCategories } from "@/actions/categories/get-categories";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const slug = (await params).slug;

  const [product, categories] = await Promise.all([
    await getProductBySlug(slug),
    await getCategories(),
  ]);

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }
  const title = slug === "new" ? "New product" : "Edit product";
  return (
    <div>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
}
