import React from 'react'
import BestSalesSingleItem from './BestSalesSingleItem';

const BestSales = () => {
    return (
        <section className='w-screen max-w-[1540px] my-10 mx-auto h-auto min-h-[28rem] py-7 px-3 md:py-10 md:px-5 space-y-5 font-rubik' id='best-sales'>
            <div className='h-20 w-fit mx-auto capitalize font-semibold text-4xl'>best sales</div>
            <div className='h-auto w-full md:4/5 xl:w-3/5 mx-auto grid md:grid-cols-3 grid-cols-2 md:grid-rows-4 grid-rows-6 gap-3'>
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