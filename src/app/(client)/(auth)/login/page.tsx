import React from "react";
import style from "@/app/style/style.module.css";
import LoginForm from "./LoginForm";

const Login: React.FC = (props) => {
  console.log(props);
  return (
    <div className={ style.login_image }>
      <div className={ style.parent_glass } />
      <LoginForm />
    </div>
  );
};

export default Login;