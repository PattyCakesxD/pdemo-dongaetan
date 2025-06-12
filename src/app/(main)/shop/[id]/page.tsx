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
  const AVAILABLE_SIZES = product?.availableSizes || [];

  const [selectedSize, setSelectedSize] = useState(AVAILABLE_SIZES[0]);

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product && selectedSize && AVAILABLE_SIZES.includes(selectedSize)) {
      addToCart({
        id: product.id,
        quantity: quantity,
        size: selectedSize,
      });
    } else if (product && SIZES.length === 0) {
      addToCart({
        id: product.id,
        quantity: quantity,
      });
    } else if (!selectedSize && SIZES.length > 0) {
      alert("Please select a size.");
    } else {
      alert("Something went wrong. Please try again later.");
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
            {/* Product Info */}
            <h2 className="text-xl md:text-2xl text-semibold">
              {product.name}
            </h2>
            <p className="text-base md:text-lg text-secondaryLabel">{`$${product.price}`}</p>
            <p className="text-sm md:text-base text-secondaryLabel break-all">
              {product.description}
            </p>

            {(product.stock ?? 0) > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                {/* Sizes */}
                {AVAILABLE_SIZES.length > 0 && (
                  <>
                    <div className="text-xs">Size</div>
                    <div className="flex gap-5 text-sm md:text-md mb-2">
                      {SIZES.map((size) => {
                        const isAvailable = AVAILABLE_SIZES.includes(size);

                        return (
                          <span
                            key={size}
                            onClick={
                              isAvailable
                                ? () => setSelectedSize(size)
                                : undefined
                            }
                            className={`select-none transition-colors duration-100 whitespace-nowrap ${
                              isAvailable
                                ? `cursor-pointer ${
                                    selectedSize === size
                                      ? "font-semibold"
                                      : "text-secondaryLabel hover:text-tertiaryLabel"
                                  }`
                                : "text-tertiaryLabel cursor-not-allowed" // TODO: Change to a more distinct color
                            }`}
                          >
                            {size}
                          </span>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Quantity */}
                <div className="text-xs">QTY</div>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 border border-tertiaryLabel rounded-md py-1 px-2 text-base cursor-pointer"
                >
                  {[...Array(10)].map((_, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Checkout/Add to Cart */}
          <div className="flex flex-col gap-1">
            {product.stock && product.stock > 0 ? (
              <>
                <button className="bg-primaryBlue hover:bg-hoverBlue text-background py-2 w-full rounded-lg transition-colors duration-100 ease-fluid cursor-pointer">
                  Checkout
                </button>
                <button
                  onClick={handleAddToCart}
                  className="text-primaryBlue py-2 w-full rounded-lg border border-primaryBlue hover:bg-hoverBlueBg transition-colors duration-100 ease-fluid cursor-pointer"
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <button className="bg-tertiaryLabel text-background py-2 w-full rounded-lg">
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
