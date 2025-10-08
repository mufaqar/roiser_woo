"use client";

import ProductCard from "../ProductCard";
import { Product } from "@/types/woocommerce";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  
}) => {
  return (
    <div className="container mx-auto p-4 mt-6">
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product:any) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </>
    </div>
  );
};

export default ProductGrid;
