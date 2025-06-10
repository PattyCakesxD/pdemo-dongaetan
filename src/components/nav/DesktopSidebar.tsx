"use client";
import { NavLogo } from "./NavLogo";
import { NavItem } from "./NavItem";

export function DesktopSidebar() {
  return (
    <div
      className={`
        h-screen bg-white
        flex flex-col
        overflow-hidden
      `}
    >
      {/* This margin pushes content below the icon controlled by the parent */}
      <div className="flex flex-col items-center pb-4 gap-2 mt-20">
        <NavLogo />
      </div>
      <nav className="flex-1 px-4">
        <ul className="flex flex-col gap-2">
          <NavItem
            href="/shop"
            title="Shop"
            subtitle="Subtitle Idk"
            avatar="/images/shop.png"
            time="10:00"
          />
          <NavItem
            href="/archive"
            title="Archive"
            subtitle="Subtitle Idk"
            avatar="/images/archive.png"
            time="10:00"
          />
          <NavItem
            href="/about"
            title="About"
            subtitle="Subtitle Idk"
            avatar="/images/about.png"
            time="10:00"
          />
          <NavItem
            href="/contact"
            title="Contact"
            subtitle="Subtitle Idk"
            avatar="/images/contact.png"
            time="10:00"
          />
        </ul>
      </nav>
      {/* Footer pinned to the bottom */}
      <div className="p-4 text-xs text-black text-center">
        Designed By Verdugo Web Services
      </div>
    </div>
  );
}
