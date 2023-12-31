"use client";

import React from 'react';

interface I_InputComponent {
    type: string;
    placeholder?: string;
    name: string;
    className?: string;
    isRequired?: boolean;
    onChange?: (e: any) => void;
    currentValue?: string;
};

const InputCompo: React.FC<I_InputComponent> = ({
    type, placeholder, className, onChange, isRequired, currentValue, name
}) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={className ? className : "bg-transparent border-solid border-b-2 border-slate-200 text-white outline-0 p-2 px-4 placeholder:text-slate-200 w-[58%]"}
            value={currentValue}
            onChange={onChange}
            required={isRequired}
            min={type === "number" ? 1 : undefined}
        />
    );
};

export default InputCompo;