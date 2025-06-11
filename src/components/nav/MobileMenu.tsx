"use client";
import { NavLogo } from "./NavLogo";
import { NavItem } from "./NavItem";
import { NavItemProps, DEFAULT_NAV_ITEMS } from "@/data/nav";

export interface NavMenuProps extends React.ComponentPropsWithoutRef<"div"> {
  items?: NavItemProps[];
}

export function MobileMenu(props: NavMenuProps) {
  const { items = DEFAULT_NAV_ITEMS, ...restProps } = props;

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
