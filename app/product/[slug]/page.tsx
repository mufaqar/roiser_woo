import { notFound } from 'next/navigation';
import { woocommerceService } from '@/services/woocommerceService';
import { Product } from '@/types/woocommerce';
// import ProductImages from '@/components/ProductImages';
// import ProductInfo from '@/components/ProductInfo';
// import ProductTabs from '@/components/ProductTabs';
// import RelatedProducts from '@/components/RelatedProducts';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const products = await woocommerceService.getProducts({
      slug: params.slug,
      status: 'publish'
    });
    
    const product = products[0];
    
    if (!product) {
      return {
        title: 'Product Not Found',
      };
    }

    return {
      title: `${product.name} | Your Store`,
      description: product.short_description || product.description,
      openGraph: {
        title: product.name,
        description: product.short_description || product.description,
        images: product.images.map(img => ({
          url: img.src,
          width: 800,
          height: 600,
          alt: img.alt,
        })),
      },
    };
  } catch (error) {
    return {
      title: 'Product Page',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product: Product;
  
  try {
    const products = await woocommerceService.getProducts({
      slug: params.slug,
      status: 'publish'
    });
    
    product = products[0];
    
    if (!product) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="lg:sticky lg:top-4">
           {/* //   <ProductImages images={product.images} productName={product.name} /> */}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              {/* <ProductInfo product={product} /> */}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-8">
          {/* <ProductTabs product={product} /> */}
        </div>

        {/* Related Products */}
        <div className="mt-12">
          {/* <RelatedProducts 
            productId={product.id} 
            categoryId={product.categories[0]?.id} 
          /> */}
        </div>
      </div>
    </div>
  );
}