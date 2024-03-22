import React from 'react';

const Coupons = () => {
    return (
        <div className='sm:px-4 px-2 sm:py-3 py-2 flex flex-col gap-5'>
            <div>
                <h3 className='text-lg font-semibold text-appTheme-600'>My Coupons</h3>
            </div>
            <div className='h-auto w-full overflow-x-auto text-zinc-800'>
                <table className="table-auto border-collapse border border-gray-300 w-full text-sm duration-100">
                    <thead className='bg-appTheme-500 text-white'>
                        <tr>
                            <th className="px-4 py-1.5 truncate border">Name</th>
                            <th className="px-4 py-1.5 truncate border">Code</th>
                            <th className="px-4 py-1.5 truncate border">Discount</th>
                            <th className="px-4 py-1.5 truncate border">Starts On</th>
                            <th className="px-4 py-1.5 truncate border">Expires On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='hover:bg-appTheme-50 hover:text-appTheme-700'>
                            <td className="border px-4 py-2">Coupon 1</td>
                            <td className="border px-4 py-2">ABC123</td>
                            <td className="border px-4 py-2">10%</td>
                            <td className="border px-4 py-2">2024-03-20</td>
                            <td className="border px-4 py-2">2024-03-30</td>
                        </tr>
                        <tr className='hover:bg-appTheme-50 hover:text-appTheme-700'>
                            <td className="border px-4 py-2">Coupon 2</td>
                            <td className="border px-4 py-2">XYZ456</td>
                            <td className="border px-4 py-2">15%</td>
                            <td className="border px-4 py-2">2024-04-01</td>
                            <td className="border px-4 py-2">2024-04-10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Coupons;