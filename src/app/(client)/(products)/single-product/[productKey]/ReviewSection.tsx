"use client";

import ReviewBox from '@/components/ReviewBox';
import ReviewStar from '@/components/ReviewStar';
import Button from '@/components/common/buttons/Button';
import React from 'react';
import { reviewText } from './reviewText';

const ReviewSection = ({ _id }: { _id: string }) => {


    return (
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
    )
}

export default ReviewSection;