import Products from "@/lib/model/productSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { product_type, product_category } = await req.json();
        const selectText = "product_name primaryImgUrl current_price ratings discount_percentage";

        //! if not of required fields
        if (!product_type || !product_category) {
            return NextResponse.json({ error: "Missing required fields", success: false }, { status: 400 });
        }

        await connectWithMongo();
        const relatedProducts = await Products.find({
            product_type,
            product_category,
        }).limit(5).select(selectText);

        return NextResponse.json({ success: true, relatedProducts }, { status: 200 });


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "Internal server error",
            problem: error.message,
        }, { status: 500 });
    }
}