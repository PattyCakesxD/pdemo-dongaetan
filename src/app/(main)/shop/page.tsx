import Image from "next/image";
import Link from "next/link";
import { shopProducts } from "@/data/products"; // Import the centralized products list
import ProductArray from "@/components/ProductArray";

export default function Shop() {
  return (
    // <div className="p-8">
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    //     {products.map((product) => (
    //       <Link
    //         key={product.id}
    //         href={`/shop/${product.id}`}
    //         className="group bg-white rounded-2xl p-4 flex flex-col items-center transition-colors duration-100 border border-white hover:border-slate-200"
    //       >
    //         <Image
    //           src={product.image}
    //           alt={product.name}
    //           width={300}
    //           height={300}
    //         />
    //         <div className="flex flex-col items-center w-full">
    //           <span className="text-sm md:text-md truncate w-full text-center mt-2">
    //             {product.name}
    //           </span>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>

    <ProductArray className="px-[1vw]" products={shopProducts} />
  );
}
