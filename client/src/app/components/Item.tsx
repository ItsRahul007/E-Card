import React from 'react';
import itemStyle from "@/app/style/item.module.css";

interface itemProps {
    imgUrl: string | any | undefined;
    itemName: string | any | undefined;
    itemCategory: string | any | undefined;
    itemRate: string | any | undefined;
};

function Item() {
    const { star, category } = itemStyle;

    return (
        <div className='flex flex-col'>
            <span className='h-60 w-60'>
                <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-m-jeans1-400x400.jpg" alt="" className='h-full w-full' />
            </span>
            <span className='flex flex-col gap-1 mt-5'>
                <h5 className='font-semibold'>Dark Brown Jeans</h5>
                <div className={category}>Men</div>
                <div className='font-medium'>$150.00</div>
                <div>
                    <i className={"ri-star-line " + star}></i>
                    <i className={"ri-star-line " + star}></i>
                    <i className={"ri-star-line " + star}></i>
                    <i className={"ri-star-line " + star}></i>
                    <i className={"ri-star-line " + star}></i>
                </div>
            </span>
        </div>
    )
}

export default Item;