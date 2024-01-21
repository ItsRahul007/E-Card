import { NextRequest, NextResponse } from "next/server";
import ProductsSchema from "@/app/lib/model/productSchema";
import connectWithMongo from "@/app/lib/mongoConnection/mongoConnect";

//? for getting all products or a single product
export async function GET(req: NextRequest) {
    try {
        await connectWithMongo();
        const pageNumber = Number(req.nextUrl.searchParams.get("page")) || 1;
        const itemNumber = 8;
        //! compares the first and second numbers and returns the biggest number
        const skipNumber = Math.max((pageNumber - 1) * itemNumber, 0);

        const products = await ProductsSchema.find().skip(skipNumber).limit(itemNumber);

        return NextResponse.json({
            success: true,
            products
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "Internal server error",
        }, { status: 500 });
    }
};

//? for adding a new product
export async function POST(req: NextRequest) {
    try {
        const {
            product_name,
            primaryImgUrl,
            secondryImgUrls,
            price,
            product_type,
            product_category,
            search_keys,
            brand_name
        } = await req.json();

        //! if there is some or any required field data is missing
        if (
            !product_name ||
            !primaryImgUrl ||
            !secondryImgUrls ||
            !price ||
            !product_type ||
            !product_category ||
            !search_keys
        ) {
            return NextResponse.json({
                success: false,
                message: "Required field invalid",
            }, { status: 404 });
        }

        //! if there is more than or less than three secondry images
        if (secondryImgUrls.length > 3 || secondryImgUrls.length < 3) {
            return NextResponse.json({
                message: "Three secondry images required",
                success: false,
            }, { status: 400 });
        }

        await connectWithMongo();

        //! if the given primaryImgUrl is already exists
        const isPrimaryImgExists = await ProductsSchema.findOne({ primaryImgUrl });
        if (isPrimaryImgExists) {
            return NextResponse.json({
                success: false,
                message: "Given primary image already exists"
            }, { status: 400 });
        }

        //? adding new product
        await ProductsSchema.create({
            product_name,
            primaryImgUrl,
            secondryImgUrls,
            price,
            product_type,
            product_category,
            search_keys,
            brand_name: brand_name || "Unknown",
        });

        return NextResponse.json({
            message: "Product added successfully",
            success: true,
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "Internal server error",
        }, { status: 500 });
    }
}