import React, { FC } from 'react'
import Navbar from '../../components/common/all-products/Nav';
import SingleCartItem from '../../components/common/all-products/SingleCartItem';

const Cart: FC = () => {
    return (
        <main className='h-screen w-screen flex flex-col overflow-y-scroll bg-gray-100'>
            <Navbar />
            <div className='w-full h-auto flex justify-center items-center mt-12'>
                <div className='h-auto w-11/12 flex flex-col lg:flex-row gap-3 lg:gap-6'>
                    {/* left component */ }
                    <div className='min-h-[24rem] h-auto w-full lg:w-9/12 bg-white border-2 rounded-xl flex flex-col overflow-hidden'>
                        {/* heading */ }
                        <div className='h-14 flex items-center py-3'>
                            <h1 className={ `font-nunito ml-3 text-2xl text-gray-600` }>Your shopping cart</h1>
                        </div>

                        {/* cart items */ }
                        <div className='flex-1 flex justify-center'>
                            <div className='h-full w-[98%]'>
                                {/* single cart item */ }
                                <SingleCartItem />
                            </div>
                        </div>
                    </div>

                    {/* right component */ }
                    <div className='flex-1'>
                        {/* cupon component */ }
                        <div></div>

                        {/* total price component */ }
                        <div></div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart;