import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: SITE.name,
    short_name: SITE.name,
    description: `${SITE.countLabel} free React and Tailwind CSS components, blocks and templates. Built for humans and AI coding agents.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0e0f11",
    theme_color: "#0e0f11",
    categories: ["developer", "productivity", "design"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcuts: [
      { name: "Components", url: "/gallery" },
      { name: "Blocks", url: "/blocks" },
      { name: "Docs", url: "/docs" },
      { name: "AI agents", url: "/docs/ai" },
    ],
  }
}
