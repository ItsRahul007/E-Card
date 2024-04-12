"use client";

import { FC, useEffect, useState } from 'react';
import Button from '@/components/common/buttons/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useGetCartItems } from '@/lib/customHook/useCartItems';
import { useRouter } from 'next/navigation';
import SingleItem from './SingleItem';
import PageLoading from '@/components/common/loading/PageLoading';

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

type priceStateType = {
  subtotal: number;
  discount: number;
  tax: number;
}

const OrderSummary: FC<I_OrderSummary> = ({ product }) => {
  const [products, setProducts] = useState<productType[] | []>(product);
  const [isCartProducts, setIsCartProducts] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const [price, setPrice] = useState<priceStateType>({
    subtotal: 0,
    discount: 0,
    tax: 0,
  });

  const { push } = useRouter();

  const { data, isLoading } = useGetCartItems();

  useEffect(() => {
    if (!isLoading && product.length <= 0) {
      if (data.cartProducts.length > 0) {
        setProducts(data.cartProducts);
        setIsCartProducts(true);
      }

      //! if user try to reach but products url without having any products in his cart then redirecting him
      else if (data.cartProducts.length <= 0) push("/products/all");
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (products && products.length > 0) {
      setPrice({
        subtotal: 0,
        discount: 0,
        tax: 0
      });

      products.map((obj: any) => {
        setPrice((prev: any) => ({
          subtotal: prev.subtotal + (obj.price * (isCartProducts ? obj.quantity : quantity)),
          discount: prev.discount + ((obj.price - obj.current_price) * (isCartProducts ? obj.quantity : quantity)),
          tax: 20
        }))
      })
    }
  }, [products, quantity]);

  //TODO: product rate calculation and give a option to pick a shipping address that he already have

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
                <SingleItem
                  key={ product._id }
                  productQuantity={ quantity }
                  changeProductQuantity={ (e: React.ChangeEvent<HTMLSelectElement>) => setQuantity(Number(e.target.value)) }
                  isCartProducts={ isCartProducts }
                  { ...product }
                />
              ))
              : isLoading ? <PageLoading /> : "No product founded"
            }
          </ul>
          <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6 font-rubik">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">${ price.subtotal }</dd>
            </div>
            <div className="flex items-center justify-between text-green-500">
              <dt className="text-sm">Discount</dt>
              <dd className="text-sm font-medium">${ Math.round(price.discount) }</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Taxes</dt>
              <dd className="text-sm font-medium text-gray-900">${ price.tax }</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">Total</dt>
              <dd className="text-base font-medium text-gray-900">${ Math.round(price.subtotal - price.discount + price.tax) }</dd>
            </div>
          </dl>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <Button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              text='Confirm order'
              disabled={ isLoading }
            />
          </div>
        </div>
      </div>
    </form>
  )
};

export default OrderSummary;
