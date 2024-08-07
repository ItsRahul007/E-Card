import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import isValidEmail from "@/lib/util/emailChecker";
import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import {
  ApiErrorMessage,
  invalidCriteria,
  invalidEmail,
  userAlreadyExists,
} from "@/lib/util/apiMessages";
import { getDateFromNumber } from "@/lib/util/checkAuth";
import { sendEmail } from "@/lib/server-side-actions/nodemailer";

const sendEmailVerificationCode = async (code: number, email: string) => {
  const { success, problem } = await sendEmail({
    subject: "Verify your email on E-Card",
    html: `
        <h1>Here is your verification code for verifying your email on E-Card</h1> <br>
        <strong>Code: ${code}</strong>
        <p>Please do not share this code with others.</p>
        `,
    to: email,
  });
  if (!success) {
    console.error("Failed to send email to customer: ", problem);
  }
};

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    //! If not of name, email and password or it's an invalid email
    if (!name || !email || !password) {
      return NextResponse.json({ error: invalidCriteria }, { status: 401 });
    } else if (!isValidEmail(email))
      return NextResponse.json({ error: invalidEmail }, { status: 401 });

    //* First connect the mongo then create a new user and save it
    await connectWithMongo();

    //! If the email already exists
    const isEmailAlreadyExist = await User.findOne({ email });
    if (isEmailAlreadyExist) {
      return NextResponse.json(
        { error: userAlreadyExists, success: false },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    // hashing password and adding salt with it
    const secPas = await bcrypt.hash(password, salt);

    const coupon = {
      coupon_name: "First order discount",
      coupon_code: "first-order",
      coupon_discount: 10,
      starts_on: getDateFromNumber(0),
      ends_on: getDateFromNumber(15),
      is_active: true,
    };

    //? Generate a random number between 100000 and 999999 (inclusive)
    const code = Math.floor(Math.random() * 900000) + 100000;

    const user = await User.create({
      name,
      email,
      password: secPas,
      coupons: [coupon],
      isVerified: false,
      verificationCode: code,
    });

    await sendEmailVerificationCode(code, email);

    const data = {
      user: {
        id: user._id,
        name: user.name,
        userRole: user.userRole,
        brandName: user.brandName || "",
        isVerified: false,
      },
    };

    const JWT_SECRET: string | undefined = process.env.JWT_SECRET!;

    const authToken = sign(data, JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 5,
    });

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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: ApiErrorMessage, problem: error, success: false },
      { status: 500 }
    );
  }
}
