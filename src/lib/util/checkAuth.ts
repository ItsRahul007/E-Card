import { NextRequest, NextResponse } from "next/server";
import { verify } from 'jsonwebtoken';
import { authTokenType } from "../types/authToken-type";

export async function checkAuth(req: NextRequest) {
    //! If no auth token found in cookies
    try {
        const authToken = req.cookies.get("authToken")?.value || '';
        if (authToken.length <= 0) {
            const response = NextResponse.redirect(new URL("/login", req.url));
            response.cookies.delete('authToken');
            return { success: false, response }
        };

        //! verifying the auth token
        const verifiedToken = verify(authToken, process.env.JWT_SECRET!) as authTokenType;
        if (!verifiedToken) {
            const response = NextResponse.redirect(new URL("/login", req.url));
            //! clearing the auth token cookie
            response.cookies.delete('authToken')
            return { success: false, response }
        };
        return { success: true, userId: verifiedToken.user.id }
    } catch (err: any) {
        console.log(err.message)
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete('authToken')
        return { success: false, response }
    }

}