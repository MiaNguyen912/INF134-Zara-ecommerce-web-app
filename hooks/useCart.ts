"use client";

import { useState, useEffect } from "react";
import { CartState, CartItem, Product } from "@/types";
import { useLocalStorage } from "./useLocalStorage";

const initialCartState: CartState = {
  items: [],
  total: 0,
};

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartState>("cart", initialCartState);

  // Calculate cart total when items change
  useEffect(() => {
    const newTotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (newTotal !== cart.total) {
      setCart({
        ...cart,
        total: Number(newTotal.toFixed(2)),
      });
    }
  }, [cart, cart.items, setCart]);

  // Add item to cart
  const addItem = (product: Product, size: string, color: string, quantity = 1) => {
    console.log("addItem", product, size, color, quantity);
  };

  // Update item quantity
  const updateItemQuantity = (productId: string, size: string, color: string, quantity: number) => {
    console.log("updateItemQuantity", productId, size, color, quantity);
  };

  // Remove item from cart
  const removeItem = (productId: string, size: string, color: string) => {
    console.log("removeItem", productId, size, color);
  };

  // Clear cart
  const clearCart = () => {
    setCart(initialCartState);
  };

  // Get cart item count
  const getItemCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    getItemCount,
  };
}
