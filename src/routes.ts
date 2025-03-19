/**
 *  Routes public.
 *  Not required for authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 *  These routes are used for authentication.
 *  these routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/new-account", "auth*"];

/**
 *  These prefix for API authentication routes.
 *  Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *  The default redirect URL after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/checkout/address";

/**
 *  These routes are protected.
 *  Required authentication.
 * @type {string[]}
 */
export const protectedRoute = [
  "/checkout",
  "/checkout/address",
  "/users",
  "/admin",
  "/orders",
  "/profile",
];
