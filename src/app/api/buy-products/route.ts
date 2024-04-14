import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/util/checkAuth";
import Orders from "@/lib/model/ordersSchema";
import { ApiErrorMessage, MissingRequiredFields } from "@/lib/util/apiMessages";
import { Order, T_orderObj, routeProduct } from "@/lib/types/orderTypes";

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
            payment_type,
            total_discount,
            tax,
            delivary_status
        }: T_orderObj = await req.json();

        if (!shipping_address || !products || products.length <= 0 || !total_price || !payment_type) {
            return NextResponse.json({
                error: MissingRequiredFields,
                success: false
            }, { status: 400 });
        };

        if (shipping_address.phone_number.toString().length !== 10) {
            return NextResponse.json({
                error: "Invalid phone number",
                success: false
            }, { status: 400 });
        };

        const modifiedProducts: routeProduct[] = products.map(obj => {
            const { _id, current_price, primaryImgUrl, product_name, quantity = 1 } = obj;

            return {
                product_id: _id,
                primaryImgUrl,
                product_name,
                quantity,
                product_price: current_price
            };
        });

        const orderObj: Order = {
            customer_id: userId!,
            shipping_address,
            products: modifiedProducts,
            total_price,
            total_discount,
            payment_type,
            tax
        };

        if (delivary_status) orderObj.delivary_status = delivary_status;

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