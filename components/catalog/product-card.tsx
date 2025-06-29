"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  // Calculate sale price if product is on sale
  const salePrice = product.onSale ? ((product.price * (100 - product.discountPercentage!)) / 100).toFixed(2) : null;

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.preventDefault(); //Prevents default link nav
    e.stopPropagation(); //Stops bubbling up to link
    setSelectedSize(size);
    // router.push(`/product/${product.id}?size=${size}`);
  };

  const handleColorClick = (e: React.MouseEvent, color: string) => {
    e.preventDefault(); //Prevents default link nav
    e.stopPropagation(); //Stops bubbling up to link
    setSelectedColor(color);
    // router.push(`/product/${product.id}?color=${color}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedSize == null) {
      // setSelectedSize(product.sizes[0]); // auto select the first size since product sizes are hidden in the hover panel
      setValidationMessage(`Please select a size`);
      setTimeout(() => setValidationMessage(null), 2000);
      return;
    }
    if (selectedColor == null) {
      setValidationMessage(`Please select a color`);
      setTimeout(() => setValidationMessage(null), 2000);
      return;
    }
    if (selectedSize && selectedColor) {
      addItem(product, selectedSize, selectedColor);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // alert stays for 2 seconds
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // get all available sizes of the product
  const availableSizes = product.sizes.map((size) => size.toUpperCase());
  const availableColors = product.color.map((color) => color.toLowerCase());

  return (
    <>
      <Link href={`/product/${product.id}`} className="group">
        <div className="aspect-[3/4] relative overflow-hidden mb-3">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" // 4, 3, 2 columns respectively on desktop, tablet, mobile
          />

          {/* Sale badge */}
          {product.onSale && <div className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1">-{product.discountPercentage}%</div>}

          {/* low stock badge */}
          {product.stock < 100 && product.stock > 0 && <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1">Low stock</div>}

          {/* Hover size selector */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-2">
            <div className="font-semibold mb-1 text-black">ADD SIZE</div>
            <div className="flex justify-center gap-2 text-gray-700">
              {availableSizes.map((size) => (
                <span key={size} onClick={(e) => handleSizeClick(e, size)} className={`cursor-pointer hover:underline ${selectedSize == size ? "text-black underline" : "text-gray-600"}`}>
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-4">
              <h3 className="text-sm font-medium truncate">{product.name}</h3>

              {/* color options */}
              <div className="flex justify-between gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={(e) => handleColorClick(e, color)}
                    className={`w-4 h-4 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-all duration-200 ${
                      selectedColor == color ? "border-black ring-1 ring-black ring-offset-1 shadow-md" : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* favorite button */}
              <button onClick={handleFavorite} className="p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} strokeWidth={1.5} />
              </button>

              {/* add to cart button */}
              {product.stock > 0 && (
                <div className="relative">
                  <button onClick={handleQuickAdd} className="p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label="Quick add to cart">
                    <ShoppingCart className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                  </button>

                  {/* Validation Tooltip */}
                  {validationMessage && (
                    <div className="absolute right-0 top-full mt-2 bg-red-500 text-white px-3 py-2 rounded-md shadow-lg text-xs whitespace-nowrap z-50 animate-fadeIn">{validationMessage}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {product.stock > 0 ? (
              salePrice ? (
                <>
                  <span className="text-sm text-red-500 font-medium">${salePrice}</span>
                  <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
              )
            ) : (
              <span className="text-sm text-red-500">Out of stock</span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add Alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pb-7">
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 ease-in-out animate-fadeIn" onClick={() => setShowAlert(false)} />
          <div className="relative bg-white px-6 py-4 rounded-lg shadow-lg text-center transform transition-all duration-300 ease-in-out animate-slideUp">
            <p className="text-sm font-medium">Added to cart</p>
            <p className="text-xs text-gray-500 mt-1">
              {product.name} - {selectedSize} - {selectedColor}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
