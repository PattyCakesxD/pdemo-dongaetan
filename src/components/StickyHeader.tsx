"use client";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { useCart } from "./CartContext";

const PARENTS: Record<string, string> = {
  "/shop": "/",
  "/archive": "/",
  "/about": "/",
  "/contact": "/",
  // For dynamic routes, use patterns below.
};

export function StickyHeader({ title = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems, toggleCart } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle dynamic route parents (e.g. /shop/123 → /shop)
  let parent = PARENTS[pathname];
  if (!parent) {
    if (pathname.startsWith("/shop/")) parent = "/shop";
  }

  const isHome = pathname === "/";

  const handleBack = () => {
    if (parent) {
      router.push(parent);
    } else {
      router.back();
    }
  };

  if (pathname.startsWith("/shop/")) {
    title = "DONGAETAN";
  }

  return (
    <header className="sticky top-0 left-0 right-0 z-30 bg-white h-16 flex items-center px-4 md:px-8">
      {/* Back arrow (hidden on home) */}
      <button
        onClick={handleBack}
        className={`mr-2 transition-opacity ${
          isHome ? "opacity-0 pointer-events-none" : "opacity-100"
        } cursor-pointer`}
        aria-label="Go back"
      >
        <ChevronLeft className="w-7 h-7 text-indigo-400" />
      </button>
      {/* Centered title */}
      <div className="flex-1 flex justify-center items-center">
        <span className="font-medium text-lg text-black truncate">{title}</span>
      </div>
      {/* Shopping cart icon */}
      <div className="relative ml-auto flex items-center cursor-pointer" onClick={toggleCart}>
        <ShoppingCart
          className={`w-7 h-7 ${
            cartCount > 0 ? "text-indigo-400" : "text-gray-400"
          }`}
        />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-indigo-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </header>
  );
}