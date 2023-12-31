import { NextRequest, NextResponse } from "next/server";
import ProductsSchema from "@/app/lib/model/productSchema";
import connectWithMongo from "@/app/lib/mongoConnection/mongoConnect";

export async function GET(req: NextRequest ) {
    try {
        const requestHeaders = new Headers(req.headers);
        const AUTH_TOKEN = requestHeaders.get('AUTH_TOKEN');

        if (!AUTH_TOKEN) return NextResponse.json({
            error: "Not a authenticated request",
            success: false
        }, { status: 401 });

        const parsedAuthToken = JSON.parse(AUTH_TOKEN);

        if (parsedAuthToken !== process.env.AUTH_TOKEN) {
            return NextResponse.json({
                error: "Not a authenticated request",
                success: false
            }, { status: 401 });
        };

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
        }, {status: 500});
    }
};