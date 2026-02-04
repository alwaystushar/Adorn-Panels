"use client";

import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Volume2, Leaf, Wrench, Sparkles } from "lucide-react";

interface Feature {
  number: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    number: "01",
    title: "Acoustic performance",
    icon: <Volume2 className="w-[3vw] h-[3vw]" />,
    description: "Enhances sound clarity by reducing echo and noise. Perfect for homes, offices, studios, and commercial spaces.",
    image: "/img/product1.jpg",
  },
  {
    number: "02",
    title: "Eco-friendly & sustainable",
    icon: <Leaf className="w-[3vw] h-[3vw]" />,
    description: "Made from responsibly sourced, environmentally safe materials. Designed to reduce environmental impact without sacrificing quality.",
    image: "/img/product2.jpg",
  },
  {
    number: "03",
    title: "Easy installation",
    icon: <Wrench className="w-[3vw] h-[3vw]" />,
    description: "Designed for quick, hassle-free installation with simple tools. Perfect for DIY projects or professional setups.",
    image: "/img/product3.jpg",
  },
  {
    number: "04",
    title: "Modern design options",
    icon: <Sparkles className="w-[3vw] h-[3vw]" />,
    description: "A wide selection of contemporary textures, colors, and finishes. Designed to complement any modern interior style.",
    image: "/img/product4.jpg",
  },
];

function FeatureItem({ feature, index, isActive }: { feature: Feature; index: number; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth following
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={containerRef}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: i * 0.1 },
        }),
      }}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative border-t border-white/10 py-[4vw] md:py-[3vw] cursor-pointer group"
    >
      <div className="grid grid-cols-12 gap-[4vw] md:gap-[3vw] items-start">
        {/* Number */}
        <div className="col-span-2 md:col-span-1">
          <span className="text-[4vw] md:text-[2vw] text-white/40 font-light">
            {feature.number}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-10 md:col-span-5">
          <h3 className="text-[5vw] md:text-[2.5vw] text-white font-light group-hover:text-white/80 transition-colors duration-300">
            {feature.title}
          </h3>
        </div>

        {/* Icon */}
        <div className="col-span-12 md:col-span-1 flex justify-start md:justify-center">
          <div className="text-white/60 group-hover:text-white transition-colors duration-300">
            {feature.icon}
          </div>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-5">
          <p className="text-[3vw] md:text-[1.1vw] text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Follower Image */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative w-[25vw] md:w-[15vw] h-[25vw] md:h-[15vw] rounded-[1vw] overflow-hidden shadow-2xl">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section ref={sectionRef} className="relative bg-[var(--color-black)] py-[12vw] md:py-[8vw]">
      <div className="grid-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="col-span-12 mb-[8vw] md:mb-[6vw]"
        >
          <h2 className="text-[8vw] md:text-[4vw] text-[var(--color-white)] font-light">
            Why choose Adorn Panels?
          </h2>
        </motion.div>

        {/* Features List */}
        <div className="col-span-12">
          {features.map((feature, index) => (
            <FeatureItem key={feature.number} feature={feature} index={index} isActive={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
