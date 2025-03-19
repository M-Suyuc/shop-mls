import { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import z from "zod";

import { prisma } from "./lib/prisma";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // console.log("🚀 ~ authorize ~ email, password:", email, password);

        // search email
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });
        if (!user) return null;

        // Compare passwords
        if (!bcrypt.compareSync(password, user.password)) return null;

        // Return user without passsword
        const { password: _, ...userWithoutPassword } = user;

        // console.log("🚀 ~ //authorize ~ userWithoutPassword:", userWithoutPassword);
        return userWithoutPassword;
      },
    }),
  ],
} satisfies NextAuthConfig;
