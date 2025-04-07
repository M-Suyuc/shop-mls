"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// puedo crear la paginacion igual al de product-pagination.ts
interface PaginationOptions {
  page?: number;
  take?: number;
  // gender?: Gender
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const orders = await prisma.order.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const totalCount = await prisma.order.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      orders: orders,
      currenPage: page,
      totalPages,
    };
  } catch (error) {
    throw new Error("Error No se puede obtener las ordenes");
  }
};
