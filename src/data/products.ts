import TestProduct from "@/assets/product.png";

// Re-exporting Product interface (no change needed here)
export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  sizes?: string[];
  availableSizes?: string[];
  stock?: number;
}

// New interface for a Collection
export interface Collection {
  id: number;
  title: string;
  date?: string;
  products: Product[];
}

// Existing shopProducts array (no change)
export const shopProducts: Product[] = [
  {
    id: 1,
    name: "Product",
    price: 50,
    images: [TestProduct.src],
    description:
      "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description",
    sizes: ["Small", "Medium", "Large", "X-Large"],
    availableSizes: ["Small", "Medium", "Large", "X-Large"],
    stock: 10,
  },
  {
    id: 2,
    name: "The Classic Crewneck",
    price: 45,
    images: [TestProduct.src, TestProduct.src, TestProduct.src],
    description:
      "Really long message no spaces cmascmzs98d7c898as7mxd89as798789sxa7m98d7amx98d7am98xw7m98dx7msa89dm798aw7m8dx9as7m897maw98mx7d9a8s7mdx98a7m89dxw7m9a8dx7ms89d7ma9w8x7m8d9as7m9dx8a7mwd98x7mas98dx7ms9a87mdx9wa87dmx98aw7mdx98sa7md9xas sadx,8a0s9dx8,09sa8,dx90as8,0dxa",
    sizes: ["Small", "Medium", "Large"],
    availableSizes: ["Small", "Medium", "Large"],
    stock: 15,
  },
  {
    id: 3,
    name: "The Vintage Wash Tee",
    price: 30,
    images: [TestProduct.src],
    description: "This one should have no sizes",
    stock: 7,
  },
  {
    id: 4,
    name: "The Everyday Henley",
    price: 38,
    images: [TestProduct.src],
    description:
      "This one should be out of stock. Description  Description Description Description",
    sizes: ["Small", "Medium", "Large", "X-Large"],
    availableSizes: ["Small", "Medium", "Large", "X-Large"],
    stock: 0,
  },
  {
    id: 5,
    name: "Kinda Product",
    price: 60,
    images: [TestProduct.src],
    description:
      "Only med and xl are available. Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description",
    sizes: ["Small", "Medium", "Large", "X-Large"],
    availableSizes: ["Medium", "X-Large"],
    stock: 10,
  },
  {
    id: 6,
    name: "The Signature Polo",
    price: 50,
    images: [TestProduct.src],
    description: "Has sizes but no available sizes specified.",
    sizes: ["Small", "Medium", "Large", "X-Large"],
    stock: 10,
  },
  {
    id: 7,
    name: "The Graphic Statement Tee",
    price: 35,
    images: [TestProduct.src],
    description:
      "Express yourself with our limited-edition graphic tee, featuring unique artwork.",
    stock: 10,
  },
  {
    id: 8,
    name: "The Linen Blend Button-Up",
    price: 65,
    images: [TestProduct.src],
    description:
      "Stay cool and look sharp in this lightweight and breathable linen-blend shirt.",
    stock: 10,
  },
  {
    id: 9,
    name: "The Comfort Terry Hoodie",
    price: 75,
    images: [TestProduct.src],
    description:
      "The ultimate cozy layer, made from soft terry cloth for a plush, comfortable feel.",
    stock: 10,
  },
  {
    id: 10,
    name: "The All-Season Quarter-Zip",
    price: 80,
    images: [TestProduct.src],
    description:
      "A versatile quarter-zip pullover that's perfect for a morning jog or a casual evening out.",
    stock: 10,
  },
];

// New archiveProducts array, structured as an array of Collections
export const archiveProducts: Collection[] = [
  {
    id: 1,
    title: "Super Duper Stinky Collection",
    date: "2025",
    products: [
      // You can reuse products from shopProducts or define new ones here
      shopProducts[0], // Product ID 1 from shopProducts
      {
        id: 101, // New ID for archive-specific product
        name: "Vintage Summer Tee",
        price: 28,
        images: [TestProduct.src],
        description: "A lightweight tee perfect for those long summer days.",
        sizes: ["S", "M", "L"],
      },
      shopProducts[1],
      shopProducts[2],
      shopProducts[3],
    ],
  },
  {
    id: 2,
    title: "2024",
    products: [
      shopProducts[1], // Product ID 2 from shopProducts
      {
        id: 102,
        name: "Cozy Knit Sweater",
        price: 90,
        images: [TestProduct.src],
        description: "Our coziest sweater from the fall collection.",
        sizes: ["M", "L", "XL"],
      },
      shopProducts[8], // Product ID 9 from shopProducts
    ],
  },
];
