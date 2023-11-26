import React from "react";
import style from "@/app/style/style.module.css";
import { Poppins, Roboto } from "next/font/google";
import Button from "../components/common/Button";
import Link from "next/link";
import Login from "../login/page";

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
  style: ["normal"]
});

const roboto = Roboto({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});

const Signup: React.FC = () => {
  return <Login name="Signup" />
};

export default Signup;