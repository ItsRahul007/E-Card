"use client";

import AddressCompo from "@/components/profile-compos/addressCompo";
import { useGetAddresses } from "@/lib/customHook/useAddresses";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { ObjectId } from "mongodb";
import PageLoading from "@/components/common/loading/PageLoading";
import classNames from "@/lib/util/classNames";
import { addressTypeInputValues } from "@/lib/types/addressTypes";
import NotFound from "@/components/common/NotFound";

interface T_Addresses extends addressTypeInputValues {
  _id: ObjectId;
}

interface I_AddressListProps {
  onAddressClick?: (props: addressTypeInputValues) => void;
}

const AddressList: FC<I_AddressListProps> = ({ onAddressClick }) => {
  const { data, isLoading, error } = useGetAddresses();

  if ((!isLoading && data && !data.success) || error) {
    toast.error(data.error || "Something went wrong while fetching addresses");
    return <>Something went wrong</>;
  }

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : data.addresses.length ? (
        <ul className="overflow-y-scroll h-auto w-full flex flex-col gap-2 list-none">
          {data.addresses.map((addressObj: T_Addresses) => {
            const { full_name, phone_number, address, _id } = addressObj;
            return (
              <li
                key={JSON.stringify(_id)}
                className={classNames(
                  "h-auto w-full border rounded-md hover:border-indigo-500 duration-300",
                  onAddressClick ? "cursor-pointer" : ""
                )}
                onClick={() => {
                  onAddressClick &&
                    onAddressClick({ full_name, phone_number, address });
                }}
              >
                <AddressCompo
                  _id={JSON.stringify(_id)}
                  full_name={full_name}
                  phone_number={phone_number}
                  address={address}
                  noEditOption={onAddressClick ? true : false}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <NotFound header="No addresses found" />
      )}
    </>
  );
};

export default AddressList;
