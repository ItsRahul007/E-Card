"use client";

import IconButton from "@/components/common/buttons/IconButton";
import { sendEmail } from "@/lib/server-side-actions/nodemailer";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SupportForm = ({
  userEmail,
  userName,
}: {
  userEmail: string;
  userName: string;
}) => {
  const [supportMessage, setSupportMessage] = useState<string>("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading("Sending message...");

    const { message, success, problem } = await sendEmail({
      subject: "E-Card Support Message from " + userName,
      html: `<h1>${userName} says something</h1>
      <p>Email: ${userEmail}</p>
      <p>${supportMessage}</p>`,
    });

    toast.dismiss();
    if (success) {
      setSupportMessage("");
      toast.success(message);
    } else {
      console.log(problem);
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mt-4 mb-2">
        <label
          htmlFor="productDescription"
          className="block text-base font-medium text-rootColor"
        >
          Message
        </label>
        <textarea
          id="productDescription"
          name="product_description"
          className="mt-2 block w-full px-3 py-2 border border-lightColor bg-rootBg rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          rows={5}
          value={supportMessage}
          onChange={(e) => setSupportMessage(e.target.value)}
        />
      </div>
      <IconButton
        type="submit"
        text="Support"
        className="px-4 py-2 rounded-md font-semibold text-white bg-indigo-700 hover:bg-indigo-800"
        icon={<i className="ri-send-plane-fill font-light mr-1"></i>}
        iconFirst
      />
    </form>
  );
};

export default SupportForm;
