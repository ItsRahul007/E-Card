import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//! authenticating request
export function middleware(req: NextRequest) {
    const authToken = req.cookies.get("authToken")?.value || false;
    const { pathname } = req.nextUrl;

    //? if it's an api request
    if (pathname.includes("/api/")) {
        //? getting the auth token from headers
        const requestHeaders = new Headers(req.headers);
        const AUTH_TOKEN = requestHeaders.get('AUTH_TOKEN');

        //? if not of auth token
        if (!AUTH_TOKEN) return NextResponse.json({
            error: "Not a authenticated request",
            success: false
        }, { status: 401 });

        const parsedAuthToken = JSON.parse(AUTH_TOKEN);

        //? if the auth token is not valid
        if (parsedAuthToken !== process.env.AUTH_TOKEN) {
            return NextResponse.json({
                error: "Not a authenticated request",
                success: false
            }, { status: 401 });
        };
    };

    //? if it's an private client side url request
    if (
        pathname.startsWith("/profile") ||
        pathname.startsWith("/seller") ||
        pathname.startsWith("/cart") ||
        pathname.startsWith("/buy-products")
    ) {
        //! if not of loggedin token then redirect him to login page otherwise don't redirect him

        if (!authToken) {
            return NextResponse.redirect(new URL('/login', req.url));
        };
    };

    //? if user is logged
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
        //! if loggedin token then redirect him to home page otherwise don't redirect him

        if (authToken) {
            return NextResponse.redirect(new URL('/', req.url));
        };
    }

    if (pathname.startsWith('/logout')) {
        console.log('middleware ', pathname);
        const response = NextResponse.redirect(new URL('/login', req.url));
        const allCookies = cookies().getAll();
        allCookies.forEach((cookie) => {
            response.cookies.delete(cookie.name);
        });
        return response;
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/api/product/:path*',
        '/api/single-product/:path*',
        '/profile/:path*',
        '/seller/:path*',
        '/buy-products/:path*',
        '/cart',
        '/login',
        '/logout',
        '/signup',
    ],
}