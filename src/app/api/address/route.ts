import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { authTokenType } from "@/lib/types/authToken-type";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
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

        await connectWithMongo();
        const { addresses } = await User.findById(verifiedToken.user.id).select("addresses");

        if (!addresses) {
            return NextResponse.json({ error: "No user found with this id", success: false }, { status: 400 });
        };

        return NextResponse.json({ success: true, addresses }, { status: 200 });


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    };
};

export async function POST(req: NextRequest) {
    try {
        const { addresses } = await req.json();
        let updateObject: any = {};

        if (!addresses || !(addresses.full_name && addresses.phone_number && addresses.address)) {
            return NextResponse.json({ error: "Invalid address", success: false }, { status: 400 });
        }
        else if (addresses.phone_number.length < 10) {
            return NextResponse.json({ error: "Invalid phone number", success: false }, { status: 400 })
        }
        else if (addresses && (addresses.full_name && addresses.phone_number && addresses.address)) {
            updateObject.$push = { addresses };
        }

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

        await connectWithMongo();
        const responce = await User.findByIdAndUpdate(verifiedToken.user.id, updateObject, { new: true }).select("addresses");

        if (!responce) {
            return NextResponse.json({ error: "No user found with this id", success: false }, { status: 400 });
        };

        return NextResponse.json({
            success: true,
            addresses: responce,
            message: "Address added successfully"
        }, { status: 200 }
        );

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    };
}

export async function PUT(req: NextRequest) {
    try {
        const { addresses } = await req.json();
        let updateObject: any = {};

        if (!addresses) {
            return NextResponse.json({ error: "Invalid address", success: false }, { status: 400 });
        }

        const { full_name, phone_number, address } = addresses;

        if (!full_name || !phone_number || !address) {
            return NextResponse.json({ error: "Invalid address", success: false }, { status: 400 });
        }
        else if (phone_number.length < 10) {
            return NextResponse.json({ error: "Invalid phone number", success: false }, { status: 400 })
        }
        else if (addresses && (full_name && phone_number && address)) {
            updateObject.$set = { "addresses.$[elem]": { full_name, phone_number, address } };
        }

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

        await connectWithMongo();
        const responce = await User.findByIdAndUpdate(verifiedToken.user.id, updateObject, { new: true, arrayFilters: [{ "elem._id": JSON.parse(addresses._id) }] }).select("addresses");

        if (!responce) {
            return NextResponse.json({ error: "No user found with this id", success: false }, { status: 400 });
        };

        return NextResponse.json({
            success: true,
            addresses: responce,
            message: "Address updated successfully"
        }, { status: 200 }
        );

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    };


}

export async function DELETE(req: NextRequest) {
    try {
        const { addresses } = await req.json();

        if (!addresses._id) {
            return NextResponse.json({ error: "Invalid address", success: false }, { status: 400 });
        }

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

        await connectWithMongo();
        const responce = await User.findByIdAndUpdate(verifiedToken.user.id, { $pull: { addresses: { _id: JSON.parse(addresses._id) } } }, { new: true }).select("addresses");

        if (!responce) {
            return NextResponse.json({ error: "No user found with this id", success: false }, { status: 400 });
        };

        return NextResponse.json({
            success: true,
            addresses: responce,
            message: "Address deleted successfully"
        }, { status: 200 }
        );

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    }
}