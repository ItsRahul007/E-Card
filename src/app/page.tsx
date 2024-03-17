import Footer from "@/components/common/footer/Footer";
import Banner from "@/components/landing page/banner/Banner";
import BannerCard from "@/components/landing page/item/BannerCard";
import FeatureProduct from "@/components/landing page/item/FeatureProduct";

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
