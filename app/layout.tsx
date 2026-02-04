import type { Metadata } from "next";
import "./globals.css";
import "./font/stylesheet.css";
import AdornHeader from "./components/UI/AdornHeader";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  title: "Adorn Panels",
  description: "We are the driving force of innovation in the wall panel industry. With exclusive technologies combined with global expertise, we turn every project idea into a reality.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.svg",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-haas-grot-disp antialiased">
        <SmoothScroll />
        <AdornHeader />
        {children}
      </body>
    </html>
  );
}
