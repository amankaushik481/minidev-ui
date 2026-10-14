import type { GlossaryTerm } from "../types"
import { GLOSSARY_1 } from "./part-1"
import { GLOSSARY_2 } from "./part-2"
import { GLOSSARY_3 } from "./part-3"
import { GLOSSARY_4 } from "./part-4"

export const GLOSSARY: GlossaryTerm[] = [...GLOSSARY_1, ...GLOSSARY_2, ...GLOSSARY_3, ...GLOSSARY_4].sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }))

export const termBySlug = (slug: string) => GLOSSARY.find((t) => t.slug === slug)
