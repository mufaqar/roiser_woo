// WooCommerce Store API Types for Checkout

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
