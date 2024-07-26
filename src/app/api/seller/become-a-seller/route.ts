import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { ApiErrorMessage, invalidRequest } from "@/lib/util/apiMessages";
import { checkAuth } from "@/lib/util/checkAuth";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { brandName, contactEmail, contactNumber } = await req.json();

    if (!brandName || !contactEmail || !contactNumber) {
      return NextResponse.json(
        {
          success: false,
          error: invalidRequest,
          problem: "Didn't get all the required fields",
        },
        { status: 400 }
      );
    }

    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    const { userId } = isUserAuthenticated;

    await connectWithMongo();

    const isBrandNameAlreadyExists = await User.findOne({
      brandName,
    });
    const isContactEmailAlreadyExists = await User.findOne({
      contactEmail,
    });
    const isContactNumberAlreadyExists = await User.findOne({
      contactNumber,
    });

    if (
      isBrandNameAlreadyExists ||
      isContactEmailAlreadyExists ||
      isContactNumberAlreadyExists
    ) {
      const response = NextResponse.json(
        {
          success: false,
          error: isBrandNameAlreadyExists
            ? "Brand name already exists"
            : isContactEmailAlreadyExists
            ? "Contact email already exists"
            : "Contact number already exists",
        },
        { status: 400 }
      );

      return response;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        brandName,
        contactEmail,
        contactNumber,
        userRole: "seller",
      },
      { new: true }
    );

    const data = {
      user: {
        id: user._id,
        name: user.name,
        userRole: "seller",
        brandName: user.brandName,
        avatar: user.avatar,
      },
    };

    const authToken = sign(data, process.env.JWT_SECRET!, {
      expiresIn: 60 * 60 * 24 * 5,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Credentials updated successfully",
      },
      { status: 200 }
    );

    response.cookies.set("authToken", authToken);

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
