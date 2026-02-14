'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { usePathname, useRouter } from 'next/navigation';

// Primary Navigation Items - Add more here and they'll automatically appear
const NAV_PRIMARY = [
  { num: 'I', text: 'Home', href: '/' },
  { num: 'II', text: 'Products', href: '/products' },
  { num: 'III', text: 'Gallery', href: '/Gallery' },
] as const;

// Secondary Navigation Items - Add more here and they'll automatically appear
const NAV_SECONDARY = [
  { text: 'About Us', href: '/About' },
  { text: 'Services', href: '/services' },
  { text: 'Contact', href: '/contact' },
  { text: 'Blog', href: '/blog' },
] as const;

export default function AdornHeader() {
  // Refs for DOM elements and GSAP timeline
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  // Inject custom styles for hamburger animation
  useEffect(() => {
    const styleId = 'adorn-header-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Hamburger X animation when active */
        #hamburger.active .line-1 {
          left: 0.625vw;
          width: 1.25vw;
          transform: rotate(45deg);
        }
        
        #hamburger.active .line-2 {
          right: 0.625vw;
          transform: rotate(-45deg);
        }`;
      document.head.appendChild(style);
    }
  }, []);

  // Handle scroll direction for header show/hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide header if menu is open
      if (isActive) return;

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isActive]);

  // Animate header visibility
  useEffect(() => {
    if (!headerRef.current) return;

    gsap.to(headerRef.current, {
      y: isVisible ? 0 : '-100%',
      duration: 0.3,
      ease: 'power2.inOut',
    });
  }, [isVisible]);

  // Setup GSAP timeline for menu reveal animation
  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const path = pathRef.current;
    if (!hamburger || !path) return;

    // Create paused timeline for toggle control
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    // SVG path animation values
    const start = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
    const end = 'M0, 1005S175, 995, 500, 995s500, 5, 500, 5V0H0Z';
    const power2 = 'power2.inout';

    // Initial setup - hide menu
    gsap.set('.menu-overlay', { 
      visibility: 'hidden',
      width: '100vw',
      height: '100vh'
    });

    // Step 1: Begin SVG wave reveal animation
    tl.to(path, 0.8, {
      attr: { d: start },
      ease: power2,
    });

    // Step 2: Complete SVG wave to cover full screen
    tl.to(path, 0.8, {
      attr: { d: end },
      ease: power2,
    }, '-=0.5');

    // Step 3: Make menu overlay visible
    tl.to('.menu-overlay', 1, {
      visibility: 'visible',
    }, '-=0.5');

    // Step 4: Reveal menu items with stagger effect
    tl.to('.menu-item > a', 1, {
      top: 0,
      ease: 'power3.out',
      stagger: { amount: 0.5 },
    }, '-=1').reverse();

    // Cleanup on unmount
    return () => {
      tl.kill();
    };
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isActive) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Prevent scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      // Always show header when menu is open
      setIsVisible(true);
    } else {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isActive]);

  // ESC key handler to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        handleToggle();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isActive]);

  // Toggle menu open/close
  const handleToggle = () => {
    setIsActive(!isActive);
    const tl = tlRef.current;
    if (tl) {
      tl.reversed(!tl.reversed());
    }
  };

  // Handle navigation - close menu first, then navigate
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If clicking the current page, just close menu
    if (href === pathname) {
      if (isActive) {
        handleToggle();
      }
      return;
    }

    const tl = tlRef.current;
    if (tl && isActive) {
      // Close the menu (reverse the timeline)
      setIsActive(false);
      tl.reverse();
      
      // Wait for menu close animation to complete, then navigate
      setTimeout(() => {
        router.push(href);
      }, 1500);
    } else {
      // If menu is not active, navigate immediately
      router.push(href);
    }
  };

  return (
    <>
      {/* Fixed Header - Always visible at top */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-[100vw] h-[8vw] flex items-center z-[10001]"
      >
        <div className="grid-container w-full">
          <div className="col-span-12 flex items-center justify-between">
            {/* Logo - Left side */}
            <div className="logo">
              <a 
                href="/" 
                onClick={(e) => handleNavigation(e, '/')}
                className="block hover:opacity-80 transition-opacity duration-300"
              >
                <img 
                  src="/logo.svg"
                  alt="ADORN PANELS™"
                  className="h-[4.8vw] w-auto transition-all duration-300"
                />
              </a>
            </div>

            {/* Hamburger Menu Button - Right side */}
            <div
              onClick={handleToggle}
              className="w-[5.21vw] h-[5.21vw] flex items-center justify-center cursor-pointer relative"
            >
              {/* Hamburger lines container */}
              <div
                ref={hamburgerRef}
                id="hamburger"
                className={`relative w-full h-full z-[2] flex justify-center items-center ${isActive ? 'active' : ''}`}
              >
                {/* Top line - becomes part of X */}
                <span 
                  className="line line-1 absolute w-[1.04vw] h-[0.065vw] bg-white translate-x-[0.73vw] -translate-y-[0.13vw] transition-all duration-300"
                ></span>
                
                {/* Bottom line - becomes part of X */}
                <span 
                  className="line line-2 absolute w-[1.25vw] h-[0.065vw] bg-white -translate-x-[0.31vw] translate-y-[0.13vw] transition-all duration-300"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SVG Wave Overlay - Creates reveal effect */}
      <div className="overlay fixed top-[-1vw] left-0 w-[100vw] h-[100vh] pointer-events-none z-[10000]">
        <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M0 2S175 1 500 1s500 1 500 1V0H0Z"
            fill="var(--color-black)"
          />
        </svg>
      </div>

      {/* Full Screen Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="menu-overlay fixed top-0 left-0 w-[100vw] h-[100vh] bg-[var(--color-black)] z-[10000]"
      >
        <div className="grid-container h-full">
          {/* Menu Content Area */}
          <div className="col-span-12 h-full flex items-center">
            <div className="grid-container w-full">
              {/* Primary Menu Section - Left side */}
              <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
                <div className="flex flex-col gap-[3vw]">
                  {/* Main navigation items - Dynamically rendered from NAV_PRIMARY */}
                  {NAV_PRIMARY.map((item, i) => (
                    <div key={i} className="menu-item relative">
                      <a
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="relative top-[100vh] leading-[50%] no-underline text-[var(--color-white)] uppercase text-[6.51vw] font-medium hover:text-[var(--color-accent)] transition-colors duration-300 cursor-pointer"
                      >
                        {/* Roman numeral */}
                        <span className="text-[1.04vw] mr-[2em] opacity-60">{item.num}</span>
                        {item.text}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Menu Section - Right side */}
              <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
                <div className="flex flex-col gap-[1.56vw]">
                  {/* Secondary navigation items - Dynamically rendered from NAV_SECONDARY */}
                  {NAV_SECONDARY.map((item, i) => (
                    <div key={i} className="menu-item relative">
                      <a
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="relative top-[100vh] leading-[50%] no-underline text-[var(--color-white)] text-[1.88vw] hover:text-[var(--color-accent)] transition-colors duration-300 cursor-pointer"
                      >
                        {item.text}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
