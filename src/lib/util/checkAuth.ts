import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { authTokenType } from "../types/authToken-type";
import { InvalidAuthToken, NotGetAuthToken, Unauthenticated } from "./apiMessages";

export function checkAuth(req: NextRequest) {
    //! If no auth token found in cookies
    const authToken = req.cookies.get("authToken");
    if (!authToken) {
        const response = NextResponse.json({ error: Unauthenticated, problem: NotGetAuthToken, success: false }, { status: 401 });
        return { success: false, response }
    };

    //! verifying the auth token
    const verifiedToken = jwt.verify(authToken.value, process.env.JWT_SECRET!) as authTokenType;
    if (!verifiedToken) {
        const response = NextResponse.json({ error: InvalidAuthToken, success: false }, { status: 401 });
        return { success: false, response }
    };

    return { success: true, userId: verifiedToken.user.id }
}