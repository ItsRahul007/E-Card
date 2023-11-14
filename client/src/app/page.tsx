import style from "@/app/style/style.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import 'remixicon/fonts/remixicon.css';
import { Roboto } from 'next/font/google';
import ItemCompo from "./components/landing page/item/ItemCompo";
const roboto = Roboto({
  weight: '700',
  subsets: ['latin'],
  style: ["normal"]
});
import itemInfo from "./item/itemInfo";
import Card from "./components/landing page/item/Card";

export default function Home() {
  const { firstSection, secondSection, navBg, rightSpan, linkHover, hero, border, shopNowHover, product, featureProducts, grid, specialEdition } = style;

  return (
    <>
      <section className={firstSection}>
        {/* <nav className={`h-28 p-3 w-full flex items-center justify-between z-20 ${navBg}`}>
          <span className={`ml-6 flex gap-7 text-sm text-white ${linkHover}`}>
            <Link href="/">
              <Image
                src={logo}
                height={90}
                width={140}
                alt="Website logo"
              />
            </Link>
            <span className="h-full flex gap-6 font-semibold mt-2">
              <Link href="/">EVERYTHING</Link>
              <Link href="/">WOMEN</Link>
              <Link href="/">MEN</Link>
              <Link href="/">ACCESSORIES</Link>
            </span>
          </span>

          <span className={`flex justify-center items-center mr-5 text-white ${rightSpan} ${linkHover}`}>
            <Link href="/">ABOUT</Link>
            <Link href="/">CONTACT US</Link>
            <Link href="/"><i className="ri-shopping-bag-3-fill"></i></Link>
            <Link href="/"><i className="ri-user-3-fill"></i></Link>
          </span>
        </nav>

        <div className={`${hero} ${roboto.className} z-20`}>
          <span>
            <h1 className="text-6xl tracking-wide leading-tight">Raining Offers For <br />Hot Summer!</h1>
            <h4 className="text-2xl mt-7">25% Off On All Products</h4>
            <span>
              <button className={`mt-8 text-black bg-white p-3 mr-4 font-medium ${shopNowHover}`}>SHOP NOW</button>
              <button className={`p-3 font-medium ${border}`}>FIND MORE</button>
            </span>
          </span>
        </div> */}

        <Card />

        <div className={secondSection}>
          <div className={"z-20 " + featureProducts}>
            <div className="self-center text-center flex flex-col gap-7 mt-24">
              <h1 className="font-semibold text-4xl">
                Featured Products
              </h1>
              <div className="w-24 self-center" style={{ background: "#1f92da", height: "1.5px" }}></div>
            </div>
            <div className={"self-center mt-14 w-11/12 " + grid}>
              {
                itemInfo.map((e: any, i: number) => {
                  const { imgUrl, itemName, itemCategory, itemRate } = e;
                  return <ItemCompo key={i} imgUrl={imgUrl} itemName={itemName} itemCategory={itemCategory} itemRate={itemRate} />
                })
              }
            </div>
          </div>
          
          <div className="h-96"></div>
        </div>

      </section>
    </>
  );
};
