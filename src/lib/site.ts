/** Site-wide constants. Change links here, not in components. */
export const SITE = {
  name: "MiniDev UI",
  url: "https://ui.minidev.pro",
  version: "0.5",
  /** Rounded component count used in copy. Keep in step with the registry. */
  countLabel: "500+",
  npm: "https://www.npmjs.com/package/minidev-ui-kit",
  npmPackage: "minidev-ui-kit",
  /** The studio behind the library — every page funnels here quietly. */
  studio: {
    name: "MiniDev",
    url: "https://minidev.pro",
    pitch: "We build MVPs in 30 days, with this exact kit.",
    /** Where the studio form sends people. Change to your real inbox. */
    email: "aman@minidev.pro",
    call: "https://cal.com/minidev.pro/30min",
  },
  /** Set to a public repo URL to show the GitHub link in the header. */
  github: "https://github.com/amankaushik481/minidev-ui" as string | null,
} as const

export const NAV = [
  { href: "/docs", label: "Docs" },
  { href: "/gallery", label: "Components" },
  { href: "/gallery/blocks", label: "Blocks" },
  { href: "/tools", label: "Tools" },
  { href: "/templates", label: "Templates" },
  { href: "/studio", label: "Hire us" },
] as const
