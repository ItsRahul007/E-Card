import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { authTokenType } from "../types/authToken-type";

export function checkAuth(req: NextRequest) {
    //! If no auth token found in cookies
    const authToken = req.cookies.get("authToken");
    if (!authToken) {
        const response = NextResponse.redirect(new URL("/login", req.url));

        //! clearing the auth token cookie
        response.cookies.set("authToken", "", { maxAge: 0, httpOnly: true });
        return { success: false, response }
    };

    //! verifying the auth token
    const verifiedToken = jwt.verify(authToken.value, process.env.JWT_SECRET!) as authTokenType;
    if (!verifiedToken) {
        const response = NextResponse.redirect(new URL("/login", req.url));

        //! clearing the auth token cookie
        response.cookies.set("authToken", "", { maxAge: 0, httpOnly: true });
        return { success: false, response }
    };

    return { success: true, userId: verifiedToken.user.id }
}