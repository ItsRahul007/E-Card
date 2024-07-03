import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-[#1c1d1f] h-auto w-screen text-zinc-400">
      <div className="h-auto w-full max-w-[1540px] flex gap-2 flex-col items-center justify-center mx-auto pb-3">
        <div className="flex md:flex-row flex-col gap-3 md:gap-6 w-[95%] h-[65%] mt-6">
          <span className="w-full text-sm md:text-base md:w-2/4 max-md:text-center">
            <h5 className="text-white font-semibold text-base md:text-lg">
              ABOUT
            </h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus, minus velit. Recusandae ab quaerat vero, totam numquam
              natus sed, velit distinctio quisquam tempore maiores ea saepe?
              Eligendi laudantium facere doloremque maxime illo cum ut mollitia
              a perspiciatis, architecto ducimus pariatur aliquam porro! Rem,
              iure numquam magnam quidem delectus reiciendis similique!
            </p>
          </span>
          <span className="w-full text-sm md:text-base md:w-1/4 max-md:text-center">
            <h5 className="text-white font-semibold text-base md:text-lg">
              SERVICES
            </h5>
            <p>
              It&apos;s an practice project, so you can order anything but
              don&apos;t expect that you got any product to your home 😂
            </p>
          </span>
          <span className="w-full text-sm md:text-base md:w-1/4 max-md:text-center">
            <h5 className="text-white font-semibold text-base md:text-lg">
              PRODUCTS
            </h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus, minus velit. Recusandae ab quaerat vero, totam numquam
              natus sed, velit distinctio quisquam tempore maiores ea saepe?
            </p>
          </span>
        </div>
        <div className="border-b-2 border-zinc-300 text-zinc-400 w-[95%]"></div>
        <div className="flex md:justify-between md:flex-row flex-col md:gap-0 gap-2 w-[95%]">
          <span>Copyright &#169; 2024 All Rights Reserved by Rahul</span>
          <span className="flex gap-2">
            <button className="bg-[#35383f] rounded-full text-xl cursor-pointer h-7 w-7 p-5 flex items-center justify-center">
              <i className="ri-facebook-fill"></i>
            </button>
            <button className="bg-[#35383f] rounded-full text-xl cursor-pointer h-7 w-7 p-5 flex items-center justify-center">
              <i className="ri-twitter-fill"></i>
            </button>
            <button className="bg-[#35383f] rounded-full text-xl cursor-pointer h-7 w-7 p-5 flex items-center justify-center">
              <i className="ri-global-line"></i>
            </button>
            <button className="bg-[#35383f] rounded-full text-xl cursor-pointer h-7 w-7 p-5 flex items-center justify-center">
              <i className="ri-linkedin-fill"></i>
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
