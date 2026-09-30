import type { Guide } from "../types"
import nextjs from "./nextjs"
import vite from "./vite"
import reactRouter from "./react-router"
import astro from "./astro"
import tanstackStart from "./tanstack-start"

/** Framework installation pages, served at /docs/installation/<slug>. */
export const INSTALLS: (Guide & { framework: string })[] = [
  { ...nextjs, framework: "Next.js" },
  { ...vite, framework: "Vite" },
  { ...reactRouter, framework: "React Router" },
  { ...astro, framework: "Astro" },
  { ...tanstackStart, framework: "TanStack Start" },
]

export const installBySlug = (slug: string) => INSTALLS.find((g) => g.slug === slug)
