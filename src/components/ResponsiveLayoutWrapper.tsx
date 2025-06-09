"use client";

import { DesktopSidebar } from "@/components/nav/DesktopSidebar";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { StickyHeader } from "@/components/StickyHeader";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/SidebarContext";
import { SquareSplitHorizontal, SeparatorVertical } from "lucide-react";
import { Cart } from "@/components/cart/Cart";

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
  const { expanded, setExpanded } = useSidebar();

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar container */}
      <aside
        className={`
          hidden md:block transition-all duration-300 ease-in-out
          h-screen sticky top-0 border-r
          ${expanded ? "w-full md:w-72 lg:w-80 xl:w-96" : "w-20 border-r-0"}
        `}
        style={{
          transitionProperty: "width",
        }}
      >
        {/* Collapse/Expand Icon */}
        <div
          className="
            absolute top-0 left-0 z-50 w-20 h-20
            flex items-center justify-center
          "
        >
          <span
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer text-indigo-400 hover:text-indigo-500 transition-colors duration-100"
            role="button"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            tabIndex={0}
          >
            {expanded ? (
              <SquareSplitHorizontal className="w-8 h-8" />
            ) : (
              <SeparatorVertical className="w-8 h-8" />
            )}
          </span>
        </div>

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
          <div className="block md:hidden flex-1">
            <MobileMenu />
          </div>
        )}
        <div className={`${isHome ? "hidden md:block" : "block"} flex-1`}>
          {children}
        </div>
      </main>
      <Cart />
    </div>
  );
}
