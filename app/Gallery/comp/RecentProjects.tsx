"use client";

import ImageReveal from "@/app/components/UI/ImageReveal";
import { ArrowUpRight } from "lucide-react";
import Masonry from "react-masonry-css";
import Link from "next/link";

const projects = [
    { img: "/img/gallery3.png", title: "Project 1", link: "/projects/project-1" },
    { img: "/img/gallery1.png", title: "Project 2", link: "/projects/project-2" },
    { img: "/img/gallery2.png", title: "Project 3", link: "/projects/project-3" },
    { img: "/img/gallery2.png", title: "Project 4", link: "/projects/project-4" },
    { img: "/img/gallery3.png", title: "Project 5", link: "/projects/project-5" },
    { img: "/img/gallery1.png", title: "Project 6", link: "/projects/project-6" },
];

export default function RecentProjects() {
    const breakpointColumns = {
        default: 3,
        640: 1
    };

    return (
        <section className="bg-[#f6f4ee] py-[6vw]">
            <div className="grid-container">
                <div className="col-span-12 mb-[4vw]">
                    <h2 className="h2 font-semibold text-[var(--color-black)]">Resent Projects</h2>
                </div>
                
                <div className="col-span-12">
                    <Masonry
                        breakpointCols={breakpointColumns}
                        className="masonry-grid"
                        columnClassName="masonry-column"
                    >
                        {projects.map((proj, idx) => (
                            <Link
                                key={idx}
                                href={proj.link}
                                className="relative group bg-[#ece8df] overflow-hidden cursor-pointer transition hover:opacity-90 mb-[1.5vw] block h-[25vw]"
                            >
                                <div className="w-full h-full">
                                    <ImageReveal
                                        src={proj.img}
                                        alt={proj.title}
                                        className="w-full h-full object-cover"
                                        dir={idx % 2 === 0 ? "left" : "right"}
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-[1.2vw] bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-[3vw]">
                                    <span className="font-medium text-[1.2vw] text-white">{proj.title}</span>
                                    <ArrowUpRight 
                                        className="text-white transition-transform duration-300 group-hover:rotate-45" 
                                        size={20}
                                    />
                                </div>
                            </Link>
                        ))}
                    </Masonry>
                </div>
            </div>


        </section>
    );
}
