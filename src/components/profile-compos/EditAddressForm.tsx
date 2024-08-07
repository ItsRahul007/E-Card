"use client";

import React, { FC } from "react";
import Button from "@/components/common/buttons/Button";
import { addressTypeInputValues } from "@/lib/types/addressTypes";
import toast from "react-hot-toast";
import InputWithLable from "../common/inputs/InputWithLable";

interface I_EditAddressForm {
  onCancle: () => void;
  inputValues: addressTypeInputValues;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditAddressForm: FC<I_EditAddressForm> = ({
  onCancle,
  inputValues,
  onChange,
  onSubmit,
}) => {
  const { full_name, phone_number, address } = inputValues;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isNaN(Number(inputValues.phone_number)) ||
      inputValues.phone_number.toString().length !== 10
    ) {
      toast.error("Invalid phone number");
      return;
    }
    onSubmit(e);
  };

  return (
    <div className="min-h-[24rem] h-auto w-full bg-appTheme-50 dark:bg-lightBg">
      <div className="h-full w-full md:w-5/6 flex flex-col items-center justify-center self-start sm:py-3 sm:px-4 p-2">
        <div className="flex justify-start items-start text-start w-full uppercase font-medium text-sm mb-4">
          <p className="text-appTheme-600 font-semibold">Edit Address</p>
        </div>
        {/* Form */}
        <form
          className="w-full flex flex-col items-start justify-start gap-4 text-rootColor"
          onSubmit={handleSubmit}
        >
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4 w-full">
            <div>
              <InputWithLable
                lable="Full name"
                name="full_name"
                inputType="text"
                onChange={onChange}
                value={full_name}
                required
              />
            </div>

            <div>
              <InputWithLable
                lable="Phone number"
                name="phone_number"
                inputType="tel"
                onChange={onChange}
                value={phone_number}
                required
                minLength={10}
                autoComplete="off"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium ">
                Address
              </label>
              <div className="mt-1">
                <textarea
                  name="address"
                  id="address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-lightColor shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
                  onChange={onChange}
                  value={address}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-3 sm:gap-5 mt-5">
            <Button
              type="submit"
              text="save"
              className="px-14 py-3 rounded-sm bg-appTheme-500 text-white uppercase text-sm sm:text-base"
            />
            <Button
              type="reset"
              text="cancel"
              onClick={onCancle}
              className="px-5 py-3 rounded-sm bg-transparent text-appTheme-500 uppercase text-sm sm:text-base font-medium"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressForm;
