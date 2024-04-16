import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/util/checkAuth";
import Orders from "@/lib/model/ordersSchema";
import { ApiErrorMessage, MissingRequiredFields, alreadyPaid, didNotGetOrderid, encryptedStringNotMatched, invalidRequest, notValidId, orderObjectDidNotMatched, orderPlacied, paymentFailed } from "@/lib/util/apiMessages";
import { Order, T_orderObj, routeProduct } from "@/lib/types/orderTypes";
import { serverSideStripe } from "@/lib/util/stripe/stripe";
import { decode, sign } from "jsonwebtoken";
import { hasSymbols } from "@/lib/util/emailChecker";
import { isValidObjectId } from "mongoose";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";

interface I_PUT_Req_JSON {
    order: string;
    payment_status: "pending" | "success" | "failed";
};

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

        await connectWithMongo();

        if (payment_type === "stripe") {
            const encriptedOrder = sign(JSON.stringify(orderObj), process.env.JWT_SECRET!);
            const session = await serverSideStripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${process.env.DOMAIN}/profile/orders?payment=success&order=` + encriptedOrder,
                cancel_url: `${process.env.DOMAIN}/profile/orders?payment=failed&order=` + encriptedOrder,
                line_items: products.map((obj) => {
                    const { current_price, primaryImgUrl, product_name, quantity = 1 } = obj;

                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: product_name,
                                images: [primaryImgUrl]
                            },
                            unit_amount: current_price * 100,
                        },
                        quantity
                    };
                })
            });

            const response = NextResponse.json({
                url: session.url,
                success: true
            }, { status: 201 });

            response.cookies.set('orderObject', JSON.stringify(orderObj), { httpOnly: true, maxAge: 60 * 60 });
            response.cookies.set('encriptedOrder', encriptedOrder, { httpOnly: true, maxAge: 60 * 60 });

            return response;
        };

        await Orders.create(orderObj);

        return NextResponse.json({
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
};

export async function PUT(req: NextRequest) {
    try {
        const { order, payment_status }: I_PUT_Req_JSON = await req.json();

        if (!order || !payment_status) {
            return NextResponse.json({
                success: false,
                error: invalidRequest,
                problem: didNotGetOrderid
            }, { status: 400 });
        };

        const encriptedOrder = req.cookies.get("encriptedOrder")?.value || '';
        const orderObjectInString = req.cookies.get("orderObject")?.value || '';

        if (encriptedOrder !== order) {
            return NextResponse.json({
                success: false,
                error: invalidRequest,
                problem: encryptedStringNotMatched
            }, { status: 400 });
        };

        const decodedOrderObject = decode(order) as Order;

        if (JSON.stringify(decodedOrderObject) !== orderObjectInString) {
            return NextResponse.json({
                success: false,
                error: invalidRequest,
                problem: orderObjectDidNotMatched
            }, { status: 400 });
        };

        if (payment_status === "failed") {
            const response = NextResponse.json({
                success: true,
                message: paymentFailed
            }, { status: 200 });

            response.cookies.set('orderObject', '', { httpOnly: true });
            response.cookies.set('encriptedOrder', '', { httpOnly: true });

            return response;
        };

        decodedOrderObject.payment_status = payment_status;

        await connectWithMongo();
        const newOrder = await Orders.create(decodedOrderObject);

        const response = NextResponse.json({
            success: true,
            message: orderPlacied,
            data: newOrder
        }, { status: 200 });

        response.cookies.set('orderObject', '', { httpOnly: true });
        response.cookies.set('encriptedOrder', '', { httpOnly: true });

        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            error: ApiErrorMessage,
            problem: error.message,
            success: false
        }, { status: 500 });
    };
}