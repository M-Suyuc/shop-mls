"use server";

import { prisma } from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { ok: false, message: "the address cannot be deleted." };
  }
};
