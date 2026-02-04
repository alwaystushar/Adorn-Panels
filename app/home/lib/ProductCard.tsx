"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RefObject } from "react";
import { useEffect, useState } from "react";

interface ProductCardProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
  endXPositions?: number[];
  endYPositions?: number[];
  endRotations?: number[];
  mobileEndXPositions?: number[];
  mobileEndYPositions?: number[];
}

const ProductCard = ({ 
  title, 
  subtitle, 
  image, 
  link, 
  index, 
  containerRef,
  endXPositions = [-38, -13, 13, 38],
  endYPositions = [-3, 3, -3, 3],
  endRotations = [0, 0, 0, 0],
  mobileEndXPositions = [0, 0, 0, 0],
  mobileEndYPositions = [-25, -8, 8, 25]
}: ProductCardProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Choose positions based on screen size
  const finalXPositions = isMobile ? mobileEndXPositions : endXPositions;
  const finalYPositions = isMobile ? mobileEndYPositions : endYPositions;

  // Minimal stagger for synchronized feel
  const cardDelay = index * 0.1;

  // PHASE 1: Cards rise from bottom - VERY SLOW (0 to 0.3)
  const y = useTransform(
    scrollYProgress,
    [0 + cardDelay, 0.3 + cardDelay, 0.5 + cardDelay, 1],
    [100, 0, 0, finalYPositions[index]]
  );
  
  // PHASE 2: Cards DISTRIBUTE horizontally - VERY SLOW (0.5 to 1)
  const x = useTransform(
    scrollYProgress, 
    [0 + cardDelay, 0.5 + cardDelay, 1], 
    [0, 0, finalXPositions[index]]
  );

  // Scale: smooth growth - VERY SLOW
  const scale = useTransform(
    scrollYProgress, 
    [0 + cardDelay, 0.3 + cardDelay, 0.5 + cardDelay, 1], 
    [0.5, 0.75, 0.85, 1]
  );

  // Rotation - VERY SLOW
  const rotate = useTransform(
    scrollYProgress,
    [0 + cardDelay, 0.5 + cardDelay, 1],
    [0, 0, endRotations[index]]
  );

  return (
    <motion.div
      style={{ 
        y: useTransform(y, (val) => `${val}vw`),
        x: useTransform(x, (val) => `${val}vw`),
        scale,
        rotate: useTransform(rotate, (val) => `${val}deg`)
      }}
      className="absolute left-1/2 -translate-x-1/2 w-[80vw] md:w-[40vw] lg:w-[18vw]"
    >
      <a href={link} className="block h-full group">
        <div className="relative h-[60vw] md:h-[42vw] lg:h-[22vw] overflow-hidden bg-white shadow-2xl hover:shadow-[0_2vw_4vw_rgba(0,0,0,0.3)] transition-all duration-500">
          {/* Product Image */}
          <div className="relative h-[65%] overflow-hidden">
            <img
              src={image}
              alt={`${title} ${subtitle}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Product Info */}
          <div className="h-[35%] bg-[#E8E3DB] p-[3vw] md:p-[2vw] lg:p-[1.2vw] flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-[4vw] md:text-[2.5vw] lg:text-[1.4vw] text-black mb-[0.5vw] md:mb-[0.3vw]">
                {title}
              </h3>
              <p className="text-[2.5vw] md:text-[1.5vw] lg:text-[0.9vw] text-gray-600">{subtitle}</p>
            </div>
            
            <div className="flex items-center gap-[1vw] md:gap-[0.7vw] lg:gap-[0.5vw] text-black/80 group-hover:text-black transition-colors">
              <span className="text-[2vw] md:text-[1.2vw] lg:text-[0.75vw] font-medium uppercase tracking-wide">Explore</span>
              <ArrowUpRight className="w-[2.5vw] h-[2.5vw] md:w-[1.5vw] md:h-[1.5vw] lg:w-[0.9vw] lg:h-[0.9vw] transition-transform group-hover:translate-x-[0.1vw] group-hover:-translate-y-[0.1vw]" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default ProductCard;
