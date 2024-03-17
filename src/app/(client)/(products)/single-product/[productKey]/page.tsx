import AllProductNav from '@/components/all-products/Nav';
import React, { FC } from 'react';
import style from "@/app/style/style.module.css";
import Button from '@/components/common/buttons/Button';
import ReviewBox from '@/components/ReviewBox';
import ReviewStar from '@/components/ReviewStar';
import Footer from '@/components/common/footer/Footer';
import RelatedProducts from '@/components/single-product-compos/RelatedProducts';
import { reviewText } from './reviewText';
import ImageContainer from '@/components/single-product-compos/ImageContainer';
import type { Metadata } from 'next'
import { getProductDescription } from '@/lib/gimini-AI/giminiAI';
import ProductsSchema from "@/lib/model/productSchema";
import connectWithMongo from '@/lib/mongoConnection/mongoConnect';

interface I_SingleProductPage {
    params: { productKey: string };
    searchParams: { search: string };
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
    await connectWithMongo();
    const product = await ProductsSchema.findById(productId).select("product_type product_name")
    const description = await getProductDescription(product.product_type, product.product_name);

    return {
        title: "E-Card - " + capitalizeText(product.product_name),
        description
    }
};

const SingleProductPage: FC<I_SingleProductPage> = async ({ params }) => {
    //? reading route params
    const productId = params.productKey;
    await connectWithMongo();
    const product = await ProductsSchema.findById(productId).select("-updatedAt -createdAt -brand_name -__v");

    if (!product) {
        throw new Error("Can't fine any product");
    };

    const { ratings, primaryImgUrl, secondaryImgUrls, price, product_name, product_type, discount_percentage, current_price } = product;
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
                                <h4 className={ `font-outfit font-medium` }>{ product_name }</h4>
                            </div>

                            {/* product rating */ }
                            <div className='mt-1 sm:mt-2 flex items-center select-none'>
                                { generateStars() }
                                <span className={ `ml-4 sm:text-sm text-xs text-slate-500 font-rubik font-medium` }>
                                    { ratings.length > 0 ? `(${ratings.length} customer reviewed)` : "(no reviews)" }
                                </span>
                            </div>

                            {/* product price */ }
                            <div className={ `mt-3 sm:mt-5 font-rubik font-medium flex gap-2 select-none` }>
                                <span className='sm:text-2xl text-xl'>${ current_price }</span>
                                <span className='sm:text-xl text-lg font-sans text-gray-700 mt-1 line-through decoration-gray-700 decoration-2'>
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
                            <h1 className={ 'ml-5 font-rubik font-medium' }>Reviews</h1>
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
                                <h3 className={ 'text-base font-rubik font-medium' }>
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
                {/* <RelatedProducts /> */ }

                {/* footer */ }
                <Footer />
            </div>
        </div>
    );
};

export default SingleProductPage;