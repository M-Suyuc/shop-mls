"use server";

import { prisma } from "@/lib/prisma";

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return { countries };
  } catch {
    throw new Error("Error No se puede obtener los paises");
  }
};
