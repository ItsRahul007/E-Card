import React, { FC } from 'react'

const PageLoading: FC = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <span className="h-10 w-10 block border-4 border-transparent rounded-full border-r-black animate-spin" />
        </div>
    )
}

export default PageLoading;