"use client";

import React, { useRef } from "react";
import TextReveal from "@/app/components/UI/TextReveal";

const products = [
 {
    img: "/img/home1.jpg",
    title: "Home Style",
    subtitle: "Panels",
  },
  {
    img: "/img/home2.jpg",
    title: "Modern Living",
    subtitle: "Panels",
  },
  {
    img: "/img/mission.png",
    title: "Mission",
    subtitle: "Panels",
  },
  {
    img: "/img/vision.png",
    title: "Vision",
    subtitle: "Panels",
  },
  {
    img: "/img/home1.jpg",
    title: "Home Style",
    subtitle: "Panels",
  },
  {
    img: "/img/home2.jpg",
    title: "Modern Living",
    subtitle: "Panels",
  },
  {
    img: "/img/mission.png",
    title: "Mission",
    subtitle: "Panels",
  },
  {
    img: "/img/vision.png",
    title: "Vision",
    subtitle: "Panels",
  },
];

export default function Products() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Optional: drag-to-scroll for desktop
  // (You can add a drag library for more advanced behavior)
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft = scrollRef.current?.scrollLeft || 0;
  };
  const handleMouseLeave = () => { isDown = false; };
  const handleMouseUp = () => { isDown = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-[#f6f4ee] py-[3vw]">
      <div className="grid-container !mr-0 !pr-0">
        <div className="col-span-12 mb-[1vw]">
                                        <TextReveal
                    className="uppercase text-[0.9vw] tracking-[0.2em] text-[#222] mb-[1vw]"
                    triggerOnScroll={true}
                    
                  >
                    Products
                  </TextReveal>
                            <TextReveal
                    className="text-[2.2vw] font-medium leading-[1.2] text-[var(--color-black)] mb-[0.5vw]"
                    triggerOnScroll={true}
                    
                  >
                Crafted panels for modern interiors.<br />
            Explore our product categories                
                  </TextReveal>
          <h2 className="">

          </h2>
        </div>
        <div className="col-span-12">
          <div
            ref={scrollRef}
            className="flex gap-[2vw] overflow-x-auto pb-[1vw] hide-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {products.map((prod, idx) => (
              <div
                key={idx}
                className="min-w-[18vw] max-w-[18vw] bg-[#ece8df] overflow-hidden flex-shrink-0 border border-[#e5e5e5]"
              >
                <img
                  src={prod.img}
                  alt={prod.title}
                  className="w-full h-[15vw] object-cover"
                />
                <div className="p-[1vw]">
                  <TextReveal
                    className="font-bold text-[1.1vw] text-[#222] inline-block"
                    triggerOnScroll={true}
                    delay={0.1 * idx}
                  >
                    {prod.title}
                  </TextReveal>
                  <TextReveal
                    className="text-[1.1vw] text-[#222] opacity-70 inline-block"
                    triggerOnScroll={true}
                    delay={0.1 * idx + 0.05}
                  >
                    {" "}{prod.subtitle}
                  </TextReveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to your global CSS for a clean look:
// .hide-scrollbar::-webkit-scrollbar { display: none; }
// .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }