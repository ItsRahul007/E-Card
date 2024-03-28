import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import isValidEmail from "@/lib/emailChecker";
import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        //! If not of name, email and password or it's an invalid email
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Invalid criteria" }, { status: 401 });
        } else if (!isValidEmail(email)) return NextResponse.json({ error: "Invalid email" }, { status: 401 });

        //* First connect the mongo then create a new user and save it
        await connectWithMongo();

        //! If the email already exists
        const isEmailAlreadyExist = await User.findOne({ email });
        if (isEmailAlreadyExist) {
            return NextResponse.json({ error: "A user with this email already exists", success: false }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        // hashing password and adding salt with it
        const secPas = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: secPas });

        const data = {
            user: {
                id: user.id
            }
        };

        const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

        // Creating and sending an authentication token in responce
        if (!JWT_SECRET) {
            return NextResponse.json({ error: "Unable to finde JWT_SECRET", success: false }, { status: 500 });
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        const responce = NextResponse.json({
            success: true,
            authToken,
        }, { status: 200 });

        responce.cookies.set("authToken", authToken, { maxAge: 60 * 60 * 24 * 5, httpOnly: true });

        return responce;
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error", problem: error, success: false }, { status: 500 });
    }
};