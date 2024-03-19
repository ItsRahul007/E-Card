"use client";

import React, { FC, useState } from 'react';
import EditAddressForm from './EditAddressForm';

const AddressCompo: FC = () => {
    const [isEditFormActive, setIsEditFormActive] = useState<boolean>(false);

    return (
        <>
            { !isEditFormActive ?
                <div className='h-auto w-full flex flex-col gap-2 px-6 py-5 text-zinc-800 relative'>
                    {/* three dots*/ }
                    <div className='absolute top-2 right-2 text-zinc-500 peer z-[1]'>
                        <i className="ri-more-2-fill text-xl"></i>
                    </div>

                    {/* options */ }
                    <div className='absolute top-2 right-2 p-3 peer-hover:!flex hover:!flex flex-col gap-2 rounded text-sm border shadow-md text-zinc-800 z-[2] hidden bg-white'>
                        <span
                            className='hover:text-blue-500 cursor-pointer'
                            onClick={ () => setIsEditFormActive(true) }
                        >
                            Edit
                        </span>
                        <span className='hover:text-blue-500 cursor-pointer'>Delete</span>
                    </div>

                    {/* address details */ }
                    <div className='flex gap-3 text-base font-medium'>
                        <span>Rahul Ghosh</span><span>1234567890</span>
                    </div>
                    <div>
                        Toralpur Tripally primari school, Toralpur, Memari II, Memari, West Bengal - 713146
                    </div>
                </div>
                :
                <EditAddressForm onCancle={ () => setIsEditFormActive(false) } />
            }
        </>
    );
};

export default AddressCompo;