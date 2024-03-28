import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import isValidEmail from "@/lib/emailChecker";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import User from "@/lib/model/usersSchema";
import { authTokenType } from "@/lib/types/authToken-type";

export async function POST(req: NextRequest) {
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

        const responce = NextResponse.json({
            success: true,
            authToken
        }, { status: 200 });

        responce.cookies.set("authToken", authToken, { maxAge: 60 * 60 * 24 * 5, httpOnly: true })

        return responce;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    }
};

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
            return NextResponse.json({ error: "Invalid request nothing to update", success: false }, { status: 400 });
        };

        //! If no auth token found in cookies
        const authToken = req.cookies.get("authToken");
        if (!authToken) {
            return NextResponse.json({ error: "Unauthenticated user", problem: "Didn't get auth token", success: false }, { status: 401 });
        };

        //! verifying the auth token
        const verifiedToken = jwt.verify(authToken.value, process.env.JWT_SECRET!) as authTokenType;
        if (!verifiedToken) {
            return NextResponse.json({ error: "Invalid token", success: false }, { status: 401 });
        };

        let objectKeysStr = "";
        Object.keys(updateObject).map(str => {
            const objectKeys = objectKeysStr.length > 1 ?
                objectKeysStr + " " + str
                : objectKeysStr + str;

            objectKeysStr = objectKeys;
        });

        await connectWithMongo();
        const updatedData = await User.findByIdAndUpdate(verifiedToken.user.id, updateObject, { new: true }).select(objectKeysStr);

        if (!updatedData) {
            return NextResponse.json({ error: "No user found with this id", success: false }, { status: 400 });
        };

        return NextResponse.json({
            success: true,
            message: "Updated successfully",
            updatedData
        }, { status: 200 });


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    };
};