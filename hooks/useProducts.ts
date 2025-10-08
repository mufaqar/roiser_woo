import { useState, useEffect } from 'react';
import { woocommerceService } from '../services/woocommerceService';

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await woocommerceService.getProducts(params);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(params)]);

  return { products, loading, error };
};