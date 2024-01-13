import SmallImageContainer from '@/app/(client)/components/small-image-container/SmallImageContainer';
import AllProductNav from '@/app/lib/common/all-products/Nav';
import { Rubik } from 'next/font/google';
import Image from 'next/image';
import React, { FC } from 'react';
import style from "@/app/style/style.module.css";
import Button from '@/app/lib/common/Button';
import IconButton from '@/app/lib/common/IconButton';

interface pageProps {
    params: { productKey: string };
    searchParams: { search: string };
}

const rubik = Rubik({
    weight: ["700", "500"],
    style: "normal",
    subsets: ["latin"]
});

const page: FC<pageProps> = ({ params }) => {
    // Round the rating to the nearest half
    const rating = 3.450
    const roundedRating = Math.round(rating * 2) / 2;

    // Function to generate star icons based on the rounded rating
    const generateStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            console.log(JSON.stringify(roundedRating));
            // Determine the star color based on the current rating
            let starColorClass;

            if ((i - 1) + .5 === roundedRating) {
                starColorClass = `${style.half_star}`; // Half yellow and half gray
            } else if (i < roundedRating) {
                starColorClass = 'text-[#35a3bc]'; // Full yellow star
            } else {
                starColorClass = 'text-gray-400'; // Inactive star
            }

            stars.push(
                <span key={i} className={`text-xl ${starColorClass}`}>&#9733;</span>
            );
        }
        return stars;
    };

    return (
        <div className='h-screen w-screen bg-slate-100 flex flex-col'>
            <AllProductNav />
            <div className='h-[89%] w-screen bg-slate-100 '>
                {/* first section */}
                <section className='w-full h-[35rem]'>
                    <div className='h-full w-11/12 p-4 px-6 flex'>
                        {/* images container */}
                        <div className='h-full w-[28rem] flex'>
                            <div className='h-3/4 w-full flex gap-4'>
                                {/* sub images */}
                                <div className='h-80 w-20 flex flex-col gap-1 items-center'>
                                    <SmallImageContainer
                                        src="https://m.media-amazon.com/images/I/61xXO4SSioL._SX569_.jpg"
                                        alt='t-shirt'
                                    />
                                    <SmallImageContainer
                                        src="https://m.media-amazon.com/images/I/51B8wBu+maL._SY741_.jpg"
                                        alt='t-shirt'
                                    />
                                    <SmallImageContainer
                                        src="https://m.media-amazon.com/images/I/61gaYvGeJsL._SY741_.jpg"
                                        alt='t-shirt'
                                    />
                                    <SmallImageContainer
                                        src="https://m.media-amazon.com/images/I/61Us28ylJML._SY741_.jpg"
                                        alt='t-shirt'
                                    />
                                </div>

                                {/* main images */}
                                <div className='relative h-80 w-4/6 border rounded-md overflow-hidden'>
                                    <Image
                                        src="https://m.media-amazon.com/images/I/61xXO4SSioL._SX569_.jpg"
                                        alt='t-shirt'
                                        fill
                                    />
                                    <IconButton
                                        className='absolute top-3 right-3 text-base p-1 px-2 rounded-full text-gray-50 bg-gray-400 cursor-pointer'
                                        icon={<i className="ri-heart-line"></i>}
                                        type='button'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* text container */}
                        <div className='flex-1'>
                            {/* product name */}
                            <div className={`w-full h-8 text-left text-3xl uppercase`}>
                                <h2 className={`$${rubik.className}`}>Wild soul t-shirt</h2>
                            </div>

                            {/* product rating */}
                            <div className='mt-4 flex items-center'>
                                {generateStars()}
                                <span className={`ml-4 text-sm text-slate-500 ${rubik.className}`}>
                                    (2 customer review)
                                </span>
                            </div>

                            {/* product price */}
                            <div className={`mt-5 ${rubik.className} flex gap-2`}>
                                <span className='text-2xl'>$90.00</span>
                                <span className='text-xl !font-normal text-gray-700 mt-1 line-through decoration-gray-700 decoration-2'>$99.00</span>
                            </div>

                            {/* about the product */}
                            <div className="font-medium text-sm text-gray-500 w-[90%] mt-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas numquam a laudantium ratione suscipit cupiditate repellat beatae eum sint voluptates quia laboriosam ex iure cum, distinctio eos exercitationem quisquam laborum earum labore aliquam autem eveniet vitae praesentium. Ipsa placeat qui, omnis iure eius autem repellendus quos, quisquam est dolores iste dicta excepturi vero sit rem ipsam amet quo ullam aliquam!
                            </div>

                            {/* buy or add to cart button */}
                            <div className='mt-6'>
                                <Button
                                    text='BUY NOW'
                                    className='px-16 py-4 text-sm font-bold bg-[#35a3bc] mr-4 text-white rounded-lg'
                                    type='button'
                                />
                                <Button
                                    text='ADD TO CART'
                                    className='px-14 py-4 text-sm font-bold bg-[#eb3c33] mr-4 text-white rounded-lg'
                                    type='button'
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default page;