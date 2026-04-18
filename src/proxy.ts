import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: middleware is now called "proxy"
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except api routes, _next, static files
    "/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)",
  ],
};
