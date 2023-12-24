import React from "react";
import style from "@/app/style/style.module.css";
import { Poppins, Roboto } from "next/font/google";
import Button from "../../components/common/Button";
import Link from "next/link";
import InputCompo from "../../components/common/InputCompo";

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

interface I_login {
  signup?: string;
}

const Login: React.FC<I_login> = ({ signup }) => {
  return (
    <div className={style.login_image}>
      <div className={style.parent_glass} />
      <form className={style.glass}>
        <div className="h-[20%] w-full flex flex-col gap-2 items-center justify-center text-[cyan]">
          <h4 className={"text-4xl " + poppins.className}>{signup ? signup : "Login"}</h4>
          <p className={"text-[#00ffffab] " + roboto.className}>{signup ? signup : "Login"} to continue shopping</p>
        </div>
        <div className="w-full h-[60%] flex flex-col items-center gap-3 mt-4">
          <InputCompo
            type="email"
            name="email"
            placeholder="Enter your email"
            isRequired={true}
          />
          <InputCompo
            type="password"
            name="password"
            placeholder="Enter your password"
            isRequired={true}
          />
          {signup &&
            <InputCompo
              type="password"
              name="cPassword"
              placeholder="Confirm password"
              isRequired={true}
            />
          }
          <Button
            text={signup ? signup : "Login"}
            type="submit"
            className="p-2 px-4 bg-[#0d0827cc] mt-3 rounded-xl text-lg text-[#ffffffde] hover:text-cyan-400 hover:bg-[#060507cc] font-medium"
          />
          <p className="text-white">{signup ? "Already" : "Don't"} have an account? <Link href={`/${signup ? "login" : "signup"}`} className="text-blue-600 hover:decoration-blue-800 hover:underline font-semibold">{signup ? "Login" : "Signup"}</Link></p>
          <div className="w-full flex justify-center items-start gap-5 text-2xl text-slate-100 mt-3">
            <Link href="/" className="p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black"><i className="ri-google-fill" style={{ transition: "all ease .4s" }}></i></Link>
            <Link href="/" className="p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black"><i className="ri-facebook-fill" style={{ transition: "all ease .4s" }}></i></Link>
            <Link href="/" className="p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black"><i className="ri-linkedin-fill" style={{ transition: "all ease .4s" }}></i></Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;