import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { T_JwtVerifyDataType } from "@/lib/types/authToken-type";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import React from "react";
import SupportForm from "./SupportForm";
import Link from "next/link";

const Support = async () => {
  const authToken = cookies().get("authToken")?.value || "";
  const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;
  await connectWithMongo();
  const user = await User.findById(userDataObject.id).select("email name");

  return (
    <div className="bg-lightBg text-rootColor md:p-4 p-2">
      <div className="bg-rootBg p-2 md:p-5 rounded">
        <div className="flex md:flex-row flex-col gap-6 mx-auto w-full md:w-4/5">
          {/* left section */}
          <div className="w-full md:w-2/4">
            <div>
              <h2 className="text-2xl font-bold text-start">Get in touch</h2>
            </div>
            <div className="flex flex-col gap-4 mt-3 text-lightColor">
              <p>
                We&apos;d love to hear from you! Whether you have questions
                about our products, need assistance with an order, or just want
                to share your feedback, our team is here to help.
              </p>
              <p>
                You can also reach out to us through our social media channels
                or by filling out the contact form below. We strive to respond
                to all inquiries within 24 hours. <br />
                <br />
                Thank you for choosing E-Card! We look forward to assisting you.
              </p>
              <div className="text-rootColor">
                <h5 className="text-lg font-bold mb-2">Contact Us:</h5>
                <ul className="ml-3 flex flex-col gap-2">
                  <li className="list-disc">
                    <Link href="mailto:rahulofficial870@gmail.com">
                      <span className="font-semibold">Email: </span>
                      <span>rahulofficial870@gmail.com</span>
                    </Link>
                  </li>
                  <li className="list-disc">
                    <Link href="tel:+91 7478386405">
                      <span className="font-semibold">Phone: </span>
                      <span>+91 7478386405</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* right section */}
          <div className="w-full md:w-2/4">
            <div>
              <h2 className="text-2xl font-bold text-start">Send a message</h2>
            </div>
            <div className="flex flex-col gap-1 md:mt-6 mt-3">
              <div className="capitalize font-semibold text-lightColor">
                {user.name}
              </div>
              <div className="font-semibold text-lightColor">{user.email}</div>
              <SupportForm userEmail={user.email} userName={user.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
