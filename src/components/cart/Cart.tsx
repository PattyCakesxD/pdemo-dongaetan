"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"; // Import motion and AnimatePresence

// --- Define Motion Variants ---

// Variants for the overall cart dialog container (opacity and scale)
const mainCartDialogVariants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Variants for the main content section that holds staggered children
// DOM order: Cart Items, Subtotal, Checkout Button
const cartContentContainerVariants = {
  open: {
    // When opening (animating in) - cascade UP from checkout button
    opacity: 1, // Start with opacity 1, as the parent handles main opacity
    y: 0,
    transition: {
      delayChildren: 0.1, // Small delay before children start
      staggerChildren: 0.07, // Delay between each child's animation
      staggerDirection: -1, // Start staggering from the LAST child (checkout button)
    },
  },
  closed: {
    // When closing (animating out) - cascade DOWN from top item
    opacity: 0, // Fade out this container, as parent handles main opacity
    y: 100, // Slide down on close
    transition: {
      staggerChildren: 0.05, // Delay between each child's animation
      staggerDirection: 1, // Start staggering from the FIRST child (top-most item/empty cart message)
      when: "afterChildren", // Ensure children animate out before parent fades/slides
    },
  },
};

// Variants for individual cart items, subtotal div, and checkout button
const itemVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2, ease: "easeIn" } }, // Slide down on exit
};

// Variants for the close button (fades in place)
const closeButtonVariants = {
  open: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  closed: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

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
    <AnimatePresence mode="wait">
      {" "}
      {/* Use AnimatePresence for mount/unmount animations */}
      {isOpen && (
        <motion.div
          className={`
            fixed inset-0 z-40 bg-white/85 backdrop-blur-sm
            flex items-center justify-center lg:items-end lg:justify-end
            transition-opacity duration-300 // Keep outer opacity for backdrop fade
          `}
          // No motion variants directly on this overlay, just the regular opacity transition
          onClick={toggleCart} // Clicking overlay closes cart
          aria-hidden={!isOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            variants={mainCartDialogVariants} // Apply main dialog animation
            initial="closed"
            animate="open"
            exit="closed"
            className={`
              relative rounded-xl h-full w-full max-w-md
              flex flex-col // Removed direct opacity/scale classes; motion handles them
            `}
            onClick={(e) => e.stopPropagation()} // Prevent clicking dialog from closing cart
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button: Fades in place */}
            <motion.div
              variants={closeButtonVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-row-reverse items-start py-6 2xl:py-8 px-[1vw]"
            >
              <button
                onClick={toggleCart}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close cart"
              >
                <X className="size-7" />
              </button>
            </motion.div>

            {/* Cart Items and Footer: Cascading animation */}
            <motion.div
              variants={cartContentContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex-1 flex flex-col" // DOM order: items-list-div, subtotal-div, checkout-button
            >
              {/* Cart Items (top to bottom visually) */}
              <div className="flex-1 overflow-y-auto px-[1vw]">
                {cartItems.length === 0 ? (
                  <motion.div
                    variants={itemVariants}
                    className="text-center mt-auto"
                  >
                    <p className="text-gray-500">Your cart is empty.</p>
                  </motion.div>
                ) : (
                  <ul className="flex flex-col">
                    {" "}
                    {/* No flex-col-reverse here for standard DOM order */}
                    {/* Reverse cartItems here if you want new items to appear at the bottom of the list visually */}
                    {[...cartItems].reverse().map((item) => (
                      <motion.li
                        key={`${item.id}-${item.size}`}
                        variants={itemVariants} // Apply item animation
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
                                  onClick={() =>
                                    decreaseQuantity(item.id, item.size)
                                  }
                                  className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="text-sm font-medium w-4 text-center select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    increaseQuantity(item.id, item.size)
                                  }
                                  className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              {/* Remove Button */}
                              <button
                                onClick={() =>
                                  removeFromCart(item.id, item.size)
                                }
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
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cart Footer */}
              <div className="p-6 pt-4">
                {/* Subtotal */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between font-semibold text-lg mb-4"
                >
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)} USD</span>
                </motion.div>
                {/* Checkout Button */}
                <motion.button
                  variants={itemVariants}
                  className="w-full bg-[#5A6CA5] hover:bg-[#5A6CA5]/80 text-white py-3 rounded-xl text-lg cursor-pointer"
                >
                  Checkout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
