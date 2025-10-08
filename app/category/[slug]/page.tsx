import { notFound } from "next/navigation";
import { woocommerceService } from "@/services/woocommerceService";
import ProductGrid from "@/components/ShopGrid/ProductGrid";


interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await woocommerceService.getCategories();
  const currentCategory = categories.find((cat) => cat.slug === params.slug);

  if (!currentCategory) {
    notFound();
  }

  const product = await woocommerceService.getProductsByCategory(
    currentCategory.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{currentCategory.name}</h1>
      <ProductGrid products={product} />
    </div>
  );
}
