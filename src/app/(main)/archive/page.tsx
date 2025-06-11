import Image from "next/image";
import { archivedItems } from "@/data/archived";
import ProductArray from "@/components/ProductArray";
import { archiveProducts } from "@/data/products";

export default function Archive() {
  return <ProductArray className="px-[1vw]" collections={archiveProducts} />;
}
