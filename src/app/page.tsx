import Footer from "@/components/common/footer/Footer";
import Banner from "@/components/landing page/banner/Banner";
import FeatureProduct from "@/components/landing page/feature/FeatureProduct";
import NewRelease from "@/components/landing page/new-release/NewRelease";

export default function Home() {
  return (
    <div className="bg-zinc-50 relative">
      <Banner />
      <FeatureProduct />
      <NewRelease />
      <Footer />
    </div>
  );
};
