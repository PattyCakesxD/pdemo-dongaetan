"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { products as allProducts, Product } from "@/data/products";

// Define the shape of an item in the cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

// Define the shape of the context
interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, "name" | "price" | "image">) => void;
  removeFromCart: (productId: number, size: string) => void;
  increaseQuantity: (productId: number, size: string) => void;
  decreaseQuantity: (productId: number, size: string) => void;
  toggleCart: () => void;
  closeCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);

  const addToCart = (newItem: Omit<CartItem, "name" | "price" | "image">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id && item.size === newItem.size
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        const productDetails = allProducts.find((p) => p.id === newItem.id);
        if (!productDetails) return prevItems;
        const imageSrc = typeof productDetails.image === 'string' ? productDetails.image : productDetails.image.src;
        return [
          ...prevItems,
          {
            ...newItem,
            name: productDetails.name,
            price: productDetails.price,
            image: imageSrc,
          },
        ];
      }
    });
    setIsOpen(true); // Open cart when item is added
  };

  const removeFromCart = (productId: number, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === productId && item.size === size)
      )
    );
  };

  const increaseQuantity = (productId: number, size: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number, size: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === productId && item.size === size
      );

      // If item quantity is 1 or less, do nothing.
      if (existingItem && existingItem.quantity <= 1) {
        return prevItems;
      }

      // Otherwise, decrement the quantity.
      return prevItems.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Create a custom hook for easy access to the context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}