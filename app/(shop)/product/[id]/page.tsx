import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";
import { Select } from "/home/project/components/ui/select.tsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Product",
};

// Generate static pages for all products at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const selectedSize = "S";
  const setSelectedSize = () => {};
  const handleAddToCart = () => {};

  // Find the product
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Get similar products (from same category, excluding this product)
  const similarProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  // Calculate sale price if product is on sale
  const salePrice = product.onSale ? ((product.price * (100 - product.discountPercentage!)) / 100).toFixed(2) : null;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Image Grid */}
          <div className="lg:w-2/3 lg:sticky lg:top-24 lg:self-start">
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative aspect-[3/4]">
                  <Image src={image} alt={`${product.name} - View ${index + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Product Info */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <h1 className="text-2xl font-light mb-4">{product.name}</h1>

              <div className="flex items-center space-x-3 mb-6">
                {salePrice ? (
                  <>
                    <span className="text-lg font-medium">${salePrice}</span>
                    <span className="text-base text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                )}
              </div>

              {/* Color */}
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Color</h2>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: product.color[0].toLowerCase() }} />
                  <span className="ml-2 text-sm">{product.color[0]}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Size</h2>
                {/* <Select
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>

              {/* Add to Cart Button */}
              {/* <Button 
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full mb-6"
              >
                Add to Cart
              </Button> */}

              {/* Product Description */}
              <div className="prose prose-sm max-w-none">
                <h2 className="text-sm font-medium mb-2">Description</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t">
            <h2 className="text-xl font-light mb-8">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))} */}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
