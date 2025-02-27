"use server"

import { prisma } from "@/lib/prisma"
import { sleep } from "@/utils/sleep"

export const getStockBySlug = async (slug: string) => {
  try {
    await sleep(2)

    const stock = await prisma.product.findFirst({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    })

    return stock?.inStock ?? 0
  } catch {
    throw new Error("Error No se puede obtener el stock del producto")
  }
}
