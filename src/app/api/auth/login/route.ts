import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import isValidEmail from "@/lib/emailChecker";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import User from "@/lib/model/usersSchema";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        //! If not of email and password or it's an valid email
        if (!email || !password) {
            return NextResponse.json({ error: "Invalid criteria", success: false }, { status: 401 });
        } else if (!isValidEmail(email)) {
            return NextResponse.json({ error: "Invalid email", success: false }, { status: 401 });
        };

        //* First connect the mongo then login user
        await connectWithMongo();

        //! If the given email dosen't exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "No user exist with this email", success: false }, { status: 400 });
        };

        //* Comparing the given password and stored password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return NextResponse.json({ error: "Wrong password", success: false }, { status: 400 });
        };

        const data = {
            user: {
                id: user.id
            }
        };

        const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

        //* Creating and sending an authentication token in responce
        if (!JWT_SECRET) {
            return NextResponse.json({ error: "Unable to finde JWT_SECRET", success: false }, { status: 500 });
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        return NextResponse.json({
            success: true,
            authToken
        }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error", problem: error, success: false }, { status: 500 });
    }
};