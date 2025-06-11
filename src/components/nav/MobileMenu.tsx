"use client";
import { NavLogo } from "./NavLogo";
import { NavItem } from "./NavItem";
import { NavItemProps, DEFAULT_NAV_ITEMS } from "@/data/nav";

export interface NavMenuProps extends React.ComponentPropsWithoutRef<"div"> {
  items?: NavItemProps[];
}

export function MobileMenu(props: NavMenuProps) {
  // Accept NavMenuProps
  // Destructure 'items' from props, providing DEFAULT_MOBILE_NAV_ITEMS as a fallback
  const { items = DEFAULT_MOBILE_NAV_ITEMS, ...restProps } = props;

  return (
    <div
      className="flex flex-col items-center pt-10 px-4 w-full min-h-screen"
      {...restProps} // Spread any other props passed to the root div
    >
      {/* Logo Circles */}
      <NavLogo />
      {/* Navigation */}
      <nav className="w-full max-w-md">
        {/* Map over the 'items' array to render NavItem components */}
        {items.map((item) => (
          <NavItem
            key={item.href} // Always provide a unique key when mapping over lists
            href={item.href}
            title={item.title}
            subtitle={item.subtitle}
            avatar={item.avatar}
            time={item.time}
          />
        ))}
      </nav>
    </div>
  );
}

// Default navigation items array for MobileMenu, stored beneath the export
const DEFAULT_MOBILE_NAV_ITEMS: NavItemProps[] = [
  {
    href: "/shop",
    title: "Shop",
    subtitle: "Shop",
    avatar: "/profile-picture.png", // Corrected path as per previous context
    time: "10:00",
  },
  {
    href: "/archive",
    title: "Archive",
    subtitle: "Archive",
    avatar: "/images/archive.png",
    time: "10:00",
  },
  {
    href: "/about",
    title: "About",
    subtitle: "About",
    avatar: "/images/about.png",
    time: "10:00",
  },
  {
    href: "/contact",
    title: "Contact",
    subtitle: "Contact",
    avatar: "/images/contact.png",
    time: "10:00",
  },
];
