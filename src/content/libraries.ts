import { COMPARISONS } from "./compare"
import { matchupBetween, matchupsFor } from "./matchups"
import { alternativesBySlug, alternativesListing } from "./alternatives"
import type { Alternative, LibraryId, Matchup } from "./types"

/*
 * Names, sites and link targets for the libraries in the comparison data.
 * A library's name and URL live in its comparison file (src/content/compare);
 * matchups and alternatives pages refer to it by id and read them from here.
 */

const PREFIX = "minidev-ui-vs-"

export type Library = {
  id: LibraryId
  /** Display name, e.g. "shadcn/ui". */
  name: string
  /** Official site. */
  url: string
  /** Path of the MiniDev UI comparison page. */
  comparison: string
  /** ISO date the comparison's facts were checked. */
  checked: string
}

export function libraryById(id: LibraryId): Library {
  const c = COMPARISONS.find((x) => x.slug === PREFIX + id)
  if (!c) throw new Error(`No comparison page for library "${id}"`)
  return { id, name: c.other, url: c.otherUrl, comparison: `/compare/${c.slug}`, checked: c.checked }
}

/** The library a comparison is about: "shadcn-ui" for "minidev-ui-vs-shadcn-ui". */
export const libraryIdOf = (comparisonSlug: string) => comparisonSlug.slice(PREFIX.length) as LibraryId

export type PageLink = { href: string; label: string }

export const matchupLink = (m: Matchup): PageLink => ({ href: `/compare/${m.slug}`, label: `${libraryById(m.a).name} vs ${libraryById(m.b).name}` })

export const alternativesLink = (id: LibraryId): PageLink => ({ href: `/alternatives/${id}`, label: `${libraryById(id).name} alternatives` })

/**
 * One option on the alternatives page for `page`: its display name, where to
 * read more about it, and the best page to compare it on. That is the head to
 * head page when one exists for the pair, otherwise its MiniDev UI comparison.
 */
export function alternativeEntry(page: LibraryId, item: Alternative): { name: string; site: PageLink; compare: PageLink } {
  if (item.id === "minidev-ui") {
    return {
      name: "MiniDev UI",
      site: { href: "/docs", label: "Get started" },
      compare: { href: `/compare/${PREFIX}${page}`, label: `MiniDev UI vs ${libraryById(page).name}` },
    }
  }
  const lib = libraryById(item.id)
  const m = matchupBetween(page, item.id)
  return {
    name: lib.name,
    site: { href: lib.url, label: "Official site" },
    compare: m ? matchupLink(m) : { href: lib.comparison, label: `MiniDev UI vs ${lib.name}` },
  }
}

/** Head to head and alternatives pages that involve a library, linked from its MiniDev UI comparison page. */
export function relatedLinks(id: LibraryId): PageLink[] {
  return [
    ...matchupsFor(id).map(matchupLink),
    ...(alternativesBySlug(id) ? [alternativesLink(id)] : []),
    ...alternativesListing(id).map((p) => alternativesLink(p.slug)),
  ]
}
