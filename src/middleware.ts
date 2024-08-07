import { decode } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { T_JwtVerifyDataType } from "./lib/types/authToken-type";

//! authenticating request
export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value || false;
  const { pathname } = req.nextUrl;

  //? if user have auth token but verified is not true
  if (authToken && !pathname.startsWith("/verify-email")) {
    const decodedAuthToken = decode(authToken) as T_JwtVerifyDataType;
    if (!decodedAuthToken.user.isVerified)
      return NextResponse.redirect(new URL("/verify-email", req.url));
  }

  if (pathname.startsWith("/verify-email")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const decodedAuthToken = decode(authToken) as T_JwtVerifyDataType;
    if (decodedAuthToken.user.isVerified)
      return NextResponse.redirect(new URL("/", req.url));
  }

  //? if it's an api request
  if (pathname.includes("/api/")) {
    //? getting the auth token from headers
    const requestHeaders = new Headers(req.headers);
    const AUTH_TOKEN = requestHeaders.get("AUTH_TOKEN");

    //? if not of auth token
    if (!AUTH_TOKEN)
      return NextResponse.json(
        {
          error: "Not a authenticated request",
          success: false,
        },
        { status: 401 }
      );

    const parsedAuthToken = JSON.parse(AUTH_TOKEN);

    //? if the auth token is not valid
    if (parsedAuthToken !== process.env.AUTH_TOKEN) {
      return NextResponse.json(
        {
          error: "Not a authenticated request",
          success: false,
        },
        { status: 401 }
      );
    }
  }

  //? if it's an private client side url request
  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/support") ||
    pathname.startsWith("/buy-products")
  ) {
    //! if not of loggedin token then redirect him to login page otherwise don't redirect him

    if (!authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  //? if someone try to become a seller even after his role is not user
  if (pathname.startsWith("/seller/become-a-seller")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const decodedAuthToken = decode(authToken) as T_JwtVerifyDataType;
    const userRole = decodedAuthToken.user.userRole || "user";
    if (userRole === "seller") {
      return NextResponse.redirect(new URL("/seller/dashboard", req.url));
    }
  }

  //? if it's a seller url request
  if (
    pathname.startsWith("/seller") &&
    pathname !== "/seller/become-a-seller"
  ) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const decodedAuthToken = decode(authToken) as T_JwtVerifyDataType;
    const userRole = decodedAuthToken.user.userRole || "user";
    if (userRole === "user") {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  //? if user is logged
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    //! if loggedin token then redirect him to home page otherwise don't redirect him

    if (authToken) {
      const decodedAuthToken = decode(authToken) as T_JwtVerifyDataType;
      const userRole = decodedAuthToken.user.userRole || "user";
      if (userRole === "seller") {
        return NextResponse.redirect(new URL("/seller/dashboard", req.url));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/logout")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/api/product/:path*",
    "/api/single-product/:path*",
    "/profile/:path*",
    "/seller/:path*",
    "/buy-products/:path*",
    "/cart",
    "/login",
    "/logout",
    "/signup",
    "/verify-email",
    "/",
  ],
};
