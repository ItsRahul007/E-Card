import style from "@/app/style/style.module.css";
import ItemCompo from "./components/landing page/item/ItemCard";
import itemInfo from "./item/itemInfo";
import Card from "./components/landing page/item/Card";
import Banner from "./components/landing page/banner/Banner";

export default function Home() {
  const { firstSection, secondSection, navBg, rightSpan, linkHover, hero, border, shopNowHover, product, featureProducts, grid, specialEdition } = style;

  return (
    <>
      <section className="" >
        <Banner />

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
