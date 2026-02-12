"use client";

import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

type ButtonVariant = "light" | "dark";

interface ExplorePanelsButtonProps {
  onClick?: () => void;
  href?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const ExplorePanelsButton = ({ 
  onClick, 
  href,
  children = "Explore Panels",
  variant = "dark",
  className = ""
}: ExplorePanelsButtonProps) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const iconBoxRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textTopRef = useRef<HTMLSpanElement>(null);
  const textBottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const iconBox = iconBoxRef.current;
    const arrow = arrowRef.current;
    const textTop = textTopRef.current;
    const textBottom = textBottomRef.current;

    if (!button || !iconBox || !arrow || !textTop || !textBottom) return;

    // Set initial state for bottom text
    gsap.set(textBottom, { y: "100%" });

    const tl = gsap.timeline({ paused: true });

    tl.to(iconBox, {
      scale: 1.05,
      backgroundColor: variant === "dark" 
        ? "hsl(28, 50%, 65%)" // Lighter accent on hover for dark
        : "hsl(28, 50%, 65%)", // Black on hover for light
      duration: 0.3,
      ease: "power2.out",
    }, 0)
    .to(arrow, {
      x: "0.3vw",
      duration: 0.3,
      ease: "power2.out",
    }, 0)
    .to(textTop, {
      y: "-100%",
      duration: 0.3,
      ease: "power2.out",
    }, 0)
    .to(textBottom, {
      y: "0%",
      duration: 0.3,
      ease: "power2.out",
    }, 0);

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  }, [variant]);

  // Variant styles
  const variantStyles = {
    dark: {
      text: "text-[var(--color-white)]",
      iconBox: "bg-[var(--color-accent)]",
      iconColor: "text-[var(--color-black)]",
    },
    light: {
      text: "text-[var(--color-black)]",
      iconBox: "bg-[var(--color-accent)]",
      iconColor: "text-[var(--color-black)]",
    },
  };

  const styles = variantStyles[variant];
  const textStyles = `b1 font-light tracking-wide block ${styles.text}`;

  const ButtonContent = () => (
    <>
      <div
        ref={textContainerRef}
        className="relative overflow-hidden h-[2.5vw]"
      >
        <span ref={textTopRef} className={textStyles}>
          {children}
        </span>
        <span ref={textBottomRef} className={`${textStyles} absolute top-0 left-0`}>
          {children}
        </span>
      </div>
      <div
        ref={iconBoxRef}
        className={`flex items-center justify-center w-[2vw] h-[2vw] ${styles.iconBox}`}
      >
        <ArrowRight
          ref={arrowRef}
          className={`w-[1vw] h-[1vw] ${styles.iconColor}`}
          strokeWidth={1}
        />
      </div>
    </>
  );

  const baseClasses = `group inline-flex items-center gap-[1vw] cursor-pointer bg-transparent border-none outline-none focus:outline-none ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
    >
      <ButtonContent />
    </button>
  );
};

export default ExplorePanelsButton;
