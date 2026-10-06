import type { Metadata } from "next"
import { SITE } from "@/lib/site"
import type { Faq } from "@/content/types"

/*
 * One place for titles, canonicals, social cards and structured data.
 * Every route calls `meta()`; JSON-LD builders return plain objects that
 * <JsonLd> serialises.
 */

export const abs = (path = "/") => new URL(path, SITE.url).toString()

type MetaInput = {
  /** Page title without the site suffix (the root template adds it). */
  title: string
  description: string
  /** Path from the root, e.g. "/docs/button". Used for canonical and og:url. */
  path: string
  /**
   * Social image. Set explicitly on every route: a child segment that sets
   * openGraph replaces the parent's, file-based image included. Pass
   * `${path}/opengraph-image` where the route has its own image file.
   */
  image?: string
  keywords?: string[]
  type?: "website" | "article"
  /** Set when the title already contains the brand, to skip the template. */
  absoluteTitle?: boolean
  noindex?: boolean
  publishedTime?: string
  modifiedTime?: string
}

export function meta(m: MetaInput): Metadata {
  const url = abs(m.path)
  const ogTitle = m.absoluteTitle ? m.title : `${m.title} · ${SITE.name}`
  const image = m.image ?? "/opengraph-image"
  return {
    title: m.absoluteTitle ? { absolute: m.title } : m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: m.description,
      url,
      siteName: SITE.name,
      type: m.type ?? "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
      ...(m.type === "article" ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime ?? m.publishedTime, authors: [SITE.studio.url] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: m.description,
      images: [image],
    },
    ...(m.noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

/* ------------------------------------------------------------------ */
/* Structured data                                                      */
/* ------------------------------------------------------------------ */

const ORG_ID = `${SITE.studio.url}/#organization`
const SITE_ID = `${SITE.url}/#website`

export const organizationLd = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.studio.name,
  legalName: "AK Tech",
  url: SITE.studio.url,
  logo: abs("/icons/icon-512.png"),
  email: SITE.studio.email,
  description: "MiniDev is a product studio that designs and builds MVPs, apps and websites.",
  sameAs: [SITE.url, SITE.npm, ...(SITE.github ? [SITE.github] : [])],
})

export const websiteLd = () => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  name: SITE.name,
  url: SITE.url,
  description: "Free React and Tailwind CSS components, blocks and templates, shadcn-compatible and MIT licensed.",
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/gallery?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
})

export const libraryLd = () => ({
  "@type": "SoftwareSourceCode",
  "@id": `${SITE.url}/#library`,
  name: SITE.name,
  url: SITE.url,
  codeRepository: SITE.github ?? SITE.npm,
  programmingLanguage: ["TypeScript", "React", "CSS"],
  runtimePlatform: "Web browser",
  license: "https://opensource.org/licenses/MIT",
  author: { "@id": ORG_ID },
  isAccessibleForFree: true,
  keywords: "react components, tailwind components, shadcn registry, ui kit, nextjs",
})

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  }
}

/** Strip the tiny inline markup used in content before putting text in JSON-LD. */
export const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

export function faqLd(faq: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: plain(f.q), acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
  }
}

export function itemListLd(items: { name: string; path: string }[], name?: string) {
  return {
    "@type": "ItemList",
    ...(name ? { name } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: abs(it.path), name: it.name })),
  }
}

export function componentLd(c: { name: string; title: string; description: string; keywords?: string[]; deps: string[] }) {
  return {
    "@type": "SoftwareSourceCode",
    name: `${c.title} for React`,
    description: c.description,
    url: abs(`/docs/${c.name}`),
    codeSampleType: "full solution",
    programmingLanguage: { "@type": "ComputerLanguage", name: "TypeScript (React)" },
    runtimePlatform: "React 19, Tailwind CSS v4",
    license: "https://opensource.org/licenses/MIT",
    isAccessibleForFree: true,
    keywords: c.keywords?.join(", "),
    ...(c.deps.length ? { softwareRequirements: c.deps.join(", ") } : {}),
    isPartOf: { "@id": `${SITE.url}/#library` },
    author: { "@id": ORG_ID },
    downloadUrl: abs(`/r/${c.name}.json`),
  }
}

export function articleLd(a: { title: string; description: string; path: string; date: string; updated?: string; keywords?: string[] }) {
  return {
    "@type": "TechArticle",
    headline: a.title,
    description: a.description,
    url: abs(a.path),
    mainEntityOfPage: abs(a.path),
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    image: abs(`${a.path}/opengraph-image`),
    keywords: a.keywords?.join(", "),
    inLanguage: "en",
    proficiencyLevel: "Intermediate",
  }
}

export function webAppLd(t: { name: string; description: string; path: string }) {
  return {
    "@type": "WebApplication",
    name: t.name,
    description: t.description,
    url: abs(t.path),
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORG_ID },
  }
}

export function serviceLd() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE.studio.url}/#service`,
    name: "MiniDev",
    url: SITE.studio.url,
    email: SITE.studio.email,
    description: "MiniDev designs and builds MVPs, web apps, mobile apps and websites for founders, with a free 48 hour prototype.",
    areaServed: "Worldwide",
    parentOrganization: { "@id": ORG_ID },
    serviceType: ["MVP development", "Web app development", "Website design and development", "Mobile app development", "UI/UX design"],
  }
}

/** Wraps nodes in a single @graph document. */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes })
