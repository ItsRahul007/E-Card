import SmallImageContainer from '@/app/(client)/components/small-image-container/SmallImageContainer';
import Image from 'next/image';
import React, { FC } from 'react';

interface pageProps {
    params: { productKey: string };
    searchParams: { search: string };
}

const page: FC<pageProps> = ({ params }) => {


    return (
        <div className='h-screen w-screen bg-slate-50 '>
            {/* first section */}
            <section className='w-full h-[35rem]'>
                <div className='h-full w-11/12 p-4 px-6 flex'>
                    {/* images container */}
                    <div className='h-full w-[30rem] flex'>
                        <div className='h-3/4 w-full flex gap-4'>
                            {/* sub images */}
                            <div className='h-full w-2/6 flex flex-col gap-1 items-center'>
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
                            <div className='relative h-full w-4/6 border rounded-md overflow-hidden'>
                                <Image
                                    src="https://m.media-amazon.com/images/I/61xXO4SSioL._SX569_.jpg"
                                    alt='t-shirt'
                                    fill
                                />
                            </div>
                        </div>
                    </div>

                    {/* text container */}
                    <div></div>
                </div>
            </section>
        </div>
    );
};

export default page;