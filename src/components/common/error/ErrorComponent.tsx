"use client";

import React from 'react'

const Error = (props: any) => {
    return (
        <div className='h-full w-full flex flex-col gap-4 items-center justify-center'>
            <div className='text-xl md:text-5xl font-bold text-red-500'>Oops something went wrong</div>
            <div className='text-base md:text-xl text-red-400 font-semibold'>{ props.error.message }</div>
            <div onClick={ props.reset } className='px-2 bg-green-200 border-green-600 border text-green-600 font-semibold rounded-xl cursor-pointer'>Try again</div>
        </div>
    )
}

export default Error;