"use client";

import React, { useState } from "react";
import Button from "@/components/common/buttons/Button";
import InputWithLable from "@/components/common/inputs/InputWithLable";
import { sendEmailVerificationCode } from "@/lib/send-email/send-emails";
import PageLoading from "@/components/common/loading/PageLoading";
import toast from "react-hot-toast";
import axios from "axios";
import { revalidateUrl } from "@/lib/util/revalidate";
import { useRouter } from "next/navigation";

interface I_VerificationForm {
  user_id: string;
}

const VerificationForm: React.FC<I_VerificationForm> = ({ user_id }) => {
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isResendEmailLoading, setIsResendEmailLoading] =
    useState<boolean>(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSendingRequest(true);
      await axios.post("/api/verify-email", { code });
      setIsSendingRequest(false);
      setSuccess(true);
      setError(null);
      revalidateUrl({
        revalidatePathUrl: "/verify-email",
        revalidateLayout: "layout",
      });
      router.back();
    } catch (error: any) {
      setError(
        error.response.data.error || "Something went wrong, please try again!"
      );
      setSuccess(false);
      setIsSendingRequest(false);
    }
  };

  const resendEmail = async () => {
    setIsResendEmailLoading(true);
    const { success, problem } = await sendEmailVerificationCode(user_id);
    setIsResendEmailLoading(false);
    setSuccess(false);
    setError(null);
    if (success) {
      toast.success("Verification code sent successfully!");
    } else {
      toast.error("Failed to send verification code, please try again!");
      console.error(problem);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-lightBg">
      <div className="bg-rootBg p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Email Verification
        </h2>
        {success ? (
          <div className="text-green-600 text-center">
            Verification successful!
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <InputWithLable
                lable="Verification Code"
                name="code"
                inputType="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {error && <div className="text-red-600 mb-4">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-indigo-700 text-white p-2 rounded hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-25"
                text="Submit"
                disabled={isSendingRequest || isResendEmailLoading}
              />
            </form>
            <div className="h-auto w-full flex items-center justify-end">
              {!isResendEmailLoading ? (
                <Button
                  className="bg-transparent border-none text-blue-500 text-sm hover:underline w-fit self-end"
                  text="Resend Code"
                  onClick={resendEmail}
                />
              ) : (
                <PageLoading />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationForm;
