import type { Metadata } from "next";
import Navbar from "@/components/all-products/Nav";
import { ReactNode } from "react";
import LeftMenus from "@/components/common/profile-components/LeftMenus";
import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { T_JwtVerifyDataType } from "@/lib/types/authToken-type";

export const metadata: Metadata = {
  title: "E-Card - Profile",
  description:
    "An E-Commerce web app where user can buy any product or they can add any product to their persional card and also they can list any of their fevorite item or product to their fevorite card.",
};

export default async function Layout({ children }: { children: ReactNode }) {
  process.setMaxListeners(20);
  const authToken = cookies().get("authToken")?.value || "";
  if (!authToken) {
    redirect("/logout");
  }

  const decodedAuthToken = decode(authToken) as T_JwtVerifyDataType;
  if (
    !decodedAuthToken ||
    !decodedAuthToken.user.name ||
    !decodedAuthToken.user.id
  ) {
    redirect("/logout");
  }

  const name = decodedAuthToken?.user?.name || "Ecard user";

  return (
    <main className="h-screen w-screen flex flex-col overflow-y-scroll bg-lightBg font-inter">
      {/* nav bar */}
      <Navbar profile avatar={decodedAuthToken?.user?.avatar || undefined} />
      <div className="flex-1 flex justify-center items-center">
        <div className="h-full w-full md:w-11/12 flex gap-3 justify-center sm:p-2">
          {/* left component */}
          <LeftMenus
            name={name}
            avatar={decodedAuthToken?.user?.avatar || undefined}
          />

          {/* right component */}
          <div className="min-h-11/12 flex flex-col gap-2 sm:border sm:border-lightColor w-screen lg:w-3/4 shadow-sm sm:p-4 bg-rootBg">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
