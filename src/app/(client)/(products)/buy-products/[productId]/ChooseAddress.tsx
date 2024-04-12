import AddressList from '@/app/(client)/(cart-and-profile)/profile/(childrens)/addresses/AddressList';
import IconButton from '@/components/common/buttons/IconButton';
import React, { FC } from 'react';

type onAddressClickType = {
    full_name: string;
    phone_number: string | number;
    address: string;
};

interface I_ChooseAddress {
    closeModel: () => void;
    onAddressClick: ({
        full_name,
        phone_number,
        address
    }: onAddressClickType) => void;
};

const ChooseAddress: FC<I_ChooseAddress> = ({ closeModel, onAddressClick }) => {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full p-4 pt-12 relative">
                    <IconButton
                        icon={ <i className="ri-close-fill"></i> }
                        onClick={ closeModel }
                        type='button'
                        className='absolute top-1 right-1 cursor-pointer text-2xl px-1 py-[2px] rounded hover:bg-gray-100'
                    />
                    <AddressList onAddressClick={ onAddressClick } />
                </div>
            </div>
        </div>
    )
}

export default ChooseAddress;
