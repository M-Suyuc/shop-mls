"use client";

import { createUpdateProduct } from "@/actions/products/create-update-product";
import { deleteProductImage } from "@/actions/products/delete-product-image";
import { ProductImage } from "@/components";
import type {
  Product,
  ProductImage as ProductImageInterface,
} from "@/interfaces";
import { Category } from "@/interfaces/categories.interface";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageInterface[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string; //

  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
    // todo: images
  });

  watch("sizes"); //INFO  Le pasas las  propiedades que quieres que vea que al momneto de un cambio actualizar la ui

  const onSizeChange = (size: string) => {
    // forma 1: usando el new Set()
    const currentSizes = new Set(getValues("sizes") || []);
    if (!currentSizes.has(size)) {
      currentSizes.add(size);
    } else {
      currentSizes.delete(size);
    }

    // INFO  Array.from es lo misno de hacer un spredd [...]
    // setValue("sizes", Array.from(currentSizes));
    setValue("sizes", [...currentSizes]);

    // forma 2
    // const sizeinclude = sizes.includes(size);
    // if (!sizeinclude) {
    //   return setValue("sizes", [...sizes, size]);
    // }

    // const filterSizes = sizes.filter((sz) => sz !== size);
    // setValue("sizes", filterSizes);
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    console.log("🚀 ~ onSubmit ~ images:", images);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);
    console.log("🚀 ~ onSubmit ~ ok:", ok);
    if (!ok) {
      alert("Producto no se pudo realizar");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Save</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Sizes</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  "flex items-center cursor-pointer transition-all justify-center w-10 h-10 mr-2 border rounded-md",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Gallery</span>
            <input
              type="file"
              multiple
              {...register("images")}
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((imagen) => (
              <div key={imagen.id}>
                <ProductImage
                  src={imagen.url}
                  alt={product.title ?? ""}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />
                <button
                  type="button"
                  onClick={() => deleteProductImage(imagen.id, imagen.url)}
                  className="btn-danger rounded-b-xl w-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
