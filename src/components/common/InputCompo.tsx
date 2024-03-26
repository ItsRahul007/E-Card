"use client";

import React from 'react';

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
};

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
    autoComplete = "on"
}) => {
    return (
        <input
            type={ type }
            name={ name }
            placeholder={ placeholder }
            className={ className ? className : "bg-transparent border-solid border-b-2 border-slate-200 text-white outline-0 p-2 px-4 placeholder:text-slate-200 w-[58%]" }
            value={ value }
            onChange={ onChange }
            required={ isRequired }
            onKeyUp={ (e) => {
                if (onEnter && e.code?.toLowerCase() === "enter") {
                    onEnter();
                }
            } }
            readOnly={ isReadOnly }
            minLength={ minLength }
            autoComplete={ autoComplete }
        />
    );
};

export default InputCompo;