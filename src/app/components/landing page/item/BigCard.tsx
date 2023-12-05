import React from 'react';
import { Roboto } from 'next/font/google';
import Button from '../../common/Button';
const roboto = Roboto({
    weight: '700',
    subsets: ['latin'],
    style: "normal"
});

interface bigcard {
    url: string;
    headText: string;
    position?: boolean;
};

const BigCard: React.FC<bigcard> = ({ url, headText, position }) => {
    return (
        <div className={`w-96 h-[32rem] relative text-white bg-cover bg-no-repeat`} 
        style={{backgroundImage: "url(" + url + ")", backgroundPosition: position? "-85px 0" : "0 0"}}
        >
            <span className='bg-[#00000076] h-full w-full absolute flex '>
                <div className='w-full ml-6 mt-[276px]'>
                    <h3 className={"text-3xl " + roboto.className}>
                        {headText}
                    </h3>
                    <p className="text-sm leading-7 mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                    </p>
                    <Button />
                </div>
            </span>
        </div>
    );
};

export default BigCard;