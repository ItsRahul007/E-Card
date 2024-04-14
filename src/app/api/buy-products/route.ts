import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/util/checkAuth";
import Orders from "@/lib/model/ordersSchema";
import { ApiErrorMessage, MissingRequiredFields, alreadyPaid, didNotGetOrderid, invalidRequest, notValidId } from "@/lib/util/apiMessages";
import { Order, T_orderObj, routeProduct } from "@/lib/types/orderTypes";
import { serverSideStripe } from "@/lib/util/stripe/stripe";
import { decode, sign } from "jsonwebtoken";
import { hasSymbols } from "@/lib/util/emailChecker";
import { isValidObjectId } from "mongoose";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";

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
            tax,
            is_paid: false
        };

        if (delivary_status) orderObj.delivary_status = delivary_status;

        const newOrder = await Orders.create(orderObj);

        const encriptedOrderId = sign(newOrder._id.toString(), process.env.JWT_SECRET!);

        //? after saving the order we will redirect user to payment
        if (payment_type === "stripe") {
            const session = await serverSideStripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${process.env.DOMAIN}/profile/orders?payment=success&orderId=` + encriptedOrderId,
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

            return NextResponse.json({
                url: session.url,
                success: true
            }, { status: 201 });
        };

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
        const { orderId, is_paid } = await req.json();

        if (!orderId) {
            return NextResponse.json({
                success: false,
                error: invalidRequest,
                problem: didNotGetOrderid
            }, { status: 400 });
        };

        const decodedProductId = decode(orderId);

        //? checking if the id have symbol or not
        const isProductIdHaveSymbol = hasSymbols(decodedProductId?.toString());

        //? checking if the id valid or not
        const isValidMongooDBId = !isProductIdHaveSymbol && isValidObjectId(decodedProductId);

        if (!isValidMongooDBId) {
            return NextResponse.json({
                success: false,
                error: invalidRequest,
                problem: notValidId
            }, { status: 400 });
        };

        await connectWithMongo();

        const order = await Orders.findById(decodedProductId);

        if (order.is_paid) {
            return NextResponse.json({
                success: false,
                error: invalidRequest,
                problem: alreadyPaid
            }, { status: 400 });
        }
        order.is_paid = is_paid;
        await order.save();

        return NextResponse.json({
            success: true
        }, { status: 200 });


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            error: ApiErrorMessage,
            problem: error.message,
            success: false
        }, { status: 500 });
    };
}