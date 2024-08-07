"use client";

import Button from "@/components/common/buttons/Button";
import InputWithLable from "@/components/common/inputs/InputWithLable";
import { invalidEmail } from "@/lib/util/apiMessages";
import isValidEmail from "@/lib/util/emailChecker";
import { ErrorMessage, invalidContactNo } from "@/lib/util/toastMessages";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BecomeSeller: React.FC = () => {
  const [brandName, setBrandName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string | number>("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //* Perform form validation
    const checkEmailValidation = isValidEmail(email);
    const isValidNumber = contactNumber.toString().length === 10;

    if (agreed) {
      if (!checkEmailValidation || !isValidNumber) {
        !checkEmailValidation && toast.error(invalidEmail);
        !isValidNumber && toast.error(invalidContactNo);
        return;
      }

      try {
        toast.loading("Sending request...");
        setIsLoading(true);

        const response = await axios.post("/api/seller/become-a-seller", {
          brandName,
          contactEmail: email,
          contactNumber,
        });

        toast.dismiss();
        toast.success(response.data.message);
        setIsLoading(false);
      } catch (error: any) {
        const apiErrMessage = error.response.data.error;
        toast.dismiss();
        toast.error(apiErrMessage || ErrorMessage);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-rootBg rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Become a Seller</h2>
      <form onSubmit={handleSubmit}>
        <InputWithLable
          name="brandName"
          lable="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          required
        />
        <InputWithLable
          name="email"
          lable="Contact Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputWithLable
          name="contactNumber"
          lable="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(Number(e.target.value))}
          required
          inputType="number"
        />
        <div className="mb-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer"
              required
            />
            <span className="ml-2 text-sm text-rootColor">
              I agree to the{" "}
              <span className="text-indigo-600 underline">
                terms and conditions
              </span>
            </span>
          </label>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            text="Submit"
            disabled={!agreed || isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default BecomeSeller;
