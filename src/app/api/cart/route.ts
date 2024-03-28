import { authTokenType } from "@/lib/types/authToken-type";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import User from "@/lib/model/usersSchema";
import Products from "@/lib/model/productSchema";

const getProductById = async (productIds: string[]) => {
    const products = await Promise.all(productIds.map(async (str: any) => {
        const product = await Products.findById(str).select("product_name current_price primaryImgUrl");
        return product;
    }));

    return products;
};

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
        const cart = await User.findById(verifiedToken.user.id).select("cart");

        if (!cart) {
            return NextResponse.json({ error: "No user found with this id", success: false }, { status: 400 });
        };

        const cartProducts = await getProductById(cart.cart);

        return NextResponse.json({
            success: true,
            cartProducts
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    };
};

export async function POST(req: NextRequest) {
    try {
        const { productId } = await req.json();

        if (!productId) return NextResponse.json({ error: "Invalid request", problem: "Didn't get product id", success: false }, { status: 401 });

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
        const cart = await User.findByIdAndUpdate(verifiedToken.user.id, { $push: { cart: productId } }, { new: true })
            .select("cart");

        if (!cart) {
            return NextResponse.json({ error: "No user found with this id", success: false }, { status: 400 });
        };

        const cartProducts = await getProductById(cart.cart);

        return NextResponse.json({
            success: true,
            cartProducts
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    };
};

export async function DELETE(req: NextRequest) {
    try {
        const { productId } = await req.json();

        if (!productId) return NextResponse.json({ error: "Invalid request", problem: "Didn't get product id", success: false }, { status: 401 });

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
        const cart = await User.findByIdAndUpdate(verifiedToken.user.id, { $pull: { cart: productId } }, { new: true })
            .select("cart");

        if (!cart) {
            return NextResponse.json({ error: "No user found with this id", success: false }, { status: 400 });
        };

        const cartProducts = await getProductById(cart.cart);

        return NextResponse.json({
            success: true,
            cartProducts
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", problem: error.message, success: false }, { status: 500 });
    };
};