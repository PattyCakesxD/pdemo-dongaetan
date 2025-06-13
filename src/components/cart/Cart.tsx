"use client";

import { useCart } from "./CartContext";
import { X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  cubicBezier,
} from "motion/react";
import { useRef } from "react";
import { CartItem } from "./CartItem";

const easeFluid = cubicBezier(0.6, 0.01, -0.05, 0.9);

const mainCartDialogVariants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: easeFluid },
  },
  closed: {
    opacity: 0,
    scale: 1,
    transition: { duration: 0.25, ease: easeFluid },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cartContentContainerVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  closed: {
    opacity: 0,
    y: 100,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: 1,
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeFluid },
  },
  closed: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.2, ease: easeFluid },
  },
};

const closeButtonVariants = {
  open: { opacity: 1, transition: { duration: 0.2, ease: easeFluid } },
  closed: { opacity: 0, transition: { duration: 0.2, ease: easeFluid } },
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

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const controlledCartContentContainerVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
      onAnimationComplete: () => {
        if (scrollableDivRef.current) {
          scrollableDivRef.current.style.overflowY = "auto";
        }
      },
    },
    closed: {
      opacity: 0,
      y: 100,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: 1,
        when: "afterChildren",
      },
      onAnimationStart: () => {
        if (scrollableDivRef.current) {
          scrollableDivRef.current.style.overflowY = "hidden";
        }
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={`
            fixed inset-0 z-40 bg-background/85 backdrop-blur-sm
            flex items-center justify-center lg:items-end lg:justify-end
            transition-all duration-300
            overflow-hidden
          `}
          onClick={toggleCart}
          aria-hidden={!isOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            variants={mainCartDialogVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`
              relative rounded-xl h-full w-full max-w-md
              flex flex-col
              overflow-hidden
            `}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              variants={closeButtonVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-row-reverse items-start py-6 2xl:py-8 px-[5vw] lg:px-[1vw]"
            >
              <button
                onClick={toggleCart}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Close cart"
              >
                <X className="size-7" />
              </button>
            </motion.div>

            <motion.div
              variants={controlledCartContentContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex-1 flex flex-col"
            >
              <div
                ref={scrollableDivRef}
                className="flex-1 px-[5vw] lg:px-[1vw] flex justify-end flex-col"
              >
                {cartItems.length === 0 ? (
                  <motion.div
                    variants={itemVariants}
                    className="text-center mt-auto"
                  >
                    <p className="text-gray-500">Your cart is empty.</p>
                  </motion.div>
                ) : (
                  <ul className="flex flex-col">
                    {[...cartItems].reverse().map((item) => (
                      <CartItem
                        key={`${item.id}-${item.size || "no-size"}`}
                        item={item}
                        itemVariants={itemVariants}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        removeFromCart={removeFromCart}
                        toggleCart={toggleCart}
                      />
                    ))}
                  </ul>
                )}
              </div>

              <div
                className="px-[5vw] lg:px-[1vw] pt-4 pb-6"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between font-semibold text-lg mb-4"
                >
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)} USD</span>
                </motion.div>
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
