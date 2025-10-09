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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
      <ProductGrid products={products} />
    </div>
  );
}
