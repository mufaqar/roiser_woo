import { wooApi } from "./woocommerce";
import { WooProduct } from "./woocommerce-types";


/**
 * Fetch all products
 */
export async function getAllProducts(perPage = 20): Promise<WooProduct[]> {
  try {
    const { data } = await wooApi.get("products", { per_page: perPage });
    return data;
  } catch (error: any) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return [];
  }
}

/**
 * Fetch single product by ID
 */
export async function getProductById(id: number): Promise<WooProduct | null> {
  try {
    const { data } = await wooApi.get(`products/${id}`);
    return data;
  } catch (error: any) {
    console.error("Error fetching product:", error.response?.data || error.message);
    return null;
  }
}

/**
 * Fetch single product by slug
 */
export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  try {
    const { data } = await wooApi.get("products", { slug });
    return data?.[0] || null;
  } catch (error: any) {
    console.error("Error fetching product by slug:", error.response?.data || error.message);
    return null;
  }
}

/**
 * Fetch all product categories
 */
export async function getAllCategories(): Promise<any[]> {
  try {
    const { data } = await wooApi.get("products/categories", { per_page: 100 });
    return data;
  } catch (error: any) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    return [];
  }
}


/**
 * Fetch category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<any | null> {
  try {
    const { data } = await wooApi.get("products/categories", { slug });
    return data?.[0] || null;
  } catch (error: any) {
    console.error("Error fetching category by slug:", error.response?.data || error.message);
    return null;
  }
}

/**
 * Fetch products by category ID
 */
export async function getProductsByCategory(categoryId: number): Promise<WooProduct[]> {
  try {
    const { data } = await wooApi.get("products", { category: String(categoryId), per_page: 20 });
    return data;
  } catch (error: any) {
    console.error("Error fetching products by category:", error.response?.data || error.message);
    return [];
  }
}


export async function getRelatedProducts(categoryIds: number[], excludeId: number) {
  const { data } = await wooApi.get("products", {
    category: categoryIds.join(","),
    exclude: [excludeId],
    per_page: 8,
  });
  return data;
}

export async function getFeaturedProducts(per_page: number = 8) {
  const { data } = await wooApi.get("products", {
    featured: true,
    per_page,
  });
  return data;
}