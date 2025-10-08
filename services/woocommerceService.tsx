import api from "@/lib/woocommerce";
import { Product, Category, Customer } from "@/types/woocommerce";

interface ProductsParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: number;
  orderby?: string;
  order?: "asc" | "desc";
  status?: string;
}

export const woocommerceService = {
  // Products
  async getProducts(params: ProductsParams = {}): Promise<Product[]> {
    try {
      const response = await api.get("products", {
        per_page: 12,
        status: "publish",
        ...params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Single Product
  async getProduct(id: number): Promise<Product> {
    try {
      const response = await api.get(`products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get("products/categories", {
        per_page: 100,
        hide_empty: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Products by Category
  async getProductsByCategory(
    categoryId: number,
    params: Omit<ProductsParams, "category"> = {}
  ): Promise<Product[]> {
    try {
      const response = await api.get("products", {
        category: categoryId,
        per_page: 12,
        status: "publish",
        ...params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching category products:", error);
      throw error;
    }
  },
};
