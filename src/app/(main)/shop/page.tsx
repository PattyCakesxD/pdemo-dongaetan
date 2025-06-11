import Image from "next/image";
import Link from "next/link";
import { shopProducts } from "@/data/products"; // Import the centralized products list
import ProductArray from "@/components/ProductArray";

export default function Shop() {
  return <ProductArray className="px-[1vw]" products={shopProducts} />;
}
