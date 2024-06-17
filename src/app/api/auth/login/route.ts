import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import isValidEmail from "@/lib/util/emailChecker";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import User from "@/lib/model/usersSchema";
import {
  ApiErrorMessage,
  MissingRequiredFields,
  addressUpdatedSuccessfully,
  invalidCriteria,
  invalidEmail,
  userNotFound,
  wrongPassword,
} from "@/lib/util/apiMessages";
import { checkAuth } from "@/lib/util/checkAuth";

export async function GET(req: NextRequest) {
  try {
    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    await connectWithMongo();
    const response = await User.findById(isUserAuthenticated.userId).select(
      "-password"
    );

    return NextResponse.json(
      { success: true, user: response },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: ApiErrorMessage, problem: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    //! If not of email and password or it's an valid email
    if (!email || !password) {
      return NextResponse.json(
        { error: invalidCriteria, success: false },
        { status: 401 }
      );
    } else if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: invalidEmail, success: false },
        { status: 401 }
      );
    }

    //* First connect the mongo then login user
    await connectWithMongo();

    //! If the given email dosen't exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: userNotFound, success: false },
        { status: 400 }
      );
    }

    //* Comparing the given password and stored password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return NextResponse.json(
        { error: wrongPassword, success: false },
        { status: 400 }
      );
    }

    const data = {
      user: {
        id: user._id,
        name: user.name,
        userRole: user.userRole,
        brandName: user.brandName || "",
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET;

    const authToken = sign(data, JWT_SECRET!);

    const responce = NextResponse.json(
      {
        success: true,
        authToken,
      },
      { status: 200 }
    );

    responce.cookies.set("authToken", authToken, {
      maxAge: 60 * 60 * 24 * 5,
      httpOnly: true,
    });

    return responce;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: ApiErrorMessage, problem: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userRole, name, mobile_number, orders } = await req.json();
    let updateObject: any = {};

    //! adding the given values in a object
    if (userRole) updateObject.userRole = userRole;
    if (name) updateObject.name = name;
    if (mobile_number) updateObject.mobile_number = mobile_number;
    if (orders) updateObject.$push = { orders: orders };

    //! If didn't get anything from body
    if (Object.keys(updateObject).length === 0) {
      return NextResponse.json(
        { error: MissingRequiredFields, success: false },
        { status: 400 }
      );
    }

    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    const { userId } = isUserAuthenticated;

    await connectWithMongo();
    const updatedData = await User.findByIdAndUpdate(userId, updateObject, {
      new: true,
    }).select("_id userRole name");

    if (!updatedData) {
      return NextResponse.json(
        { error: userNotFound, success: false },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: addressUpdatedSuccessfully,
        updatedData,
      },
      { status: 200 }
    );

    const data = {
      user: {
        id: updatedData._id,
        name: updatedData.name,
        userRole: updatedData.userRole,
        brandName: updatedData.brandName || "",
      },
    };

    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

    const authToken = sign(data, JWT_SECRET!);

    response.cookies.set("authToken", authToken, { maxAge: 60 * 60 * 24 * 5 });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: ApiErrorMessage, problem: error.message, success: false },
      { status: 500 }
    );
  }
}
