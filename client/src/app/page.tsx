import Card from "./components/landing page/item/Card";
import Banner from "./components/landing page/banner/Banner";
import FeatureProduct from "@/app/components/landing page/item/FeatureProduct";

export default function Home() {

  return (
    <>
      <section>
        <Banner />
        <Card />
        <FeatureProduct />
        
      </section>
    </>
  );
};
