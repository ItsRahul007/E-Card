import React from 'react';

const Reviews = () => {
    return (
        <div className='sm:px-4 px-2 sm:py-3 py-2 flex flex-col gap-5'>
            <div>
                <h3 className='text-lg font-semibold text-appTheme-600'>My Ratings & Reviews</h3>
            </div>

            {/* Reviews List */ }
            <div className='h-auto max-w-full overflow-x-scroll text-zinc-800'>
                <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                    <thead className='bg-appTheme-500 text-white'>
                        <tr>
                            <th className="px-4 py-1.5 truncate border">Product</th>
                            <th className="px-4 py-1.5 truncate border">Rating</th>
                            <th className="px-4 py-1.5 truncate border">Review</th>
                            <th className="px-4 py-1.5 truncate border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='hover:bg-appTheme-50 hover:text-appTheme-700'>
                            <td className="border px-4 py-2 truncate max-w-[15rem] sm:max-w-[20rem]">Product 1</td>
                            <td className="border px-4 py-2 truncate max-w-[15rem] sm:max-w-[20rem]">5 out of 5</td>
                            <td className="border px-4 py-2 truncate max-w-[15rem] sm:max-w-[20rem]">This is a great product. I love it!</td>
                            <td className="border px-4 py-2 truncate max-w-[15rem] sm:max-w-[20rem]">2023-03-08</td>
                        </tr>
                        <tr className='hover:bg-appTheme-50 hover:text-appTheme-700'>
                            <td className="border px-4 py-2 truncate max-w-[15rem] sm:max-w-[20rem]">Product 2</td>
                            <td className="border px-4 py-2 truncate max-w-[15rem] sm:max-w-[20rem]">4 out of 5</td>
                            <td className="border px-4 py-2 truncate max-w-[15rem] sm:max-w-[20rem]">This is a good product. I like it.</td>
                            <td className="border px-4 py-2 truncate max-w-[15rem] sm:max-w-[20rem]">2023-03-10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reviews;