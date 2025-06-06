import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-end h-full pr-4">
      <div className="flex flex-col items-end gap-1">
        <h1 className="text-7xl font-semibold">DONGAETAN</h1>
        <Link href={"/shop"} className="text-2xl text-gray-400 cursor-pointer transition-colors duration-100 hover:text-gray-5001">
          {"Shop ›"}
        </Link>
      </div>
    </div>
  );
}
