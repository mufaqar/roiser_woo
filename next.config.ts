// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'woocommerce-1531534-5907618.cloudwaysapps.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'postscript-mms-files.s3.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.vitahomedecor.co.uk',
        pathname: '**',
      }
    ],
  },
  env: {
    WC_STORE_URL: process.env.WC_STORE_URL,
    WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY,
    WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET,
  },
  async redirects() {
    return [
      {
        source: '/wp-admin',
        destination: `${process.env.WC_STORE_URL}/wp-admin/`,
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig