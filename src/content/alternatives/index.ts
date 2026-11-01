import type { AlternativesPage, LibraryId } from "../types"
import shadcn from "./shadcn-ui"
import tailwindPlus from "./tailwind-plus"
import materialUi from "./material-ui"
import chakra from "./chakra-ui"
import aceternity from "./aceternity-ui"
import magic from "./magic-ui"

/** "Alternatives to X" pages, served at /alternatives/<slug>. */
export const ALTERNATIVES: AlternativesPage[] = [shadcn, tailwindPlus, materialUi, chakra, aceternity, magic]

export const alternativesBySlug = (slug: string) => ALTERNATIVES.find((p) => p.slug === slug)

/** Alternatives pages that list a library as one of the options. */
export const alternativesListing = (id: LibraryId) => ALTERNATIVES.filter((p) => p.items.some((i) => i.id === id))
