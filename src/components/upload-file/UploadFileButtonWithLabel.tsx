"use client";

import React, { useState } from "react";
import { UploadButton } from "@/lib/util/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import { ErrorMessage } from "@/lib/util/toastMessages";
import { deleteFile } from "@/lib/util/removeImage";
import IconButton from "../common/buttons/IconButton";

interface I_UploadFileButtonWithLabel {
  label: string;
}

const UploadFileButtonWithLabel: React.FC<I_UploadFileButtonWithLabel> = ({
  label,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageKey, setImageKey] = useState<string>("");

  const removeImage = async () => {
    toast.loading("Removing Image");
    const { message, success } = await deleteFile(imageKey);
    toast.dismiss();
    if (success) {
      toast.success(message);
      setImageUrl("");
      setImageKey("");
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {imageUrl.length > 0 ? (
        <div className="self-start flex flex-col gap-2">
          <Image src={imageUrl} alt="Image" height={200} width={200} />
          <IconButton
            icon={<i className="ri-delete-bin-fill"></i>}
            className="text-lg w-fit p-2 hover:text-red-500"
            onClick={removeImage}
            type="button"
          />
        </div>
      ) : (
        <div className="self-start flex">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              setImageKey(res[0].key);
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              toast.error(ErrorMessage);
              console.log(`ERROR! ${error.message}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadFileButtonWithLabel;
