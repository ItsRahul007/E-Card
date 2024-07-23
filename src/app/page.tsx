import Footer from "@/components/common/footer/Footer";
import Banner from "@/components/landing page/banner/Banner";
import BestSales from "@/components/landing page/best-sales/BestSales";
import FeatureProduct from "@/components/landing page/feature/FeatureProduct";
import NewRelease from "@/components/landing page/new-release/NewRelease";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { getNewReleaseProducts } from "@/lib/server-side-actions/client-side";

export default async function Home() {
  await connectWithMongo();
  const newReleaseProducts = await getNewReleaseProducts();

  return (
    <div className="relative bg-rootBg !text-rootColor">
      <Banner />
      <FeatureProduct />
      <NewRelease newReleaseProducts={newReleaseProducts} />
      <BestSales />
      <Footer />
    </div>
  );
}
