import { NextRequest, NextResponse } from "next/server";
import ProductsSchema from "@/app/lib/model/productSchema";
import connectWithMongo from "@/app/lib/mongoConnection/mongoConnect";

// //? for getting a single product
export async function GET(req: NextRequest) {
    try {
        const productId = String(req.nextUrl.searchParams.get("productId"));
        // console.log(productId);

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