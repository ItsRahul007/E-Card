import React from 'react';
import style from "@/app/style/style.module.css";

interface button {
    className?: string;
    onClick?: () => void;
};

const Button: React.FC<button> = ({ className, onClick }) => {
    const defaultStyle = `mt-5 text-black bg-white p-3 mr-4 font-semibold w-36 hover:text-white hover:bg-black`;

    return (
        <button className={`${className ? className : defaultStyle} `} onClick={onClick}>
            SHOP NOW
        </button>
    );
};

export default Button;