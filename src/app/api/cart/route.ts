import { NextRequest, NextResponse } from "next/server";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import User from "@/lib/model/usersSchema";
import Products from "@/lib/model/productSchema";
import { checkAuth } from "@/lib/util/checkAuth";
import {
  ApiErrorMessage,
  didNotGetProductId,
  invalidRequest,
  productAlreadyExistsInCart,
  userNotFound,
} from "@/lib/util/apiMessages";

type cartItems = {
  productId: string;
  quantity?: number;
};

const getProductById = async (cartArr: cartItems[]) => {
  const products = await Promise.all(
    cartArr.map(async ({ productId, quantity = 1 }) => {
      const {
        product_name,
        current_price,
        primaryImgUrl,
        _id,
        discount_percentage,
        brand_name,
        price,
      } = await Products.findById(productId).select(
        "product_name current_price primaryImgUrl discount_percentage price brand_name"
      );

      return {
        product_name,
        current_price,
        primaryImgUrl,
        quantity,
        _id,
        discount_percentage,
        brand_name,
        price,
      };
    })
  );

  return products;
};

export async function GET(req: NextRequest) {
  try {
    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    const { userId } = isUserAuthenticated;

    await connectWithMongo();
    const user = await User.findById(userId).select("cart");

    if (!user) {
      return NextResponse.json(
        { error: userNotFound, success: false },
        { status: 400 }
      );
    }

    const cartProducts = await getProductById(user.cart);

    return NextResponse.json(
      {
        success: true,
        cartProducts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: ApiErrorMessage, problem: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();

    if (!productId)
      return NextResponse.json(
        { error: invalidRequest, problem: didNotGetProductId, success: false },
        { status: 401 }
      );

    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    const { userId } = isUserAuthenticated;

    await connectWithMongo();

    const user = await User.findById(userId).select("cart");
    if (!user) {
      return NextResponse.json(
        { error: userNotFound, success: false },
        { status: 400 }
      );
    }

    //! if the given product id is already exists
    if (user.cart.some((item: any) => item.productId === productId)) {
      return NextResponse.json(
        { error: productAlreadyExistsInCart, success: false },
        { status: 400 }
      );
    }

    const updatedCart = await User.findByIdAndUpdate(
      userId,
      { $push: { cart: { productId } } },
      { new: true }
    ).select("cart");

    const cartProducts = await getProductById(updatedCart.cart);

    return NextResponse.json(
      {
        success: true,
        cartProducts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: ApiErrorMessage, problem: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { productId, quantity } = await req.json();

    if (!productId)
      return NextResponse.json(
        { error: invalidRequest, problem: didNotGetProductId, success: false },
        { status: 401 }
      );

    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    const { userId } = isUserAuthenticated;

    await connectWithMongo();

    const user = await User.findById(userId).select("cart");
    if (!user) {
      return NextResponse.json(
        { error: userNotFound, success: false },
        { status: 400 }
      );
    }

    const updatedCart = await User.findByIdAndUpdate(
      userId,
      { $set: { "cart.$[elem].quantity": quantity } },
      { new: true, arrayFilters: [{ "elem.productId": productId }] }
    ).select("cart");

    const cartProducts = await getProductById(updatedCart.cart);

    return NextResponse.json(
      {
        success: true,
        cartProducts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: ApiErrorMessage, problem: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { productId } = await req.json();

    if (!productId)
      return NextResponse.json(
        { error: invalidRequest, problem: didNotGetProductId, success: false },
        { status: 401 }
      );

    const isUserAuthenticated = await checkAuth(req);
    if (!isUserAuthenticated.success) {
      return isUserAuthenticated.response;
    }

    const { userId } = isUserAuthenticated;

    await connectWithMongo();
    const user = await User.findById(userId).select("cart");
    if (!user) {
      return NextResponse.json(
        { error: userNotFound, success: false },
        { status: 400 }
      );
    }

    const updatedCart = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { productId } } },
      { new: true, isolation: "serializable" }
    ).select("cart");

    const cartProducts = await getProductById(updatedCart.cart);

    return NextResponse.json(
      {
        success: true,
        cartProducts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: ApiErrorMessage, problem: error.message, success: false },
      { status: 500 }
    );
  }
}
