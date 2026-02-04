"use client";

import ImageReveal from "@/app/components/UI/ImageReveal";
import TextReveal from "@/app/components/UI/TextReveal";

export default function InnovationSection() {
  return (
    <section className="relative  bg-(--color-grey) pt-[10vw] md:pt-[4vw] md:pb-[8vw]">
<div className="grid-container">
  {/* Sticky Main Image - Left Side */}
  <div className="col-span-12 md:col-span-6 mb-[6vw] md:mb-0">
    <div className="md:sticky md:top-[10vw] md:h-[60vw]">
      <ImageReveal
        src="/img/home1.jpg"
        alt="Adorn Panels Innovation"
        dir="left"
        className="w-full h-[60vw] md:h-full object-cover "
      />
    </div>
  </div>

  {/* Content - Right Side */}
  <div className="col-span-12 md:col-span-6 md:col-start-7 grid grid-cols-6 auto-rows-min content-between md:min-h-0">
  {/* Main Title - Top */}
  <div className="col-span-6 md:col-span-5">
    <TextReveal 
      className="h3 font-semibold text-[var(--color-black)] leading-[1.3]"
      triggerOnScroll={true}
      delay={0.8}
      duration={1.4}
      stagger={0.15}
    >
      We are the driving force of innovation in the wall panel industry. With exclusive technologies combined with global expertise, we turn every project idea into a reality.
    </TextReveal>
  </div>

  {/* Feature Card with Image - Bottom */}
  <div className="col-span-6 md:col-span-3 md:col-start-4 space-y-[3vw] md:space-y-[2vw] mt-[6vw] md:mt-0">
    <ImageReveal
      src="/img/home2.jpg"
      alt="Premium Quality Panels"
      dir="right"
      className="w-full h-[50vw] md:h-[13vw] object-cover "
    />
    <p className="b1 font-[600] text-[var(--color-black)] leading-[1.6]">
      All our products are crafted with uncompromising passion for quality and design, ensuring that every product that leaves our factory is premium.
    </p>
  </div>
</div>


</div>

    </section>
  );
}
