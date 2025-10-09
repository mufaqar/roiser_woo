import Banner from "@/components/Banner";
import CustomerTestimonials from "@/components/ShopGrid/CustomerTestimonials";
import News from "@/components/ShopGrid/News";
import DailyUpdate from "@/components/ShopGrid/DailyUpdate";
import ProductPage from "@/components/ProductPage/ProductPage";
import Delivery from "@/components/Delivery";
import RecommendedProducts from "@/components/ProductPage/RecommendedProducts";
import ProductDetail from "@/components/ProductPage/ProductDetail";
import DeliveryInformation from "@/components/ProductPage/DeliveryInformation";
import { getProductBySlug, getRelatedProducts } from "@/lib/woocommerce-api";


  export default async function SingleProduct({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  console.log("Fetched product in page.tsx:", product);
  if (!product) {
    return <div className="p-10">Product not found.</div>;
  }
   // ✅ Fetch related products using category IDs
  const categoryIds = product.categories?.map((cat: any) => cat.id) || [];
  const relatedProducts = await getRelatedProducts(categoryIds, product.id);
  return (
    <>
      <Banner title={product.name} breadcrumb={product.name}  />
      <Delivery />
      {/* <ProductPage product={product} /> */}
      <RecommendedProducts products={relatedProducts} />
      <ProductDetail />
      <DeliveryInformation />
      <CustomerTestimonials />
      <News />
      <DailyUpdate />
    </>
  );
}
