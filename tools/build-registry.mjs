#!/usr/bin/env node
/**
 * build-registry — one source of truth, many outputs.
 *
 * Walks src/registry/{ui,blocks,premium} and writes:
 *   public/r/<name>.json        shadcn registry items (npx shadcn add https://ui.minidev.pro/r/<name>.json)
 *   public/r/registry.json      shadcn registry index
 *   registry.json               same index at the repo root (for `shadcn build`)
 *   src/lib/component-index.ts  docs/search index
 *   src/lib/registry-loaders.ts lazy import map for live previews
 *   public/llms.txt             compact index for AI agents
 *   public/llms-full.txt        full index + design rules for AI agents
 *
 * Runs automatically before `npm run build` (prebuild).
 */
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { extractProps } from "./props-parser.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const SITE = "https://ui.minidev.pro"
const KINDS = [
  { dir: "ui", kind: "ui", tier: "free", label: "Components" },
  { dir: "blocks", kind: "block", tier: "free", label: "Blocks" },
  { dir: "premium", kind: "premium", tier: "premium", label: "Motion" },
]
const PEER = new Set(["react", "react-dom", "next"])

const pascal = (s) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase())
const words = (s) => s.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())

function pkgName(spec) {
  if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/")
  return spec.split("/")[0]
}


/** Hand-written SEO copy lives in TS content files; read what the llms files need with light regexes. */
async function readContentMeta() {
  const seo = {}
  const seoDir = path.join(root, "src/content/component-seo")
  for (const f of (await readdir(seoDir).catch(() => [])).filter((f) => /^part-\d+\.ts$/.test(f))) {
    const src = await readFile(path.join(seoDir, f), "utf8")
    for (const m of src.matchAll(/^\s*"?([a-z0-9-]+)"?:\s*\{\s*\n\s*description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/gm)) seo[m[1]] = m[2]
  }
  const docs = async (dir) => {
    const d = path.join(root, "src/content", dir)
    const out = []
    for (const f of (await readdir(d).catch(() => [])).filter((f) => f.endsWith(".ts") && f !== "index.ts")) {
      const src = await readFile(path.join(d, f), "utf8")
      const slug = src.match(/slug:\s*"([^"]+)"/)?.[1]
      const title = src.match(/title:\s*\n?\s*"([^"]+)"/)?.[1]
      const description = src.match(/description:\s*\n?\s*"([^"]+)"/)?.[1]
      if (slug && title) out.push({ slug, title, description })
    }
    return out
  }
  const cats = [...(await readFile(path.join(root, "src/content/categories.ts"), "utf8").catch(() => "")).matchAll(/id:\s*"([a-z-]+)",\s*\n\s*label:\s*"([^"]+)",\s*\n\s*h1:\s*"([^"]+)"/g)].map((m) => ({ id: m[1], label: m[2], h1: m[3] }))
  const tools = [...(await readFile(path.join(root, "src/content/tools.ts"), "utf8").catch(() => "")).matchAll(/slug:\s*"([a-z-]+)",\s*\n\s*name:\s*"([^"]+)"/g)].map((m) => ({ slug: m[1], name: m[2] }))
  const glossary = []
  const gdir = path.join(root, "src/content/glossary")
  for (const f of (await readdir(gdir).catch(() => [])).filter((f) => /^part-\d+\.ts$/.test(f))) {
    const src = await readFile(path.join(gdir, f), "utf8")
    for (const m of src.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*term:\s*"([^"]+)",\s*\n\s*short:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g)) glossary.push({ slug: m[1], term: m[2], short: m[3] })
  }
  glossary.sort((a, b) => a.term.localeCompare(b.term))
  return { seo, guides: await docs("guides"), compare: await docs("compare"), installs: await docs("install"), cats, tools, glossary }
}

async function collect() {
  const items = []
  for (const k of KINDS) {
    const dir = path.join(root, "src/registry", k.dir)
    const files = (await readdir(dir)).filter((f) => f.endsWith(".tsx")).sort()
    for (const f of files) {
      const name = f.replace(/\.tsx$/, "")
      const rel = `src/registry/${k.dir}/${f}`
      const src = await readFile(path.join(root, rel), "utf8")
      const exports = [
        ...[...src.matchAll(/export\s*\{([^}]*)\}/g)].flatMap((m) => m[1].split(",").map((x) => x.trim().split(/\s+as\s+/).pop())),
        ...[...src.matchAll(/export\s+(?:function|const)\s+(\w+)/g)].map((m) => m[1]),
      ].filter((x) => x && /^[A-Z]/.test(x))
      const want = pascal(name)
      const title = exports.includes(want) ? want : exports.find((e) => e.startsWith(want)) ?? exports[0] ?? want
      const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1])
      const deps = [...new Set(imports.filter((s) => !s.startsWith(".") && !s.startsWith("@/")).map(pkgName).filter((p) => !PEER.has(p)))].sort()
      const registryDeps = [...new Set(imports.map((s) => s.match(/^@\/registry\/(?:ui|blocks|premium)\/([a-z0-9-]+)$/)?.[1]).filter(Boolean))].filter((d) => d !== name).sort()
      let doc = src.match(/\/\*\*\s*\n?\s*\*?\s*([^*][^\n]*?)(?:\n|\*\/)/)?.[1]?.replace(/^[A-Z][A-Za-z]+\s+[—-]\s+/, "").trim()
      if (doc) doc = doc[0].toUpperCase() + doc.slice(1)
      items.push({ name, title, kind: k.kind, tier: k.tier, dir: k.dir, path: rel, import: `@/registry/${k.dir}/${name}`, exports, deps, registryDeps, description: doc || undefined, src })
    }
  }
  return items
}

function shadcnContent(src) {
  return src.replace(/@\/registry\/(?:ui|blocks|premium)\//g, "@/components/ui/")
}

/** Extract the first complete JSX element `<Tag …>…</Tag>` or `<Tag … />` from source. */
function extractJsx(src, tag) {
  const re = new RegExp(`<${tag}(?=[\\s/>])`, "g")
  const m = re.exec(src)
  if (!m) return null
  let i = m.index + tag.length + 1
  let brace = 0
  let quote = null
  // end of opening tag
  for (; i < src.length; i++) {
    const c = src[i]
    if (quote) { if (c === quote && src[i - 1] !== "\\") quote = null; continue }
    if (c === '"' || c === "'" || c === "`") { quote = c; continue }
    if (c === "{") brace++
    else if (c === "}") brace--
    else if (brace === 0 && c === ">") break
  }
  if (i >= src.length) return null
  let end
  if (src[i - 1] === "/") end = i + 1
  else {
    let depth = 1
    const open = new RegExp(`<${tag}(?=[\\s/>])`, "g")
    const close = `</${tag}>`
    let j = i + 1
    while (depth > 0) {
      const c = src.indexOf(close, j)
      if (c === -1) return null
      open.lastIndex = j
      const o = open.exec(src)
      if (o && o.index < c) { depth++; j = o.index + tag.length + 1 } else { depth--; j = c + close.length }
    }
    end = j
  }
  const lineStart = src.lastIndexOf("\n", m.index) + 1
  const indent = src.slice(lineStart, m.index).match(/^\s*/)[0].length
  const snippet = src.slice(m.index, end).split("\n").map((l, n) => (n === 0 ? l : l.slice(Math.min(indent, l.match(/^\s*/)[0].length)))).join("\n")
  return snippet.split("\n").length > 36 ? null : snippet
}

async function galleryMap() {
  const dir = path.join(root, "src/app/gallery")
  const map = {}
  for (const slug of await readdir(dir)) {
    if (slug.startsWith("_") || slug.includes(".")) continue
    let src
    try { src = await readFile(path.join(dir, slug, "page.tsx"), "utf8") } catch { continue }
    for (const m of src.matchAll(/@\/registry\/(?:ui|blocks|premium)\/([a-z0-9-]+)/g)) {
      ;(map[m[1]] ??= new Set()).add(slug)
    }
  }
  return map
}

async function gallerySources() {
  const dir = path.join(root, "src/app/gallery")
  const out = []
  for (const slug of await readdir(dir)) {
    if (slug.startsWith("_") || slug.includes(".")) continue
    try { out.push(await readFile(path.join(dir, slug, "page.tsx"), "utf8")) } catch {}
  }
  out.push(await readFile(path.join(root, "src/lib/playground-demos.tsx"), "utf8"))
  return out
}

async function main() {
  const items = await collect()
  const gmap = await galleryMap()
  const gsrc = await gallerySources()
  for (const it of items) {
    it.galleries = [...(gmap[it.name] ?? [])].sort()
    for (const g of gsrc) {
      if (!g.includes(`@/registry/${it.dir}/${it.name}"`)) continue
      const snip = extractJsx(g, it.title)
      if (snip) { it.usage = snip; break }
    }
  }
  const outDir = path.join(root, "public/r")
  await rm(outDir, { recursive: true, force: true })
  await mkdir(outDir, { recursive: true })

  // 1. Registry items
  for (const it of items) {
    const json = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: it.name,
      type: it.kind === "ui" ? "registry:ui" : "registry:component",
      title: words(it.name),
      ...(it.description ? { description: it.description } : {}),
      dependencies: it.deps,
      registryDependencies: [...it.registryDeps.map((d) => `${SITE}/r/${d}.json`), ...(it.src.includes("@/lib/utils") ? ["utils"] : [])],
      files: [{ path: `registry/${it.dir}/${it.name}.tsx`, type: "registry:ui", target: `components/ui/${it.name}.tsx`, content: shadcnContent(it.src) }],
    }
    await writeFile(path.join(outDir, `${it.name}.json`), JSON.stringify(json, null, 2) + "\n")
  }

  // 2. Registry index (public + repo root)
  const index = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "minidev-ui",
    homepage: SITE,
    items: items.map((it) => ({
      name: it.name,
      type: it.kind === "ui" ? "registry:ui" : "registry:component",
      title: words(it.name),
      ...(it.description ? { description: it.description } : {}),
      dependencies: it.deps,
      registryDependencies: it.registryDeps.map((d) => `${SITE}/r/${d}.json`),
      files: [{ path: it.path, type: "registry:ui" }],
    })),
  }
  await writeFile(path.join(outDir, "registry.json"), JSON.stringify(index, null, 2) + "\n")
  await writeFile(path.join(root, "registry.json"), JSON.stringify(index, null, 2) + "\n")

  // 3a. Props for the docs API tables (server only; not in the client index)
  const propsMap = {}
  for (const it of items) {
    try {
      const r = extractProps(it.src, it.title)
      if (r) propsMap[it.name] = r
    } catch {}
  }
  await writeFile(
    path.join(root, "src/lib/component-props.ts"),
    `/** Generated by tools/build-registry.mjs from each component's parameter type. Do not edit by hand. */
export type PropDoc = { name: string; type: string; optional: boolean; default?: string; doc?: string }
export const COMPONENT_PROPS: Record<string, { props: PropDoc[]; extends: string[] }> = ${JSON.stringify(propsMap, null, 1)}
`,
  )

  // 3. Component index (docs + search)
  const idx = items.map(({ name, title, tier, kind, path: p, import: imp, deps, registryDeps, galleries, description, usage }) => ({
    name, title, tier, kind, path: p, import: imp, deps, registryDeps, galleries, ...(description ? { description } : {}), ...(usage ? { usage } : {}),
  }))
  await writeFile(
    path.join(root, "src/lib/component-index.ts"),
    `/** Generated by tools/build-registry.mjs. Do not edit by hand. */
export type ComponentIndexEntry = {
  name: string
  title: string
  tier: "free" | "premium"
  kind: "ui" | "block" | "premium"
  path: string
  import: string
  deps: string[]
  registryDeps: string[]
  /** Gallery slugs that render this component. */
  galleries: string[]
  description?: string
  /** A real usage snippet lifted from the gallery. */
  usage?: string
}

export const COMPONENT_INDEX: ComponentIndexEntry[] = ${JSON.stringify(idx, null, 2)}
`
  )

  // 4. Lazy loaders for live previews
  await writeFile(
    path.join(root, "src/lib/registry-loaders.ts"),
    `/** Generated by tools/build-registry.mjs. Do not edit by hand. */
/* eslint-disable */
export const REGISTRY_LOADERS: Record<string, () => Promise<Record<string, unknown>>> = {
${items.map((it) => `  ${JSON.stringify(it.name)}: () => import(${JSON.stringify(it.import)}),`).join("\n")}
}
`
  )

  // 5. llms.txt
  const install = `npm i minidev-ui-kit`
  const header = `# MiniDev UI

> ${items.length} free, MIT-licensed React + Tailwind v4 components for product UI: forms, data tables, charts, billing, auth, settings, overlays, and AI surfaces (chat, reasoning, tool calls). Built on Base UI. Hairline design language: 1px structure, semantic OKLCH tokens, light + dark from one token set.

## Install

- npm: \`${install}\` then \`import { Button } from "minidev-ui-kit/ui/button"\` (Next.js: add \`transpilePackages: ["minidev-ui-kit"]\`)
- shadcn CLI, one file at a time: \`npx shadcn@latest add ${SITE}/r/<name>.json\`
- Or copy the single source file into your repo. Every component is one file.

## Rules for generating code with MiniDev UI

- Use semantic tokens only: bg, surface, raised, sunken, border, border-strong, fg, fg-muted, fg-subtle, ink, on-ink, accent, accent-soft, accent-fg, success, warning, danger, info. Never raw hex or palette steps like blue-500.
- Primary actions use <Button> (ink). Brand-coloured actions use <Button variant="accent">. Secondary: variant="outline". Quiet: variant="ghost".
- Depth: shadow-xs, shadow-sm, shadow-raised (cards), shadow-md, shadow-lg, shadow-overlay (menus, dialogs). No other shadows.
- Radius: controls rounded-lg (8px), cards rounded-xl (12px), overlays rounded-2xl. Nested radius = outer minus padding.
- Numbers are tabular (tabular-nums). Headings use negative tracking; body text does not.
- Dark mode: add the \`dark\` class to <html>. Components never branch on theme.
`
  const content = await readContentMeta()
  const list = (k) =>
    items
      .filter((i) => i.kind === k)
      .map((i) => {
        const d = content.seo[i.name] ?? i.description
        return `- [${i.title}](${SITE}/docs/${i.name}): \`npx shadcn@latest add ${SITE}/r/${i.name}.json\`${d ? `. ${d}` : ""}`
      })
      .join("\n")
  const short = `${header}
## Docs

- [Getting started](${SITE}/docs)
- [All components](${SITE}/gallery)
- [Full index for LLMs](${SITE}/llms-full.txt)
- [Registry index](${SITE}/r/registry.json)
- [Templates (live demos)](${SITE}/templates)

## Components by category

${content.cats.map((c) => `- [${c.h1}](${SITE}/components/${c.id})`).join("\n")}

## Guides

${content.guides.map((g) => `- [${g.title}](${SITE}/guides/${g.slug})${g.description ? `: ${g.description}` : ""}`).join("\n")}

## Installation

- [All frameworks](${SITE}/docs/installation)
${content.installs.map((g) => `- [${g.title}](${SITE}/docs/installation/${g.slug})`).join("\n")}

## Glossary

${content.glossary.map((t) => `- [${t.term}](${SITE}/glossary/${t.slug}): ${t.short}`).join("\n")}

## Free tools

${content.tools.map((t) => `- [${t.name}](${SITE}/tools/${t.slug})`).join("\n")}

## Comparisons

${content.compare.map((c) => `- [${c.title}](${SITE}/compare/${c.slug})`).join("\n")}

## Studio

- [MiniDev](https://minidev.pro): the studio behind MiniDev UI. Designs and builds MVPs, web apps, mobile apps and websites, starting with a free 48 hour prototype. Contact: ${"aman@minidev.pro"}.
`
  const full = `${header}
## Components (${items.filter((i) => i.kind === "ui").length})

${list("ui")}

## Blocks (${items.filter((i) => i.kind === "block").length})

${list("block")}

## Motion (${items.filter((i) => i.kind === "premium").length})

${list("premium")}
`
  await writeFile(path.join(root, "public/llms.txt"), short)
  await writeFile(path.join(root, "public/llms-full.txt"), full)
  await writeFile(path.join(root, "llms.txt"), short)

  // 6. Tokens stylesheet, served for copy-paste installs
  await writeFile(path.join(outDir, "styles.css"), await readFile(path.join(root, "src/styles/minidev.css"), "utf8"))

  console.log(`registry: ${items.length} items → public/r, component-index, loaders, llms.txt`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
