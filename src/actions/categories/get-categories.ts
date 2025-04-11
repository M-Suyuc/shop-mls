"use server";

import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return categories;
  } catch (error) {
    throw new Error(" cannot get categories");
  }
};
