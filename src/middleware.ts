import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IJWTDecoded } from "./common/model/auth.model";
import { UserRole } from "./common/utility/enum.util";
import { ROUTES } from "./common/constants/routes";

const authPaths = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.VERIFY_EMAIL,
  ROUTES.AUTH.PROCESS_VERIFY_EMAIL,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
];

const privatePaths = [
  ROUTES.USER.PROFILE,
  ROUTES.USER.PASSWORD,
  ROUTES.USER.PURCHASE,
  ROUTES.USER.ADDRESS,
  ROUTES.CART,
  ROUTES.CHECKOUT,
];

const adminPaths = [
  ROUTES.ADMIN.USERS,
  ROUTES.ADMIN.STATISTIC,
  ROUTES.ADMIN.ORDERS,
  ROUTES.ADMIN.PRODUCTS,
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // check private path
  if (privatePaths.some((path) => pathname.startsWith(path) && !accessToken)) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  // check admin path
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    if (accessToken) {
      const tokenDecoded: IJWTDecoded = jwtDecode(accessToken);

      if (tokenDecoded.roles.includes(UserRole.ADMIN)) {
        return NextResponse.next();
      }
    }
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  // if logged in, the login and registration page will not be allowed
  if (authPaths.some((path) => pathname.startsWith(path) && accessToken)) {
    if (pathname === ROUTES.AUTH.PROCESS_VERIFY_EMAIL)
      return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [...authPaths, ...privatePaths, ...adminPaths],
};
