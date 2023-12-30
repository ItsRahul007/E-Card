import React from "react";
import style from "@/app/style/style.module.css";
import LoginForm from "./LoginForm";

interface I_login {
  signup?: string;
}

const Login: React.FC<I_login> = ({ signup }) => {
  return (
    <div className={style.login_image}>
      <div className={style.parent_glass} />
      <LoginForm signup={signup} />
    </div>
  );
};

export default Login;