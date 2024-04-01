import { NextRequest, NextResponse } from "next/server";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import User from "@/lib/model/usersSchema";
import Products from "@/lib/model/productSchema";
import { checkAuth } from "@/lib/util/checkAuth";
import { ApiErrorMessage, didNotGetProductId, invalidRequest, productAlreadyExistsInCart, userNotFound } from "@/lib/util/apiMessages";

const getProductById = async (productIds: string[]) => {
    const products = await Promise.all(productIds.map(async (str: any) => {
        const product = await Products.findById(str).select("product_name current_price primaryImgUrl");
        return product;
    }));

    return products;
};

export async function GET(req: NextRequest) {
    try {
        const isUserAuthenticated = checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        await connectWithMongo();
        const cart = await User.findById(userId).select("cart");

        if (!cart) {
            return NextResponse.json({ error: userNotFound, success: false }, { status: 400 });
        };

        const cartProducts = await getProductById(cart.cart);

        return NextResponse.json({
            success: true,
            cartProducts
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: ApiErrorMessage, problem: error.message, success: false }, { status: 500 });
    };
};

export async function POST(req: NextRequest) {
    try {
        const { productId } = await req.json();

        if (!productId) return NextResponse.json({ error: invalidRequest, problem: didNotGetProductId, success: false }, { status: 401 });

        const isUserAuthenticated = checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        await connectWithMongo();

        const allCartItems = await User.findById(userId).select("cart");
        if (!allCartItems) {
            return NextResponse.json({ error: userNotFound, success: false }, { status: 400 });
        };

        //! if the given product id is already exists
        if (allCartItems.cart.includes(productId)) {
            return NextResponse.json({ error: productAlreadyExistsInCart, success: false }, { status: 400 });
        };

        const updatedCart = await User.findByIdAndUpdate(userId, { $push: { cart: productId } }, { new: true })
            .select("cart");

        const cartProducts = await getProductById(updatedCart.cart);

        return NextResponse.json({
            success: true,
            cartProducts
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: ApiErrorMessage, problem: error.message, success: false }, { status: 500 });
    };
};

export async function DELETE(req: NextRequest) {
    try {
        const { productId } = await req.json();

        if (!productId) return NextResponse.json({ error: invalidRequest, problem: didNotGetProductId, success: false }, { status: 401 });

        const isUserAuthenticated = checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        await connectWithMongo();
        const cart = await User.findByIdAndUpdate(userId, { $pull: { cart: productId } }, { new: true })
            .select("cart");

        if (!cart) {
            return NextResponse.json({ error: userNotFound, success: false }, { status: 400 });
        };

        const cartProducts = await getProductById(cart.cart);

        return NextResponse.json({
            success: true,
            cartProducts
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: ApiErrorMessage, problem: error.message, success: false }, { status: 500 });
    };
};