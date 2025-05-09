"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  interval?: number; // optional, default is 5s
  className?: string;
}

export default function HorizontalCarousel({ images, className, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (images.length === 0) return null;

  return (
    <div className={`${className} h-screen`}>
      {/* Carousel Images */}
      <div className="relative overflow-hidden h-full w-full">
        <div className="flex transition-transform duration-500 h-full w-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image src={src} alt={`Slide ${index + 1}`} fill className="object-cover" priority={index === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn("w-3 h-3 rounded-full transition-colors", index === currentIndex ? "bg-primary" : "bg-muted")}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
