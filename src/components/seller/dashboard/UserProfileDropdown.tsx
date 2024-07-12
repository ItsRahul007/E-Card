"use client";

import React from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { userNavigation } from "@/lib/util/SomeStaticDatas";

interface I_UserProfile {
  userAvatar: string;
}

const UserProfile: React.FC<I_UserProfile> = ({ userAvatar }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="relative flex rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
        <Image
          className="rounded-full"
          src={userAvatar}
          alt="user-avatar"
          width={32}
          height={32}
        />
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-lightBg text-rootColor py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.href + "user-profile-dropdown"}>
              <Link
                href={item.href}
                className={"hover:bg-rootBg block px-4 py-2 text-sm"}
              >
                {item.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserProfile;
