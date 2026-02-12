"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
	{
		question: "What is Adorn Panel?",
		answer: "Adorn Panel is a premium decorative wall panel system designed for modern interiors, offering both style and functionality.",
	},
	{
		question: "What materials are Adorn Panels made of?",
		answer: "Adorn Panels are made from high-quality materials such as acoustic fabric, SPC, and WPC, depending on the product type.",
	},
	{
		question: "How are Adorn Panels installed?",
		answer: "Panels are installed using simple mounting hardware and can be fitted onto most wall surfaces with ease.",
	},
	{
		question: "Can Adorn Panels be used in wet areas like bathrooms or kitchens?",
		answer: "Yes, SPC and WPC panels are water-resistant and suitable for wet areas.",
	},
	{
		question: "Are Adorn Panels easy to maintain?",
		answer: "Panels are designed for easy cleaning and maintenance, requiring only occasional dusting or wiping.",
	},
	{
		question: "Do Adorn Panels come in different designs and styles?",
		answer: "Yes, Adorn Panels are available in a variety of designs, colors, and finishes to suit any interior.",
	},
	{
		question: "Can Adorn Panels be painted or customized?",
		answer: "Some panels can be painted or customized. Please check product specifications for details.",
	},
];

export default function FAQ() {
	const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
	return (
		   <div className="bg-[#F2EFE6] h-[100vh] w-[100vw] p-0">
			   <div className="mx-auto grid-container items-start min-h-[60vh]">
				{/* Left Section: Heading */}
				   <div className="col-span-5 pt-[5vw]">
					<h1 className="text-[2.7vw] font-bold m-0 text-[#231F20] leading-[1.1]">
						Frequently asked<br />questions
					</h1>
				</div>
				{/* Right Section: FAQ List */}
				   <div className="col-span-7 pt-[4vw] min-w-0 w-full">
					<div className="flex flex-col gap-[0.5vw]">
						   {faqs.map((faq, idx) => (
							   <motion.div
								   key={idx}
								   className="flex items-center justify-between border-b border-[#e5e5e5] py-[1.2vw] cursor-pointer"
								   onMouseEnter={() => setHoveredIdx(idx)}
								   onMouseLeave={() => setHoveredIdx(null)}
							   >
								   <div className="flex-1 text-[1.2vw] text-[#231F20] font-bold">
									   {faq.question}
									   <AnimatePresence>
										   {hoveredIdx === idx && (
											   <motion.div
												   initial={{ height: 0, opacity: 0 }}
												   animate={{ height: "auto", opacity: 1 }}
												   exit={{ height: 0, opacity: 0 }}
												   transition={{ height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.25 } }}
												   className="overflow-hidden mt-[0.7vw] text-[1vw] text-[#231F20] font-semibold"
											   >
												   <div>{faq.answer}</div>
											   </motion.div>
										   )}
									   </AnimatePresence>
								   </div>
								   <motion.div
									   className="ml-[1vw] text-[2vw] text-[#231F20] font-regular select-none"
									   animate={{ rotate: hoveredIdx === idx ? 315 : 0 }}
									   transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
								   >
									   +
								   </motion.div>
							   </motion.div>
						   ))}
					</div>
				</div>
			</div>
		</div>
	);
}
