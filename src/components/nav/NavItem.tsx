import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavItemProps } from "@/data/nav";

export function NavItem({ href, title, subtitle, avatar, time }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`flex w-full pl-3 pt-3 gap-3 overflow-hidden rounded-lg ${
        isActive ? "bg-activeGray cursor-default" : "hover:bg-hoverGray"
      } duration-200 transition-colors ease-fluid`}
    >
      {/* Profile Picture */}
      <div className="flex-shrink-0 size-12 mt-1 mb-3">
        <Image
          src={avatar}
          alt={title}
          width={48}
          height={48}
          className="rounded-full object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="flex w-full justify-between pr-3 border-b border-activeGray">
        {/* Title/Subtitle */}
        <div className="flex flex-col min-w-0 gap-1">
          <span className="font-semibold text-lg leading-[1.1] truncate">
            {title}
          </span>
          <span className="text-secondaryLabel text-base truncate">
            {subtitle}
          </span>
        </div>

        {/* Time and Arrow - now in a column, aligned to the top right */}
        <div className="flex flex-col items-end gap-1 ml-3 flex-shrink-0">
          <span className="text-secondaryLabel text-lg leading-[1.1]">{`${time} ›`}</span>
        </div>
      </div>
    </Link>
  );
}
