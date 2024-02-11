import React from 'react';
import Button from '@/app/(client)/components/common/buttons/Button';
interface bigcard {
    url: string;
    headText: string;
    position?: boolean;
    id?: string;
};

const BigCard: React.FC<bigcard> = ({ url, headText, position, id }) => {
    return (
        <div className={ `w-96 h-[32rem] relative text-white bg-cover bg-no-repeat` }
            style={ { backgroundImage: "url(" + url + ")", backgroundPosition: position ? "-85px 0" : "0 0" } }
            id={ id }
        >
            <span className='bg-[#00000076] h-full w-full absolute flex '>
                <div className='w-full ml-6 mt-[276px]'>
                    <h3 className={ "text-3xl font-roboto font-bold" }>
                        { headText }
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