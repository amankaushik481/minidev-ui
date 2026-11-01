/**
 * Content types for the SEO surface: component copy, category hubs,
 * guides and comparisons. Plain data, rendered by server components.
 *
 * Inline text in `p`, list items, callouts and FAQ answers supports a tiny
 * markup: `code`, **bold**, and [label](/internal/or/https://external).
 */

export const CATEGORY_IDS = [
  "forms",
  "buttons",
  "data-tables",
  "charts",
  "navigation",
  "overlays",
  "feedback",
  "ai-chat",
  "auth",
  "billing",
  "settings",
  "dashboard",
  "marketing",
  "animation",
  "ecommerce",
  "developer-tools",
  "email",
  "layout",
  "media",
  "workflow",
] as const

export type CategoryId = (typeof CATEGORY_IDS)[number]

export type ComponentSeo = {
  /** 120-160 characters. What it is and what it does, specific to this component. Used as meta description and page lede. */
  description: string
  category: CategoryId
  /** 2-4 real search phrases a developer would type, lower case. */
  keywords: string[]
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "code"; lang: "tsx" | "ts" | "bash" | "css" | "json" | "html"; code: string; filename?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; text: string; tone?: "note" | "tip" | "warning" }
  /** Renders a linked card for a MiniDev component (by registry name). */
  | { type: "component"; name: string }
  | { type: "table"; head: string[]; rows: string[][] }

export type Faq = { q: string; a: string }

export type Guide = {
  slug: string
  title: string
  /** 140-160 characters. */
  description: string
  /** ISO date. */
  date: string
  updated?: string
  keywords: string[]
  /** Registry names of components the guide uses. */
  related: string[]
  body: Block[]
  faq?: Faq[]
}

export type Comparison = {
  slug: string
  /** The other library, e.g. "shadcn/ui". */
  other: string
  otherUrl: string
  title: string
  description: string
  /** ISO date the facts were last checked. */
  checked: string
  /** One honest paragraph: when to pick which. */
  summary: string
  rows: { feature: string; minidev: string; other: string }[]
  body: Block[]
  faq: Faq[]
  /** Public sources used for claims about the other library. */
  sources: { label: string; url: string }[]
}

/**
 * A library that has a MiniDev UI comparison page, named by the part of that
 * page's slug after `minidev-ui-vs-`. Matchups and alternatives pages refer to
 * libraries by this id; names and sites come from the comparison data.
 */
export type LibraryId =
  | "shadcn-ui"
  | "aceternity-ui"
  | "magic-ui"
  | "tailwind-plus"
  | "heroui"
  | "mantine"
  | "daisyui"
  | "flowbite"
  | "chakra-ui"
  | "coss-ui"
  | "material-ui"
  | "ant-design"
  | "radix-themes"
  | "tremor"
  | "preline-ui"
  | "park-ui"
  | "untitled-ui"
  | "headless-ui"

/**
 * Two other libraries head to head, served at /compare/<a>-vs-<b> by the same
 * route as the comparisons. Facts come only from the two comparison files (or
 * from the official site, cited in `sources`).
 */
export type Matchup = {
  slug: `${LibraryId}-vs-${LibraryId}`
  /** Under 47 characters, so the full title with the site suffix stays under 60. */
  title: string
  /** 120-160 characters. */
  description: string
  a: LibraryId
  b: LibraryId
  /** ISO date: the older `checked` date of the two comparisons the facts come from. */
  checked: string
  /** The answer first: one or two sentences on how the two differ. */
  verdict: string
  /** Completes "Pick <a> if ...". */
  pickA: string
  /** Completes "Pick <b> if ...". */
  pickB: string
  rows: { feature: string; a: string; b: string }[]
  /** What each one is, where each shines and the trade-offs. */
  body: Block[]
  /** One or two short paragraphs on where MiniDev UI fits, linking both comparison pages. */
  minidev: string[]
  faq: Faq[]
  sources: { label: string; url: string }[]
}

/** One option on an alternatives page. */
export type Alternative = {
  id: LibraryId | "minidev-ui"
  /** What it is, in one or two sentences. */
  what: string
  /** Price and license, short enough for a table cell. */
  price: string
  /** Styling approach. */
  styling: string
  bestFor: string
}

/** "Alternatives to X", served at /alternatives/<slug>. */
export type AlternativesPage = {
  slug: LibraryId
  /** Under 47 characters, so the full title with the site suffix stays under 60. */
  title: string
  /** 120-160 characters. */
  description: string
  /** ISO date: the oldest `checked` date among the libraries on the page. */
  checked: string
  /** The answer first: what the best alternative is, and for whom. */
  intro: string
  /** In order of how well each fits; MiniDev UI goes where it honestly fits. */
  items: Alternative[]
  /** Closing guidance, such as how to choose. */
  body?: Block[]
  faq: Faq[]
  sources: { label: string; url: string }[]
}

export type GlossaryTerm = {
  slug: string
  term: string
  /** One sentence definition, under 160 characters. Used as meta description and the answer box. */
  short: string
  /** 300-600 words of real explanation. */
  body: Block[]
  /** Registry names of MiniDev components that implement or relate to the term. */
  related: string[]
  /** Other glossary slugs. */
  see: string[]
}
