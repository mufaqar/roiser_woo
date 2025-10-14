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
import { getAllProducts } from "@/lib/woocommerce";
import { wooApi } from "@/lib/woocommerce";

export async function getParentCategories(): Promise<WooCategory[]> {
  try {
    const params: CatParams = {
      per_page: 100,
      parent: 0,
      hide_empty: true,
    };

    const { data } = await wooApi.get<WooCategory[]>("products/categories", params);
    return data;
  } catch (error: any) {
    console.error(
      "Error fetching categories:",
      error.response?.data || error.message
    );
    return [];
  }
}


export default async function Home() {
  const products = await getAllProducts();
  const categories = await getParentCategories();

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
