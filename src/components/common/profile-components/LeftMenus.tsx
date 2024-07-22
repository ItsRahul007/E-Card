"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import profileImage from "/public/images/profile-pic.png";
import classNames from "@/lib/util/classNames";
import SubLinks from "./SubLinks";
import { useRouter, usePathname } from "next/navigation";

interface I_LeftMenus {
  closeSlider?: () => void;
  isSlider?: boolean;
  name?: string;
}

type T_CurrentTab =
  | "/profile"
  | "/profile/addresses"
  | "/profile/orders"
  | "/profile/coupons"
  | "/profile/review";

const LeftMenus: React.FC<I_LeftMenus> = ({
  closeSlider = () => {},
  isSlider,
  name,
}) => {
  const router = useRouter();
  const pathName = usePathname() as T_CurrentTab;

  const [currentTab, setCurrentTab] = useState<T_CurrentTab>(pathName);

  useEffect(() => {
    setCurrentTab(pathName);
  }, [pathName]);

  return (
    <div
      className={classNames(
        isSlider
          ? "h-auto w-[95%] sm:w-3/4 flex flex-col gap-3 lg:hidden mx-auto"
          : "h-11/12 lg:flex flex-col gap-3 w-1/4 hidden"
      )}
    >
      {/* profile component */}
      <div
        className={classNames(
          "flex w-full h-20 border border-lightColor rounded shadow-sm",
          isSlider ? "gap-2 bg-slate-800" : "bg-rootBg"
        )}
      >
        {/* image */}
        <div className="w-20 h-full flex items-center justify-center">
          <Image
            src={profileImage}
            alt="profile"
            width={50}
            height={50}
            placeholder="blur"
            blurDataURL="/public/images/profile-pic.png"
          />
        </div>
        <div className="flex-1 flex justify-center items-start flex-col truncate px-1">
          <div className="text-sm">Hello,</div>
          <div className="font-semibold truncate text-base text-appTheme-600 max-w-full">
            {name}
          </div>
        </div>
      </div>

      {/* list component */}
      <div
        className={classNames(
          "flex flex-col shadow-sm p-2",
          isSlider ? "bg-slate-800" : "flex-1 bg-rootBg"
        )}
      >
        {/* my orders */}
        <Link
          onClick={() => {
            closeSlider();
            setCurrentTab("/profile/orders");
          }}
          href="/profile/orders"
          className={classNames(
            "py-5 border-b text-base uppercase flex justify-between items-center cursor-pointer",
            isSlider ? "text-slate-100 bg-opacity-5" : "text-rootColor",
            currentTab.startsWith("/profile/orders")
              ? "bg-appTheme-50 dark:bg-zinc-800 !text-appTheme-600"
              : ""
          )}
        >
          <span>
            <i className="ri-shopping-bag-3-fill text-xl text-appTheme-500 px-3"></i>
            <span className="font-medium text-base">My Orders</span>
          </span>
          <span>
            <i className="ri-arrow-right-s-line font-medium text-2xl pr-3"></i>
          </span>
        </Link>

        {/* account settings */}
        <SubLinks
          headerIcon={<i className="ri-user-3-fill"></i>}
          headerText="account settings"
          closeSlider={closeSlider}
          isSlider={isSlider}
          currentTab={currentTab}
          subLinks={[
            {
              text: "profile information",
              link: "/profile",
            },
            {
              text: "Manage Addresses",
              link: "/profile/addresses",
            },
          ]}
        />

        {/* my stuff */}
        <SubLinks
          headerText="my stuff"
          headerIcon={<i className="ri-folder-user-fill"></i>}
          closeSlider={closeSlider}
          isSlider={isSlider}
          currentTab={currentTab}
          subLinks={[
            {
              text: "My coupons",
              link: "/profile/coupons",
            },
            {
              text: "My review & ratings",
              link: "/profile/review",
            },
          ]}
        />

        {/* logout */}
        <div
          className={`h-auto w-full cursor-pointer group ${
            !isSlider && "border-b"
          }`}
          onClick={() => router.push("/logout")}
        >
          <h3
            className={classNames(
              "uppercase flex items-center py-3",
              isSlider ? "text-slate-100" : "text-zinc-500"
            )}
          >
            <span className="text-xl text-appTheme-600 px-3">
              <i className="ri-shut-down-line"></i>
            </span>
            <span className="font-medium text-base group-hover:text-appTheme-600">
              Logout
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LeftMenus;
