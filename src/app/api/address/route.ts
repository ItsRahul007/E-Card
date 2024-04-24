import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/util/checkAuth";
import { ApiErrorMessage, addressAddedSuccessfully, addressDeletedSuccessfully, addressUpdatedSuccessfully, invalidAddress, invalidPhoneNumber, userNotFound } from "@/lib/util/apiMessages";

export async function GET(req: NextRequest) {
    try {
        const isUserAuthenticated = await checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        await connectWithMongo();
        const { addresses } = await User.findById(userId).select("addresses");

        if (!addresses) {
            return NextResponse.json({ error: userNotFound, success: false }, { status: 400 });
        };

        return NextResponse.json({ success: true, addresses }, { status: 200 });


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: ApiErrorMessage, problem: error.message, success: false }, { status: 500 });
    };
};

export async function POST(req: NextRequest) {
    try {
        const { addresses } = await req.json();
        let updateObject: any = {};

        if (!addresses || !(addresses.full_name && addresses.phone_number && addresses.address)) {
            return NextResponse.json({ error: invalidAddress, success: false }, { status: 400 });
        }
        else if (addresses.phone_number.length < 10) {
            return NextResponse.json({ error: invalidPhoneNumber, success: false }, { status: 400 })
        }
        else if (addresses && (addresses.full_name && addresses.phone_number && addresses.address)) {
            updateObject.$push = { addresses };
        }

        const isUserAuthenticated = await checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        await connectWithMongo();
        const responce = await User.findByIdAndUpdate(userId, updateObject, { new: true }).select("addresses");

        if (!responce) {
            return NextResponse.json({ error: userNotFound, success: false }, { status: 400 });
        };

        return NextResponse.json({
            success: true,
            addresses: responce,
            message: addressAddedSuccessfully
        }, { status: 200 }
        );

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: ApiErrorMessage, problem: error.message, success: false }, { status: 500 });
    };
}

export async function PUT(req: NextRequest) {
    try {
        const { addresses } = await req.json();
        let updateObject: any = {};

        if (!addresses) {
            return NextResponse.json({ error: invalidAddress, success: false }, { status: 400 });
        }

        const { full_name, phone_number, address } = addresses;

        if (!full_name || !phone_number || !address) {
            return NextResponse.json({ error: invalidAddress, success: false }, { status: 400 });
        }
        else if (phone_number.length < 10) {
            return NextResponse.json({ error: invalidPhoneNumber, success: false }, { status: 400 })
        }
        else if (addresses && (full_name && phone_number && address)) {
            updateObject.$set = { "addresses.$[elem]": { full_name, phone_number, address } };
        }

        const isUserAuthenticated = await checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        await connectWithMongo();
        const responce = await User.findByIdAndUpdate(userId, updateObject, { new: true, arrayFilters: [{ "elem._id": JSON.parse(addresses._id) }] }).select("addresses");

        if (!responce) {
            return NextResponse.json({ error: userNotFound, success: false }, { status: 400 });
        };

        return NextResponse.json({
            success: true,
            addresses: responce,
            message: addressUpdatedSuccessfully
        }, { status: 200 }
        );

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: ApiErrorMessage, problem: error.message, success: false }, { status: 500 });
    };


}

export async function DELETE(req: NextRequest) {
    try {
        const { addresses } = await req.json();

        if (!addresses._id) {
            return NextResponse.json({ error: invalidAddress, success: false }, { status: 400 });
        }

        const isUserAuthenticated = await checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        await connectWithMongo();
        const responce = await User.findByIdAndUpdate(userId, { $pull: { addresses: { _id: JSON.parse(addresses._id) } } }, { new: true }).select("addresses");

        if (!responce) {
            return NextResponse.json({ error: userNotFound, success: false }, { status: 400 });
        };

        return NextResponse.json({
            success: true,
            addresses: responce,
            message: addressDeletedSuccessfully
        }, { status: 200 }
        );

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: ApiErrorMessage, problem: error.message, success: false }, { status: 500 });
    }
}