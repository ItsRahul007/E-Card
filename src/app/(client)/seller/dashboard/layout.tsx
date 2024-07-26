import React from "react";
import DashboardMenus from "./DashboardMenus";
import Image from "next/image";
import { Metadata } from "next";
import UserProfile from "@/components/seller/dashboard/UserProfileDropdown";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decode } from "jsonwebtoken";
import { T_JwtVerifyDataType } from "@/lib/types/authToken-type";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import User from "@/lib/model/usersSchema";
import SideNavBar from "@/components/all-products/SideNavBar";
import Provider from "@/lib/util/Provider";

export const metadata: Metadata = {
  title: "E-Card - Dashboard",
  description:
    "The E-Card Dashboard where sellers can manage their products as well as their orders and also they can see the profit or loss margin of their products.",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  process.setMaxListeners(20);
  await connectWithMongo();
  const authToken = cookies().get("authToken")?.value || "";

  if (authToken === "") redirect("/login");

  const decodedToken = decode(authToken) as T_JwtVerifyDataType;

  const getUserAvatar = decodedToken.user.avatar;

  const userAvatar = getUserAvatar || "/images/profile-pic.png";

  return (
    <main className="min-h-screen h-auto w-screen max-w-[1540px] mx-auto bg-lightBg font-poppins md:p-4">
      {/* sile options */}
      <Provider>
        <div className="h-full w-full flex flex-col">
          <nav className="w-full h-16 flex justify-between items-center bg-rootBg shadow-sm px-3 md:rounded-t md:rounded-r">
            <div className="flex items-center w-auto gap-5 md:gap-32 text-lg md:text-2xl text-rootColor">
              {/* logo */}
              <div className="hidden md:flex gap-2 h-full w-40">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  height={40}
                  width={40}
                  className="object-contain bg-rootBg"
                />
                <div className="text-emerald-500 font-bold font-ubuntu">
                  E-Card
                </div>
              </div>
              <div className="md:hidden">
                <SideNavBar searchBarFalse dashboardNav noSearchKeys />
              </div>
              <span className="font-bold select-none">
                <span className="opacity-50 font-medium mr-1">Hello,</span>
                <span>{decodedToken.user.name}!</span>
              </span>
            </div>
            <div>
              <UserProfile userAvatar={userAvatar} />
            </div>
          </nav>
          <div className="flex gap-3 flex-1">
            <div className="min-h-full xl:w-72 w-64 bg-rootBg md:flex hidden flex-col gap-2 px-3 py-5 shadow-md rounded-b">
              <DashboardMenus />
            </div>

            <div className="flex-1 pt-2 h-full max-w-[100vw] overflow-hidden min-h-[84vh]">
              {children}
            </div>
          </div>
        </div>
      </Provider>
    </main>
  );
};

export default layout;
