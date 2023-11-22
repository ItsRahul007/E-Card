import React from "react";
import style from "@/app/style/style.module.css";
import { Poppins } from "next/font/google";
import Button from "../components/common/Button";

const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  style: ["normal"]
});

const Login: React.FC = () => {
  return (
    <div className={style.login_image}>
      <div className={style.parent_glass}>
        <div className="h-16 w-16 bg-[#30d0ab] absolute left-[37%] top-32" style={{borderRadius: "23% 47% 33% 60%"}}></div>
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
          className="p-2 px-4 bg-[#0d0827cc] mt-5 rounded-xl text-lg text-[#ffffffde] hover:text-cyan-400 hover:bg-[#060507cc] font-medium"
          />
        </div>
      </form>
    </div>
  )
}

export default Login;