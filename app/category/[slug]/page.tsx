import Banner from "@/components/Banner";
import ProductGrid from "@/components/ShopGrid/ProductGrid";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/woocommerce-api";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return (
      <div className="p-10 text-center text-gray-600">Category not found.</div>
    );
  }

  const products = await getProductsByCategory(category.id);
  return (
      <>
      <Banner title={category.name} breadcrumb={category.name} />
    
       
      <ProductGrid products={products} />
    
    </>
  );
}
