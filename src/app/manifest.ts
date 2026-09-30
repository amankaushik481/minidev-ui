import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MiniDev UI",
    short_name: "MiniDev UI",
    description: "Free React and Tailwind CSS components, blocks and templates.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0f11",
    theme_color: "#0e0f11",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
