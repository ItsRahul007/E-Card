"use client";

import React, { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import IconButton from "@/components/common/buttons/IconButton";

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/seller/dashboard/settings" },
  { name: "Sign out", href: "/logout" },
];

interface I_UserProfile {
  userAvatar: string;
}

const UserProfile: React.FC<I_UserProfile> = ({ userAvatar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false); // Close the menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative ml-3">
      <div ref={buttonRef}>
        <IconButton
          className="relative flex rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          icon={
            <img className="h-8 w-8 rounded-full" src={userAvatar} alt="" />
          }
          type="button"
        />
      </div>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={isMenuOpen}
      >
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <div key={item.href + "user-profile-dropdown"}>
              <Link
                href={item.href}
                className={
                  "hover:bg-zinc-100 block px-4 py-2 text-sm text-zinc-700"
                }
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </Transition>
    </div>
  );
};

export default UserProfile;
