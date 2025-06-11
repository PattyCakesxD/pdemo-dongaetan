"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { motion } from "motion/react";

export interface CartItemData {
  id: number;
  name: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

interface CartItemProps {
  item: CartItemData;
  itemVariants: any;
  increaseQuantity: (id: number, size: string) => void;
  decreaseQuantity: (id: number, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  toggleCart: () => void;
}

export function CartItem({
  item,
  itemVariants,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  toggleCart,
}: CartItemProps) {
  return (
    <motion.li
      key={`${item.id}-${item.size}`}
      variants={itemVariants}
      className="flex justify-between items-start py-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-row gap-4 items-start">
        <Link
          href={`/shop/${item.id}`}
          onClick={toggleCart}
          className="flex-shrink-0 size-16 mt-1 mb-3"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="rounded-lg object-cover"
          />
        </Link>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg leading-[1.1] truncate mb-1">
            {item.name}
          </h3>
          <p className="text-base text-secondaryLabel mb-2">
            Size: {item.size}
          </p>

          <div className="flex items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 border border-tertiaryLabel rounded-xl">
              <button
                onClick={() => decreaseQuantity(item.id, item.size)}
                className="p-2 text-secondaryLabel hover:text-foreground rounded-xl hover:bg-hoverGray ease-fluid duration-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-medium w-4 text-center select-none">
                {item.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(item.id, item.size)}
                className="p-2 text-secondaryLabel hover:text-foreground rounded-xl hover:bg-hoverGray ease-fluid duration-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id, item.size)}
              className="p-2 text-secondaryLabel hover:text-secondaryRed rounded-xl hover:bg-hoverGray ease-fluid duration-100 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
      <span className="text-secondaryLabel text-lg leading-[1.1]">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </motion.li>
  );
}
