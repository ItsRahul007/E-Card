import Footer from "@/app/(client)/components/common/footer/Footer";
import Banner from "./(client)/components/landing page/banner/Banner";
import BannerCard from "./(client)/components/landing page/item/BannerCard";
import FeatureProduct from "./(client)/components/landing page/item/FeatureProduct";

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
