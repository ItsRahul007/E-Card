import { NextRequest, NextResponse } from "next/server";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import ProductsSchema from "@/lib/model/productSchema";

//? for getting all products
export async function GET(req: NextRequest) {
    try {
        await connectWithMongo();
        const pageNumber = Number(req.nextUrl.searchParams.get("page")) || 1;
        const itemNumber = 10;
        //! compares the first and second numbers and returns the biggest number
        const skipNumber = Math.max((pageNumber - 1) * itemNumber, 0);

        const products = await ProductsSchema.find().sort({ _id: -1 }).skip(skipNumber).limit(itemNumber);

        return NextResponse.json({
            success: true,
            products
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
};

//? for adding a new product
export async function POST(req: NextRequest) {
    //! if the primary image or secondry images are empty strings
    function checkIsImageUrlEmptyString(primaryImage: string, secondaryImage: string[]): { success: boolean, error?: string } {
        if (primaryImage.length === 0) {
            return { success: false, error: "Primary image url is empty" };
        } else {
            for (const str of secondaryImage) {
                if (str === '') {
                    return { success: false, error: "Secondary image url is empty" };
                } else if (str === primaryImage) return { success: false, error: "Primary image url and secondry image url is same" };
            }
        }
        return { success: true };
    }
    try {
        const {
            product_name,
            primaryImgUrl,
            secondaryImgUrls,
            price,
            product_type,
            product_category,
            search_keys,
            brand_name,
            ratings,
            discount_percentage
        } = await req.json();
        //primaryImgUrl product_name product_category price product_type search_keys secondaryImgUrls
        //! if there is any required field data is missing
        if (
            !product_name ||
            !primaryImgUrl ||
            !secondaryImgUrls ||
            !price ||
            !product_type ||
            !product_category ||
            !search_keys ||
            !discount_percentage
        ) {
            return NextResponse.json({
                success: false,
                error: "Required field invalid",
            }, { status: 404 });
        }

        //! if there is more than or less than three secondry images
        if (secondaryImgUrls.length > 3 || secondaryImgUrls.length < 3) {
            return NextResponse.json({
                error: "Three secondry images required",
                success: false,
            }, { status: 400 });
        }

        const urlCkeck = checkIsImageUrlEmptyString(primaryImgUrl, secondaryImgUrls);
        if (!urlCkeck.success) {
            return NextResponse.json({
                success: false,
                error: urlCkeck.error
            }, { status: 400 });
        }

        await connectWithMongo();

        //! if the given primaryImgUrl is already exists
        const isPrimaryImgExists = await ProductsSchema.findOne({ primaryImgUrl });
        if (isPrimaryImgExists) {
            return NextResponse.json({
                success: false,
                error: "Given primary image already exists"
            }, { status: 400 });
        }

        //? adding new product
        const product = await ProductsSchema.create({
            product_name,
            primaryImgUrl,
            secondaryImgUrls,
            price,
            product_type,
            product_category,
            search_keys,
            brand_name: brand_name || "Unknown",
            ratings: ratings || [],
            discount_percentage
        });

        return NextResponse.json({
            message: "Product added successfully",
            success: true,
            product
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "Internal server error",
        }, { status: 500 });
    }
}