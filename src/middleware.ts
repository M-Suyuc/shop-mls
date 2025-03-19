// Partes de una url
// https://lenguajejs.com/javascript/peticiones-http/url/
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT_URL,
  protectedRoute,
} from "./routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // console.log("============ nextUrl ============", { nextUrl });
  // console.log("============ Auth ============", req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoute.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  // check is authenticated:
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl)
      );
      // Al usar  new URL simpre hay que pasar como segundo parametro el nextUrl: para que cree una nueva
      // example 👆 new URL('/foo', 'https://example.org/');
      // https://example.org/foo
    }
    return;
  }

  // If it's not authenticated and is not isProtectedRoute --> redirect
  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;
    // console.log({ callbackUrl }) -----> { callbackUrl: '/profile' }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    // console.log({ encodedCallbackUrl }) -----> { encodedCallbackUrl: '%2Fprofile' }
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      // Al usar  new URL simpre hay que pasar como segundo parametro el nextUrl: para que cree una nueva
      // example 👆 new URL('/foo', 'https://example.org/');
      // https://example.org/foo
    );
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
