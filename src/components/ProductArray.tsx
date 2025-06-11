"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product, Collection } from "@/data/products";

type ProductArrayProps = {
  products?: Product[];
  collections?: Collection[];
  className?: string;
};

const ProductArray: React.FC<ProductArrayProps> = ({
  products,
  collections,
  className,
}) => {
  const dataToRender = collections || products;

  if (!dataToRender || dataToRender.length === 0) {
    return null;
  }

  const renderProductGrid = (
    prods: Product[],
    title?: string,
    date?: string
  ) => (
    <React.Fragment key={title || "default-section"}>
      {(title || date) && (
        <div className="flex flex-row justify-between pt-3 2xl:pt-4 pb-6 2xl:pb-8 px-2 items-end">
          {title && (
            <h2 className="text-2xl leading-tight font-semibold">{title}</h2>
          )}
          {date && (
            <h3 className="text-2xl leading-tight font-normal">{date}</h3>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 2xl:gap-10 mb-10">
        {prods.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </React.Fragment>
  );

  return (
    <section className={["", className].filter(Boolean).join(" ")}>
      {collections
        ? collections.map((collection) =>
            renderProductGrid(
              collection.products,
              collection.title,
              collection.date
            )
          )
        : products && renderProductGrid(products)}
    </section>
  );
};

export default ProductArray;
