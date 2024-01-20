import React, { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className='bg-[#26272b] h-[50vh] w-screen flex gap-2 flex-col items-center justify-center text-[#ffffff94]'>
      <div className='flex gap-6 w-[95%] h-[65%] mt-6'>
        <span className='w-2/4'>
          <h5 className='text-white font-semibold text-lg'>ABOUT</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, minus velit. Recusandae ab quaerat vero, totam numquam natus sed, velit distinctio quisquam tempore maiores ea saepe? Eligendi laudantium facere doloremque maxime illo cum ut mollitia a perspiciatis, architecto ducimus pariatur aliquam porro! Rem, iure numquam magnam quidem delectus reiciendis similique!</p>
        </span>
        <span className='w-1/4'>
          <h5 className='text-white font-semibold text-lg'>SERVICES</h5>
          <p>It&apos;s an pratice project, so you can order anything but don&apos;t expect that you got any product to your home 😂</p>
        </span>
        <span className='w-1/4'>
          <h5 className='text-white font-semibold text-lg'>PRODUCTS</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, minus velit. Recusandae ab quaerat vero, totam numquam natus sed, velit distinctio quisquam tempore maiores ea saepe?</p>
        </span>
      </div>
      <div className='h-[2px] bg-[#ffffff94] w-[95%]'></div>
      <div className='flex justify-between w-[95%] h-16'>
        <span>Copyright &#169; 2024 All Rights Reserved by Rahul</span>
        <span className='flex gap-2'>
          <button className='bg-[#35383f] rounded-full text-xl cursor-pointer h-7 w-7 p-5 flex items-center justify-center'>
            <i className="ri-facebook-fill"></i>
          </button>
          <button className='bg-[#35383f] rounded-full text-xl cursor-pointer h-7 w-7 p-5 flex items-center justify-center'>
            <i className="ri-twitter-fill"></i>
          </button>
          <button className='bg-[#35383f] rounded-full text-xl cursor-pointer h-7 w-7 p-5 flex items-center justify-center'>
            <i className="ri-global-line"></i>
          </button>
          <button className='bg-[#35383f] rounded-full text-xl cursor-pointer h-7 w-7 p-5 flex items-center justify-center'>
            <i className="ri-linkedin-fill"></i>
          </button>
        </span>
      </div>
    </footer>
  );
};

export default Footer;