"use client";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart, ChevronLeft, PanelLeft } from "lucide-react";
import { useCart } from "./cart/CartContext";
import { useSidebar } from "@/components/SidebarContext";
import { useEffect, useState } from "react";

const PARENTS: Record<string, string> = {
  "/shop": "/",
  "/archive": "/",
  "/about": "/",
  "/contact": "/",
};

export function StickyHeader({ title = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems, toggleCart } = useCart();
  const { expanded, setExpanded } = useSidebar();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // State to track if it's desktop, initialized on client-side
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only run on client-side to access window object
    if (typeof window !== "undefined") {
      const checkIsDesktop = () => {
        // Tailwind's 'md' breakpoint is 768px
        setIsDesktop(window.innerWidth >= 768);
      };

      checkIsDesktop(); // Check initially
      window.addEventListener("resize", checkIsDesktop); // Update on resize

      return () => {
        window.removeEventListener("resize", checkIsDesktop); // Clean up
      };
    }
  }, []);

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

  // Determine what button to render on the left side
  const renderLeftButton = () => {
    if (isDesktop) {
      // DESKTOP LOGIC
      if (!expanded) {
        // Desktop (sidebar closed): always show open sidebar button
        return (
          <button
            onClick={() => setExpanded(true)}
            className="cursor-pointer text-indigo-400 hover:text-indigo-500 transition-colors duration-100"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="w-7 h-7" />
          </button>
        );
      } else {
        // Desktop (sidebar open): show chevron when appropriate
        // Chevron is appropriate only on non-home pages
        if (!isHome) {
          return (
            <button
              onClick={handleBack}
              className="cursor-pointer text-indigo-400 hover:text-indigo-500 transition-colors duration-100"
              aria-label="Go back"
            >
              <ChevronLeft className="w-7 h-7" /> {/* Back Arrow icon */}
            </button>
          );
        }
        // If isHome and expanded on desktop, left slot is empty (sidebar toggle is inside sidebar)
        return null;
      }
    } else {
      // MOBILE LOGIC
      // Mobile: only show chevron when appropriate (i.e., not on homepage)
      if (!isHome) {
        return (
          <button
            onClick={handleBack}
            className="cursor-pointer text-indigo-400 hover:text-indigo-500 transition-colors duration-100"
            aria-label="Go back"
          >
            <ChevronLeft className="w-7 h-7" /> {/* Back Arrow icon */}
          </button>
        );
      }
      return null;
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-30 bg-white flex items-center py-6 2xl:py-8 px-[1vw]">
      {/* Left-side slot for the dynamically rendered button */}
      <div className="flex items-center w-7 h-7">{renderLeftButton()}</div>

      {/* Centered title */}
      <div className="flex-1 flex justify-center items-center">
        <span className="font-medium text-lg text-black truncate">{title}</span>
      </div>
      {/* Shopping cart icon */}
      <button
        className="relative ml-auto flex items-center cursor-pointer text-indigo-400 hover:text-indigo-500 transition-colors duration-100"
        onClick={toggleCart}
      >
        {/* <ShoppingCart
          className={`w-7 h-7 ${
            cartCount > 0 ? "text-indigo-400" : "text-gray-400"
          }`}
        />

        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-indigo-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )} */}
        <ShoppingCart className="size-7" />
      </button>
    </header>
  );
}
