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

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedIcons />
      <SellingCollection />
      <FlatSale />
      <OurLatestCollection />
      <Delivery />
      <OnlineFurnitureSeller />
      <CustomerTestimonials />
      <News />
      <DailyUpdate />
    </>
  );
}
