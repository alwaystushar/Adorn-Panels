"use client";

import ImageReveal from "@/app/components/UI/ImageReveal";
import TextReveal from "@/app/components/UI/TextReveal";

export default function Create() {
  return (
    <section className="relative  bg-(--color-grey) pt-[10vw] md:pt-[4vw] md:pb-[8vw]">
<div className="grid-container">
  {/* Left Side - Content */}
  <div className="col-span-12 md:col-span-7 flex flex-col justify-between gap-[2vw] mb-[6vw] md:mb-0">
    {/* Main Title - Top */}
    <div className="col-span-6 md:col-span-6">
      <TextReveal 
        className="text-[3.5vw] font-extrabold text-[var(--color-black)] leading-[1.3]"
        triggerOnScroll={true}
        delay={0.8}
        duration={1.4}
        stagger={0.15}
      >
We create exceptional products for any individual with a variety of products and finishes.
      </TextReveal>
    </div>

    <div className="md:sticky md:top-[10vw] md:h-[40vw]">
      <ImageReveal
        src="/img/create.png"
        alt="Adorn Panels Innovation"
        dir="left"
        className="w-full h-[60vw] md:h-full object-cover"
      />
    </div>
  </div>

  {/* Right Side - Sticky Image */}
  <div className="col-span-12 md:col-span-5 flex flex-col justify-end items-end">
      <TextReveal 
        className="b1 font-semibold text-[var(--color-black)] leading-[1.3] w-[35vw]"
        triggerOnScroll={true}
        delay={0.8}
        duration={1.4}
        stagger={0.15}
      >
Our typical customers range from private individuals to companies, restaurants, and projects around the globe. In essence, people choose us because we offer unique, high-quality products that enhance acoustics and impart a contemporary appearance to any room.
      </TextReveal>



  </div>
</div>


    </section>
  );
}
