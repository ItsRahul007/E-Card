import Footer from "@/components/common/footer/Footer";
import Banner from "@/components/landing page/banner/Banner";
import BestSales from "@/components/landing page/best-sales/BestSales";
import FeatureProduct from "@/components/landing page/feature/FeatureProduct";
import NewRelease from "@/components/landing page/new-release/NewRelease";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";

export default async function Home() {
  await connectWithMongo();

  return (
    <div className="relative">
      <Banner />
      <FeatureProduct />
      <NewRelease />
      <BestSales />
      <Footer />
    </div>
  );
};
