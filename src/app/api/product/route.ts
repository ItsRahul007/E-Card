import { NextResponse } from "next/server";
import Products from "@/app/lib/model/productSchema";
import connectWithMongo from "@/app/lib/mongoConnection/mongoConnect";

export async function GET(req: Request) {
    try {
        const { AUTH_TOKEN } = await req.json();

        if (AUTH_TOKEN !== process.env.AUTH_TOKEN) {
            return NextResponse.json({
                error: "Not a authenticated request",
                success: false
            }, { status: 401 });
        };

        await connectWithMongo();

        const products = await Products.find();

        return NextResponse.json({
            success: true,
            products
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Internal server error",
        });
    }
};