import NextAuth, { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import authConfig from "./auth.config";

type CustomUser = {
  user: Session["user"];
};

export const { auth, signIn, signOut, handlers } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      // console.log("🚀 ~ jwt ~ token, user:", token, user);
      if (user) {
        token.data = user;
      }
      return token;
    },

    async session({ token, session }) {
      // console.log("🚀  token, session, user }:", { token, session, user });
      session.user = token.data as AdapterUser & CustomUser["user"];

      // console.log("🚀 ~ session:", session);
      return session;
    },
  },

  // session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
    error: "/auth/error",
    // Si hay un error en el auth nos direccionara a '/auth/error'

    // pages: {} es necesario el redirect a una pagina de error
    // si hay un error en el callback de OAuth nos direccionara a '/auth/error'
    // http://localhost:3000/auth?error=OAuthCallbackError

    // sin pages
    // http://localhost:3000/api/auth/signin?error=OAuthCallbackError
  },

  ...authConfig,
});
