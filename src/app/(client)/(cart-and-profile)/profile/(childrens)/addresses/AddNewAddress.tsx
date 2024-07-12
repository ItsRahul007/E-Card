"use client";

import IconButton from "@/components/common/buttons/IconButton";
import EditAddressForm from "@/components/profile-compos/EditAddressForm";
import {
  useSetAddresses,
  useGetAddresses,
} from "@/lib/customHook/useAddresses";
import { addressTypeInputValues } from "@/lib/types/addressTypes";
import {
  ErrorMessage,
  addressAddedSuccessMessage,
} from "@/lib/util/toastMessages";
import React, { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";

const AddNewAddress: FC = () => {
  const initialValues: addressTypeInputValues = {
    full_name: "",
    phone_number: "",
    address: "",
  };

  const [isEditFormActive, setIsEditFormActive] = useState<boolean>(false);
  const [inputValues, setInputValues] =
    useState<addressTypeInputValues>(initialValues);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const { refetch } = useGetAddresses();
  const setAddress = useSetAddresses();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setAddress.mutate(
        { addresses: inputValues, method: "post" },
        {
          onSuccess: () => {
            refetch();
            toast.success(addressAddedSuccessMessage);
            setIsEditFormActive(false);
            setInputValues(initialValues);
          },
          onError: (error: any) => {
            console.log(error);
            toast.error(error.response.data.error || ErrorMessage);
          },
        }
      );
    },
    [inputValues, initialValues, refetch, setAddress]
  );

  return (
    <div className="h-auto w-full flex flex-col gap-5">
      <h3 className="text-lg font-semibold text-appTheme-600">
        Manage Addresses
      </h3>
      {!isEditFormActive ? (
        <IconButton
          type="button"
          icon={<span className="text-2xl">+</span>}
          text="Add a new Address"
          iconFirst
          className="text-appTheme-600 py-3 border hover:border-appTheme-500 rounded-md w-full flex justify-start items-center gap-4 px-6 capitalize font-semibold"
          onClick={() => setIsEditFormActive(true)}
        />
      ) : (
        <span className="border rounded w-full">
          <EditAddressForm
            onCancle={() => {
              setIsEditFormActive(false);
              setInputValues(initialValues);
            }}
            inputValues={inputValues}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </span>
      )}
    </div>
  );
};

export default AddNewAddress;
