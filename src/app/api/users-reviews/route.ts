import Products from "@/lib/model/productSchema";
import { ApiErrorMessage, noReviewsFound } from "@/lib/util/apiMessages";
import { checkAuth } from "@/lib/util/checkAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const isUserAuthenticated = await checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };

        const { userId } = isUserAuthenticated;

        const productsWithUserReviews = await Products.find({ 'ratings.ratingBy': userId });

        if (!productsWithUserReviews) {
            return NextResponse.json({
                success: false,
                error: noReviewsFound,
            }, { status: 404 });
        }


        //? Extract and return the reviews for the user
        const userReviews = productsWithUserReviews.map(product => {
            return product.ratings.filter((review: any) => review.ratingBy === userId).map((review: any) => {
                return {
                    primaryImgUrl: product.primaryImgUrl,
                    productId: product._id,
                    ...review.toObject()
                };
            });
        }).flat();

        return NextResponse.json({
            success: true,
            data: userReviews || [],
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