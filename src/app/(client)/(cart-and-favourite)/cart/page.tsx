import React, { FC } from 'react'
import Navbar from '../../components/common/all-products/Nav';
import SingleCartItem from '../../components/common/all-products/SingleCartItem';
import InputCompo from '../../components/common/InputCompo';
import Button from '../../components/common/buttons/Button';

const Cart: FC = () => {
    return (
        <main className='h-screen w-screen flex flex-col overflow-y-scroll bg-gray-100'>
            <Navbar />
            <div className='w-full h-auto flex justify-center items-center mt-12'>
                <div className='h-auto w-11/12 flex flex-col lg:flex-row gap-3 lg:gap-6'>
                    {/* left component */ }
                    <div className='min-h-[24rem] h-auto w-full lg:w-9/12 bg-white border-2 rounded-xl flex flex-col overflow-hidden p-3'>
                        {/* heading */ }
                        <div className='h-14 flex items-center pt-3 pb-7'>
                            <h1 className="font-nunito ml-3 text-2xl text-gray-600 font-semibold">Your shopping cart</h1>
                        </div>

                        {/* cart items */ }
                        <div className='flex-1 flex justify-center'>
                            <div className='h-full w-[98%] flex flex-col gap-2'>
                                {/* single cart item */ }
                                <SingleCartItem />
                                <SingleCartItem />
                                <SingleCartItem />
                                <SingleCartItem />
                            </div>
                        </div>
                    </div>

                    {/* right component */ }
                    <div className='flex-1 flex flex-col gap-4'>
                        {/* cupon component */ }
                        <div className='w-80 bg-white border-2 rounded-lg px-6 py-4 flex flex-col justify-center items-start h-28 gap-2'>
                            <h4 className='text-base font-normal text-stone-500'>Have coupon?</h4>
                            <div className='flex'>
                                <InputCompo
                                    name='cupon_code'
                                    type='text'
                                    placeholder='Coupon code'
                                    className='border px-2 py-1 rounded-l focus:border-blue-400'
                                />
                                <Button
                                    text='Apply'
                                    type='button'
                                    className='uppercase border text-[12px] px-3 border-l-0 rounded-r font-medium bg-stone-100 hover:bg-stone-200 text-gray-500'
                                />
                            </div>
                        </div>

                        {/* total price component */ }
                        <div className='w-80 h-auto bg-white border-2 rounded-lg px-6 py-4 flex flex-col justify-center items-start gap-2'>
                            {/* text */ }
                            <div className='w-full flex flex-col font-rubik text-base text-zinc-600'>
                                <div className='flex justify-between h-9'>
                                    <span>Total price:</span>
                                    <span>$400</span>
                                </div>
                                <div className='flex justify-between h-9'>
                                    <span>Discount:</span>
                                    <span className='text-green-500'>12%</span>
                                </div>
                                <div className='flex justify-between h-9'>
                                    <span>TAX:</span>
                                    <span>$20</span>
                                </div>
                                <div className='flex justify-center items-center w-full h-9'>
                                    <hr className='w-full border-t-2' />
                                </div>
                                <div className='flex justify-between h-9 font-medium'>
                                    <span>Total price:</span>
                                    <span>${ 400 - (400 * 12 / 100) + 20 }</span>
                                </div>

                                {/* buttons */ }
                                <div className='w-full h-auto flex flex-col gap-3 mt-3'>
                                    <Button
                                        text='Make purchase'
                                        className='uppercase bg-green-600 text-[11px] py-[6px] rounded-md text-white font-medium'
                                    />
                                    <Button
                                        text='back to shop'
                                        className='uppercase border-2 bg-stone-100 text-[11px] py-[6px] rounded-md text-stone-500 font-medium'
                                    />
                                </div>
                            </div>

                            {/* buttons */ }
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart;