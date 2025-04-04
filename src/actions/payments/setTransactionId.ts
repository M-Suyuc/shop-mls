"use server";

import { prisma } from "@/lib/prisma";

export const setTransactionId = async (
  transactionId: string,
  orderId: string
) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `No se puede en contrar la orden con el Id ${orderId}`,
      };
    }

    return {
      ok: true,
      message: "actualizacion de la orden con exito",
      order,
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { ok: false, message: "Changes cannot be saved." };
  }
};
