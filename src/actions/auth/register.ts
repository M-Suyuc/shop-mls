"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return { ok: true, user, message: "user created" };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { ok: false, message: "Something went wrong." };
  }
};
