import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface NavItemProps {
  href: string;
  title: string;
  subtitle: string;
  avatar: string;
  time: string;
}

export function NavItem({ href, title, subtitle, avatar, time }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <div
      className={`flex items-center px-2 py-3 rounded-md ${
        isActive ? "bg-slate-200" : ""
      } transition-colors duration-100 hover:bg-slate-100`}
    >
      {/* Profile Picture */}
      <div className="flex-shrink-0 mr-3">
        <Image
          src={avatar}
          alt={title}
          width={44}
          height={44}
          className="rounded-full object-cover"
          priority // see note below!
        />
      </div>
      {/* Main Content */}
      <Link
        href={href}
        className="flex-1 flex items-start justify-between border-b border-gray-200 min-h-[56px] pb-2"
        style={{ minWidth: 0 }}
      >
        {/* Title/Subtitle */}
        <div className="flex flex-col min-w-0 gap-1">
          <span className="font-semibold text-xl leading-5 truncate">
            {title}
          </span>
          <span className="text-gray-400 text-sm truncate">{subtitle}</span>
        </div>
        {/* Time and Arrow - now in a column, aligned to the top right */}
        <div className="flex flex-col items-end gap-1 ml-3 flex-shrink-0">
          <span className="text-gray-400 text-md">{`${time} ›`}</span>
        </div>
      </Link>
    </div>
  );
}
