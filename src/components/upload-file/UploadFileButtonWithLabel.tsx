"use client";

import React, { useState, useEffect } from "react";
import { UploadButton } from "@/lib/util/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import { ErrorMessage } from "@/lib/util/toastMessages";
import { deleteFile } from "@/lib/util/removeImage";
import IconButton from "../common/buttons/IconButton";

interface I_UploadFileButtonWithLabel {
  label: string;
  name: string;
  handleStoreImages: (name: string, url: string) => void;
  imgUrl: string;
}

const UploadFileButtonWithLabel: React.FC<I_UploadFileButtonWithLabel> = ({
  label,
  name,
  handleStoreImages,
  imgUrl,
}) => {
  const [imageKey, setImageKey] = useState<string>("");

  useEffect(() => {
    if (imgUrl.startsWith("https://utfs.io/f/")) {
      const imgKey = imgUrl.replace("https://utfs.io/f/", "");
      setImageKey(imgKey);
    }
  }, [imgUrl]);

  const removeImage = async () => {
    toast.loading("Removing Image");
    const { message, success } = await deleteFile(imageKey);
    toast.dismiss();
    if (success) {
      toast.success(message);
      handleStoreImages(name, "");
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
      {imgUrl.length > 0 ? (
        <div className="self-start flex flex-col gap-2">
          <Image src={imgUrl} alt="Image" height={200} width={200} />
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
              setImageKey(res[0].key);
              handleStoreImages(name, res[0].url);
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              toast.error(ErrorMessage);
              console.log(`ERROR! ${error.message}`);
              handleStoreImages(name, "");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadFileButtonWithLabel;
