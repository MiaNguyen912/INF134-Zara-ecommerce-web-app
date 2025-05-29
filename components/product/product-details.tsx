"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ProductCard } from "@/components/catalog/product-card";
import { Product } from "@/types";
import { products } from "@/data/products";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { addItem } = useCart();
  const searchParams = useSearchParams();

  // Get similar products (from same category, excluding this product)
  const similarProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  // Calculate sale price if product is on sale
  const salePrice = product.onSale ? ((product.price * (100 - product.discountPercentage!)) / 100).toFixed(2) : null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }

    addItem(product, selectedSize, selectedColor);
  };

  useEffect(() => {
    const urlSize = searchParams.get("size");
    if(urlSize && product.sizes.includes(urlSize)){
      setSelectedSize(urlSize);
    }
  }, [searchParams, product.sizes]);

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

              {/* Color Selector */}
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Color</h2>
                <div className="flex gap-2">
                  {product.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-transparent"}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Size</h2>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
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
                </Select>
              </div>

              {/* Add to Cart Button */}
              <Button onClick={handleAddToCart} disabled={!selectedSize || !selectedColor} className="w-full mb-6">
                Add to Cart
              </Button>

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
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
