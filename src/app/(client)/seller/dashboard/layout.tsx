import React from 'react';

const layout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className='min-h-screen h-auto w-screen max-w-[1540px] mx-auto bg-gray-100 font-poppins flex gap-3 md:px-8 px-2 py-3 md:py-8'>
            {/* sile options */ }
            <div className='h-screen w-96 bg-white md:flex hidden flex-col gap-4 px-3 py-5 shadow-md'>

            </div>

            {/* main components */ }
            <div className='flex-1 bg-white shadow-md p-2'>
                { children }
            </div>
        </main>
    )
}

export default layout;