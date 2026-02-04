// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // 🔹 Create /out folder
  output: "export",

  // 🔹 Required if you use next/image
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
