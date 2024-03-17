"use client";

import React, { useState } from 'react';
import Button from '@/components/common/buttons/Button';
import Link from 'next/link';
import style from "@/app/style/style.module.css";
import InputCompo from '@/components/common/InputCompo';
import toast from 'react-hot-toast';
import { loginWithEmailPassword, signupWithEmailPassword } from './authFunctions';
import { useRouter } from 'next/navigation';

interface I_LoginForm {
  signup?: string;
};

const LoginForm: React.FC<I_LoginForm> = ({ signup }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({ name: "", email: "", password: "", cPassword: "" });

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  async function onSubmit(e: any) {
    e.preventDefault();
    const { name, email, password, cPassword } = inputValue;

    //? If not of user then login user otherwise signup
    if (!signup) {
      try {
        //* Sending request with given details
        toast.loading("Sending request");
        const response = await loginWithEmailPassword({ email, password });
        toast.dismiss();

        //* If success then saving the authToken to localStorage
        localStorage.setItem("authToken", response.data.authToken);
        toast.success("Welcome to E-Card");
        router.push("/");

      } catch (error: any) {
        toast.dismiss();
        const errorResponse = error.response
        toast.error(errorResponse ? errorResponse.data.error : "Internal Server Error");
        console.log(error);
      }
    } else {
      if (password !== cPassword) return toast.error("Please Check Your Password");
      try {
        //* Sending request with given details
        toast.loading("Sending request");
        const response = await signupWithEmailPassword({ name, email, password });
        toast.dismiss();

        //* If success then saving the authToken to localStorage
        localStorage.setItem("authToken", response.data.authToken);
        toast.success("Welcome to E-Card");
        router.push("/");

      } catch (error: any) {
        toast.dismiss();
        const errorResponse = error.response
        toast.error(errorResponse ? errorResponse.data.error : "Internal Server Error");
      }
    };
  };

  return (
    <form className={ style.glass + ` ${signup && "px-1"}` } onSubmit={ onSubmit } >
      <div className="h-[20%] w-full flex flex-col gap-2 items-center justify-center text-white mt-2">
        <h4 className={ "text-4xl font-poppins" }>{ signup ? signup : "Login" }</h4>
        <p className={ "text-white font-roboto" }>{ signup ? signup : "Login" } to continue shopping</p>
      </div>
      <div className="w-full h-[60%] flex flex-col items-center gap-3 mt-4">
        { signup &&
          <InputCompo
            type="text"
            name="name"
            placeholder="Enter your name"
            isRequired={ true }
            value={ inputValue.name }
            onChange={ onInputChange }
          />
        }
        <InputCompo
          type="email"
          name="email"
          placeholder="Enter your email"
          isRequired={ true }
          value={ inputValue.email }
          onChange={ onInputChange }
        />
        <InputCompo
          type="password"
          name="password"
          placeholder="Enter your password"
          isRequired={ true }
          value={ inputValue.password }
          onChange={ onInputChange }
        />
        { signup &&
          <InputCompo
            type="password"
            name="cPassword"
            placeholder="Confirm password"
            isRequired={ true }
            value={ inputValue.cPassword }
            onChange={ onInputChange }
          />
        }
        <Button
          text={ signup ? signup : "Login" }
          type="submit"
          className="p-2 px-4 bg-[#0d0827cc] mt-3 rounded-xl text-lg text-[#ffffffde] hover:text-cyan-400 hover:bg-[#060507cc] font-medium"
        />
        <p className="text-white">{ signup ? "Already" : "Don't" } have an account? <Link href={ `/${signup ? "login" : "signup"}` } className="text-blue-600 hover:decoration-blue-800 hover:underline font-semibold">{ signup ? "Login" : "Signup" }</Link></p>
        <div className="w-full flex justify-center items-start gap-5 text-2xl text-slate-100 mt-3">
          <Link href="/" className="p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black"><i className="ri-google-fill" style={ { transition: "all ease .4s" } }></i></Link>
          <Link href="/" className="p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black"><i className="ri-facebook-fill" style={ { transition: "all ease .4s" } }></i></Link>
          <Link href="/" className="p-2 px-3 rounded-full bg-[#0d0827cc] hover:text-cyan-400 hover:bg-black"><i className="ri-linkedin-fill" style={ { transition: "all ease .4s" } }></i></Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm;