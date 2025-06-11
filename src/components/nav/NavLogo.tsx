import Link from "next/link";

export function NavLogo() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {"DONGAETAN".split("").map((letter, i) => (
        <Link
          href={"/"}
          key={i}
          className="size-[95px] flex items-center justify-center rounded-full text-[40px] font-semibold bg-gray-100 "
        >
          {letter}
        </Link>
      ))}
    </div>
  );
}
