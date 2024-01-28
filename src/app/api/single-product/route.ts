import { NextRequest, NextResponse } from "next/server";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import ProductsSchema from "@/lib/model/productSchema";

// //? for getting a single product
export async function GET(req: NextRequest) {
    try {
        const productId = String(req.nextUrl.searchParams.get("productId"));

        //! if not of productId
        if (!productId) {
            return NextResponse.json({
                success: false,
                error: "Product id not found"
            }, { status: 400 });
        };

        await connectWithMongo();

        const product = await ProductsSchema.findById(productId);

        if (!product) {
            return NextResponse.json({
                success: false,
                error: "Product not found"
            });
        }

        return NextResponse.json({
            success: true,
            product
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
};