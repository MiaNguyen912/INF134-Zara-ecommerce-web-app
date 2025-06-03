"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// NOTE: we can't export metadata from a client component (marked with "use client"). The metadata needs to be handled in a server component.
// => instead of exporting metadata here as:
//        export const metadata: Metadata = {
//           title: "Cart",
//        };
// we should create a separate layout file to handle the metadata (check cart/layout.tsx)

import { Product } from "@/types";
export default function CartPage() {
  const { cart, updateItemQuantity, removeItem, clearCart } = useCart();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [deletedItem, setDeletedItem] = useState("");

  const handleCheckout = () => {
    // Here you would normally handle checkout, for now let's just simulate it
    alert("Checkout functionality would be implemented here");
    clearCart();
    router.push("/home");
  };

  const handleRemoveItem = (e: React.MouseEvent, product: Product, size: string, color: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(product.id, size, color);
    setShowAlert(true);
    setDeletedItem(product.name);
    setTimeout(() => setShowAlert(false), 2000); // alert stays for 2 seconds
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-light mb-4 text-center">Your shopping bag is empty</h1>
        <p className="text-gray-600 mb-8 text-center">Looks like you haven&apos;t added any items to your cart yet.</p>
        <Button asChild>
          <Link href="/home">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-light mb-8">Shopping Bag ({cart.items.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => {
              const { product, quantity, size, color } = item;

              // Calculate item price (accounting for sales)
              const itemPrice = product.onSale ? product.price * (1 - product.discountPercentage! / 100) : product.price;

              return (
                <div key={`${product.id}-${size}-${color}`} className="flex border-b pb-6">
                  {/* Product Image */}
                  <div className="w-24 h-32 relative flex-shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <button onClick={(e) => handleRemoveItem(e, product, size, color)} className="text-gray-400 hover:text-black" aria-label="Remove item">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">Size: {size}</p>
                    <p className="text-sm text-gray-500">Color: {color}</p>

                    <div className="mt-2 flex items-center">
                      <button onClick={() => updateItemQuantity(product.id, size, color, quantity - 1)} className="text-gray-500 hover:text-black" aria-label="Decrease quantity">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2 min-w-[2rem] text-center">{quantity}</span>
                      <button onClick={() => updateItemQuantity(product.id, size, color, quantity + 1)} className="text-gray-500 hover:text-black" aria-label="Increase quantity">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="ml-4 text-right flex-shrink-0">
                    <p className="font-medium">${(itemPrice * quantity).toFixed(2)}</p>
                    {product.onSale && <p className="text-sm text-gray-500 line-through mt-1">${(product.price * quantity).toFixed(2)}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-gray-50 p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>

              <Button onClick={handleCheckout} className="w-full">
                Checkout
              </Button>

              <div className="text-xs text-gray-500 mt-4">
                <p>Taxes included. Shipping calculated at checkout.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* remove item alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pb-7">
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 ease-in-out animate-fadeIn" onClick={() => setShowAlert(false)} />
          <div className="relative bg-white px-6 py-4 rounded-lg shadow-lg text-center transform transition-all duration-300 ease-in-out animate-slideUp">
            <p className="text-sm font-medium">Removed</p>
            <p className="text-xs text-gray-500 mt-1">{deletedItem} </p>
          </div>
        </div>
      )}
    </>
  );
}
