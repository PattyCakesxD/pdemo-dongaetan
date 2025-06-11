import React from "react";

export interface NavItemProps {
  href: string;
  title: string;
  subtitle: string;
  avatar: string;
  time: string;
}

export const DEFAULT_NAV_ITEMS: NavItemProps[] = [
  {
    href: "/shop",
    title: "Shop",
    subtitle: "Subtitle Idk",
    avatar: "/profile-picture.png",
    time: "10:00",
  },
  {
    href: "/archive",
    title: "Archive",
    subtitle: "Subtitle Idk",
    avatar: "/profile-picture.png",
    time: "10:00",
  },
  {
    href: "/about",
    title: "About",
    subtitle: "Subtitle Idk",
    avatar: "/profile-picture.png",
    time: "10:00",
  },
  {
    href: "/contact",
    title: "Contact",
    subtitle: "Subtitle Idk",
    avatar: "/profile-picture.png",
    time: "10:00",
  },
];

export interface NavMenuProps extends React.ComponentPropsWithoutRef<"div"> {
  items?: NavItemProps[];
}
