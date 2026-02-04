"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Living Room",
    category: "Residential",
    image: "/img/product1.jpg",
    link: "/projects/modern-living-room",
  },
  {
    id: 2,
    title: "Corporate Office",
    category: "Commercial",
    image: "/img/product2.jpg",
    link: "/projects/corporate-office",
  },
  {
    id: 3,
    title: "Luxury Bedroom",
    category: "Residential",
    image: "/img/product3.jpg",
    link: "/projects/luxury-bedroom",
  },
  {
    id: 4,
    title: "Hotel Suite",
    category: "Commercial",
    image: "/img/product4.jpg",
    link: "/projects/hotel-suite",
  },
  {
    id: 5,
    title: "Contemporary Studio",
    category: "Residential",
    image: "/img/product1.jpg",
    link: "/projects/contemporary-studio",
  },
  {
    id: 6,
    title: "Spa & Wellness",
    category: "Commercial",
    image: "/img/product2.jpg",
    link: "/projects/spa-wellness",
  },
];

function GalleryCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={project.link}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex-shrink-0 mx-[1vw] overflow-hidden cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image - Natural size */}
        <img
          src={project.image}
          alt={project.title}
          className="max-h-[20vw] w-auto transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Project Info - Shows on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-end p-[1.5vw]"
        >
          <p className="text-[0.8vw] text-white/80 uppercase tracking-wider mb-[0.5vw]">
            {project.category}
          </p>
          <h3 className="text-[1.5vw] text-white font-semibold mb-[1vw]">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-[0.5vw] text-white">
            <span className="text-[0.9vw] font-medium">View Project</span>
            <ArrowUpRight className="w-[1.2vw] h-[1.2vw] transition-transform group-hover:translate-x-[0.2vw] group-hover:-translate-y-[0.2vw]" />
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function GallerySection() {
  const [isPausedRow1, setIsPausedRow1] = useState(false);
  const [isPausedRow2, setIsPausedRow2] = useState(false);

  return (
    <section className="relative bg-[var(--color-grey)] py-[8vw]">
      <div className="grid-container !mr-0">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-5 mb-[6vw] lg:mb-0 flex flex-col justify-between"
        >
          <div className="flex flex-col">
            <p className="text-[1vw] uppercase tracking-[0.3em] text-gray-500 mb-[2vw]">
              GALLERY
            </p>
            
            <h2 className="text-[4.5vw] lg:text-[3.5vw] font-medium text-[var(--color-black)] leading-tight mb-[4vw]">
              From concept to completion<br />
              a showcase of our best work<br />
              across residential &<br />
              commercial spaces
            </h2>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-[0.8vw] text-black hover:text-black/70 transition-colors group"
          >
            <span className="w-[2vw] h-[2vw] rounded-full border border-black flex items-center justify-center group-hover:bg-black transition-colors">
              <ArrowUpRight className="w-[1vw] h-[1vw] group-hover:text-white transition-colors" />
            </span>
            <span className="text-[1.2vw] font-medium">View All Gallery</span>
          </Link>
        </motion.div>

        {/* Right Marquee */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="space-y-[2vw]">
            {/* First Row - Left to Right - DRAGGABLE */}
            <div 
              onMouseEnter={() => setIsPausedRow1(true)}
              onMouseLeave={() => setIsPausedRow1(false)}
            >
              <Marquee
                speed={50}
                gradient={false}
                pauseOnHover={false}
                play={!isPausedRow1}
                autoFill={true}
              >
                {projects.slice(0, 3).map((project) => (
                  <GalleryCard key={project.id} project={project} />
                ))}
              </Marquee>
            </div>
            
            {/* Second Row - Right to Left - DRAGGABLE */}
            <div 
              onMouseEnter={() => setIsPausedRow2(true)}
              onMouseLeave={() => setIsPausedRow2(false)}
            >
              <Marquee
                speed={50}
                gradient={false}
                direction="right"
                pauseOnHover={false}
                play={!isPausedRow2}
                autoFill={true}
                className="overflow-hidden"
              >
                {projects.slice(3, 6).map((project) => (
                  <GalleryCard key={project.id} project={project} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
