"use client";

import Image from "next/image";
import { useCart } from "../CartContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";

export function Cart() {
  const {
    isOpen,
    toggleCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`
        fixed inset-0 z-40 bg-white/85 backdrop-blur-sm
        flex items-center justify-center lg:items-end lg:justify-end
        transition-opacity duration-300
        ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
      onClick={toggleCart}
      aria-hidden={!isOpen}
    >
      <div
        className={`
          relative rounded-xl h-full w-full max-w-md m-4
          flex flex-col transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <div className="flex flex-row-reverse items-start p-4 pt-8">
          <button
            onClick={toggleCart}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Cart Items: stack from bottom up */}
        <div className="flex-1 overflow-y-auto p-8 pt-10 flex flex-col justify-end">
          {cartItems.length === 0 ? (
            <div className="text-center mt-auto">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="flex flex-col-reverse">
              {[...cartItems].reverse().map((item) => (
                <li
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between items-center py-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">
                        Size: {item.size}
                      </p>
                      <div className="flex items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 border rounded-full">
                          <button
                            onClick={() => decreaseQuantity(item.id, item.size)}
                            className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id, item.size)}
                            className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Footer */}
        <div className="p-6 pt-4">
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)} USD</span>
          </div>
          <button className="w-full bg-[#5A6CA5] hover:bg-[#5A6CA5]/80 text-white py-3 rounded-xl text-lg cursor-pointer">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
