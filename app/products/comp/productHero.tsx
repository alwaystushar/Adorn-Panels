"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/app/components/UI/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function ProductHero() {
  const imageSectionRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!revealRef.current || !imageSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: imageSectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // Fade out text on scroll
      gsap.fromTo(
        revealRef.current,
        { opacity: 1, y: 0 },
        {
          scrollTrigger: {
            trigger: imageSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          opacity: 0,
          y: -50,
          ease: "power2.inOut"
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative">
      {/* Sticky Image Hero */}
      <section 
        ref={imageSectionRef} 
        className="relative w-full h-screen overflow-hidden header-dark"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/productImg.png')" }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* TextReveal Animation - Using grid-container */}
        <div 
          ref={revealRef}
          className="absolute bottom-[2vw] left-0 right-0 text-white w-full"
        >
          <div className="grid-container">
            {/* Image Column - 7 columns */}
            <div className="col-span-12 md:col-span-7 flex">
              <TextReveal 
                className="text-[12vw] font-black text-[var(--color-grey)]"
                triggerOnScroll={false}
                delay={0.8}
                duration={1.4}
                stagger={0.15}
              >
                Products 
              </TextReveal> 
            </div>

            {/* Text Column - 4 columns starting at column 9 */}
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-[2.5vw] justify-end">
              <div className="flex flex-col gap-[1.5vw]">
                <TextReveal 
                  className="b1 text-[var(--color-grey)]"
                  triggerOnScroll={false}
                  delay={0.8}
                  duration={1.4}
                  stagger={0.15}
                >
                  Explore our wall panel series, crafted to balance design, durability, and performance. Each collection offers distinct textures, finishes, and profiles to suit diverse architectural visions.
                </TextReveal>        
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
