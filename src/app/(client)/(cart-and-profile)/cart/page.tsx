import React, { FC } from "react";
import Navbar from "@/components/all-products/Nav";
import InputCompo from "@/components/common/inputs/InputCompo";
import Button from "@/components/common/buttons/Button";
import Footer from "@/components/common/footer/Footer";
import CartItems from "./CartItems";
import TotalPeice from "./TotalPeice";

const Cart: FC = () => {
  return (
    <main className="h-screen w-screen flex flex-col overflow-y-scroll bg-lightBg">
      <Navbar />
      <div className="w-full h-auto flex justify-center items-center mb-6 sm:my-6 md:my-12">
        <div className="h-auto sm:w-11/12 w-full flex flex-col lg:flex-row gap-3 lg:gap-6">
          {/* left component */}
          <div className="min-h-[24rem] h-auto w-full lg:w-9/12 bg-rootBg sm:border-2 sm:border-lightColor sm:rounded-xl flex flex-col overflow-hidden p-3 pb-5 lg:mb-5">
            {/* heading */}
            <div className="h-14 flex items-center pt-3 pb-7">
              <h1 className="!font-nunito ml-3 text-2xl text-rootColor font-semibold">
                Your shopping cart
              </h1>
            </div>

            {/* cart items */}
            <CartItems />

            <div className="h-10 flex justify-center items-center">
              <hr className="w-full" />
            </div>
            <div className="min-h-20 w-full flex flex-col gap-3">
              <div className="text-lg text-rootColor flex items-center">
                <span className="text-3xl pr-2">
                  <i className="ri-truck-fill"></i>
                </span>
                <span className="font-medium">
                  Free Delivery within 1-2 weeks
                </span>
              </div>
              <div className="text-lightColor h-auto text-xs sm:text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum esse optio sit sed, tenetur vero ipsam nisi facilis
                aliquam delectus modi, eius amet deserunt qui doloribus
                excepturi iure praesentium ut?
              </div>
            </div>
          </div>

          {/* right component */}
          <div className="flex-1 flex flex-col gap-4">
            {/* cupon component */}
            <div className="sm:w-full min-w-80 bg-rootBg sm:border-2 sm:border-lightColor sm:rounded-lg px-6 py-4 flex flex-col justify-center items-start h-28 gap-2">
              <h4 className="text-base font-normal text-rootColor">
                Have coupon?
              </h4>
              <div className="flex w-full">
                <InputCompo
                  name="cupon_code"
                  type="text"
                  placeholder="Coupon code"
                  className="border px-2 py-1 rounded-l focus:outline-blue-400 shadow-none w-full bg-lightBg text-rootColor"
                />
                <Button
                  text="Apply"
                  type="button"
                  className="uppercase border text-xs px-3 border-l-0 rounded-r font-medium bg-stone-100 hover:bg-stone-200 text-gray-500 dark:bg-zinc-800 dark:text-rootColor dark:hover:bg-zinc-900 dark:border-zinc-600"
                />
              </div>
            </div>

            {/* total price component */}
            <TotalPeice />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Cart;
