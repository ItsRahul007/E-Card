import Button from "@/components/common/buttons/Button";
import InputWithLable from "@/components/common/inputs/InputWithLable";
import UploadFileButtonWithLabel from "@/components/upload-file/UploadFileButtonWithLabel";
import React from "react";

const AddProducts = () => {
  return (
    <div className="w-full h-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Add Product</h2>
        <p className="mt-1 text-sm opacity-75">
          We will add your brand name to your product
        </p>
      </div>
      <form className="w-full h-auto">
        <div className="w-full h-auto grid lg:grid-cols-3 sm:grid-cols-2 gap-x-4 md:gap-x-10">
          <InputWithLable
            lable="Product Name"
            name="product-name"
            inputType="text"
            required
          />
          <InputWithLable
            lable="Product Price"
            name="product-price"
            inputType="number"
            required
          />
          <InputWithLable
            lable="Product Type"
            name="product-type"
            inputType="text"
            required
          />
          <InputWithLable
            lable="Discount Percentage"
            name="discount-percentage"
            inputType="number"
            required
            max={70}
          />
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              className="text-gray-700 rounded-md cursor-pointer text-sm w-full border"
              name="category"
              id="category"
              required
            >
              <option className="py-2" disabled selected>
                Select a category
              </option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="other">Other</option>
            </select>
          </div>
          <UploadFileButtonWithLabel label="Primary Image" />
          <UploadFileButtonWithLabel label="Secondry Image 1" />
          <UploadFileButtonWithLabel label="Secondry Image 2" />
          <UploadFileButtonWithLabel label="Secondry Image 3" />
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              // value={productDescription}
              // onChange={(e) => setProductDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
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
    </div>
  );
};

export default AddProducts;
