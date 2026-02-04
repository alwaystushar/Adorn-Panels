// Components/UI/TextReveal.tsx - GSAP Text Reveal with Mask Effect
"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  triggerOnScroll?: boolean;
  stagger?: number;
  lineHeight?: string;
  scrollStart?: string;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
  triggerOnScroll = true,
  stagger = 0.1,
  lineHeight = "1.2",
  scrollStart = "top 85%",
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [isReady, setIsReady] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Mark as ready after a brief delay to ensure DOM is painted
    const readyTimer = setTimeout(() => {
      setIsReady(true);
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!isReady || !textRef.current || !containerRef.current) return;

    // Hide container initially
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
    }

    // Cleanup previous instances
    if (splitRef.current) {
      splitRef.current.revert();
      splitRef.current = null;
    }

    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    const timeoutId = requestAnimationFrame(() => {
      if (!textRef.current || !containerRef.current) return;

      try {
        // Ensure spans are inline-block for proper splitting
        const spans = textRef.current.querySelectorAll("span");
        spans.forEach((span) => {
          const spanElement = span as HTMLElement;
          spanElement.style.display = "inline-block";
          spanElement.style.whiteSpace = "nowrap";
        });

        // Split text into lines using SplitType
        const split = new SplitType(textRef.current, {
          types: "lines",
          lineClass: "line-mask",
        });
        splitRef.current = split;

        // Wrap each line in an overflow-hidden container (mask effect)
        if (split.lines) {
          split.lines.forEach((line: Element) => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            wrapper.style.lineHeight = lineHeight;
            const parent = line.parentNode;
            if (parent) {
              parent.insertBefore(wrapper, line);
              wrapper.appendChild(line);
            }
          });

          // Set initial position (hidden below mask)
          gsap.set(split.lines, { y: "100%" });
        }

        // Show container now that split is ready
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }

        // Animate after brief delay to ensure painting is complete
        setTimeout(() => {
          if (split.lines && !hasAnimated.current) {
            // Check if element is in viewport on load
            const isInViewport = () => {
              if (!containerRef.current) return false;
              const rect = containerRef.current.getBoundingClientRect();
              return rect.top < window.innerHeight && rect.bottom > 0;
            };

            const shouldAnimateImmediately = !triggerOnScroll || isInViewport();

            if (shouldAnimateImmediately) {
              // Animate immediately (element already visible)
              animationRef.current = gsap.to(split.lines, {
                y: "0%",
                duration: duration,
                ease: "power4.out",
                delay: delay,
                stagger: stagger,
                onComplete: () => {
                  hasAnimated.current = true;
                },
              });
            } else {
              // Scroll-triggered animation
              animationRef.current = gsap.to(split.lines, {
                y: "0%",
                duration: duration,
                ease: "power4.out",
                stagger: stagger,
                scrollTrigger: {
                  trigger: textRef.current,
                  start: scrollStart,
                  once: true,
                  onEnter: () => {
                    hasAnimated.current = true;
                  },
                },
              });

              // Store ScrollTrigger reference
              if (animationRef.current.scrollTrigger) {
                scrollTriggerRef.current = animationRef.current
                  .scrollTrigger as ScrollTrigger;
              }
            }
          }
        }, 50);
      } catch (error) {
        console.error("TextReveal animation error:", error);
        // Fallback: show text without animation
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }
    });

    return () => {
      cancelAnimationFrame(timeoutId);

      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }

      // Clean up all ScrollTriggers for this element
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === textRef.current) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, triggerOnScroll, stagger, lineHeight, scrollStart, isReady]);

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      <div ref={textRef} className={className} style={{ lineHeight }}>
        {children}
      </div>
    </div>
  );
}