/** Site-wide constants. Change links here, not in components. */
export const SITE = {
  name: "MiniDev UI",
  url: "https://ui.minidev.pro",
  version: "0.2",
  npm: "https://www.npmjs.com/package/minidev-ui-kit",
  npmPackage: "minidev-ui-kit",
  /** The studio behind the library — every page funnels here quietly. */
  studio: {
    name: "MiniDev",
    url: "https://minidev.pro",
    pitch: "We build MVPs in 30 days, with this exact kit.",
  },
  /** Set to a public repo URL to show the GitHub link in the header. */
  github: null as string | null,
} as const

export const NAV = [
  { href: "/docs", label: "Docs" },
  { href: "/gallery", label: "Components" },
  { href: "/gallery/blocks", label: "Blocks" },
  { href: "/gallery/premium-motion", label: "Motion" },
  { href: "/showcase", label: "Showcase" },
] as const
