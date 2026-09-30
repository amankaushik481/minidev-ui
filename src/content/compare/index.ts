import type { Comparison } from "../types"
import shadcn from "./shadcn-ui"
import aceternity from "./aceternity-ui"
import magic from "./magic-ui"
import tailwindPlus from "./tailwind-plus"
import coss from "./coss-ui"

export const COMPARISONS: Comparison[] = [shadcn, aceternity, magic, tailwindPlus, coss]

export const comparisonBySlug = (slug: string) => COMPARISONS.find((c) => c.slug === slug)
