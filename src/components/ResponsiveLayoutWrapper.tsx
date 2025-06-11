"use client";

import { DesktopSidebar } from "@/components/nav/DesktopSidebar";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { StickyHeader } from "@/components/StickyHeader";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/SidebarContext";
import { Cart } from "@/components/cart/Cart";
// Assuming you've reverted the ref-based width animation for now,
// as the user mentioned the previous solution wasn't "the same".
// If you want to re-add the "hug" width animation, you'd apply the
// useEffect/useState/useRef logic from the previous solution.
// For this change, we'll focus on the breakpoint.

const TITLES: Record<string, string> = {
  "/": "",
  "/shop": "Shop",
  "/archive": "Archive",
  "/about": "About",
  "/contact": "Contact",
};

export default function ResponsiveLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const title = TITLES[pathname] || "";
  const { expanded } = useSidebar();

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar container - now visible from lg and up */}
      <aside
        className={`
          hidden lg:block transition-all duration-300 ease-fluid
          h-screen sticky top-0 border-r
          ${expanded ? "w-full lg:w-[381px]" : "w-0 border-r-0"}
        `}
        style={{
          transitionProperty: "width",
        }}
      >
        {/* Sidebar content, which fades out when collapsed */}
        <div
          className={`transition-opacity duration-200 h-full ${
            !expanded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <DesktopSidebar />
        </div>
      </aside>

      {/* Main content area */}
      <main className={`flex-1 bg-white flex flex-col`}>
        <StickyHeader title={title} />
        {isHome && (
          // Mobile Menu - now visible ONLY on mobile (below lg)
          <div className="block lg:hidden flex-1">
            <MobileMenu />
          </div>
        )}
        {/* Main content - hides on mobile when homepage, otherwise always block */}
        <div className={`${isHome ? "hidden lg:block" : "block"} flex-1`}>
          {children}
        </div>
      </main>
      <Cart />
    </div>
  );
}
