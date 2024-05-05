import React from 'react'
import SingleNewReleaseItem from './SingleNewReleaseItem';
import Image from 'next/image';

const NewRelease = () => {
    return (
        <section className='w-screen max-w-[1540px] mt-10 mx-auto h-auto min-h-[28rem] py-7 px-3 md:py-10 md:px-5 scroll-smooth space-y-5' id='new-release'>
            <div className='h-20 w-fit mx-auto capitalize font-semibold text-4xl'>New Release</div>
            <div className='w-full h-auto flex flex-col md:flex-row gap-4'>
                <div className='h-96 md:h-[28rem] w-full md:w-2/4 flex flex-col lg:flex-row gap-2 items-center bg-slate-100 md:py-0 py-3'>
                    <div className='w-3/5 h-full relative'>
                        <Image
                            src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3.jpg"
                            alt="item"
                            fill
                            className='object-contain cursor-pointer'
                        />
                    </div>
                    <div className='flex-1 gap-y-3 flex flex-col items-center justify-center text-center text-sm px-3'>
                        <span className='text-base font-medium text-zinc-700'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quam.</span>
                        <span className='text-zinc-400 text-sm font-medium'>$999</span>
                        <button className='capitalize py-2 px-4 bg-zinc-800 hover:bg-zinc-900 text-white w-fit font-semibold'>add to cart</button>
                    </div>
                </div>
                <div className='flex-1 grid grid-cols-2 grid-rows-2 gap-4'>
                    <SingleNewReleaseItem />
                    <SingleNewReleaseItem />
                    <SingleNewReleaseItem />
                    <SingleNewReleaseItem />
                </div>
            </div>
        </section>
    )
}

export default NewRelease;