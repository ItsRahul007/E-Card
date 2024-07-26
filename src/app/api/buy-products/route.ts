import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/util/checkAuth";
import Orders from "@/lib/model/ordersSchema";
import {
  ApiErrorMessage,
  MissingRequiredFields,
  didNotGetOrderid,
  encryptedStringNotMatched,
  invalidRequest,
  orderPlacied,
  paymentFailed,
  userNotFound,
} from "@/lib/util/apiMessages";
import { Order, T_orderObj, routeProduct } from "@/lib/types/orderTypes";
import { serverSideStripe } from "@/lib/util/stripe/stripe";
import { decode, sign } from "jsonwebtoken";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import User from "@/lib/model/usersSchema";
import { sendEmailToSeller } from "@/lib/send-email/send-emails";

interface I_PUT_Req_JSON {
  orderId: string;
  payment_status: "pending" | "success" | "failed";
}

export async function GET(req: NextRequest) {
  try {
    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }
    const { userId } = isUserAuthenticated;

    await connectWithMongo();

    const orders = await Orders.find({ customer_id: userId }).select(
      "-customer_id -__v -updatedAt"
    );

    return NextResponse.json(
      {
        success: true,
        data: orders ? orders : [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: ApiErrorMessage,
        problem: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }
    const { userId } = isUserAuthenticated;

    const {
      shipping_address,
      products,
      total_price,
      payment_type,
      total_discount,
      tax,
      delivary_status,
    }: T_orderObj = await req.json();

    if (
      !shipping_address ||
      !products ||
      products.length <= 0 ||
      !total_price ||
      !payment_type
    ) {
      return NextResponse.json(
        {
          error: MissingRequiredFields,
          success: false,
        },
        { status: 400 }
      );
    }

    if (shipping_address.phone_number.toString().length !== 10) {
      return NextResponse.json(
        {
          error: "Invalid phone number",
          success: false,
        },
        { status: 400 }
      );
    }

    const allProductsByBrandNames: any = {};

    const modifiedProducts: routeProduct[] = products.map((obj) => {
      const {
        _id,
        current_price: product_price,
        primaryImgUrl,
        product_name,
        quantity = 1,
        brand_name,
      } = obj;

      //? if the brand name is not exist earlier then adding it and keeping the value as empty array
      if (!allProductsByBrandNames[brand_name]) {
        allProductsByBrandNames[brand_name] = [];
      }

      allProductsByBrandNames[brand_name].push({
        product_name,
        quantity,
      });

      return {
        product_id: _id,
        primaryImgUrl,
        product_name,
        quantity,
        brand_name,
        product_price,
      };
    });

    sendEmailToSeller(allProductsByBrandNames);

    const orderObj: Order = {
      customer_id: userId!,
      shipping_address,
      products: modifiedProducts,
      total_price,
      total_discount,
      payment_type,
      tax,
    };

    if (delivary_status) orderObj.delivary_status = delivary_status;

    const isAddressInArray = (addresses: any[], address: any) => {
      return addresses.some((existingAddress) => {
        return (
          existingAddress.full_name === address.full_name &&
          existingAddress.phone_number === address.phone_number &&
          existingAddress.address === address.address
        );
      });
    };

    await connectWithMongo();
    const user = await User.findById(userId).select("addresses");
    const isAddressAlreadyExists = isAddressInArray(
      user.addresses,
      shipping_address
    );
    if (!isAddressAlreadyExists) {
      const responce = await User.findByIdAndUpdate(
        userId,
        { $push: { addresses: shipping_address } },
        {
          new: true,
        }
      );

      if (!responce) {
        return NextResponse.json(
          { error: userNotFound, success: false },
          { status: 400 }
        );
      }
    }

    const newOrder = await Orders.create(orderObj);

    if (payment_type === "stripe") {
      const encriptedOrderId = sign(
        JSON.stringify(newOrder._id),
        process.env.JWT_SECRET!
      );
      const session = await serverSideStripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url:
          `${process.env.DOMAIN}/profile/orders?payment=success&order=` +
          encriptedOrderId,
        cancel_url:
          `${process.env.DOMAIN}/profile/orders?payment=failed&order=` +
          encriptedOrderId,
        line_items: products.map((obj) => {
          const {
            current_price,
            primaryImgUrl,
            product_name,
            quantity = 1,
          } = obj;

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product_name,
                images: [primaryImgUrl],
              },
              unit_amount: current_price * 100,
            },
            quantity,
          };
        }),
      });

      const response = NextResponse.json(
        {
          url: session.url,
          success: true,
        },
        { status: 201 }
      );

      response.cookies.set("encriptedOrderId", encriptedOrderId, {
        httpOnly: true,
        maxAge: 60 * 60,
      });

      return response;
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: ApiErrorMessage,
        problem: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { orderId, payment_status }: I_PUT_Req_JSON = await req.json();

    if (!orderId || !payment_status) {
      return NextResponse.json(
        {
          success: false,
          error: invalidRequest,
          problem: didNotGetOrderid,
        },
        { status: 400 }
      );
    }

    const encriptedOrderId = req.cookies.get("encriptedOrderId")?.value || "";

    if (encriptedOrderId !== orderId) {
      return NextResponse.json(
        {
          success: false,
          error: invalidRequest,
          problem: encryptedStringNotMatched,
        },
        { status: 400 }
      );
    }

    const decodedOrderId = decode(orderId) as String;

    if (payment_status === "failed") {
      const response = NextResponse.json(
        {
          success: true,
          message: paymentFailed,
        },
        { status: 200 }
      );
      response.cookies.set("encriptedOrderId", "", {
        httpOnly: true,
        expires: 0,
      });

      return response;
    }

    await connectWithMongo();
    const newOrder = await Orders.findByIdAndUpdate(
      decodedOrderId,
      {
        $set: {
          payment_status,
        },
      },
      { new: true }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: orderPlacied,
        data: newOrder,
      },
      { status: 200 }
    );

    response.cookies.set("encriptedOrderId", "", {
      httpOnly: true,
      expires: 0,
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: ApiErrorMessage,
        problem: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Didn't get order id",
        },
        { status: 400 }
      );
    }

    await connectWithMongo();
    const orderToDelete = await Orders.findById(_id).select("delivary_status");
    if (orderToDelete.delivary_status === "delivered") {
      return NextResponse.json(
        {
          success: false,
          error: "Order already delivered",
        },
        { status: 400 }
      );
    }

    const deletedOrder = await Orders.findByIdAndDelete(_id);

    if (!deletedOrder) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order deleted successfully",
        data: deletedOrder,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: ApiErrorMessage,
        problem: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
