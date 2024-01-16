import React, { FC } from 'react';

interface I_button {
    className?: string;
    onClick?: () => void;
    type: "button" | "submit" | "reset" | undefined;
    text?: string;
    icon: React.ReactElement;
    iconFirst?: boolean;
};

const IconButton: FC<I_button> = ({ onClick, text, className, type, icon, iconFirst }) => {
    return (
        <button onClick={ onClick } className={ className } type={ type }>
            {
                iconFirst ? (
                    <>
                        { icon }
                        { text }
                    </>
                ) :
                    (
                        <>
                            { text }
                            { icon }
                        </>
                    )
            }
        </button>
    )
}

export default IconButton;