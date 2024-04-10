"use client";

import { FC, useEffect, useState } from 'react';
import Button from '@/components/common/buttons/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useGetCartItems } from '@/lib/customHook/useCartItems';

const paymentMethods = [
  { id: 'paypal', title: 'PayPal' },
  { id: 'cod', title: 'Cash On Delivery' },
]

type productType = {
  _id: string;
  product_name: string;
  price: number;
  current_price: number;
  primaryImgUrl: string;
  quantity?: number;
  discount_percentage?: number;
}

interface I_OrderSummary {
  product: productType[] | [];
}

const OrderSummary: FC<I_OrderSummary> = ({ product }) => {
  const [products, setProducts] = useState(product);

  const { data, isLoading } = useGetCartItems();

  useEffect(() => {
    if (!isLoading && product.length <= 0) {
      setProducts(data.cartProducts);
    }
  }, [data, isLoading]);


  return (
    <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
      <div>

        <div className="border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <textarea
                  name="address"
                  id="address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Payment */ }
        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">Payment</h2>

          <fieldset className="mt-4">
            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
              { paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                <div key={ paymentMethod.id } className="flex items-center">
                  { paymentMethodIdx === 0 ? (
                    <input
                      id={ paymentMethod.id }
                      name="payment-type"
                      type="radio"
                      defaultChecked
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  ) : (
                    <input
                      id={ paymentMethod.id }
                      name="payment-type"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  ) }

                  <label htmlFor={ paymentMethod.id } className="ml-3 block text-sm font-medium text-gray-700">
                    { paymentMethod.title }
                  </label>
                </div>
              )) }
            </div>
          </fieldset>
        </div>
      </div>

      {/* Order summary */ }
      <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
          <ul role="list" className="divide-y divide-gray-200">
            { products.length > 0 ?
              products.map((product) => (
                <li key={ product._id } className="flex px-4 py-6 sm:px-6">
                  <div className="flex-shrink-0 w-20 h-20 relative">
                    <Image
                      src={ product.primaryImgUrl }
                      alt='product'
                      className="rounded-md object-contain"
                      fill
                    />
                  </div>

                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <Link href={ '/single-product/' + product._id } className="font-medium text-gray-700 hover:text-gray-800">
                            { product.product_name }
                          </Link>
                          <p className="mt-1 text-sm font-medium text-gray-900">${ product.price }</p>
                        </h4>
                      </div>

                      <div className="ml-4 flow-root flex-shrink-0">
                        <div
                          className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                        >
                          <select
                            id="quantity"
                            name="quantity"
                            className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={ 1 }>1</option>
                            <option value={ 2 }>2</option>
                            <option value={ 3 }>3</option>
                            <option value={ 4 }>4</option>
                          </select>
                        </div>
                      </div>
                    </div>

                  </div>
                </li>
              ))
              : "No product founded"
            }
          </ul>
          <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6 font-rubik">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">$64.00</dd>
            </div>
            <div className="flex items-center justify-between text-green-500">
              <dt className="text-sm">Discount</dt>
              <dd className="text-sm font-medium">$5.00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Taxes</dt>
              <dd className="text-sm font-medium text-gray-900">$5.52</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">Total</dt>
              <dd className="text-base font-medium text-gray-900">$75.52</dd>
            </div>
          </dl>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <Button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              text='Confirm order'
            />
          </div>
        </div>
      </div>
    </form>
  )
};

export default OrderSummary;
