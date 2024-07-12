"use client";

import React from "react";
import Image from "next/image";
import IconButton from "@/components/common/buttons/IconButton";
import { loginWithGoogle } from "./server-actions";

const SingInWithGoogle = () => {
  return (
    <section className="w-11/12">
      <IconButton
        className="w-11/12 px-4 py-2 bg-[#0d0827cc] flex justify-center gap-4 items-center text-base rounded-lg"
        type="button"
        iconFirst
        icon={
          <Image
            alt="google logo"
            src="https://authjs.dev/img/providers/google.svg"
            width={30}
            height={30}
            className="bg-transparent rounded-full"
          />
        }
        text="Continue with Google"
        onClick={() => loginWithGoogle()}
      />
    </section>
  );
};

export default SingInWithGoogle;
