import { StaticImageData } from "next/image";
import TestProduct from "@/assets/product.png";

export interface ArchivedProduct {
  name: string;
  image: string | StaticImageData;
}

export interface ArchivedCollection {
  [year: string]: ArchivedProduct[];
}

export const archivedItems: ArchivedCollection = {
  "2025": [
    { name: "Product", image: TestProduct },
    { name: "Product", image: TestProduct },
    { name: "Product", image: TestProduct },
    { name: "Product", image: TestProduct },
  ],
  "2024": [
    { name: "Product", image: TestProduct },
    { name: "Product", image: TestProduct },
    { name: "Product", image: TestProduct },
  ],
};