"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "user unauthenticated",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      include: {
        OrderAddress: {
          include: {
            country: { select: { name: true } },
          },
        },
        OrderItem: {
          include: {
            product: {
              include: { ProductImage: { select: { url: true }, take: 1 } },
            },
          },
        },
      },
      where: {
        id,
      },
    });

    if (session.user.role === "user") {
      if (session.user.id !== order?.userId) {
        throw new Error(`${id} is not from that user`);
      }
    }

    if (!order) throw new Error(`${id} no exist`);

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log("🚀 ~ getOrderById ~ error:", error);

    return {
      ok: false,
      message: "order no exist",
    };
  }
};
