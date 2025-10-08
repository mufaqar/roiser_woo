import { useState, useEffect } from 'react';
import { woocommerceService } from '@/services/woocommerceService';
import { Product } from '@/types/woocommerce';

interface UseProductsProps {
  category?: number;
  search?: string;
  page?: number;
  per_page?: number;
}

export function useProducts(params: UseProductsProps = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await woocommerceService.getProducts(params);
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(params)]);

  return { products, isLoading, error };
}