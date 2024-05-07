"use client";

import React, { useState } from 'react';
import Button from '@/components/common/buttons/Button';
import Link from 'next/link';
import style from "@/app/style/style.module.css";
import InputCompo from '@/components/common/InputCompo';
import toast from 'react-hot-toast';
import { loginWithEmailPassword, signupWithEmailPassword } from './authFunctions';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/common/buttons/IconButton';
import { signIn } from '@/app/api/auth/[...nextauth]/options';
import SingInWithGoogle from '../google/SingInWithGoogle';

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
        toast.success("Welcome to E-Card");
        router.back();

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
        toast.success("Welcome to E-Card");
        router.back();

      } catch (error: any) {
        toast.dismiss();
        const errorResponse = error.response
        toast.error(errorResponse ? errorResponse.data.error : "Internal Server Error");
      }
    };
  };

  return (
    <form
      onSubmit={ onSubmit }
    >
      <div className="h-[20%] w-full flex flex-col gap-2 items-center justify-center text-white">
        <h4 className={ "text-4xl font-poppins font-bold" }>{ signup ? signup : "Login" }</h4>
        <p className={ "text-white font-roboto" }>{ signup ? signup : "Login" } to continue shopping</p>
      </div>
      <div className="w-full h-[60%] flex flex-col items-center gap-3 mt-4">
        { signup &&
          <InputCompo
            type="text"
            name="name"
            placeholder="Enter your full Name"
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
      </div>
    </form>
  )
}

export default LoginForm;