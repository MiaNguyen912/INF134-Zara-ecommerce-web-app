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
    const newTotal = cart.items.reduce((sum, item) => {
      const itemPrice = item.product.onSale ? item.product.price * (1 - item.product.discountPercentage! / 100) : item.product.price;
      return sum + itemPrice * item.quantity;
    }, 0);

    const roundedTotal = Number(newTotal.toFixed(2));

    if (roundedTotal !== cart.total) {
      setCart((prevCart) => ({
        ...prevCart,
        total: roundedTotal,
      }));
    }
  }, [cart.items, cart.total, setCart]);

  // Add item to cart
  const addItem = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex((item) => item.product.id === product.id && item.size === size && item.color === color);

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return { ...prevCart, items: updatedItems };
      }

      // Add new item
      return {
        ...prevCart,
        items: [...prevCart.items, { product, size, color, quantity }],
      };
    });
  };

  // Update item quantity
  const updateItemQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity < 1) return;

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) => {
        if (item.product.id === productId && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
        return item;
      });
      return { ...prevCart, items: updatedItems };
    });
  };

  // Remove item from cart
  const removeItem = (productId: string, size: string, color: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => !(item.product.id === productId && item.size === size && item.color === color)),
    }));
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
