import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Calculate sale price if product is on sale
  const salePrice = product.onSale ? ((product.price * (100 - product.discountPercentage!)) / 100).toFixed(2) : null;

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="aspect-[3/4] relative overflow-hidden mb-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
        />

        {/* Sale badge */}
        {product.onSale && <div className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1">-{product.discountPercentage}%</div>}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium truncate">{product.name}</h3>

        <div className="flex items-center space-x-2">
          {salePrice ? (
            <>
              <span className="text-sm text-red-500 font-medium">${salePrice}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
