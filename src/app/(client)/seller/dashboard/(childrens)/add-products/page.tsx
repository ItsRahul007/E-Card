import React from "react";
import AddProductForm from "./AddProductForm";

const AddProducts = () => {
  return (
    <div className="w-full h-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Add Product</h2>
        <p className="mt-1 text-sm opacity-75">
          We will add your brand name to your product
        </p>
      </div>
      <AddProductForm />
    </div>
  );
};

export default AddProducts;
