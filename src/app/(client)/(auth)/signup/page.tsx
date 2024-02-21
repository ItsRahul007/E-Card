import React from "react";
import style from "@/app/style/style.module.css";
import LoginForm from "../login/LoginForm";

const Signup: React.FC = () => {
  return (
    <div className={ style.login_image }>
      <div className={ style.parent_glass } />
      <LoginForm signup="Signup" />
    </div>
  );
};

export default Signup;