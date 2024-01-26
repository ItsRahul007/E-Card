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
import Footer from '@/app/lib/common/footer/Footer';
import RelatedProducts from '../../../components/single-product-compos/RelatedProducts';
import { reviewText } from './reviewText';
import toast from 'react-hot-toast';
import { ProductType } from '@/app/lib/types/productTyps';
import ImageContainer from '@/app/(client)/components/single-product-compos/ImageContainer';
import type { Metadata } from 'next'

interface pageProps {
    params: { productKey: string };
    searchParams: { search: string };
}

const rubik = Rubik({
    weight: ["700", "500"],
    style: "normal",
    subsets: ["latin"]
});

async function getProductById(productId: string) {
    const res = await fetch(`${process.env.SINGLE_PRODUCT_URL}${productId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            AUTH_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_AUTH_TOKEN || "")
        },
    })

    return res.json();
};

export async function generateMetadata({ params, searchParams }: pageProps): Promise<Metadata> {
    // read route params
    const productId = params.productKey;

    // fetch data
    const product = await getProductById(productId);

    return {
        title: product.success ? "E-Card - " + product.product.product_name : product.error,
    }
}

const SingleProductPage: FC<pageProps> = async ({ params }) => {
    const productId = params.productKey;
    const isProduct = await getProductById(productId);

    if (!isProduct.success) {
        toast.error(isProduct.error);
        throw new Error(isProduct.error);
    }

    const product: ProductType = isProduct.product;
    const { ratings, primaryImgUrl, secondryImgUrls, price, product_name, product_type } = product;


    // Function to generate star icons based on the rounded rating
    const generateStars = () => {
        //? getting the total rating number
        let totalRatingNumber: number = 0;
        ratings.map((obj: any) => {
            const prevTotal = totalRatingNumber;
            totalRatingNumber = prevTotal + obj.ratingNumber;
        })

        // Round the rating to the nearest half
        const rating: number = totalRatingNumber / ratings.length;
        const roundedRating = Math.round(rating * 2) / 2;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            let starColorClass;

            if ((i - 1) + .5 === roundedRating) {
                starColorClass = `${style.half_star}`;
            } else if (i <= roundedRating) {
                starColorClass = 'text-[#35a3bc]';
            } else {
                starColorClass = 'text-gray-400';
            }

            stars.push(
                <span key={ i } className={ `text-xl max-[385px]:text-lg ${starColorClass}` }>&#9733;</span>
            );
        }
        return stars;
    };

    return (
        <div className='h-screen w-screen bg-slate-100 flex flex-col'>
            <AllProductNav />
            <div className='overflow-scroll w-screen bg-slate-100 '>
                {/* first section (product) */ }
                <section className='w-full md:max-h-[35rem]'>
                    <div className='h-full w-full lg:w-11/12 p-4 px-6 flex sm:flex-row flex-col lg:gap-2 max-[639.5px]:items-center gap-6'>
                        {/* images container */ }
                        <ImageContainer
                            primaryImgUrl={ primaryImgUrl }
                            product_type={ product_type }
                            secondryImgUrls={ secondryImgUrls }
                        />

                        {/* text container */ }
                        <div className='lg:flex-1'>
                            {/* product name */ }
                            <div className="w-11/12 h-8 text-left text-2xl uppercase whitespace-nowrap text-ellipsis overflow-hidden sm:text-3xl">
                                <h2 className={ `$${rubik.className}` }>{ product_name }</h2>
                            </div>

                            {/* product rating */ }
                            <div className='mt-4 flex items-center select-none'>
                                { generateStars() }
                                <span className={ `ml-4 sm:text-sm text-xs text-slate-500 ${rubik.className}` }>
                                    { ratings.length > 0 ? `(${ratings.length} customer reviewed)` : "(no reviews)" }
                                </span>
                            </div>

                            {/* product price */ }
                            <div className={ `mt-5 ${rubik.className} flex gap-2 select-none` }>
                                <span className='sm:text-2xl text-xl'>${ price }</span>
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
                <RelatedProducts />

                {/* footer */ }
                <Footer />
            </div>
        </div>
    );
};

export default SingleProductPage;