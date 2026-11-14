#!/usr/bin/env node
/**
 * build-registry — one source of truth, many outputs.
 *
 * Walks src/registry/{ui,blocks,premium} and writes:
 *   public/r/<name>.json        shadcn registry items (npx shadcn add https://ui.minidev.pro/r/<name>.json)
 *   public/r/registry.json      shadcn registry index
 *   registry.json               same index at the repo root (for `shadcn build`)
 *   src/lib/component-index.ts  docs/search index
 *   src/lib/component-lite.ts   names, titles and counts for client components
 *   src/lib/registry-loaders.ts lazy import map for live previews
 *   src/lib/component-props.ts  props tables for the docs API section
 *   public/llms.txt             compact index for AI agents (one line per component, links to /docs/<name>.md)
 *   public/llms-full.txt        every component in full: purpose, when to use, install, import, props, examples
 *   public/components.json      machine catalog: name, category, install, imports, props, deps, related
 *
 * Runs automatically before `npm run build` (prebuild).
 */
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { extractProps, parseFileDoc } from "./props-parser.mjs"

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
    for (const m of src.matchAll(/^\s*"?([a-z0-9-]+)"?:\s*\{\s*\n\s*description:\s*\n?\s*"((?:[^"\\]|\\.)*)"([\s\S]*?)\n\s*\},?\s*$/gm)) {
      const str = (s) => { try { return JSON.parse(`"${s}"`) } catch { return s } }
      seo[m[1]] = {
        description: str(m[2]),
        category: m[3].match(/category:\s*"([a-z-]+)"/)?.[1],
        keywords: [...(m[3].match(/keywords:\s*\[([^\]]*)\]/)?.[1] ?? "").matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((k) => str(k[1])),
      }
    }
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
  const blocks = [...(await readFile(path.join(root, "src/content/blocks.ts"), "utf8").catch(() => "")).matchAll(/slug:\s*"([a-z-]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)"/g)].map((m) => ({ slug: m[1], name: m[2], title: m[3] }))
  return { seo, guides: await docs("guides"), compare: await docs("compare"), matchups: await docs("matchups"), alternatives: await docs("alternatives"), installs: await docs("install"), cats, tools, glossary, blocks }
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
      const fileDoc = parseFileDoc(src, title)
      items.push({ name, title, kind: k.kind, tier: k.tier, dir: k.dir, path: rel, import: `@/registry/${k.dir}/${name}`, exports: [...new Set(exports)], deps, registryDeps, description: fileDoc?.summary, fileDoc, src })
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

  const content = await readContentMeta()
  const seoOf = (it) => content.seo[it.name]
  const describe = (it) => seoOf(it)?.description ?? it.description
  const catLabel = Object.fromEntries(content.cats.map((c) => [c.id, c.label]))

  // Props first: registry items, the catalog and llms-full all carry them.
  const propsMap = {}
  for (const it of items) {
    try {
      const r = extractProps(it.src, it.title)
      if (r) propsMap[it.name] = r
    } catch {}
  }

  // Self-check: prop JSDoc and file JSDoc must reach the outputs (both were silently dropped once).
  if (!Object.values(propsMap).some((r) => r.props.some((p) => p.doc))) throw new Error("props-parser: no prop JSDoc found")
  if (!items.find((i) => i.name === "button")?.fileDoc?.summary) throw new Error("props-parser: no file JSDoc summary for button")

  // Related = components this one's JSDoc names (`AlertDialog`, Sheet…), plus the reverse, so the link is symmetric.
  const byExport = new Map()
  for (const it of items) if (!byExport.has(it.title)) byExport.set(it.title, it.name)
  for (const it of items) for (const e of it.exports) if (!byExport.has(e)) byExport.set(e, it.name)
  const mentions = new Map(items.map((it) => [it.name, new Set()]))
  for (const it of items) {
    const text = [it.fileDoc?.summary, it.fileDoc?.body].filter(Boolean).join(" ")
    for (const m of text.matchAll(/\b[A-Z][A-Za-z0-9]+\b/g)) {
      const n = byExport.get(m[0])
      if (n && n !== it.name) mentions.get(it.name).add(n)
    }
  }
  for (const it of items) {
    const back = items.filter((o) => mentions.get(o.name).has(it.name)).map((o) => o.name)
    it.related = [...new Set([...mentions.get(it.name), ...back])].slice(0, 8)
  }

  const shadcnImport = (it) => `@/components/ui/${it.name}`
  const npmImport = (it) => `minidev-ui-kit/${it.dir}/${it.name}`
  const docUrl = (it) => `${SITE}/docs/${it.name}`
  const mdUrl = (it) => `${SITE}/docs/${it.name}.md`
  const importNames = (it) => (it.exports.length && it.exports.length <= 12 ? it.exports : [it.title]).join(", ")
  const categoriesOf = (it) => [seoOf(it)?.category, it.kind === "block" ? "blocks" : it.kind === "premium" ? "motion" : null].filter(Boolean)
  const examplesOf = (it) => (it.fileDoc?.examples?.length ? it.fileDoc.examples : it.usage ? [it.usage] : [])

  // 1. Registry items (shadcn registry-item schema: docs, categories and meta included)
  for (const it of items) {
    const json = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: it.name,
      type: it.kind === "ui" ? "registry:ui" : "registry:component",
      title: words(it.name),
      ...(describe(it) ? { description: describe(it) } : {}),
      author: `MiniDev UI <${SITE}>`,
      dependencies: it.deps,
      registryDependencies: [...it.registryDeps.map((d) => `${SITE}/r/${d}.json`), ...(it.src.includes("@/lib/utils") ? ["utils"] : [])],
      files: [{ path: `registry/${it.dir}/${it.name}.tsx`, type: "registry:ui", target: `components/ui/${it.name}.tsx`, content: shadcnContent(it.src) }],
      ...(categoriesOf(it).length ? { categories: categoriesOf(it) } : {}),
      // Printed by the shadcn CLI after install.
      docs: `import { ${importNames(it)} } from "${shadcnImport(it)}"\nNeeds the MiniDev tokens stylesheet (${SITE}/r/styles.css) imported after Tailwind.\nDocs: ${docUrl(it)} · Markdown for agents: ${mdUrl(it)}`,
      meta: {
        tier: it.tier,
        kind: it.kind,
        ...(seoOf(it)?.category ? { category: seoOf(it).category } : {}),
        import: shadcnImport(it),
        npmImport: npmImport(it),
        exports: it.exports,
        ...(it.related.length ? { related: it.related } : {}),
        docsUrl: docUrl(it),
        markdownUrl: mdUrl(it),
        ...(seoOf(it)?.keywords?.length ? { keywords: seoOf(it).keywords } : {}),
      },
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
      ...(describe(it) ? { description: describe(it) } : {}),
      dependencies: it.deps,
      registryDependencies: it.registryDeps.map((d) => `${SITE}/r/${d}.json`),
      files: [{ path: it.path, type: "registry:ui" }],
      ...(categoriesOf(it).length ? { categories: categoriesOf(it) } : {}),
    })),
  }
  await writeFile(path.join(outDir, "registry.json"), JSON.stringify(index, null, 2) + "\n")
  await writeFile(path.join(root, "registry.json"), JSON.stringify(index, null, 2) + "\n")

  // 3a. Props for the docs API tables (server only; not in the client index)
  await writeFile(
    path.join(root, "src/lib/component-props.ts"),
    `/** Generated by tools/build-registry.mjs from each component's parameter type. Do not edit by hand. */
export type PropDoc = { name: string; type: string; optional: boolean; default?: string; doc?: string }
export const COMPONENT_PROPS: Record<string, { props: PropDoc[]; extends: string[] }> = ${JSON.stringify(propsMap, null, 1)}
`,
  )

  // 3. Component index (docs + search)
  const idx = items.map((it) => {
    const { name, title, tier, kind, path: p, import: imp, deps, registryDeps, galleries, description, usage, related, fileDoc } = it
    const category = seoOf(it)?.category
    return {
      name, title, tier, kind, path: p, import: imp, deps, registryDeps, galleries, ...(description ? { description } : {}), ...(usage ? { usage } : {}),
      ...(category ? { category } : {}), ...(related.length ? { related } : {}), ...(fileDoc?.body ? { guide: fileDoc.body } : {}), ...(fileDoc?.examples?.length ? { examples: fileDoc.examples } : {}),
    }
  })
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
  /** Category id from src/content/component-seo. */
  category?: string
  /** Components named in this one's JSDoc, and those that name it. */
  related?: string[]
  /** When-to-use prose from the component's JSDoc (after the summary line). */
  guide?: string
  /** @example blocks from the component's JSDoc. */
  examples?: string[]
}

export const COMPONENT_INDEX: ComponentIndexEntry[] = ${JSON.stringify(idx, null, 2)}
`
  )

  // 3b. Small client-side view of the index: name, title, kind and counts. Client components import
  // this instead of COMPONENT_INDEX, so the full index (usage snippets, deps, paths) never ships to the browser.
  const KINDS = ["ui", "block", "premium"]
  const counts = {
    total: idx.length,
    ui: idx.filter((c) => c.kind === "ui").length,
    blocks: idx.filter((c) => c.kind === "block").length,
    motion: idx.filter((c) => c.kind === "premium").length,
  }
  await writeFile(
    path.join(root, "src/lib/component-lite.ts"),
    `/** Generated by tools/build-registry.mjs. Do not edit by hand. Client-safe: no usage snippets or deps. */
export type ComponentKind = "ui" | "block" | "premium"
export type ComponentLite = { name: string; title: string; kind: ComponentKind }
export const COMPONENT_COUNTS = ${JSON.stringify(counts)} as const
const KINDS: ComponentKind[] = ${JSON.stringify(KINDS)}
const ROWS: [string, string, number][] = ${JSON.stringify(idx.map((c) => [c.name, c.title, KINDS.indexOf(c.kind)]))}
export const COMPONENT_LITE: ComponentLite[] = ROWS.map(([name, title, k]) => ({ name, title, kind: KINDS[k] }))
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

  // 4b. Example loaders: src/registry/examples/<name>.tsx exports `examples` for the docs page
  const exDir = path.join(root, "src/registry/examples")
  const exFiles = (await readdir(exDir).catch(() => [])).filter((f) => f.endsWith(".tsx")).sort()
  await writeFile(
    path.join(root, "src/lib/example-loaders.ts"),
    `/** Generated by tools/build-registry.mjs. Do not edit by hand. */
/* eslint-disable */
import type { Example } from "@/registry/examples/types"
export const EXAMPLE_LOADERS: Record<string, () => Promise<{ examples: Example[] }>> = {
${exFiles.map((f) => `  ${JSON.stringify(f.replace(/\.tsx$/, ""))}: () => import(${JSON.stringify("@/registry/examples/" + f.replace(/\.tsx$/, ""))}),`).join("\n")}
}
`
  )

  // 5. llms.txt (compact index) + llms-full.txt (every component in full) + components.json (machine catalog)
  const count = (k) => items.filter((i) => i.kind === k).length
  const header = `# MiniDev UI

> ${items.length} free, MIT-licensed React + Tailwind CSS v4 components (${count("ui")} components, ${count("block")} blocks, ${count("premium")} motion pieces) for product UI: forms, data tables, charts, billing, auth, settings, overlays, and AI surfaces (chat, reasoning, tool calls). Built on Base UI. Every component is one TypeScript file you own, installed with the shadcn CLI or imported from npm. Semantic OKLCH tokens, light + dark from one token set.

## Quick start (follow exactly)

1. A React project with Tailwind CSS v4 and the \`@/*\` import alias. Run \`npx shadcn@latest init\` once.
2. Tokens: \`curl -o app/minidev.css ${SITE}/r/styles.css\`, then make \`app/globals.css\` start with \`@import "tailwindcss";\` followed by \`@import "./minidev.css";\`. Delete the \`:root\`, \`.dark\` and \`@theme inline\` blocks that shadcn init generated: they override MiniDev's tokens.
3. Add components: \`npx shadcn@latest add @minidev/button @minidev/dialog\` (long form: \`npx shadcn@latest add ${SITE}/r/<name>.json\`). Files land in \`components/ui/<name>.tsx\`; import from \`@/components/ui/<name>\`. Registry dependencies install automatically.
4. Or npm: \`npm i minidev-ui-kit @base-ui/react class-variance-authority clsx tailwind-merge lucide-react motion\`; CSS \`@import "minidev-ui-kit/styles.css";\` and \`@source "../node_modules/minidev-ui-kit";\`; import \`minidev-ui-kit/ui/<name>\`, \`minidev-ui-kit/blocks/<name>\` or \`minidev-ui-kit/premium/<name>\`. Next.js also needs \`transpilePackages: ["minidev-ui-kit"]\`.
5. Dark mode: the \`dark\` class on \`<html>\`. Components never branch on theme.

## Machine-readable

- Per-component Markdown (purpose, when to use, install, props, examples): \`${SITE}/docs/<name>.md\`
- Catalog JSON, every component with category, install, imports, props, deps and related: ${SITE}/components.json
- shadcn registry index: ${SITE}/r/registry.json; one item per component at \`${SITE}/r/<name>.json\` (source inlined)
- Everything in one file: ${SITE}/llms-full.txt
- Agent setup (Claude Code, Cursor, Codex, Copilot): ${SITE}/docs/ai; rules files ${SITE}/AGENTS.md, ${SITE}/rules/minidev-ui.mdc, ${SITE}/skill/minidev-ui/SKILL.md

## Rules for generating code with MiniDev UI

- Built on Base UI, not Radix: to render a component as another element pass \`render={<a href="/pricing" />}\` (or a Next.js \`<Link />\`). There is no \`asChild\`.
- Use semantic tokens only: bg, surface, raised, sunken, border, border-strong, fg, fg-muted, fg-subtle, ink, on-ink, accent, accent-soft, accent-fg, success, warning, danger, info. Never raw hex, palette steps like blue-500, bg-white or bg-black.
- Primary actions use <Button> (ink). Brand-coloured actions use <Button variant="accent">, at most once per screen. Secondary: variant="outline". Quiet: variant="ghost". Icon-only buttons need aria-label.
- Depth: shadow-xs, shadow-sm, shadow-raised (cards), shadow-key, shadow-ink, shadow-md, shadow-lg, shadow-overlay (menus, dialogs). No other shadows, and no backdrop-blur on surfaces.
- Radius: controls rounded-lg (8px), cards rounded-xl (12px), overlays rounded-2xl. Nested radius = outer minus padding. Sizes and gaps are even numbers (2px grid).
- Numbers are tabular (tabular-nums). Headings use negative tracking; body text does not.
- Motion: springs from the presets only. snappy \`{ type: "spring", bounce: 0.18, duration: 0.42 }\` (toggles, tabs), morph \`{ type: "spring", bounce: 0.16, duration: 0.5 }\` (panels, size changes), roll \`{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }\` (numbers), release \`{ type: "spring", stiffness: 400, damping: 40 }\` (after drag), data \`{ type: "spring", bounce: 0.12, duration: 0.7 }\` (charts). Always \`transition={useReducedMotion() ? { duration: 0 } : PRESET}\`. Nothing animates on page load in product UI.
- Overlays (Dialog, Sheet, Drawer) always get a title for their accessible name. Form fields get a visible label.
`
  const esc = (s) => String(s).replace(/\|/g, "\\|").replace(/\s+/g, " ").trim()
  const clip = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)).replace(/[,;:.]$/, "") + "…")
  const purposeOf = (it) => it.fileDoc?.summary ?? describe(it)
  const list = (k) =>
    items
      .filter((i) => i.kind === k)
      .map((i) => {
        const d = purposeOf(i)
        return `- [${i.title}](${mdUrl(i)})${d ? `: ${clip(d, 96)}` : ""}`
      })
      .join("\n")
  const entry = (it) => {
    const seo = seoOf(it)
    const p = propsMap[it.name]
    const out = [`### ${it.title}`, ""]
    if (purposeOf(it)) out.push(purposeOf(it), "")
    if (it.fileDoc?.body) out.push(it.fileDoc.body, "")
    out.push(
      `- Name: \`${it.name}\` (${it.kind === "ui" ? "component" : it.kind === "block" ? "block" : "motion"}${seo?.category ? `, ${catLabel[seo.category] ?? seo.category}` : ""})`,
      `- Install: \`npx shadcn@latest add @minidev/${it.name}\` or \`npm i minidev-ui-kit\``,
      `- Import: \`import { ${importNames(it)} } from "${shadcnImport(it)}"\` (npm: \`"${npmImport(it)}"\`)`,
    )
    if (it.exports.length > 12) out.push(`- Exports: ${it.exports.join(", ")}`)
    if (it.deps.length) out.push(`- Dependencies: ${it.deps.join(", ")}`)
    if (it.registryDeps.length) out.push(`- Uses: ${it.registryDeps.join(", ")}`)
    if (it.related.length) out.push(`- Related: ${it.related.join(", ")}`)
    out.push(`- Docs: ${docUrl(it)} (Markdown: ${mdUrl(it)})`, "")
    if (p?.props.length) {
      out.push(`Props${p.extends.length ? ` (also accepts ${p.extends.join(", ")})` : ""}:`, "", "| Prop | Type | Default | Description |", "| --- | --- | --- | --- |")
      for (const x of p.props) out.push(`| ${x.name}${x.optional ? "?" : ""} | \`${esc(x.type)}\` | ${x.default ? `\`${esc(x.default)}\`` : ""} | ${x.doc ? esc(x.doc) : ""} |`)
      out.push("")
    } else if (p?.extends.length) out.push(`Props: ${p.extends.join(", ")}.`, "")
    for (const ex of examplesOf(it).slice(0, 2)) out.push("```tsx", ex, "```", "")
    return out.join("\n")
  }

  const catalog = {
    name: "minidev-ui",
    homepage: SITE,
    license: "MIT",
    install: { shadcn: "npx shadcn@latest add @minidev/<name>", shadcnUrl: `npx shadcn@latest add ${SITE}/r/<name>.json`, npm: "npm i minidev-ui-kit", styles: `${SITE}/r/styles.css` },
    counts: { total: items.length, components: count("ui"), blocks: count("block"), motion: count("premium") },
    components: items.map((it) => ({
      name: it.name,
      title: it.title,
      kind: it.kind,
      tier: it.tier,
      ...(seoOf(it)?.category ? { category: seoOf(it).category } : {}),
      ...(purposeOf(it) ? { description: purposeOf(it) } : {}),
      ...(it.fileDoc?.body ? { whenToUse: it.fileDoc.body } : {}),
      install: { shadcn: `npx shadcn@latest add @minidev/${it.name}`, registry: `${SITE}/r/${it.name}.json` },
      import: { shadcn: shadcnImport(it), npm: npmImport(it), names: it.exports },
      props: propsMap[it.name]?.props ?? [],
      extends: propsMap[it.name]?.extends ?? [],
      dependencies: it.deps,
      registryDependencies: it.registryDeps,
      related: it.related,
      ...(examplesOf(it).length ? { examples: examplesOf(it) } : {}),
      ...(seoOf(it)?.keywords?.length ? { keywords: seoOf(it).keywords } : {}),
      docs: docUrl(it),
      markdown: mdUrl(it),
    })),
  }
  await writeFile(path.join(root, "public/components.json"), JSON.stringify(catalog) + "\n")

  const short = `${header}
## Docs

- [Getting started](${SITE}/docs)
- [All components](${SITE}/gallery)
- [Full reference for LLMs](${SITE}/llms-full.txt): every component with props and examples
- [Component catalog JSON](${SITE}/components.json)
- [Registry index](${SITE}/r/registry.json)
- [Templates (live demos)](${SITE}/templates)

## Components (${count("ui")})

${list("ui")}

## Blocks (${count("block")})

${list("block")}

## Motion (${count("premium")})

${list("premium")}

## Components by category

${content.cats.map((c) => `- [${c.h1}](${SITE}/components/${c.id})`).join("\n")}

## Blocks by page section

${content.blocks.map((b) => `- [${b.title}](${SITE}/blocks/${b.slug})`).join("\n")}

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

## Head to head

${content.matchups.map((m) => `- [${m.title}](${SITE}/compare/${m.slug})${m.description ? `: ${m.description}` : ""}`).join("\n")}

## Alternatives

- [Alternatives to popular React UI libraries](${SITE}/alternatives)
${content.alternatives.map((a) => `- [${a.title}](${SITE}/alternatives/${a.slug})${a.description ? `: ${a.description}` : ""}`).join("\n")}

## Studio

- [MiniDev](https://minidev.pro): the studio behind MiniDev UI. Designs and builds MVPs, web apps, mobile apps and websites, starting with a free 48 hour prototype. Contact: ${"aman@minidev.pro"}.
`
  const full = `${header}
## Components (${count("ui")})

${items.filter((i) => i.kind === "ui").map(entry).join("\n")}
## Blocks (${count("block")})

${items.filter((i) => i.kind === "block").map(entry).join("\n")}
## Motion (${count("premium")})

${items.filter((i) => i.kind === "premium").map(entry).join("\n")}`
  await writeFile(path.join(root, "public/llms.txt"), short)
  await writeFile(path.join(root, "public/llms-full.txt"), full)
  await writeFile(path.join(root, "llms.txt"), short)

  // 6. Tokens stylesheet, served for copy-paste installs
  await writeFile(path.join(outDir, "styles.css"), await readFile(path.join(root, "src/styles/minidev.css"), "utf8"))

  console.log(`registry: ${items.length} items → public/r, component-index, loaders, llms.txt, components.json`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
