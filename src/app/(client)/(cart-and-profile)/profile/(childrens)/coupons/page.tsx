import React from "react";
import User from "@/lib/model/usersSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decode } from "jsonwebtoken";
import { T_JwtVerifyDataType } from "@/lib/types/authToken-type";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { couponType } from "@/lib/types/orderTypes";
import NotFound from "@/components/common/NotFound";
import classNames from "@/lib/util/classNames";

const Coupons = async () => {
  const authToken = cookies().get("authToken")?.value || "";
  if (authToken.length <= 0) redirect("/login");

  const decodedAuthToken = decode(authToken) as T_JwtVerifyDataType;

  await connectWithMongo();
  const user = await User.findById(decodedAuthToken.user.id).select("coupons");

  return (
    <div className="sm:px-4 px-2 sm:py-3 py-2 flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-semibold text-appTheme-600">My Coupons</h3>
      </div>
      <div className="h-auto w-full overflow-x-auto text-zinc-800">
        <table className="table-auto border-collapse border border-lightColor w-full text-sm duration-100">
          <thead className="bg-appTheme-500 text-white">
            <tr>
              <th className="px-4 py-1.5 truncate border">Name</th>
              <th className="px-4 py-1.5 truncate border">Code</th>
              <th className="px-4 py-1.5 truncate border">Discount</th>
              <th className="px-4 py-1.5 truncate border">Is Used</th>
              <th className="px-4 py-1.5 truncate border">Starts On</th>
              <th className="px-4 py-1.5 truncate border">Expires On</th>
            </tr>
          </thead>
          <tbody>
            {user.coupons.length > 0 &&
              user.coupons.map((coupon: couponType) => (
                <tr
                  className={classNames(
                    "hover:bg-appTheme-50 hover:text-appTheme-700 dark:hover:bg-zinc-800 duration-300",
                    !coupon.is_active ? "text-lightColor" : "text-rootColor"
                  )}
                  key={coupon.coupon_code + "coupons-profile"}
                >
                  <td className="border px-4 py-2">{coupon.coupon_name}</td>
                  <td className="border px-4 py-2">{coupon.coupon_code}</td>
                  <td className="border px-4 py-2">{coupon.coupon_discount}</td>
                  <td className="border px-4 py-2">
                    {!coupon.is_active ? "Yes" : "No"}
                  </td>
                  <td className="border px-4 py-2">
                    {coupon.starts_on.toDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {coupon.ends_on.toDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {user.coupons.length <= 0 && (
          <div>
            <NotFound header="No Coupons Found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;
