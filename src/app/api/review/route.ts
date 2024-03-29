import { authTokenType } from "@/lib/types/authToken-type";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import Products from "@/lib/model/productSchema";

export async function GET(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get("productId")!;

        const reviewes = await Products.findById(productId).select("ratings");

        if (!reviewes) {
            return NextResponse.json({
                success: false,
                error: "No reviews found for this product",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: reviewes.ratings || [],
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "Internal server error",
            problem: error.message,
        }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const { productId, ratingNumber, comment } = await req.json();

        //! If no auth token found in cookies
        const authToken = req.cookies.get("authToken");
        if (!authToken) {
            return NextResponse.json({ error: "Unauthenticated user", problem: "Didn't get auth token", success: false }, { status: 401 });
        };

        //! verifying the auth token
        const verifiedToken = jwt.verify(authToken.value, process.env.JWT_SECRET!) as authTokenType;
        if (!verifiedToken) {
            return NextResponse.json({ error: "Invalid token", problem: "Not a valid auth token", success: false }, { status: 401 });
        };

        if (!productId || !ratingNumber || !comment) {
            return NextResponse.json({ error: "Invalid request", problem: "Missing required fields", success: false }, { status: 400 });
        }

        await connectWithMongo();

        //! if the given productId is not exists
        const isProductIdExists = await Products.findById(productId).select("ratings");
        if (!isProductIdExists) {
            return NextResponse.json({
                success: false,
                error: "Given productId is not exists"
            }, { status: 400 });
        };

        //! if user already did any review comment
        if (isProductIdExists.ratings.some((rating: any) => rating.ratingBy === verifiedToken.user.id)) {
            return NextResponse.json({
                success: false,
                error: "You have already rated this product"
            }, { status: 400 });
        };

        const newReviewObj = {
            ratingBy: verifiedToken.user.id,
            ratingNumber,
            comment,
        }

        const updatedReview = await Products.findByIdAndUpdate(productId, {
            $push: { ratings: newReviewObj }
        }, { new: true }).select("ratings");

        console.log(updatedReview.ratings);

        return NextResponse.json({
            success: true,
            data: updatedReview.ratings,
        }, { status: 200 });


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "Internal server error",
            problem: error.message,
        }, { status: 500 });
    }
}