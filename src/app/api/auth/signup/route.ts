import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from 'jsonwebtoken';
import isValidEmail from "@/lib/util/emailChecker";
import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { ApiErrorMessage, invalidCriteria, invalidEmail, userAlreadyExists } from "@/lib/util/apiMessages";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        //! If not of name, email and password or it's an invalid email
        if (!name || !email || !password) {
            return NextResponse.json({ error: invalidCriteria }, { status: 401 });
        } else if (!isValidEmail(email)) return NextResponse.json({ error: invalidEmail }, { status: 401 });

        //* First connect the mongo then create a new user and save it
        await connectWithMongo();

        //! If the email already exists
        const isEmailAlreadyExist = await User.findOne({ email });
        if (isEmailAlreadyExist) {
            return NextResponse.json({ error: userAlreadyExists, success: false }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        // hashing password and adding salt with it
        const secPas = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: secPas });

        const data = {
            user: {
                id: user._id
            }
        };

        const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

        const authToken = sign(data, JWT_SECRET!);

        const responce = NextResponse.json({
            success: true,
            authToken,
        }, { status: 200 });

        responce.cookies.set("authToken", authToken, { maxAge: 60 * 60 * 24 * 5, httpOnly: true });
        responce.cookies.set("userName", user.name, { maxAge: 60 * 60 * 24 * 5, httpOnly: true });

        return responce;
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: ApiErrorMessage, problem: error, success: false }, { status: 500 });
    }
};