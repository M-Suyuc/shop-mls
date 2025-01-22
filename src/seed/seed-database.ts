import { prisma } from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // 1. Borrar registros previos

  // await Promise.all([ TODO: No hacemos esto de manera paralela porque hay conflictos de claves foráneas en la base de datos porque no se pueden borrar las categorias si depedenden de un producto
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  //  Categorias ---------------
  const { categories, products } = initialData;
  const categoryData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoryData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((acc, category) => {
    acc[category.name.toLowerCase()] = category.id;
    return acc;
  }, {} as Record<string, string>);

  // Productos ---------------
  products.forEach(async (product) => {
    const { images, type, ...rest } = product;
    console.log(categoriesMap);
    // console.log(categoriesMap[type]);
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Images
    const imiageData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imiageData,
    });
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") {
    console.log("No se puede ejecutar el seed en producción");
    return;
  }

  main();
})();
