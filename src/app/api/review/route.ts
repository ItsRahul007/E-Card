import { NextRequest, NextResponse } from "next/server";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import Products from "@/lib/model/productSchema";
import { checkAuth } from "@/lib/util/checkAuth";
import { ApiErrorMessage, MissingRequiredFields, alreadyReviewed, invalidCriteria, noReviewsFound, productNotFoundById } from "@/lib/util/apiMessages";

export async function GET(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get("productId")!;

        const reviewes = await Products.findById(productId).select("ratings");

        if (!reviewes) {
            return NextResponse.json({
                success: false,
                error: noReviewsFound,
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
            error: ApiErrorMessage,
            problem: error.message,
        }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const { productId, ratingNumber, comment } = await req.json();

        const isUserAuthenticated = checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        if (!productId || !ratingNumber || !comment) {
            return NextResponse.json({ error: invalidCriteria, problem: MissingRequiredFields, success: false }, { status: 400 });
        }

        await connectWithMongo();

        //! if the given productId is not exists
        const isProductIdExists = await Products.findById(productId).select("ratings");
        if (!isProductIdExists) {
            return NextResponse.json({
                success: false,
                error: productNotFoundById
            }, { status: 400 });
        };

        //! if user already did any review comment
        if (isProductIdExists.ratings.some((rating: any) => rating.ratingBy === userId)) {
            return NextResponse.json({
                success: false,
                error: alreadyReviewed
            }, { status: 400 });
        };

        const newReviewObj = {
            ratingBy: userId,
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
            error: ApiErrorMessage,
            problem: error.message,
        }, { status: 500 });
    }
}