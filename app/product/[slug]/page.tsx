import Banner from "@/components/Banner";
import CustomerTestimonials from "@/components/ShopGrid/CustomerTestimonials";
import News from "@/components/ShopGrid/News";
import DailyUpdate from "@/components/ShopGrid/DailyUpdate";
import Delivery from "@/components/Delivery";
import RecommendedProducts from "@/components/ProductPage/RecommendedProducts";
import ProductDetail from "@/components/ProductPage/ProductDetail";
import DeliveryInformation from "@/components/ProductPage/DeliveryInformation";
import { getProductBySlug, getRelatedProducts } from "@/lib/woocommerce";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import ProductInfoV2 from "@/components/ProductPage/ProductInfo_NEW";
import ProductInfoPicker from "./product-info";

export const revalidate = 3600;
export const dynamicParams = true;

export default async function SingleProduct({ params }: { params: { slug: string } }) {
  const { slug } = await params

  const product = await getProductBySlug(slug);
  if (!product) {
    return <div className="p-10">Product not found.</div>;
  }

  const categoryIds = product.categories?.map((cat: any) => cat.id) || [];
  const relatedProducts = await getRelatedProducts(categoryIds, product.id)

  return (
    <>
      <Banner breadcrumb={product.name}  />
      <Delivery />
      <ProductInfoPicker product={product} />
      <RecommendedProducts products={relatedProducts} />
      <ProductDetail />
      <DeliveryInformation />
      <CustomerTestimonials />
      <News />
      <DailyUpdate />
    </>
  );
}
