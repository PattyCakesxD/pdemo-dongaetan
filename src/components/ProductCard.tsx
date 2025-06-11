"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, images, id } = product;
  const url = `/shop/${id}`;

  return (
    <Link
      href={url}
      className="flex flex-col relative items-center text-center overflow-visible transition-all duration-200 rounded-xl px-1 pt-4 pb-2 hover:bg-hoverGray active:bg-activeGray ease-fluid"
    >
      <Image
        src={images[0] || ""}
        alt={product.name}
        width={500}
        height={500}
        className="object-cover w-[300px] 3xl:w-[400px]"
        priority
      />
      <div className="flex flex-col items-center w-full">
        <h2 className="text-lg w-full text-center mt-2">{product.name}</h2>
      </div>
    </Link>
  );
};

export default ProductCard;
