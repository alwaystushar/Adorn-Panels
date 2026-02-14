"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/app/components/UI/TextReveal";
import ExplorePanelsButton from "@/app/components/UI/AdornButton";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            gsap.to(thumbnailRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power3.inOut"
            });
          })
          .catch((error) => {
            console.error("Video autoplay failed:", error);
          });
      }
    };

    video.addEventListener("canplaythrough", handleCanPlay);
    video.load();

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  useEffect(() => {
    if (!videoLoaded || !revealRef.current || !videoSectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: videoSectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      gsap.fromTo(
        revealRef.current,
        { opacity: 1, y: 0 },
        {
          scrollTrigger: {
            trigger: videoSectionRef.current,
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
  }, [videoLoaded]);

  return (
    <main className="relative">
      {/* Sticky Video Hero */}
      <section 
        ref={videoSectionRef} 
        className="relative w-full h-screen overflow-hidden header-dark"
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/img/hero.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          <source src="/video/hero.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Thumbnail (fades out when video plays) */}
        <div
          ref={thumbnailRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/hero.jpg')" }}
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
      className="text-[12vw] font-black text-(--color-grey)"
      triggerOnScroll={false}
      delay={0.8}
      duration={1.4}
      stagger={0.15}
    >
About Us 
   </TextReveal> 
  </div>

  {/* Text Column - 4 columns starting at column 9 */}
  <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-[2.5vw] justify-end">

    <div className="flex flex-col gap-[1.5vw] ">

    <TextReveal 
      className="b1 text-(--color-grey)"
      triggerOnScroll={false}
      delay={0.8}
      duration={1.4}
      stagger={0.15}
    >
      Crafted by builders with a passion for design, our wall panels enhance spaces with quality, style, and performance.
    </TextReveal>        
    </div>
<div>
</div>


  </div>
</div>

        </div>
      </section>

    </main>
  );
}
