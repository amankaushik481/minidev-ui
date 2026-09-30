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
