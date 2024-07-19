import React from "react";
import style from "@/app/style/style.module.css";
import LoginForm from "./LoginForm";
import SingInWithGoogle from "../google/SingInWithGoogle";

const Login: React.FC = () => {
  return (
    <div className={style.login_image}>
      <div className={style.parent_glass} />
      <div
        className={
          style.glass +
          ` px-1 min-h-[28rem] h-auto sm:w-[25.5rem] w-80 rounded-[20px] absolute py-4 pb-7`
        }
      >
        <LoginForm />
        <div className="w-full flex justify-center items-start gap-5 text-2xl text-slate-100 mt-5">
          <SingInWithGoogle />
        </div>
      </div>
    </div>
  );
};

export default Login;
