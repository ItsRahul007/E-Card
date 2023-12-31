import React from 'react';
import ItemCompo from "./FeatureItem";
import itemInfo from "@/app/item/itemInfo";
import style from "@/app/style/style.module.css";

const FeatureProduct = () => {
    return (
        <div className={"z-20 text-black bg-[#f5f7f9] h-[150vh] flex flex-col"}>
            <div className="self-center text-center flex flex-col gap-7 mt-24">
                <h1 className="font-semibold text-4xl">
                    Featured Products
                </h1>
                <div className="w-24 self-center bg-[#1f92da] h-[1.5px]" />
            </div>
            <div className={"self-center mt-14 w-11/12 " + style.grid}>
                {
                    itemInfo.map((e: any) => {
                        return <ItemCompo key={e.imgUrl} {...e} />
                    })
                }
            </div>
        </div>
    )
}

export default FeatureProduct;