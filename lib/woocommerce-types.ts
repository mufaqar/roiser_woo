/**
 * WooCommerce Product Type
 */
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_to: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: WooDimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: WooCategory[];
  tags: WooTag[];
  images: WooImage[];
  attributes: WooAttribute[];
  default_attributes: WooDefaultAttribute[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  meta_data: WooMetaData[];
  stock_status: "instock" | "outofstock" | "onbackorder";
  has_options?: boolean;
  _links?: WooLinks;
  expressDelivery?: string;
  paymentPlan?: string;
}

/**
 * Product Dimensions
 */
export interface WooDimensions {
  length: string;
  width: string;
  height: string;
}

/**
 * Product Category
 */
export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WooImage | null;
  menu_order: number;
  count: number;  
}

// ✅ Type used for sending params in your API request
export interface CatParams {
  parent?: number;
  hide_empty?: boolean;
  per_page?: number;
}

/**
 * Product Image
 */
export interface WooImage {
  id: number;
  date_created: string;
  date_modified: string;
  src: string;
  name: string;
  alt: string;
}

/**
 * Product Attribute
 */
export interface WooAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

/**
 * Default Attribute
 */
export interface WooDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

/**
 * Product Tag
 */
export interface WooTag {
  id: number;
  name: string;
  slug: string;
}

/**
 * Meta Data
 */
export interface WooMetaData {
  id: number;
  key: string;
  value: any;
}

/**
 * Links
 */
export interface WooLinks {
  self: WooLink[];
  collection: WooLink[];
}

export interface WooLink {
  href: string;
}
