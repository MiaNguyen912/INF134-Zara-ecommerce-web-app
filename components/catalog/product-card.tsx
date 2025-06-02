"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  // Calculate sale price if product is on sale
  const salePrice = product.onSale ? ((product.price * (100 - product.discountPercentage!)) / 100).toFixed(2) : null;

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.preventDefault(); //Prevents default link nav
    e.stopPropagation(); //Stops bubbling up to link
    router.push(`/product/${product.id}?size=${size}`);
  };

  return (
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
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <span
                key={size}
                onClick={(e) => handleSizeClick(e, size)}
                className={`cursor-pointer ${size === "XS" ? "text-gray-400 pointer-events-none" : ""} hover:underline`}>
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium truncate">{product.name}</h3>

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
  );
}
