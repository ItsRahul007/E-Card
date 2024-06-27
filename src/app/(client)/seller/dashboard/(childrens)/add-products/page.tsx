import React from "react";
import AddProductForm from "./AddProductForm";
import { decode } from "jsonwebtoken";
import { getProductById } from "@/lib/server-side-actions/seller-side";

interface I_AddProducts {
  searchParams: {
    id: string | undefined;
  };
}

const AddProducts: React.FC<I_AddProducts> = async ({ searchParams }) => {
  const encodedProductId = searchParams.id || "";
  const productId = decode(encodedProductId) as string;
  const product =
    productId !== null ? await getProductById(JSON.parse(productId)) : false;

  return (
    <div className="w-full h-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Add Product</h2>
        <p className="mt-1 text-sm opacity-75">
          We will add your brand name to your product
        </p>
      </div>
      {product ? (
        <AddProductForm
          product_name={product.product_name}
          product_description={product.product_description}
          price={product.price}
          product_category={product.product_category}
          discount_percentage={product.discount_percentage}
          primary_image={product.primaryImgUrl}
          secondry_image_1={product.secondaryImgUrls[0]}
          secondry_image_2={product.secondaryImgUrls[1]}
          secondry_image_3={product.secondaryImgUrls[2]}
          product_type={product.product_type}
          productId={JSON.stringify(product._id)}
          forUpdate
        />
      ) : (
        <AddProductForm />
      )}
    </div>
  );
};

export default AddProducts;
