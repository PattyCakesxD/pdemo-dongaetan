"use client";

import Image from "next/image";
import { shopProducts } from "@/data/products";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, AnimatePresence, cubicBezier } from "motion/react";

const easeFluid = cubicBezier(0.6, 0.01, -0.05, 0.9);
const IMAGE_WIDTH = 500;
const PREVIEW_IMAGE_WIDTH = 800;

export default function ProductDetail() {
  const { id } = useParams();
  const product = shopProducts.find((p) => p.id == parseInt(id as string));

  const SIZES = product?.sizes || [];
  const AVAILABLE_SIZES = product?.availableSizes || [];

  const [selectedSize, setSelectedSize] = useState(AVAILABLE_SIZES[0]);
  const [quantity, setQuantity] = useState(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { addToCart } = useCart();

  const [currentSlide, setCurrentSlide] = useState(0);

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
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
          {product.images.length > 1 ? (
            <ProductCarousel
              images={product.images}
              name={product.name}
              isPreview={false}
              setIsPreviewOpen={setIsPreviewOpen}
              slide={currentSlide}
              onSlideChange={setCurrentSlide}
            />
          ) : (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={IMAGE_WIDTH}
              height={IMAGE_WIDTH}
              className="object-contain rounded-xl cursor-pointer"
              onClick={() => setIsPreviewOpen(true)}
            />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            {/* Product Info */}
            <ProductInfo
              name={product.name}
              price={product.price}
              description={product.description}
            />

            {(product.stock ?? 0) > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                {/* Sizes */}
                <ProductSizes
                  sizes={SIZES}
                  availableSizes={AVAILABLE_SIZES}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />

                {/* Quantity */}
                <ProductQuantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
            )}
          </div>

          {/* Checkout/Add to Cart */}
          <div className="flex flex-col gap-1">
            {(product.stock ?? 0) > 0 ? (
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
                Sold out
              </button>
            )}
          </div>
        </div>
        {isPreviewOpen && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeFluid }}
              className="fixed inset-0 bg-background/85 backdrop-blur-sm flex justify-center items-center z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsPreviewOpen(false);
                }
              }}
            >
              {product.images.length > 1 ? (
                <ProductCarousel
                  images={product.images}
                  name={product.name}
                  isPreview={true}
                  setIsPreviewOpen={setIsPreviewOpen}
                  slide={currentSlide}
                  onSlideChange={setCurrentSlide}
                />
              ) : (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={PREVIEW_IMAGE_WIDTH}
                  height={PREVIEW_IMAGE_WIDTH}
                  className="object-contain rounded-xl cursor-pointer"
                  onClick={() => setIsPreviewOpen(false)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function ProductInfo({
  name,
  price,
  description,
}: {
  name: string;
  price: number;
  description: string;
}) {
  return (
    <>
      <h2 className="text-xl md:text-2xl text-semibold">{name}</h2>
      <p className="text-base md:text-lg text-secondaryLabel">{`$${price}`}</p>
      <p className="text-sm md:text-base text-secondaryLabel break-all">
        {description}
      </p>
    </>
  );
}

function ProductSizes({
  sizes,
  availableSizes,
  selectedSize,
  setSelectedSize,
}: {
  sizes: string[];
  availableSizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}) {
  return (
    <>
      {availableSizes.length > 0 && (
        <>
          <div className="text-xs">Size</div>
          <div className="flex gap-5 text-sm md:text-md mb-2">
            {sizes.map((size) => {
              const isAvailable = availableSizes.includes(size);

              return (
                <span
                  key={size}
                  onClick={
                    isAvailable ? () => setSelectedSize(size) : undefined
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
    </>
  );
}

function ProductQuantity({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  return (
    <>
      <div className="text-xs">QTY</div>
      <Select
        value={String(quantity)}
        onValueChange={(value) => setQuantity(Number(value))}
      >
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Quantity" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(10)].map((_, idx) => (
            <SelectItem key={idx + 1} value={String(idx + 1)}>
              {idx + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

function ProductCarousel({
  images,
  name,
  isPreview,
  setIsPreviewOpen,
  slide = 0,
  onSlideChange,
}: {
  images: string[];
  name: string;
  isPreview: boolean;
  setIsPreviewOpen: (isOpen: boolean) => void;
  slide?: number;
  onSlideChange?: (index: number) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(slide);

  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button === 0) {
      dragStart.current = { x: e.clientX, y: e.clientY };
      isDragging.current = false;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStart.current) {
      const dx = Math.abs(e.clientX - dragStart.current.x);
      const dy = Math.abs(e.clientY - dragStart.current.y);
      if (dx > 5 || dy > 5) {
        isDragging.current = true;
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current) {
      setIsPreviewOpen(true);
    }
    dragStart.current = null;
    isDragging.current = false;
  };

  useEffect(() => {
    if (api && api.selectedScrollSnap() !== slide) {
      api.scrollTo(slide, false);
    }
  }, [api, slide]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedSlide = api.selectedScrollSnap();
      if (slide !== selectedSlide) {
        onSlideChange?.(selectedSlide);
      }
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, slide, onSlideChange]);

  return (
    <div className="flex flex-col gap-2">
      <Carousel
        setApi={setApi}
        className="w-full max-w-4xl"
        opts={{ startIndex: currentSlide }}
      >
        <CarouselContent>
          {images.map((imgSrc, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center"
            >
              <Image
                src={imgSrc}
                alt={`${name} image ${index + 1}`}
                width={isPreview ? PREVIEW_IMAGE_WIDTH : IMAGE_WIDTH}
                height={isPreview ? PREVIEW_IMAGE_WIDTH : IMAGE_WIDTH}
                className={`object-contain rounded-xl ${
                  !isPreview ? "cursor-pointer" : ""
                }`}
                onPointerDown={!isPreview ? handlePointerDown : undefined}
                onPointerMove={!isPreview ? handlePointerMove : undefined}
                onPointerUp={!isPreview ? handlePointerUp : undefined}
                onDragStart={(e) => e.preventDefault()}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <ProductCarouselDots
        count={images.length}
        currentSlide={slide}
        onDotClick={(index) => api?.scrollTo(index)}
      />
    </div>
  );
}

function ProductCarouselDots({
  count,
  currentSlide,
  onDotClick,
}: {
  count: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {[...Array(count)].map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`h-2 w-2 rounded-full transition-colors ${
            index === currentSlide ? "bg-primaryBlue" : "bg-tertiaryLabel"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
