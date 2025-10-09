import WooCommerceRestApi from "woocommerce-rest-ts-api";

export const wooApi = new WooCommerceRestApi({
  url: process.env.WC_STORE_URL as string,
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: "wc/v3",
});
