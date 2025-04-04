"use server";

import { auth } from "@/auth";
import { Size } from "@/interfaces";
import { Address } from "@/interfaces/address.interface";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      error: "You need to be logged in to place an order",
    };
  }
  // console.log({ productIds, address, userId });

  // Todo: como usar el in en prisma y demas methods:
  // https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-46
  //  https://chat.deepseek.com/a/chat/s/14b38712-92a3-4f32-a5cf-273a88633f2f
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((product) => product.productId),
      },
    },
  });
  // console.log("🚀 ~ products:", products);

  // Cantidad de productos en el carrito
  const itemsInOrder = productIds.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  // console.log("🚀 ~ itemsInOrder:", itemsInOrder);

  // Subtottal, impuestos y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId}  not found - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },

    { subTotal: 0, tax: 0, total: 0 }
  );
  // console.log(`🚀 ~ { subTotal, tax, total }:`, { subTotal, tax, total });

  try {
    // create transaction of db
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        // Acomular informacion
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => {
            return (acc += item.quantity);
          }, 0);
        // Todo: Esto es lo mismo de arriba
        // .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id}, no tiene cantidad definida`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            // inStock: product.inStock - productQuantity,  // todo:No hacerlo de esta manera, No es correcta
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativoe en la existencia
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title}, no tiene inventario suficientes`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Crear la direccion de la orden
      const { country, ...restData } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restData,
          countryId: country,
          orderId: order.id,
        },
      });
      // console.log("🚀 ~ prismaTx ~ orderAddress:", orderAddress);

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return {
      ok: false,
      message: "error al crear transaction  ",
    };
  }
};
