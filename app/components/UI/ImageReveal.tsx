"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "left" | "right" | "top" | "bottom";

interface ImageRevealProps {
  src: string;
  alt: string;
  dir?: RevealDirection;
  className?: string;
  maskColor?: string;
  duration?: number;
}

export default function ImageReveal({
  src,
  alt,
  dir = "left",
  className = "",
  maskColor = "var(--color-grey)",
  duration = 1.2,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const mask = maskRef.current;

    if (!container || !mask) return;

    const ctx = gsap.context(() => {
      // Set initial mask position based on direction
      const initialTransform = {
        left: { x: "0%" },
        right: { x: "0%" },
        top: { y: "0%" },
        bottom: { y: "0%" },
      };

      const finalTransform = {
        left: { x: "-100%" },
        right: { x: "100%" },
        top: { y: "-100%" },
        bottom: { y: "100%" },
      };

      gsap.set(mask, initialTransform[dir]);

      ScrollTrigger.create({
        trigger: container,
        start: "top 90%", // Triggers as soon as image enters viewport
        once: true, // Animation happens only once
        onEnter: () => {
          gsap.to(mask, {
            ...finalTransform[dir],
            duration: duration,
            ease: "power2.inOut",
          });
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [dir, duration]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />

      {/* Reveal Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: maskColor }}
      />
    </div>
  );
}
