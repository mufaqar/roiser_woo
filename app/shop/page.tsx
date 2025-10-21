import Banner from "@/components/Banner";
import Composite from "@/components/ShopGrid/Composite";
import FeaturedIcons from "@/components/ShopGrid/FeaturedIcon";
import Delivery from "@/components/Delivery";
import LatestCollection from "@/components/ShopGrid/LatestCollection";
import CustomerTestimonials from "@/components/ShopGrid/CustomerTestimonials";
import News from "@/components/ShopGrid/News";
import DailyUpdate from "@/components/ShopGrid/DailyUpdate";
import ProductCollection from "@/components/ShopGrid/ProductCollection";
import { getAllCategories, getAllProductsCached } from "@/lib/woocommerce";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getAllProductsCached(),
    getAllCategories()
  ]);
  
  return (
    <>
      <Banner title="Shop" breadcrumb="Shop" />
      <FeaturedIcons />
      <Composite />
      <Delivery />
      <ProductCollection cat={categories} products={products} />
      <LatestCollection  />
      <CustomerTestimonials />
      <News />
      <DailyUpdate />
    </>
  );
}
