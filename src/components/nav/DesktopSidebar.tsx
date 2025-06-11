"use client";
import { NavLogo } from "./NavLogo";
import { NavItem } from "./NavItem";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/SidebarContext";
import { NavMenuProps, DEFAULT_NAV_ITEMS } from "@/data/nav";

export function DesktopSidebar(props: NavMenuProps) {
  const { expanded, setExpanded } = useSidebar();
  const { items = DEFAULT_NAV_ITEMS, ...restProps } = props;

  return (
    <div
      className="
        h-screen flex flex-col
        overflow-hidden px-[1vw] pt-6 2xl:pt-8 pb-3 2xl:pb-4 gap-6 2xl:gap-8"
      {...restProps}
    >
      <div
        className="
          flex items-center justify-start"
      >
        <span
          onClick={() => setExpanded(!expanded)}
          className="cursor-pointer text-primaryBlue hover:text-hoverBlue transition-colors ease-fluid duration-100"
          role="button"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          tabIndex={0}
        >
          <PanelLeft className="size-7" />
        </span>
      </div>

      <div className="flex flex-col items-center">
        <NavLogo />
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col">
          {items.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              title={item.title}
              subtitle={item.subtitle}
              avatar={item.avatar}
              time={item.time}
            />
          ))}
        </ul>
      </nav>

      {/* VWS footer */}
      <a
        href="https://www.verdugowebservices.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 text-xs text-black text-center group"
      >
        <span className="relative inline-block pb-[1px] whitespace-nowrap">
          Designed By Verdugo Web Services
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-100 ease-fluid group-hover:w-full" />
        </span>
      </a>
    </div>
  );
}
