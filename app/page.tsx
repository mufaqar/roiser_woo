import CustomerTestimonials from "@/components/ShopGrid/CustomerTestimonials";
import DailyUpdate from "@/components/ShopGrid/DailyUpdate";
import FeaturedIcons from "@/components/ShopGrid/FeaturedIcon";
import News from "@/components/ShopGrid/News";
import Delivery from "@/components/Delivery";
import FlatSale from "@/components/Home/FlatSale";
import Hero from "@/components/Home/Hero";
import OnlineFurnitureSeller from "@/components/Home/OnlineFurnitureSeller";
import OurLatestCollection from "@/components/Home/OurLatestCollection";
import SellingCollection from "@/components/Home/SellingCollection";
import { getAllCategories, getAllProducts } from "@/lib/woocommerce-api";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <>
      <Hero />
      <FeaturedIcons />
      <SellingCollection />
      <FlatSale />
      <OurLatestCollection cat={categories} products={products} />
      <Delivery />
      <OnlineFurnitureSeller />
      <CustomerTestimonials />
      <News />
      <DailyUpdate />
    </>
  );
}
