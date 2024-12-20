import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "./common/utility/enum.util";
import { ROUTES } from "./common/constants/routes";
import { JWTDecoded } from "./modules/auth/model/AuthModel";

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

const routeAdminAccessControl = [
  {
    path: ROUTES.ADMIN.USER,
    roles: [UserRole.ADMIN],
  },
  {
    path: ROUTES.ADMIN.STATISTIC,
    roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
  },
  {
    path: ROUTES.ADMIN.ORDER,
    roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
  },
  {
    path: ROUTES.ADMIN.PRODUCT,
    roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
  },
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
  const route = routeAdminAccessControl.find((route) =>
    pathname.startsWith(route.path)
  );

  if (route) {
    if (accessToken) {
      const tokenDecoded: JWTDecoded = jwtDecode(accessToken);
      const userRoles = tokenDecoded.roles;

      if (route.roles.some((role) => userRoles.includes(role))) {
        return NextResponse.next();
      } else if (userRoles.includes(UserRole.EMPLOYEE)) {
        return NextResponse.redirect(
          new URL(ROUTES.ADMIN.STATISTIC, request.url)
        );
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
  matcher: [
    "/login",
    "/register",
    "/verify-email",
    "/process-verify-email",
    "/forgot-password",
    "/reset-password",
    "/user/profile",
    "/user/password",
    "/user/purchase",
    "/user/address",
    "/cart",
    "/checkout",
    "/dashboard/user",
    "/dashboard/statistic",
    "/dashboard/order",
    "/dashboard/product",
  ],
};
