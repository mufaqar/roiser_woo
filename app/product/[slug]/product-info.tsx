'use client';

import ProductInfo from "@/components/ProductPage/ProductInfo";
import ProductInfoV2 from "@/components/ProductPage/ProductInfo_NEW";

interface ProductInfoProps {
    product: any; // WooProduct type from global types
}

export default function ProductInfoPicker({ product }: ProductInfoProps) {
    const USE_NEW_PRODUCT_INFO =localStorage.getItem("use_new_product_info") === "true";
    return USE_NEW_PRODUCT_INFO ? <ProductInfoV2 product={product} /> : <ProductInfo product={product} />;
}