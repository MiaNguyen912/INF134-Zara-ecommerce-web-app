"use client";

import { useState, useEffect } from "react";
import { CartState, CartItem, Product } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import { useAppDispatch } from "@/store/store";
import { setItemCount } from "@/store/features/cartSlice";

const initialCartState: CartState = {
  items: [],
  total: 0,
};

export function useCart() {
  const dispatch = useAppDispatch();
  const [cart, setCart] = useLocalStorage<CartState>("cart", initialCartState);

  // Calculate cart total and item count when items change
  useEffect(() => {
    const newTotal = cart.items.reduce((sum, item) => {
      const itemPrice = item.product.onSale ? item.product.price * (1 - item.product.discountPercentage! / 100) : item.product.price;
      return sum + itemPrice * item.quantity;
    }, 0);

    const newItemCount = cart.items.reduce((count, item) => count + item.quantity, 0);

    setCart((prevCart) => ({
      ...prevCart,
      total: Number(newTotal.toFixed(2)),
    }));

    dispatch(setItemCount(newItemCount));
  }, [cart.items, setCart, dispatch]);

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
      const newItems = [...prevCart.items, { product, size, color, quantity }];
      return {
        ...prevCart,
        items: newItems,
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
    dispatch(setItemCount(0));
  };

  return {
    cart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
  };
}
