import NonEditableField from "@/components/common/inputs/NonEditableField";
import ToggleInput from "@/components/common/inputs/ToggleInput";
import { getIsUserSendEmailActive } from "@/lib/server-side-actions/seller-side";
import React from "react";

const SellerSettings = async () => {
  const isSendEmailActive = await getIsUserSendEmailActive();
  console.log(isSendEmailActive);

  return (
    <div className="bg-rootBg w-full h-auto md:shadow-md rounded-md p-2 pb-4">
      <div className="sm:w-full w-fit mx-auto h-10 text-xl md:text-2xl font-semibold capitalize md:mt-4 mt-2 md:ml-6">
        <h4>settings</h4>
      </div>
      <div className="mt-4 md:px-7 grid md:grid-cols-3 grid-cols-2 md:grid-rows-2 grid-rows-3 gap-2">
        <NonEditableField label="Brand name" value="The Titan" />
        <NonEditableField label="contact email" value="rg890458@gmail.com" />
        <NonEditableField label="contact number" value="7478386405" />
        <ToggleInput
          value={isSendEmailActive}
          label="Send email when get an order"
        />
      </div>
    </div>
  );
};

export default SellerSettings;
