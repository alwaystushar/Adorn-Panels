"use client";

// Fixed import statement

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import ProductCard from "@/app/home/lib/ProductCard";
import { useRef, useState } from "react";

interface ProductData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const products: ProductData[] = [
  {
    id: 1,
    title: "Acoustic",
    subtitle: "Wall Panels",
    image: "/img/product1.jpg",
    link: "/products/acoustic",
  },
  {
    id: 2,
    title: "SPC",
    subtitle: "Wall Panels",
    image: "/img/product2.jpg",
    link: "/products/spc",
  },
  {
    id: 3,
    title: "WPC",
    subtitle: "Wall Panels",
    image: "/img/product3.jpg",
    link: "/products/wpc",
  },
  {
    id: 4,
    title: "3D Decorative",
    subtitle: "Panels",
    image: "/img/product4.jpg",
    link: "/products/3d-decorative",
  },
];

const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  // Track when section is being scrolled through
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsInView(latest > 0 && latest < 1);
  });

  // Scroll-linked text animations - bottom to top reveal
  const labelY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  
  const headingY = useTransform(scrollYProgress, [0.05, 0.2], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  
  const subheadingY = useTransform(scrollYProgress, [0.1, 0.25], [80, 0]);
  const subheadingOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  return (
    <div ref={containerRef} className="relative bg-[var(--color-grey)]">
      {/* Scroll Area - Contains everything for this section */}
      <div className="h-[350vh] relative">
        {/* Fixed Container - Only visible during this section */}
        <div 
          className={`${isInView ? 'fixed' : 'absolute'} inset-x-0 top-0 h-screen bg-[var(--color-grey)] flex flex-col justify-center z-10`}
          style={{ 
            top: isInView ? 0 : 'auto',
            bottom: isInView ? 'auto' : 0,
          }}
        >
          {/* Header */}
          <div className="grid-container">
            <div className="text-center py-[4vh] col-span-12 overflow-hidden">
              <motion.p 
                style={{ y: labelY, opacity: labelOpacity }}
                className="text-[2vw] md:text-[1.5vw] lg:text-[1vw] uppercase tracking-[0.3em] text-gray-500 mb-[2vw]"
              >
                Products
              </motion.p>
              <div className="overflow-hidden">
                <motion.h2 
                  style={{ y: headingY, opacity: headingOpacity }}
                  className="text-[6vw] md:text-[5vw] lg:text-[3vw] font-bold text-black leading-tight max-w-[90vw] lg:max-w-[80vw] mx-auto"
                >
                  Crafted panels for modern interiors.
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2 
                  style={{ y: subheadingY, opacity: subheadingOpacity }}
                  className="text-[6vw] md:text-[5vw] lg:text-[3vw] font-bold text-gray-600 leading-tight max-w-[90vw] lg:max-w-[80vw] mx-auto"
                >
                  Explore our product categories
                </motion.h2>
              </div>
            </div>
          </div>
          
          {/* Product Cards */}
          <div className="grid-container flex-1 flex items-center">
            <div className="relative w-full h-[60vh] col-span-12">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  subtitle={product.subtitle}
                  image={product.image}
                  link={product.link}
                  index={index}
                  containerRef={containerRef}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
