"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  date: string;
  image: string;
  rating: number;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Stylish wall panel design",
    date: "Aug 2, 2025",
    image: "/img/project1.jpg",
    rating: 5,
    link: "/projects/wall-panel-design",
  },
  {
    id: 2,
    title: "Well crafted living room interior",
    date: "Aug 2, 2025",
    image: "/img/project2.jpg",
    rating: 5,
    link: "/projects/living-room-interior",
  },
  {
    id: 3,
    title: "Modern living room design",
    date: "Aug 2, 2025",
    image: "/img/project3.jpg",
    rating: 5,
    link: "/projects/modern-living-room",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group cursor-pointer"
    >
      <Link href={project.link}>
        {/* Image Container */}
        <div className="relative h-[35vw] mb-[1.5vw] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Rating Stars */}
        <div className="flex gap-[0.3vw] mb-[1vw]">
          {[...Array(project.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-[1.2vw] h-[1.2vw] fill-yellow-500 text-yellow-500"
            />
          ))}
        </div>

        {/* Title */}
        <h3 className="text-[1.8vw] text-(--color-white) font-light mb-[0.8vw] group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Date */}
        <p className="text-[1vw] text-(--color-white)">{project.date}</p>
      </Link>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="relative bg-(--color-black) py-[4vw]">y
      <div className="grid-container">
        {/* Header */}
        <div className="col-span-12 text-center mb-[6vw]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[0.9vw] uppercase tracking-[0.5em] text-gray-400 mb-[2vw]"
          >
            PROJECTS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h3 text-gray-200 font-semibold leading-tight max-w-[40vw] mx-auto"
          >
            Explore our recent stylish and excellent projects that showcase our
            quality
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-[3vw] mb-[4vw]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* See the Work Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="col-span-12 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-[0.8vw] text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowRight className="w-[1.5vw] h-[1.5vw] transition-transform group-hover:translate-x-[0.3vw]" />
            <span className="text-b1 ">See the work</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
