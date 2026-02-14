"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    bgImage: "/img/mission.png",
    centerImage: "/img/missionImg.png", // Replace with your actual image path
    title: "Our Mission",
    desc: "Crafting elegance in every detail, we redefine interior aesthetics with passion and precision at Adorn Panel.",
  },
  {
    bgImage: "/img/vision.png",
    centerImage: "/img/visionImg.png", // Replace with your actual image path
    title: "Our Vision",
    desc: "Integrity, creativity, excellence - guiding every interaction and design, fostering trust and innovation at Adorn Panel.",
  },
  {
    bgImage: "/img/values.png",
    centerImage: "/img/valuesImg.png", // Replace with your actual image path
    title: "Values",
    desc: "To be the foremost name in transforming spaces, inspiring beauty and sophistication in every interior with Adorn Panel.",
  },
];


export default function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=3000",
          scrub: 1,
        },
      });

      // Animate each card
      cardRefs.current.forEach((card, i) => {
        if (i === 0) {
          // First card starts visible
          tl.set(card, { yPercent: 0, opacity: 1 });
        } else {
          // Each card slides up over the previous
          tl.fromTo(
            card,
            { yPercent: 100, opacity: 1 },
            { yPercent: 0, opacity: 1, duration: 1 }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">


      {/* Cards Stack */}
      <div
        ref={containerRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {cards.map((card, i) => (
          <div
            key={i}
            ref={((el: HTMLDivElement | null) => { cardRefs.current[i] = el; }) as React.RefCallback<HTMLDivElement>}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{ zIndex: i + 1 }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.bgImage})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
            {/* Content Layout */}
            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
              <div
                className={`flex flex-row items-center justify-center h-full w-full px-[4vw] ${i === 1 ? ' flex-row-reverse' : ''}`}
              >
                <div className="grid grid-cols-3 gap-[4vw]">
                {/* Heading */}
                <div className="flex-1 flex items-start justify-center h-full">
                  <h2
                    className="font-bold text-white tracking-tight text-left text-[5vw] mb-[1vw] leading-[1.1]"
                  >
                    {card.title}
                  </h2>
                </div>
                {/* Center Image */}
                <div className="flex-shrink-0 flex items-center justify-center ">
                  <img
                    src={card.centerImage}
                    alt={card.title + ' center'}
                    className="object-contain  w-[23vw] h-[33vw]  "
                  />
                </div>
                {/* Paragraph */}
                <div className="flex-1 flex items-end justify-center h-full ">
                  <p
                    className="text-white/90 text-right text-[1.5vw] max-w-[30vw] leading-[1.3] text-start"
                  >
                    {card.desc}
                  </p>
                </div>                    
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
