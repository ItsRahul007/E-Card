"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/common/buttons/Button";
import InputWithLable from "@/components/common/inputs/InputWithLable";
import UploadFileButtonWithLabel from "@/components/upload-file/UploadFileButtonWithLabel";
import { T_FormVariables } from "@/lib/types/addProductTypes";
import toast from "react-hot-toast";
import axios from "axios";
import {
  ErrorMessage,
  productAddedSuccessMessage,
  productUpdatedSuccessMessage,
} from "@/lib/util/toastMessages";
import { revalidateUrl } from "@/lib/util/revalidate";

const formDataInitialValues: T_FormVariables = {
  product_name: "",
  price: "",
  product_type: "",
  product_category: "",
  discount_percentage: "",
  primary_image: "",
  secondry_image_1: "",
  secondry_image_2: "",
  secondry_image_3: "",
  product_description: "",
};

interface I_AddProductForm {
  product_name?: string;
  price?: string;
  product_type?: string;
  product_category?: string;
  discount_percentage?: string;
  primary_image?: string;
  secondry_image_1?: string;
  secondry_image_2?: string;
  secondry_image_3?: string;
  product_description?: string;
  forUpdate?: boolean;
  productId?: string;
}

const AddProductForm: React.FC<I_AddProductForm> = (productObj) => {
  const [formVariables, setFormVariables] = useState<T_FormVariables>(
    formDataInitialValues
  );

  useEffect(() => {
    if (productObj) {
      setFormVariables((prev) => ({
        ...prev,
        ...productObj,
      }));
    }
  }, [productObj]);

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormVariables((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreImages = (name: string, url: string) => {
    setFormVariables((prev) => ({ ...prev, [name]: url }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formVariableValues = Object.values(formVariables);

    if (formVariableValues.includes("")) {
      toast.error("Please fill all the fields");
      return;
    }

    const mutationVariables: any = {
      ...formVariables,
      primaryImgUrl: formVariables.primary_image,
      secondaryImgUrls: [
        formVariables.secondry_image_1,
        formVariables.secondry_image_2,
        formVariables.secondry_image_3,
      ],
    };

    //? if we are updating then setting the productId to the productObj
    productObj.forUpdate &&
      productObj.productId &&
      (mutationVariables.productId = JSON.parse(productObj.productId));

    toast.loading(productObj.forUpdate ? "Updating Product" : "Adding Product");
    try {
      productObj.forUpdate
        ? //? for updating the product
          await axios.put("/api/product", mutationVariables, {
            headers: {
              "Content-Type": "application/json",
              AUTH_TOKEN: JSON.stringify(
                process.env.NEXT_PUBLIC_AUTH_TOKEN || ""
              ),
            },
          })
        : //? for adding a new product
          await axios.post("/api/product", mutationVariables, {
            headers: {
              "Content-Type": "application/json",
              AUTH_TOKEN: JSON.stringify(
                process.env.NEXT_PUBLIC_AUTH_TOKEN || ""
              ),
            },
          });

      toast.dismiss();
      toast.success(
        productObj.forUpdate
          ? productUpdatedSuccessMessage
          : productAddedSuccessMessage
      );

      //? if we are not updating then setting the form variables to initial values
      !productObj.forUpdate && setFormVariables(formDataInitialValues);

      revalidateUrl({
        revalidatePathUrl: "/seller/dashboard/products",
        revalidateLayout: "page",
      });

      //? if we are updating then revalidating the page
      productObj.forUpdate &&
        revalidateUrl({
          revalidatePathUrl: "/seller/dashboard/add-products",
          revalidateLayout: "page",
        });
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      toast.error(error.response.data.error || ErrorMessage);
    }
  };

  return (
    <form className="w-full h-auto" onSubmit={handleSubmit}>
      <div className="w-full h-auto grid lg:grid-cols-3 sm:grid-cols-2 gap-x-4 md:gap-x-10">
        <InputWithLable
          lable="Product Name"
          name="product_name"
          inputType="text"
          required
          onChange={handleOnChange}
          value={formVariables.product_name}
        />
        <InputWithLable
          lable="Product Price"
          name="price"
          inputType="number"
          required
          onChange={handleOnChange}
          value={formVariables.price}
        />
        <InputWithLable
          lable="Product Type"
          name="product_type"
          inputType="text"
          required
          onChange={handleOnChange}
          value={formVariables.product_type}
        />
        <InputWithLable
          lable="Discount Percentage"
          name="discount_percentage"
          inputType="number"
          required
          onChange={handleOnChange}
          value={formVariables.discount_percentage}
          max={70}
        />
        <InputWithLable
          lable="Product Category"
          name="product_category"
          inputType="text"
          required
          onChange={handleOnChange}
          value={formVariables.product_category}
          placeholder="e.g. Electronics, Mobiles, Men, Women, etc."
        />
        <UploadFileButtonWithLabel
          label="Primary Image"
          name="primary_image"
          handleStoreImages={handleStoreImages}
          imgUrl={formVariables.primary_image}
        />
        <UploadFileButtonWithLabel
          label="Secondry Image 1"
          name="secondry_image_1"
          handleStoreImages={handleStoreImages}
          imgUrl={formVariables.secondry_image_1}
        />
        <UploadFileButtonWithLabel
          label="Secondry Image 2"
          name="secondry_image_2"
          handleStoreImages={handleStoreImages}
          imgUrl={formVariables.secondry_image_2}
        />
        <UploadFileButtonWithLabel
          label="Secondry Image 3"
          name="secondry_image_3"
          handleStoreImages={handleStoreImages}
          imgUrl={formVariables.secondry_image_3}
        />
        <div className="mb-4">
          <label
            htmlFor="productDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Product Description
          </label>
          <textarea
            id="productDescription"
            name="product_description"
            value={formVariables.product_description}
            onChange={handleOnChange}
            className="mt-1 block w-full px-3 py-2 border border-lightColor bg-rootBg rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            rows={5}
          />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          text="Add Product"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </form>
  );
};

export default AddProductForm;
