"use client";

import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import Button from "@/components/common/buttons/Button";
import { useGetCartItems } from "@/lib/customHook/useCartItems";
import { useRouter } from "next/navigation";
import SingleItem from "./SingleItem";
import PageLoading from "@/components/common/loading/PageLoading";
import ChooseAddress from "./ChooseAddress";
import {
  T_orderObj,
  orderPriceStateType,
  orderProductType,
} from "@/lib/types/orderTypes";
import { addressTypeInputValues } from "@/lib/types/addressTypes";
import InputCompo from "@/components/common/inputs/InputCompo";
import toast from "react-hot-toast";
import ConfirmationDialog from "@/components/common/confirmation/ConfirmationDialog";
import { useOrderMutation } from "@/lib/customHook/useBuyProducts";
import {
  ErrorMessage,
  orderSuccessMessage,
  placingOrder,
} from "@/lib/util/toastMessages";

const paymentMethods = [
  { id: "stripe", title: "Stripe" },
  { id: "cash-on-delivery", title: "Cash On Delivery" },
];

interface I_OrderSummary {
  product: orderProductType[] | [];
}

const initialShippingAddress: addressTypeInputValues = {
  full_name: "",
  phone_number: "",
  address: "",
};

const OrderSummary: FC<I_OrderSummary> = ({ product }) => {
  const [products, setProducts] = useState<orderProductType[] | []>(product);
  const [isCartProducts, setIsCartProducts] = useState<boolean>(false);
  const [isChooseAddressOpen, setIsChooseAddressOpen] =
    useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<string>("cash-on-delivery");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<orderPriceStateType>({
    subtotal: 0,
    discount: 0,
    tax: 0,
  });
  const [shippingAddress, setShippingAddress] =
    useState<addressTypeInputValues>(initialShippingAddress);

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
  }, [data, isLoading, product.length, push]);

  useEffect(() => {
    if (products && products.length > 0) {
      setPrice({
        subtotal: 0,
        discount: 0,
        tax: 0,
      });

      products.map((obj: any) => {
        setPrice((prev: any) => ({
          subtotal:
            prev.subtotal +
            obj.price * (isCartProducts ? obj.quantity : quantity),
          discount:
            prev.discount +
            (obj.price - obj.current_price) *
              (isCartProducts ? obj.quantity : quantity),
          tax: 20,
        }));
      });
    }
  }, [products, quantity, isCartProducts]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setShippingAddress((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddressClick = (obj: addressTypeInputValues) => {
    setShippingAddress(obj);
    setIsChooseAddressOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isNaN(Number(shippingAddress.phone_number)) ||
      shippingAddress.phone_number.toString().length !== 10
    ) {
      toast.error("Invalid phone number");
      return;
    }

    setIsConfirmationOpen(true);
  };

  const orderMutation = useOrderMutation();

  const handleConfirmPlaceOrder = useCallback(async () => {
    toast.loading(placingOrder);

    setIsConfirmationOpen(false);
    const orderObject: T_orderObj = {
      shipping_address: shippingAddress,
      products,
      total_price: Math.round(price.subtotal - price.discount + price.tax),
      total_discount: price.discount,
      tax: price.tax,
      payment_type: paymentType,
    };

    orderMutation.mutate(orderObject, {
      onSuccess: (data) => {
        if (paymentType === "cash-on-delivery") {
          toast.dismiss();
          toast.success(orderSuccessMessage);
        }
        push(paymentType === "stripe" ? data.url : "/profile/orders");
      },
      onError: () => {
        toast.dismiss();
        toast.error(ErrorMessage);
      },
    });
  }, [price, paymentType, shippingAddress, products, orderMutation, push]);

  return (
    <form
      className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
      onSubmit={handleSubmit}
    >
      {isChooseAddressOpen && (
        <ChooseAddress
          closeModel={() => setIsChooseAddressOpen(false)}
          onAddressClick={onAddressClick}
        />
      )}

      {isConfirmationOpen && (
        <ConfirmationDialog
          onCancel={() => setIsConfirmationOpen(false)}
          onConfirm={handleConfirmPlaceOrder}
          text="Are you sure you want to place this order?"
        />
      )}

      <div>
        <div className="border-lightColor">
          <h2 className="text-lg font-medium text-rootColor">
            Shipping information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-lightColor"
              >
                Full name
              </label>
              <div className="mt-1">
                <InputCompo
                  name="full_name"
                  type="text"
                  isRequired
                  value={shippingAddress.full_name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-lightColor bg-rootBg text-rootColor shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-lightColor"
              >
                Phone number
              </label>
              <div className="mt-1">
                <InputCompo
                  name="phone_number"
                  type="tel"
                  isRequired
                  className="block w-full rounded-md border-lightColor bg-rootBg text-rootColor shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                  value={shippingAddress.phone_number}
                  minLength={10}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-lightColor"
              >
                Address
              </label>
              <div className="mt-1">
                <textarea
                  name="address"
                  id="address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-lightColor text-rootColor shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
                  value={shippingAddress.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="w-full h-20 font-bold uppercase flex justify-center items-center">
            OR
          </div>
          <div className="w-full h-5 flex justify-center items-center text-sm">
            <span
              className="cursor-pointer px-2 py-1 bg-lightBg border border-indigo-500 text-indigo-500 rounded-full font-medium"
              onClick={() => setIsChooseAddressOpen(true)}
            >
              Choose one
            </span>
          </div>
        </div>

        {/* Payment */}
        <div className="mt-10 border-t border-lightColor pt-10">
          <h2 className="text-lg font-medium text-rootColor">Payment</h2>

          <fieldset className="mt-4">
            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
              {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                <div key={paymentMethod.id} className="flex items-center">
                  {paymentMethodIdx === 0 ? (
                    <input
                      id={paymentMethod.id}
                      name="payment-type"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      onChange={() => setPaymentType(paymentMethod.id)}
                      checked={paymentType === paymentMethod.id}
                    />
                  ) : (
                    <input
                      id={paymentMethod.id}
                      name="payment-type"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      onChange={() => setPaymentType(paymentMethod.id)}
                      checked={paymentType === paymentMethod.id}
                    />
                  )}

                  <label
                    htmlFor={paymentMethod.id}
                    className="ml-3 block text-sm font-medium text-lightColor cursor-pointer"
                  >
                    {paymentMethod.title}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Order summary */}
      <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-rootColor">Order summary</h2>

        {products.length > 0 ? (
          <div className="mt-4 rounded-lg border border-lightColor bg-rootBg shadow-sm">
            <ul role="list" className="divide-y divide-lightColor">
              {products.length > 0 &&
                products.map((product) => (
                  <SingleItem
                    key={product._id}
                    productQuantity={quantity}
                    changeProductQuantity={(
                      e: React.ChangeEvent<HTMLSelectElement>
                    ) => setQuantity(Number(e.target.value))}
                    isCartProducts={isCartProducts}
                    {...product}
                  />
                ))}
            </ul>
            <dl className="space-y-6 border-t border-lightColor px-4 py-6 sm:px-6 font-rubik">
              <div className="flex items-center justify-between">
                <dt className="text-sm">Subtotal</dt>
                <dd className="text-sm font-medium text-rootColor">
                  ${price.subtotal}
                </dd>
              </div>
              <div className="flex items-center justify-between text-green-500">
                <dt className="text-sm">Discount</dt>
                <dd className="text-sm font-medium">
                  ${Math.round(price.discount)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Taxes</dt>
                <dd className="text-sm font-medium text-rootColor">
                  ${price.tax}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-lightColor pt-6">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium text-rootColor">
                  ${Math.round(price.subtotal - price.discount + price.tax)}
                </dd>
              </div>
            </dl>

            <div className="border-t border-lightColor px-4 py-6 sm:px-6">
              <Button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                text="Confirm order"
                disabled={isLoading}
              />
            </div>
          </div>
        ) : isLoading ? (
          <PageLoading />
        ) : (
          "No product founded"
        )}
      </div>
    </form>
  );
};

export default OrderSummary;
