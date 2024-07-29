import React from "react";
import VerificationForm from "./VerificationForm";
import { decode } from "jsonwebtoken";
import { T_JwtVerifyDataType } from "@/lib/types/authToken-type";
import { cookies } from "next/headers";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";

const Verification = async () => {
  const authToken = cookies().get("authToken")?.value || "";
  const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;
  await connectWithMongo();

  return <VerificationForm user_id={userDataObject.id} />;
};

export default Verification;
