import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-end h-full px-[2vw]">
      <Link
        href={"/shop"}
        className="relative flex flex-col items-end gap-3 pb-6 group"
      >
        <h1 className="text-7xl xl:text-8xl font-semibold leading-none">
          DONGAETAN
        </h1>
        <div className="text-2xl cursor-pointer pb-[2px] relative text-secondaryLabel">
          {"Shop ›"}
          <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondaryLabel transition-all duration-100 ease-fluid group-hover:w-full" />
        </div>
      </Link>
    </div>
  );
}
