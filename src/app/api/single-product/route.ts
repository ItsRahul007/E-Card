import { NextRequest, NextResponse } from "next/server";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import ProductsSchema from "@/lib/model/productSchema";
import { ApiErrorMessage, productNotFound } from "@/lib/util/apiMessages";

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

        const product = await ProductsSchema.findById(productId).select("-updatedAt -createdAt -brand_name -__v");

        if (!product) {
            return NextResponse.json({
                success: false,
                error: productNotFound
            }, { status: 400 });
        }

        console.log(product);

        return NextResponse.json({
            success: true,
            product
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: ApiErrorMessage,
            problem: error.message,
        }, { status: 500 });
    }
};

// export async function POST() {
//     try {
//         await connectWithMongo();
//         const allProductsIds = await ProductsSchema.find().select("_id price discount_percentage");

//         allProductsIds.map(async (obj) => {
//             const { _id, price, discount_percentage } = obj;
//             const current_price = price - (price * discount_percentage / 100);
//             await ProductsSchema.findByIdAndUpdate(_id, { $set: { current_price } }, { new: true });

//         })

//         const allProducts = await ProductsSchema.find();

//         return NextResponse.json({
//             allProducts
//         });

//     } catch (error: any) {
//         console.log(error);
//         return NextResponse.json({
//             success: false,
//             error: error.message,
//         }, { status: 500 });
//     }
// }