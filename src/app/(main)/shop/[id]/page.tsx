"use client";

import Image from "next/image";
import { shopProducts } from "@/data/products";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  const product = shopProducts.find((p) => p.id == parseInt(id as string));
  const SIZES = product?.sizes || [];
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart({
        id: product.id,
        quantity: quantity,
        size: selectedSize,
      });
    } else if (!selectedSize) {
      alert("Please select a size.");
    }
  };

  if (!product) {
    return <div className="p-8">Product not found.</div>;
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-24 rounded-2xl p-6">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-xl"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl text-semibold">
              {product.name}
            </h2>
            <p className="text-base md:text-lg text-secondaryLabel">{`$${product.price}`}</p>
            <p className="text-sm md:text-base text-secondaryLabel break-all">
              {product.description}
            </p>
          </div>

          {/* Sizes */}
          <div className="flex flex-col">
            <div className="text-xs mb-1">Size</div>
            <div className="flex gap-5 text-sm md:text-md">
              {SIZES.map((size) => (
                <span
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer select-none transition-colors duration-100 whitespace-nowrap ${
                    selectedSize === size
                      ? "font-semibold"
                      : "text-secondaryLabel hover:text-tertiaryLabel"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <div className="text-xs mb-1">QTY</div>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border border-tertiaryLabel rounded-md py-1 px-2 text-md cursor-pointer"
            >
              {[...Array(10)].map((_, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Checkout/Add to Cart */}
          <div className="flex flex-col gap-1">
            <button className="bg-primaryBlue hover:bg-hoverBlue text-background py-2 w-full rounded-lg transition-colors duration-100 ease-fluid cursor-pointer">
              Checkout
            </button>
            <button
              onClick={handleAddToCart}
              className="text-primaryBlue py-2 w-full rounded-lg border border-primaryBlue hover:bg-hoverBlueBg transition-colors duration-100 ease-fluid cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
