"use server";
import { signIn, signOut } from "@/app/api/auth/[...nextauth]/options";

export const loginWithGoogle = async () => {
  await signIn("google");
};

export const loginOutWithGoogle = async () => {
  await signOut();
};
