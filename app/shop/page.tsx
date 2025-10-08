import Banner from "@/components/Banner";
import Composite from "@/components/ShopGrid/Composite";
import FeaturedIcons from "@/components/ShopGrid/FeaturedIcon";
import Delivery from "@/components/Delivery";
import LatestCollection from "@/components/ShopGrid/LatestCollection";
import CustomerTestimonials from "@/components/ShopGrid/CustomerTestimonials";
import News from "@/components/ShopGrid/News";
import DailyUpdate from "@/components/ShopGrid/DailyUpdate";
import ProductCollection from "@/components/ShopGrid/ProductCollection";

export default function Blog() {
  return (
    <>
      <Banner title="Shop Grid" breadcrumb="Shop Grid" />
      <FeaturedIcons />
      <Composite />
      <Delivery />
      <ProductCollection />
      <LatestCollection />
      <CustomerTestimonials />
      <News />
      <DailyUpdate />
    </>
  );
}
