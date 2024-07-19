"use client";

import classNames from "@/lib/util/classNames";
import React from "react";

interface I_InputComponent {
  type: string;
  placeholder?: string;
  name: string;
  className?: string;
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  onEnter?: () => void;
  isReadOnly?: boolean;
  minLength?: number;
  autoComplete?: "on" | "off";
}

const InputCompo: React.FC<I_InputComponent> = ({
  type,
  placeholder,
  className,
  onChange,
  isRequired,
  value,
  name,
  onEnter,
  isReadOnly,
  minLength,
  autoComplete = "on",
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={classNames(
        className
          ? className
          : "border-0 border-solid border-b-2 border-lightColor text-rootColor placeholder:text-lightColor outline-0 sm:py-2 sm:px-4 py-1 px-2 w-4/5 sm:w-3/5 placeholder:capitalize",
        "bg-transparent"
      )}
      value={value}
      onChange={onChange}
      required={isRequired}
      onKeyUp={(e) => {
        if (onEnter && e.code?.toLowerCase() === "enter") {
          onEnter();
        }
      }}
      readOnly={isReadOnly}
      minLength={minLength}
      autoComplete={autoComplete}
    />
  );
};

export default InputCompo;
