import React from 'react';
import itemInfo from "@/app/item/itemInfo";
import style from "@/app/style/style.module.css";
import Image from 'next/image';
import FeatireItems from './FeatireItems';

const FeatureProduct = () => {
    return (
        <div className="text-black h-auto mb-10 md:mb-20 flex flex-col md:gap-10 gap-5" id='featured-products'>
            <div className="self-center text-center flex flex-col gap-7 mt-24">
                <h1 className="font-semibold text-4xl">
                    Featured Products
                </h1>
                <div className="w-24 self-center bg-[#1f92da] h-[1.5px]" />
            </div>
            <div className='h-auto w-full md:w-[786px] md:mx-auto flex flex-col gap-5 md:px-10 px-3 py-5 mt-10 relative'>
                <div className='h-36 w-full flex items-center justify-between gap-1'>
                    <FeatireItems />
                    <FeatireItems />
                </div>
                <div className='h-36 w-full flex items-center justify-center z-10'>
                    <FeatireItems />
                </div>
                <div className='h-36 w-full flex items-center justify-between gap-1'>
                    <FeatireItems />
                    <FeatireItems />
                </div>
            </div>
        </div>
    )
}

export default FeatureProduct;