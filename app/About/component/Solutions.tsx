"use client";

import ImageReveal from "@/app/components/UI/ImageReveal";
import TextReveal from "@/app/components/UI/TextReveal";

export default function Solutions() {
  return (
    <section className="relative  bg-(--color-grey) pt-[10vw] md:pt-[4vw] md:pb-[8vw]">
<div className="grid-container">
  {/* Left Side - Content */}
  <div className="col-span-12 md:col-span-6 flex flex-col justify-between gap-x-[var(--grid-gutter)] mb-[6vw] md:mb-0">
    {/* Main Title - Top */}
    <div className="col-span-6 md:col-span-6">
      <TextReveal 
        className="text-[4vw] font-extrabold w-[20vw] text-[var(--color-black)] leading-[1.3]"
        triggerOnScroll={true}
        delay={0.8}
        duration={1.4}
        stagger={0.15}
      >
Best Interior Solutions
      </TextReveal>
    </div>

    {/* Feature Card with Image - Bottom */}
    <div className="col-span-6 font-semibold w-[20vw] md:col-span-5 md:col-start-2 space-y-[3vw] md:space-y-[2vw] mt-[6vw] md:mt-[4vw]">
Our founders, Meraj Shabbir and Imran Syed, started Adorn Panels because 
    </div>
  </div>

  {/* Right Side - Sticky Image */}
  <div className="col-span-12 md:col-span-6 flex flex-col gap-[2vw]">
      <TextReveal 
        className="b1 font-semibold text-[var(--color-black)] leading-[1.3] w-[40vw]"
        triggerOnScroll={true}
        delay={0.8}
        duration={1.4}
        stagger={0.15}
      >
Our passion lies in transforming ordinary walls into meaningful design experiences. Every panel we create reflects our commitment to craftsmanship, innovation, and lasting beauty.
      </TextReveal>


    <div className="md:sticky md:top-[10vw] md:h-[40vw]">
      <ImageReveal
        src="/img/aboutSolution.png"
        alt="Adorn Panels Innovation"
        dir="left"
        className="w-full h-[60vw] md:h-full object-cover"
      />
    </div>
  </div>
</div>


    </section>
  );
}
