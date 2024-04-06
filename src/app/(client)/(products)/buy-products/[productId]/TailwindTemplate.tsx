"use client";

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import classNames from '@/lib/util/classNames'

const products = [
  {
    id: 1,
    title: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
]

const paymentMethods = [
  { id: 'paypal', title: 'PayPal' },
  { id: 'cod', title: 'Cash On Delivery' },
]

export default function Example() {

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 md:pb-24 md:pt-16 pb-12 pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

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
                <legend className="sr-only">Payment type</legend>
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
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                { products.map((product) => (
                  <li key={ product.id } className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img src={ product.imageSrc } alt={ product.imageAlt } className="w-20 rounded-md" />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a href={ product.href } className="font-medium text-gray-700 hover:text-gray-800">
                              { product.title }
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">{ product.color }</p>
                          <p className="mt-1 text-sm text-gray-500">{ product.size }</p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
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
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">{ product.price }</p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                )) }
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
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
