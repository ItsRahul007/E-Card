import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { T_JwtVerifyDataType } from "@/lib/types/authToken-type";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import React from "react";

const Support = async () => {
  const authToken = cookies().get("authToken")?.value || "";
  const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;
  await connectWithMongo();
  const user = await User.findById(userDataObject.id).select("email name");

  return (
    <div className="bg-lightBg text-rootColor md:p-4 p-2">
      <div className="bg-rootBg p-2 md:p-5 rounded">
        <div>
          <h1 className="text-3xl font-bold text-center">Support</h1>
        </div>
        <div className="md:mt-7 mt-3 flex md:flex-row flex-col gap-4 mx-auto w-full md:w-4/5">
          {/* left section */}
          <div className="w-full md:w-2/4">
            <div>
              <h2 className="text-2xl font-bold text-center">Get in touch</h2>
            </div>
            <div></div>
          </div>

          {/* right section */}
          <div className="w-full md:w-2/4">
            <div>
              <h2 className="text-2xl font-bold text-center">Send a message</h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className="capitalize">{user.name}</div>
              <div>{user.email}</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
