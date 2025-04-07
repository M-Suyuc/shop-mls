"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({
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
    const users = await prisma.user.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: {
        name: "desc",
      },
    });

    const totalCount = await prisma.user.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      users,
      currenPage: page,
      totalPages,
    };
  } catch (error) {
    throw new Error("Error No se puede obtener las ordenes");
  }
};
