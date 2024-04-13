import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/util/checkAuth";
import Orders from "@/lib/model/ordersSchema";
import { ApiErrorMessage, MissingRequiredFields } from "@/lib/util/apiMessages";

type T_orderObj = {
    shipping_address: string,
    products: string[],
    total_price: number,
    discount: number,
    payment_type: string,
    payment_status?: string,
    customer_id: string,
    discount_percentage?: number
};

//! work on this

export async function POST(req: NextRequest) {
    try {
        const isUserAuthenticated = checkAuth(req);
        if (!isUserAuthenticated.success) {
            return isUserAuthenticated.response;
        };
        const { userId } = isUserAuthenticated;

        const {
            shipping_address,
            products,
            total_price,
            discount,
            payment_type,
            payment_status,
            discount_percentage
        } = await req.json();

        if (!shipping_address || !products || products.length <= 0 || !total_price || !discount || !payment_type) {
            return NextResponse.json({
                error: MissingRequiredFields,
                success: false
            }, { status: 400 });
        };

        const orderObj: T_orderObj = {
            customer_id: userId!,
            shipping_address,
            products,
            total_price,
            discount,
            payment_type
        };

        if (payment_status) orderObj.payment_status = payment_status;
        if (discount_percentage) orderObj.discount_percentage = discount_percentage;

        const newOrder = await Orders.create(orderObj);

        console.log(newOrder);

        return NextResponse.json({
            data: newOrder,
            success: true
        }, { status: 201 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            error: ApiErrorMessage,
            problem: error.message,
            success: false
        }, { status: 500 });
    };
}