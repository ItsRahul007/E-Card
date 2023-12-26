import BannerCard from "@/app/components/landing page/item/BannerCard";
import Banner from "@/app/components/landing page/banner/Banner";
import FeatureProduct from "@/app/components/landing page/item/FeatureProduct";
import Footer from "@/app/components/landing page/footer/Footer";

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
