import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Social card fonts are read from disk at request time; ship them with every route.
  outputFileTracingIncludes: {
    "/**": ["./assets/fonts/**"],
  },
};

export default nextConfig;
