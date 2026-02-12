"use client";
import TextReveal from "./TextReveal";
import AdornButton from "./AdornButton";
import React from "react";

export default function Cta() {
	return (
		<section className="relative w-full min-h-[40vw] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/img/cta.jpg)' }}>
			<div className="absolute inset-0 bg-black/50 z-0" />
			<div className="relative z-10 w-full grid-container min-h-[40vw] items-center justify-center">
				<div className="col-span-12 flex flex-col items-center justify-center text-center">
					<TextReveal className="text-white text-[4vw] font-bold leading-[1.1] mb-[2vw]">
						Want wonderful interior<br />wall panels solutions?
					</TextReveal>
					<AdornButton
						href="/contact"
						variant="dark"
						className=""
					>
						Contact Us
					</AdornButton>
				</div>
			</div>
		</section>
	);
}
