import Products from "../model/productSchema";
import User from "../model/usersSchema";
import connectWithMongo from "../mongoConnection/mongoConnect";

export const getProducts = async (userId: string) => {
  try {
    await connectWithMongo();
    const user = await User.findById(userId).select("brandName");

    const usersProducts = await Products.find({
      brand_name: user.brandName,
    }).select("product_name primaryImgUrl price discount_percentage");

    return usersProducts;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to get products, please try again!");
  }
};

export const getProductById = async (productId: string) => {
  try {
    await connectWithMongo();
    const product = await Products.findById(productId).select(
      "-current_price -updatedAt -__v -ratings -createdAt -brand_name"
    );

    return product;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to get product, please try again!");
  }
};
