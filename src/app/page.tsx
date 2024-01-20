import Banner from "./(client)/components/landing page/banner/Banner";
import BannerCard from "./(client)/components/landing page/item/BannerCard";
import FeatureProduct from "./(client)/components/landing page/item/FeatureProduct";
import Footer from "@/app/lib/common/footer/Footer";

export default function Home() {
  return (
    <>
      <Banner />
      <BannerCard />
      <FeatureProduct />
      <Footer />
    </>
  );
};
