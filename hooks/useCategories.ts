import { useState, useEffect } from 'react';
import { woocommerceService } from '@/services/woocommerceService';
import { Category } from '@/types/woocommerce';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await woocommerceService.getCategories();
        setCategories(data.filter(cat => cat.count > 0));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}