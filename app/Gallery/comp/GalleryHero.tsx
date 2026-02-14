"use client";

import ImageReveal from "@/app/components/UI/ImageReveal";

export default function GalleryHero() {
  return (
    <section className="relative h-[100vh] w-full bg-[#181616]  overflow-hidden">
      {/* Floating Images */}
      <div className="absolute top-[15vh] left-[4vw] w-[16vw] h-[16vw]">
        <ImageReveal
          src="/img/gallery3.png"
          alt="Gallery 1"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-[54vh] left-[22vw] w-[14vw] h-[14vw]">
        <ImageReveal
          src="/img/gallery1.png"
          alt="Gallery 2"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid-container h-full z-10 py-[6vw] items-center">
        {/* Left: Gallery Title */}
        <div className="col-span-6 flex flex-col justify-end h-full">
          <h1 className="text-white text-[6vw] font-light leading-[1.1] mb-[2vw]">Gallery</h1>
        </div>
        {/* Right: Main Image and Description */}
        <div className="col-span-6 flex flex-col items-end justify-end h-full">
          <div className="w-[52vw] h-[30vw] mb-[8vw]">
            <ImageReveal
              src="/img/gallery2.png"
              alt="Gallery 3"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white text-[1.1vw] max-w-[32vw] text-start leading-[1.5]">
            Every project tells a story of texture, strength, and design excellence. Our wall panels shape iconic spaces across residential and commercial environments.
          </p>
        </div>
      </div>
    </section>
  );
}
