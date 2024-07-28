import React from "react";
import VerificationForm from "./VerificationForm";
import { decode } from "jsonwebtoken";
import { T_JwtVerifyDataType } from "@/lib/types/authToken-type";
import { cookies } from "next/headers";

const Verification = () => {
  const authToken = cookies().get("authToken")?.value || "";
  const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;

  return <VerificationForm user_id={userDataObject.id} />;
};

export default Verification;
