import React from 'react';

interface button {
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    text?: string;
    disabled?: boolean;
};

const Button: React.FC<button> = ({ className, onClick, type, text, disabled }) => {
    const defaultStyle = `mt-5 text-black bg-white p-3 mr-4 font-semibold w-36 hover:text-white hover:bg-black`;

    return (
        <button className={ `${className ? className : defaultStyle} select-none` } onClick={ onClick } type={ type } disabled={ disabled }>
            { text ? text : "SHOP NOW" }
        </button>
    );
};

export default Button;