"use client";


import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextReveal from "./TextReveal";
import AdornButton from "./AdornButton";

const guides = [
	{
		title: "Acoustic Panel Installation Guide",
		img: "/img/product1.jpg",
		pdf: "/guides/acoustic-panel-installation-guide.pdf",
	},
	{
		title: "SPC Wall Panel Guide",
		img: "/img/product2.jpg",
		pdf: "/guides/spc-wall-panel-guide.pdf",
	},
	{
		title: "WPC Wall Panel Guide",
		img: "/img/product3.jpg",
		pdf: "/guides/wpc-wall-panel-guide.pdf",
	},
];

const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 2,
	slidesToScroll: 1,
	arrows: false,
	responsive: [
		{
			breakpoint: 900,
			settings: {
				slidesToShow: 1,
			},
		},
	],
};

export default function Help() {
	return (
		<div className="bg-[#F2EFE6]  w-[100vw] py-[6vw]">
			<div className=" mx-auto flex flex-row items-start">
				{/* Left Section: Heading */}
				<div className="flex-1.2 pt-[5.5vw] pl-[2.8vw] min-w-[23.6vw] max-w-[37.5vw]">
				   <TextReveal className="tracking-[0.42vw] text-[0.9vw] text-[#231F20] opacity-70 mb-[1.7vw] font-medium uppercase">
					   HELP & SUPPORT
				   </TextReveal>
				   <TextReveal className="text-[3vw] font-normal m-0 text-[#231F20] leading-[1.1]">
					   Installation Guides<br />
					   <span className="text-[3vw] font-normal"> (PDF)</span>
				   </TextReveal>
				   </div>
				   {/* Right Section: Slider */}
				   <div className="flex-[2.5] pt-[4vw] min-w-0">
					   <Slider {...sliderSettings}>
						   {guides.map((guide, idx) => (
							   <div key={idx} className="h-full px-[1.7vw]">
								   <div className="flex flex-col items-start h-full p-0 group transition-transform duration-300 hover:scale-[1.03] gap-[1.5vw]">
									   <div className="w-full overflow-hidden">
										   <Image
											   src={guide.img}
											   alt={guide.title}
											   width={600}
											   height={450}
											   className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
										   />
									   </div>
									   <div className="mt-[1.25vw] w-full">
										   <div className="text-[1.1vw] font-normal text-[#231F20] leading-tight">
											   {guide.title}
										   </div>
									   </div>
									   <div className="mt-[0.6vw]">
										   <AdornButton
											   href={guide.pdf}
											   variant="light"
											   className="!gap-[0.5vw] !text-[#E1B691] !text-[0.97vw] !font-normal !no-underline !px-0 !py-0"
											   // @ts-ignore
											   download
											   target="_blank"
											   rel="noopener noreferrer"
										   >
											   Download
										   </AdornButton>
									   </div>
								   </div>
							   </div>
						   ))}
					   </Slider>
				   </div>
			</div>
		</div>
	);
}
