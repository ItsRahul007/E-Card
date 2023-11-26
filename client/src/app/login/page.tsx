import React from "react";
import style from "@/app/style/style.module.css";
import { Poppins } from "next/font/google";
import Button from "../components/common/Button";
import Link from "next/link";

const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  style: ["normal"]
});

const page: React.FC = () => {
  return (
    <div className={style.login_image}>
      <div className={style.parent_glass}>
        <div className="h-16 w-16 bg-[#30d0ab] absolute left-[37%] top-32" style={{ borderRadius: "23% 47% 33% 60%" }}></div>
        <div className="h-36 w-52 bg-[#00000073] absolute left-[40%] top-[50%]" style={{ borderRadius: "23% 47% 33% 60%" }}></div>
      </div>
      <form className={style.glass}>
        <div className="h-[20%] w-full flex flex-col gap-2 items-center justify-center text-[cyan]">
          <h4 className={"text-4xl " + poppins.className}>Login</h4>
          <p className="text-[#00ffffab]">Login to continue shopping</p>
        </div>
        <div className="w-full h-[60%] flex flex-col items-center gap-3 mt-4">
          <input type="email" placeholder="Enter your email" className="bg-transparent border-solid border-b-2 text-[#a2acba] outline-0 p-2 px-4" required />
          <input type="password" placeholder="Enter your password" className="bg-transparent border-solid border-b-2 text-[#a2acba] outline-0 p-2 px-4" required />
          <Button
            text="Login"
            type="submit"
            className="p-2 px-4 bg-[#0d0827cc] mt-3 rounded-xl text-lg text-[#ffffffde] hover:text-cyan-400 hover:bg-[#060507cc] font-medium"
          />
          <p className="text-white">Don&apos;t have an account? <Link href="/signup" className="text-blue-800 hover:decoration-blue-800 hover:underline font-semibold">Signup</Link></p>
          <div className="w-full flex justify-center items-start gap-5 text-2xl text-slate-100 mt-3">
            <i className="ri-google-fill p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black" style={{transition: "all ease .4s"}}></i>
            <i className="ri-facebook-fill p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black" style={{transition: "all ease .4s"}}></i>
            <i className="ri-linkedin-fill p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black" style={{transition: "all ease .4s"}}></i>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;