import type { GlossaryTerm } from "../types"
import { GLOSSARY_1 } from "./part-1"
import { GLOSSARY_2 } from "./part-2"

export const GLOSSARY: GlossaryTerm[] = [...GLOSSARY_1, ...GLOSSARY_2].sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }))

export const termBySlug = (slug: string) => GLOSSARY.find((t) => t.slug === slug)
