import { shopProducts } from "@/data/products";
import ProductArray from "@/components/ProductArray";

export default function Shop() {
  return <ProductArray className="px-[1vw]" products={shopProducts} />;
}
