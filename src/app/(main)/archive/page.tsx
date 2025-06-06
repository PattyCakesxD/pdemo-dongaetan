import Image from "next/image";
import { archivedItems } from "@/data/archived";

export default function Archive() {
  // Get the years and sort them in descending order (e.g., 2025, 2024)
  const years = Object.keys(archivedItems).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <div className="p-8 lg:p-12 space-y-16">
      {years.map((year) => (
        <section key={year} className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">{year}</h2>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {archivedItems[year].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image src={item.image} alt={item.name} width={250} height={250} />
                <span className="text-sm md:text-md mt-2">{item.name}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}