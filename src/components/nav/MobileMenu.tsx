import { MenuLogo } from "./NavLogo";
import { NavItem } from "./NavItem";

export function MobileMenu() {
  return (
    <div className="flex flex-col items-center pt-10 px-4 min-h-screen">
      {/* Logo Circles */}
      <MenuLogo />
      {/* Navigation */}
      <nav className="w-full max-w-md">
        <NavItem
          href="/shop"
          title="Shop"
          subtitle="Shop"
          avatar="/images/shop.png"
          time="10:00"
        />
        <NavItem
          href="/archive"
          title="Archive"
          subtitle="Archive"
          avatar="/images/archive.png"
          time="10:00"
        />
        <NavItem
          href="/about"
          title="About"
          subtitle="About"
          avatar="/images/about.png"
          time="10:00"
        />
        <NavItem
          href="/contact"
          title="Contact"
          subtitle="Contact"
          avatar="/images/contact.png"
          time="10:00"
        />
      </nav>
    </div>
  );
}
