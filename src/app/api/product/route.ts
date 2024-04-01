import { NextRequest, NextResponse } from "next/server";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import ProductsSchema from "@/lib/model/productSchema";
import { ProductType } from "@/lib/types/productTyps";
import { ApiErrorMessage, emptyPrimaryImgUrl, invalidCriteria, primartAndSecondryUrlSame, productAdded, secondaryPrimaryImgUrl, threeImgsRequired } from "@/lib/util/apiMessages";

//? for getting all products
export async function GET(req: NextRequest) {
    try {
        const pageNumber = Number(req.nextUrl.searchParams.get("page")) || 1;
        const itemNumber = 10;
        const search = req.nextUrl.searchParams.get("search") || undefined;
        const price = req.nextUrl.searchParams.get("price") || undefined;

        //? compares the first and second numbers and returns the biggest number
        const skipNumber = Math.max((pageNumber - 1) * itemNumber, 0);

        const selectText = "product_name primaryImgUrl current_price ratings discount_percentage";

        await connectWithMongo();
        //? finding products according to the search key and price
        const getProducts = async (): Promise<ProductType[]> => {
            if (!search && !price) {
                return await ProductsSchema.find().sort({ _id: -1 }).skip(skipNumber).limit(itemNumber).select(selectText);
            }
            else if (search && (search.includes("for men") || search.includes("for women")) && !price) {
                const otherSearchTerm = search.replace("for men", "").replace("for women", "").trim().toLowerCase();
                const searchCategory = search.includes("women") ? "women" : "men";

                return await ProductsSchema.find({
                    product_category: searchCategory,
                    search_keys: { $in: [otherSearchTerm] }
                })
                    .sort({ _id: -1 }).skip(skipNumber).limit(itemNumber).select(selectText);
            }
            else if (search && (search.includes("for men") || search.includes("for women")) && price) {
                const numbers = price.match(/\d+/g);
                const values = numbers?.map(Number);

                return await ProductsSchema.find({
                    product_category: search.includes("women") ? "women" : "men",
                    current_price: { $gte: values?.[0], $lte: values?.[1] }
                }).sort({ _id: -1 }).skip(skipNumber).limit(itemNumber).select(selectText);
            }
            else if (!search && price) {
                const numbers = price.match(/\d+/g);
                const values = numbers?.map(Number);

                return await ProductsSchema.find({
                    current_price: {
                        $gte: values?.[0],
                        $lte: values?.[1]
                    }
                })
                    .sort({ _id: -1 }).skip(skipNumber).limit(itemNumber).select(selectText);
            }
            else if (search && price) {
                const numbers = price.match(/\d+/g);
                const values = numbers?.map(Number);

                return await ProductsSchema.find({ search_keys: { $in: [search] }, current_price: { $gte: values?.[0], $lte: values?.[1] } })
                    .sort({ _id: -1 }).skip(skipNumber).limit(itemNumber).select(selectText);
            }
            else {
                return await ProductsSchema.find({ search_keys: { $in: [search] } }).sort({ _id: -1 }).skip(skipNumber).limit(itemNumber).select(selectText);
            };
        };

        const products = await getProducts();

        return NextResponse.json({
            success: true,
            products
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

//? for adding a new product
export async function POST(req: NextRequest) {
    //! if the primary image or secondry images are empty strings
    function checkIsImageUrlEmptyString(primaryImage: string, secondaryImage: string[]): { success: boolean, error?: string } {
        if (primaryImage.length === 0) {
            return { success: false, error: emptyPrimaryImgUrl };
        } else {
            for (const str of secondaryImage) {
                if (str === '') {
                    return { success: false, error: secondaryPrimaryImgUrl };
                } else if (str === primaryImage) return { success: false, error: primartAndSecondryUrlSame };
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
                error: invalidCriteria,
            }, { status: 404 });
        }

        //! if there is more than or less than three secondry images
        if (secondaryImgUrls.length > 3 || secondaryImgUrls.length < 3) {
            return NextResponse.json({
                error: threeImgsRequired,
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
            discount_percentage,
            current_price: price - (price * discount_percentage / 100),
        });

        return NextResponse.json({
            message: productAdded,
            success: true,
            product
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: ApiErrorMessage,
            problem: error.message,
        }, { status: 500 });
    }
}