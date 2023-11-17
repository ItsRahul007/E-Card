import React from 'react';
import style from "@/app/style/style.module.css";
import { Roboto } from 'next/font/google';
import Button from '../../common/Button';
const roboto = Roboto({
    weight: '700',
    subsets: ['latin'],
    style: ["normal"]
  });

const Card: React.FC = () => {
    return (
        <section className={"h-screen w-full bg-white flex items-center justify-center gap-5 z-20"}>
          <div className={"w-96 h-2/3 relative " + style.product}>
            <span>
              <div>
                <h3 className={"text-3xl " + roboto.className}>
                  20% Off On Tank Tops
                </h3>
                <p className="text-sm leading-7 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                </p>
                <button className={`mt-5 text-black bg-white p-3 mr-4 font-semibold w-36 ${style.shopNowHover}`}>SHOP NOW</button>
              </div>
            </span>
          </div>
          <div className={"w-96 h-2/3 relative " + style.product}>
            <span>
              <div>
                <h3 className={"text-3xl " + roboto.className}>
                  Latest Eyewear For You
                </h3>
                <p className="text-sm leading-7 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                </p>
                <button className={`mt-5 text-black bg-white p-3 mr-4 font-semibold w-36 ${style.shopNowHover}`}>SHOP NOW</button>
              </div>
            </span>
          </div>
          <div className={"w-96 h-2/3 relative " + style.product}>
            <span>
              <div>
                <h3 className={"text-3xl " + roboto.className}>
                  Let&apos;s Lorem Suit Up!
                </h3>
                <p className="text-sm leading-7 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                </p>
                <Button />
              </div>
            </span>
          </div>
        </section>
    )
}

export default Card;