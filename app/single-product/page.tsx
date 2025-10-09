import Banner from "@/components/Banner";
import CustomerTestimonials from "@/components/ShopGrid/CustomerTestimonials";
import News from "@/components/ShopGrid/News";
import DailyUpdate from "@/components/ShopGrid/DailyUpdate";
import ProductPage from "@/components/ProductPage/ProductInfo";
import Delivery from "@/components/Delivery";
import RecommendedProducts from "@/components/ProductPage/RecommendedProducts";
import ProductDetail from "@/components/ProductPage/ProductDetail";
import DeliveryInformation from "@/components/ProductPage/DeliveryInformation";

export default function SingleProduct() {
  return (
    <>
      <Banner title="Product Details" breadcrumb="Product Details" />
      <Delivery />
      {/* <ProductPage />
      <RecommendedProducts /> */}
      <ProductDetail />
      <DeliveryInformation />
      <CustomerTestimonials />
      <News />
      <DailyUpdate />
    </>
  );
}
