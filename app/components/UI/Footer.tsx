"use client";
import React from "react";
import Image from "next/image";

export default function Footer() {
	return (
		<footer className="bg-[#F2EFE6] w-full min-h-[38vw] py-[6vw]">
			<div className="grid-container items-start min-h-[18vw]">
				{/* Logo and Brand */}
				<div className="col-span-6 flex flex-col justify-start">
					<div className="flex items-center gap-[1vw] mb-[2vw]">
						<Image src="/logo-light.svg" alt="Adorn Panels Logo" width={80} height={80} className="w-[40vw] h-[20vw]" />
					</div>
				</div>
				{/* Contact & Address */}
				<div className="col-span-4 flex font-bold flex-col gap-[1vw]">
					<div className="text-[1vw]  mb-[0.5vw]">Contact</div>
					<div className="text-[1vw] text-[#231F20]">support@adornpanels.com<br />+1 919-389-0037</div>
					<div className="text-[1vw]  mt-[1vw] mb-[0.5vw]">Address</div>
					<div className="text-[1vw] text-[#231F20]">Adorn Panels LLC 3469<br />Apex Peakway, Apex, NC<br />27502</div>
				</div>
				{/* Social Links */}
				<div className="col-span-2 flex font-bold flex-col gap-[1vw]">
					<div className="text-[1vw] text-[#231F20] mb-[0.5vw]">Instagram</div>
					<div className="text-[1vw] text-[#231F20] mb-[0.5vw]">Pinterest</div>
					<div className="text-[1vw] text-[#231F20]">X Platform</div>
				</div>
				{/* Copyright & Links - bottom row */}
				<div className="col-span-4 flex font-bold flex-col justify-end">
					<span className="text-[0.9vw] text-[#231F20] mb-[0.5vw]">Copyright 2022 - Adorn panels</span>
				</div>
				<div className="col-span-4 flex font-bold flex-col justify-end items-center">
					<span className="text-[0.9vw] text-[#231F20] mb-[0.5vw]">Privacy</span>
				</div>
				<div className="col-span-4 flex font-bold flex-col justify-end items-end">
					<span className="text-[0.9vw] text-[#231F20] mb-[0.5vw]">Terms & conditions</span>
				</div>
			</div>
		</footer>
	);
}
