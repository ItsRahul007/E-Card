"use client";

import React from "react";

interface I_InputWithLable {
  lable: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType?: string;
  required?: boolean;
  max?: number;
  placeholder?: string;
  minLength?: number;
  autoComplete?: "on" | "off";
}

const InputWithLable: React.FC<I_InputWithLable> = ({
  lable,
  value,
  onChange,
  required = false,
  name,
  inputType = "text",
  max,
  placeholder,
  autoComplete = "on",
  minLength,
}) => {
  return (
    <div className="mb-4 col-span-1 row-span-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-rootColor"
      >
        {lable}
      </label>
      <input
        type={inputType}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-lightText rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
        required={required}
        max={max}
        placeholder={placeholder}
        minLength={minLength}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default InputWithLable;
