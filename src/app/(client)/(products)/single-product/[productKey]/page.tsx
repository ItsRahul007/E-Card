import AllProductNav from '@/app/(client)/components/common/all-products/Nav';
import React, { FC } from 'react';
import style from "@/app/style/style.module.css";
import Button from '@/app/(client)/components/common/buttons/Button';
import ReviewBox from '@/app/(client)/components/ReviewBox';
import ReviewStar from '@/app/(client)/components/ReviewStar';
import Footer from '@/app/(client)/components/common/footer/Footer';
import RelatedProducts from '../../../components/single-product-compos/RelatedProducts';
import { reviewText } from './reviewText';
import toast from 'react-hot-toast';
import { ProductType } from '@/lib/types/productTyps';
import ImageContainer from '@/app/(client)/components/single-product-compos/ImageContainer';
import type { Metadata } from 'next'
import { getProductDescription } from '@/lib/gimini-AI/giminiAI';
import { outfit, rubik, rubik500 } from '@/lib/fonts/fonts';

interface I_SingleProductPage {
    params: { productKey: string };
    searchParams: { search: string };
}

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

export async function generateMetadata({ params, searchParams }: I_SingleProductPage): Promise<Metadata> {
    //? reading route params
    const productId = params.productKey;

    //? capitalizing the product name
    function capitalizeText(text: string): string {
        if (text) {
            let wordsArray = text.split(/[\s-]+/);

            let capitalizedArray = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));

            let capitalizedText = capitalizedArray.join(" ");

            return capitalizedText;
        } else return "";
    }

    //? fetching product
    const product = await getProductById(productId);
    const description = product.success ? await getProductDescription(product.product.product_type, product.product.product_name) : "";

    return {
        title: product.success ? "E-Card - " + capitalizeText(product.product.product_name) : product.error,
        description
    }
};

const SingleProductPage: FC<I_SingleProductPage> = async ({ params }) => {
    const productId = params.productKey;
    const isProduct = await getProductById(productId);

    if (!isProduct.success) {
        toast.error(isProduct.error);
        throw new Error(isProduct.error);
    }

    const product: ProductType = isProduct.product;
    const { ratings, primaryImgUrl, secondaryImgUrls, price, product_name, product_type, discount_percentage } = product;
    const ProductDescription = await getProductDescription(product_type, product_name);



    //? Function to generate star icons based on the rounded rating
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
                            secondaryImgUrls={ secondaryImgUrls }
                        />

                        {/* text container */ }
                        <div className='lg:flex-1'>
                            {/* product name */ }
                            <div className="min-h-8 h-auto max-md:w-72 text-left text-2xl capitalize text-ellipsis sm:text-3xl">
                                <h4 className={ `${outfit.className}` }>{ product_name }</h4>
                            </div>

                            {/* product rating */ }
                            <div className='mt-1 sm:mt-2 flex items-center select-none'>
                                { generateStars() }
                                <span className={ `ml-4 sm:text-sm text-xs text-slate-500 ${rubik.className}` }>
                                    { ratings.length > 0 ? `(${ratings.length} customer reviewed)` : "(no reviews)" }
                                </span>
                            </div>

                            {/* product price */ }
                            <div className={ `mt-3 sm:mt-5 ${rubik500.className} flex gap-2 select-none` }>
                                <span className='sm:text-2xl text-xl'>${ price - (price * discount_percentage / 100) }</span>
                                <span className='sm:text-xl text-lg !font-normal text-gray-700 mt-1 line-through decoration-gray-700 decoration-2'>
                                    ${ price }
                                </span>
                                <span className='sm:text-xl text-lg italic opacity-80 text-green-600'>
                                    { discount_percentage }% off
                                </span>
                            </div>

                            {/* about the product */ }
                            <div className="font-medium text-sm text-gray-500 md:w-[90%] w-72 mt-4">
                                { ProductDescription }
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