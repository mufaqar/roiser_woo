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


export default async function SingleProduct({ params }: { params: { slug: string } }) {
  const { slug } = await params

  const product = await getProductBySlug(slug);
  if (!product) {
    return <div className="p-10">Product not found.</div>;
  }
  const categoryIds = product.categories?.map((cat: any) => cat.id) || [];
  const relatedProducts = await getRelatedProducts(categoryIds, product.id);
  return (
    <>
      <Banner title={product.name} breadcrumb={product.name}  />
      <Delivery />
      <ProductInfo product={product} />
      <RecommendedProducts products={relatedProducts} />
      <ProductDetail />
      <DeliveryInformation />
      <CustomerTestimonials />
      <News />
      <DailyUpdate />
    </>
  );
}
