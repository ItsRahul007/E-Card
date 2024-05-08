import React from 'react'
import BestSalesSingleItem from './BestSalesSingleItem';

const BestSales = () => {
    return (
        <section className='w-screen h-auto max-w-[1540px] my-10 mx-auto min-h-[28rem] py-7 px-3 md:py-10 md:px-5 space-y-5 font-rubik' id='best-sales'>
            <div className='h-20 w-fit mx-auto capitalize font-semibold text-4xl'>best sales</div>
            <div
                className='h-auto w-full xl:grid-cols-4 mx-auto grid md:grid-cols-3 grid-cols-2 grid-rows-[auto] gap-3'
            >
                <BestSalesSingleItem />
                <BestSalesSingleItem />
                <BestSalesSingleItem />
                <BestSalesSingleItem />
                <BestSalesSingleItem />
                <BestSalesSingleItem />
            </div>
        </section>
    )
}

export default BestSales;