import React from 'react';

interface itemProps {
    imgUrl: string | any | undefined;
    itemName: string | any | undefined;
    itemCategory: string | any | undefined;
    itemRate: string | any | undefined;
};

function Item({ imgUrl, itemName, itemCategory, itemRate }: itemProps) {

    return (
        <div className='flex flex-col'>
            <span className='h-60 w-60 cursor-pointer'>
                <img src={imgUrl} alt="" className='h-full w-full' />
            </span>
            <span className='flex flex-col gap-1 mt-5'>
                <h5 className='font-semibold cursor-pointer'>{itemName}</h5>
                <div className="text-[#00000067]">{itemCategory}</div>
                <div className='font-medium cursor-pointer'>${itemRate}</div>
                {/* <div>
                    <i className={"ri-star-line cursor-pointer text-[rgba(0, 0, 0, 0.621)]"}></i>
                    <i className={"ri-star-line cursor-pointer text-[rgba(0, 0, 0, 0.621)]"}></i>
                    <i className={"ri-star-line cursor-pointer text-[rgba(0, 0, 0, 0.621)]"}></i>
                    <i className={"ri-star-line cursor-pointer text-[rgba(0, 0, 0, 0.621)]"}></i>
                    <i className={"ri-star-line cursor-pointer text-[rgba(0, 0, 0, 0.621)]"}></i>
                </div> */}
            </span>
        </div>
    )
}

export default Item;