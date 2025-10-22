// WooCommerce Store API Types for Checkout

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
 * WooCommerce Product Type
 */

/**
 * Product Dimensions
 */
interface WooDimensions {
  length: string;
  width: string;
  height: string;
}

/**
 * Product Category
 */
declare global {
  interface WooCategory {
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
  interface CatParams {
    parent?: number;
    hide_empty?: boolean;
    per_page?: number;
  }
}

/**
 * Product Image
 */
interface WooImage {
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
interface WooAttribute {
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
interface WooDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

/**
 * Product Tag
 */
interface WooTag {
  id: number;
  name: string;
  slug: string;
}

/**
 * Meta Data
 */
interface WooMetaData {
  id: number;
  key: string;
  value: any;
}

/**
 * Links
 */
interface WooLinks {
  self: WooLink[];
  collection: WooLink[];
}

interface WooLink {
  href: string;
}

/**
 * WooCommerce Cart Response Types
 */

/**
 * Currency formatting information
 */
interface WooCurrency {
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

/**
 * Cart item quantity limits
 */
interface WooQuantityLimits {
  minimum: number;
  maximum: number;
  multiple_of: number;
  editable: boolean;
}

/**
 * Cart item image
 */
interface WooCartItemImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

/**
 * Cart item prices with raw values
 */
interface WooCartItemPrices extends WooCurrency {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: string | null;
  raw_prices: {
    precision: number;
    price: string;
    regular_price: string;
    sale_price: string;
  };
}

/**
 * Cart item totals
 */
interface WooCartItemTotals extends WooCurrency {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
}




export interface WooAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode: string;
  country: string;
  email?: string;  // Only for billing address
  phone?: string;  // Only for billing address
}

export interface WooCheckoutRequest {
  billing_address: WooAddress;
  shipping_address: WooAddress;
  customer_note?: string;
  payment_method: string;
  payment_data?: Array<{ key: string; value: string }>;
  create_account?: boolean;
  customer_password?: string;
}

export interface WooCheckoutResponse {
  order_id: number;
  status: string;
  order_key: string;
  customer_note: string;
  customer_id: number;
  billing_address: WooAddress;
  shipping_address: WooAddress;
  payment_method: string;
  payment_result: {
    payment_status: string;
    payment_details: Array<{ key: string; value: string }>;
    redirect_url?: string;
  };
}
