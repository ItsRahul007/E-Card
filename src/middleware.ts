import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//! authenticating request
export function middleware(req: NextRequest) {
    // console.log(req.nextUrl.pathname.includes("/api/"));
    //? if it's an api request
    if (req.nextUrl.pathname.includes("/api/")) {
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
    if (req.nextUrl.pathname.startsWith("/profile") || req.nextUrl.pathname.startsWith("/cart")) {
        //! if not of loggedin token then redirect him to login page otherwise don't redirect him
        const authToken = req.cookies.get("authToken");

        if (!authToken) {
            return NextResponse.redirect(new URL('/login', req.url));
        };
    };

    //? if user is logged
    if (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup")) {
        //! if loggedin token then redirect him to home page otherwise don't redirect him
        const authToken = req.cookies.get("authToken");

        if (authToken) {
            return NextResponse.redirect(new URL('/', req.url));
        };
    }


    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/api/product/:path*',
        '/api/single-product/:path*',
        '/profile/:path*',
        '/cart',
        '/login',
        '/signup',
    ],
}