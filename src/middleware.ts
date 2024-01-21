import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//! authenticating request
export async function middleware(req: NextRequest) {
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

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/product/:path*',
}