import User from "@/lib/model/usersSchema";
import { ApiErrorMessage, userNotFound } from "@/lib/util/apiMessages";
import { checkAuth } from "@/lib/util/checkAuth";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a code",
        },
        { status: 400 }
      );
    }

    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    const { userId } = isUserAuthenticated;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: userNotFound,
        },
        { status: 404 }
      );
    }

    if (Number(user.verificationCode) !== Number(code)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid verification code",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    const response = NextResponse.json(
      {
        success: true,
        message: "Verified successfully",
      },
      { status: 200 }
    );

    const data = {
      user: {
        id: user._id,
        name: user.name,
        userRole: user.userRole,
        brandName: user.brandName || "",
        avatar: user.avatar || "",
        isVerified: true,
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET!;

    const authToken = sign(data, JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 5,
    });

    response.cookies.set("authToken", authToken, {
      maxAge: 60 * 60 * 24 * 5,
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: ApiErrorMessage,
        problem: error.message,
      },
      { status: 500 }
    );
  }
}
