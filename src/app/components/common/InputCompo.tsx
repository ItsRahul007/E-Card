import React from 'react';

interface I_InputComponent {
    type: string;
    placeholder: string;
    name: string;
    className?: string;
    isRequired?: boolean;
    onChange?: (e: any) => void;
    currentValue?: string;
};

const InputCompo: React.FC<I_InputComponent> = ({
    type, placeholder, className, onChange, isRequired, currentValue
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={className ? className : "bg-transparent border-solid border-b-2 border-slate-200 text-white outline-0 p-2 px-4 placeholder:text-slate-200"}
            onChange={onChange}
            value={currentValue}
            required={isRequired}
        />
    );
};

export default InputCompo;