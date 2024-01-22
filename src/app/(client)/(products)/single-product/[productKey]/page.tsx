import SmallImageContainer from '@/app/(client)/components/small-image-container/SmallImageContainer';
import AllProductNav from '@/app/lib/common/all-products/Nav';
import { Rubik } from 'next/font/google';
import Image from 'next/image';
import React, { FC } from 'react';
import style from "@/app/style/style.module.css";
import Button from '@/app/lib/common/Button';
import IconButton from '@/app/lib/common/IconButton';
import ReviewBox from '@/app/(client)/components/ReviewBox';
import ReviewStar from '@/app/(client)/components/ReviewStar';
import itemArr from '@/app/item/itemInfo';
import ItemCard from '@/app/lib/common/all-products/ItemCard';
import Footer from '@/app/lib/common/footer/Footer';
import Link from 'next/link';

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
                <span key={ i } className={ `text-xl max-[385px]:text-lg ${starColorClass}` }>&#9733;</span>
            );
        }
        return stars;
    };

    const reviewText: string = `Camera and a performance Beast!
    Been using it for 10 days now and here's the summary:-

    PROS:
    -Camera__Nightography is insanely good. Beats iPhone14 and other top flagship phones by far. Portraits are a bliss for the eyes, feels like shot from DSLR.
    -Performance__Super smooth performance with 8 gen 1. Can handle any mobile games flawlessly. Played BGMI and Asphalt 9 and there are hardly any frame drops even after an hour.
    -Display__Display is too good. Peak brightness is enough and works brilliantly even during noon. Bezels are so slim it feels like holding just the screen.
    -Design__In hand feel is Premium. Thought the s22 would be smaller but it actually fits perfectly and probably better than the s22+. Back glass looks super Premium.

    CONS
    -Battey__It's a big setback for this flagship Beast. Lasts 24hrs only in standby or if you pass half the time not using the phone. Barely lasts 12 hrs with a little bit of camera and ~1hr of gaming. Reason for a less star
    -Heating__Heats a lot while playing games or recording videos. Would suggest doing these without a back cover for better performance.

    OVERALL it's a steal @39999 just for the camera and performance. I genuinely prefer only these 2 and it doesn't bother me to charge the phone a couple of times or carry a powerbank so the cons are fine by me. But if you want your phone to last for a day or prefer bigger screen/storage there are better options in this price range.

    Hope this helps 😃`;

    return (
        <div className='h-screen w-screen bg-slate-100 flex flex-col'>
            <AllProductNav />
            <div className='overflow-scroll w-screen bg-slate-100 '>
                {/* first section (product) */ }
                <section className='w-full md:max-h-[35rem]'>
                    <div className='h-full w-full lg:w-11/12 p-4 px-6 flex sm:flex-row flex-col lg:gap-2 max-[639.5px]:items-center gap-6'>
                        {/* images container */ }
                        <div className='h-full md:w-[28rem] flex'>
                            <div className='h-3/4 w-full flex md:gap-4 gap-1'>
                                {/* secondry images */ }
                                <div className='h-80 w-20 sm:w-16 max-[400px]:h-60 max-[400px]:w-16 flex flex-col gap-1 items-center'>
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

                                {/* primary image */ }
                                <div className='relative md:h-80 sm:h-72 sm:w-64 lg:w-4/6 w-72 border rounded-md overflow-hidden max-[400px]:h-60 max-[400px]:w-56'>
                                    <Image
                                        src="https://m.media-amazon.com/images/I/61xXO4SSioL._SX569_.jpg"
                                        alt='t-shirt'
                                        fill
                                    />
                                    <IconButton
                                        className='absolute top-3 right-3 text-base p-1 px-2 rounded-full text-gray-50 bg-gray-400 cursor-pointer'
                                        icon={ <i className="ri-heart-line"></i> }
                                        type='button'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* text container */ }
                        <div className='lg:flex-1'>
                            {/* product name */ }
                            <div className="w-11/12 h-8 text-left text-2xl uppercase whitespace-nowrap text-ellipsis overflow-hidden sm:text-3xl">
                                <h2 className={ `$${rubik.className}` }>Wild soul t-shirt</h2>
                            </div>

                            {/* product rating */ }
                            <div className='mt-4 flex items-center select-none'>
                                { generateStars() }
                                <span className={ `ml-4 sm:text-sm text-xs text-slate-500 ${rubik.className}` }>
                                    (2 customer reviewed)
                                </span>
                            </div>

                            {/* product price */ }
                            <div className={ `mt-5 ${rubik.className} flex gap-2 select-none` }>
                                <span className='sm:text-2xl text-xl'>$90.00</span>
                                <span className='sm:text-xl text-lg !font-normal text-gray-700 mt-1 line-through decoration-gray-700 decoration-2'>
                                    $99.00
                                </span>
                            </div>

                            {/* about the product */ }
                            <div className="font-medium text-sm text-gray-500 md:w-[90%] w-72 mt-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas numquam a laudantium ratione suscipit cupiditate repellat beatae eum sint voluptates quia laboriosam ex iure cum, distinctio eos exercitationem quisquam laborum earum labore aliquam autem eveniet vitae praesentium. Ipsa placeat qui, omnis iure eius autem repellendus quos, quisquam est dolores iste dicta excepturi vero sit rem ipsam amet quo ullam aliquam!
                            </div>

                            {/* buy or add to cart button */ }
                            <div className='mt-6 lg:w-full'>
                                <Button
                                    text='BUY NOW'
                                    className='lg:px-16 sm:px-10 px-8 py-4 text-sm font-bold bg-[#35a3bc] mr-4 text-white rounded-lg mb-3'
                                    type='button'
                                />
                                <Button
                                    text='ADD TO CART'
                                    className='lg:px-14 sm:px-7 px-5 py-4 text-sm font-bold bg-[#eb3c33] text-white rounded-lg'
                                    type='button'
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* second section (review) */ }
                <section className='w-full flex justify-center items-center mt-2'>
                    <div className='w-11/12 h-auto border-[3px] p-2 bg-white flex flex-col gap-4 rounded-lg'>
                        {/* header */ }
                        <div className='w-full text-2xl md:text-3xl mt-2'>
                            <h1 className={ 'ml-5 ' + rubik.className }>Reviews</h1>
                        </div>

                        {/* reviews */ }
                        <div className='w-full h-96 overflow-scroll flex flex-col gap-3 justify-start'>
                            {/* review components */ }
                            <ReviewBox rating={ 5 } reviewText={ reviewText } />
                            <ReviewBox rating={ 4 } reviewText={ reviewText } />
                            <ReviewBox rating={ 3 } reviewText={ reviewText } />
                            <ReviewBox rating={ 2 } reviewText={ reviewText } />
                            <ReviewBox rating={ 1 } reviewText={ reviewText } />
                        </div>

                        {/* add review */ }
                        <div className='h-64 w-full flex flex-col'>
                            {/* heading */ }
                            <div className='h-[25%] w-full'>
                                <h3 className={ 'text-base ' + rubik.className }>
                                    Add your review and rating
                                </h3>
                                <div>
                                    <ReviewStar />
                                </div>
                            </div>
                            <textarea className='border-2 h-3/5 w-full outline-[#3090a5] p-1 rounded-md' />
                            <div className='flex-1 flex items-center justify-end'>
                                <Button
                                    text='Submit'
                                    className='bg-[#3090a5] hover:!bg-[#256371] text-white p-2 px-3 mt-2 rounded-md font-semibold mr-5 duration-300'
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* third section (related products) */ }
                <section className='w-full my-5'>
                    <div className='h-auto w-full xl:w-11/12 flex flex-col p-2 gap-4'>

                        {/* heading */ }
                        <div className='w-11/12 self-end text-2xl md:text-3xl mt-2'>
                            <h1 className={ '2xl:mml-[2vw] ' + rubik.className }>Related Products</h1>
                        </div>

                        {/* product container */ }
                        <div className='flex flex-col h-full xl:w-[72rem] lg:w-full self-center'>
                            <div
                                className='grid grid-rows-none gap-4 justify-center relative grid-cols-2 sm:grid-cols-3 md:p-4 p-2 lg:grid-cols-4 xl:grid-cols-5'
                            >
                                { itemArr.map((item) => <ItemCard key={ item._id } { ...item } />) }
                            </div>
                            <Link href="#" className='mt-3 text-xs sm:text-sm text-center font-semibold border-2 border-blue-600 rounded-2xl lg:bg-blue-100 lg:hover:bg-blue-200 bg-blue-200 text-blue-600  px-2 self-end'>
                                See all related products
                            </Link>
                        </div>
                    </div>
                </section>

                {/* footer */ }
                <Footer />
            </div>
        </div>
    );
};

export default page;