import isValidEmail from "@/app/lib/emailChecker";
import User from "@/app/lib/model/usersSchema";
import connectWithMongo from "@/app/lib/mongoConnection/mongoConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        //! If not of email and password or it's an valid email
        if (!email || !password) {
            return NextResponse.json({ error: "Invalid criteria" }, { status: 401 });
        } else if (!isValidEmail(email)) {
            return NextResponse.json({ error: "Invalid email" }, { status: 401 });
        };

        //* First connect the mongo then login user
        await connectWithMongo();

        //! If the dosen't email exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "No user exist with this email" }, { status: 400 });
        }

        //* Comparing the given password and stored password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return NextResponse.json({ errors: "Wrong password" }, { status: 400 });
        };

        const data = {
            user: {
                id: user.id
            }
        };

        const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

        // Creating and sending an authentication token in responce
        if (!JWT_SECRET) {
            return NextResponse.json({ error: "Unable to finde JWT_SECRET" }, { status: 500 });
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        return NextResponse.json({
            authToken
        }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error", problem: error }, { status: 500 });
    }
};