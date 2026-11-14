#!/usr/bin/env node
/**
 * MiniDev UI MCP core: tools and the JSON-RPC 2.0 dispatcher, transport-free.
 * Used by server.mjs (stdio, npx minidev-ui-mcp) and src/app/mcp/route.ts
 * (Streamable HTTP at https://ui.minidev.pro/mcp).
 *
 * Data: https://ui.minidev.pro/r/*.json (registry), the public GitHub repo
 * (examples, DESIGN.md), with a fallback to local files when this folder
 * sits inside the MiniDev UI repo.
 *
 * Env: MINIDEV_UI_SOURCE=local|remote (default: remote, then local)
 *      MINIDEV_UI_URL (default https://ui.minidev.pro)
 */
import { extractProps } from "./props-parser.mjs"

// Kept equal to package.json "version" (test.mjs asserts it); a JSON import would trip the Next bundler.
export const VERSION = "0.2.0"
const env = globalThis.process?.env ?? {}
const SITE = (env.MINIDEV_UI_URL || "https://ui.minidev.pro").replace(/\/+$/, "")
const GITHUB = "https://raw.githubusercontent.com/amankaushik481/minidev-ui/main"
const SOURCE = env.MINIDEV_UI_SOURCE

let readLocal = null
/** stdio server inside the repo passes a (repoRelativePath) => Promise<string> reader; the HTTP endpoint reads remote only. */
export function setLocalReader(reader) {
  readLocal = reader
}
const NAME_RE = /^[a-z0-9-]+$/
const PROTOCOLS = ["2025-06-18", "2025-03-26", "2024-11-05"]
const KIND = { ui: "ui", blocks: "block", premium: "motion" }

// ---------- data access ----------

const cache = new Map()

/** Read a repo-relative file: remote first, local fallback (or as MINIDEV_UI_SOURCE says). Resolves to null when nowhere. */
function read(local, remote) {
  const key = local
  if (!cache.has(key)) {
    const order = SOURCE === "local" && readLocal ? ["local"] : SOURCE === "remote" || !readLocal ? ["remote"] : ["remote", "local"]
    cache.set(
      key,
      (async () => {
        for (const where of order) {
          try {
            if (where === "local") return await readLocal(local)
            const res = await fetch(remote, { signal: AbortSignal.timeout(10_000), headers: { "user-agent": `minidev-ui-mcp/${VERSION}` } })
            if (res.ok) return await res.text()
          } catch {}
        }
        cache.delete(key) // let a later call retry after a network blip
        return null
      })(),
    )
  }
  return cache.get(key)
}

const readItemJson = async (name) => {
  const t = await read(`public/r/${name}.json`, `${SITE}/r/${name}.json`)
  return t && JSON.parse(t)
}
const readRepo = (rel) => read(rel, `${GITHUB}/${rel}`)

/** Hand-written category and search phrases per component, from src/content/component-seo. */
async function seoMeta() {
  const index = await readRepo("src/content/component-seo/index.ts")
  const out = {}
  if (!index) return out
  const parts = [...index.matchAll(/from "\.\/(part-\d+)"/g)].map((m) => m[1])
  for (const src of await Promise.all(parts.map((p) => readRepo(`src/content/component-seo/${p}.ts`)))) {
    for (const m of (src ?? "").matchAll(/"([a-z0-9-]+)":\s*\{\s*description:\s*"(?:[^"\\]|\\.)*",\s*category:\s*"([a-z-]+)",\s*keywords:\s*\[([^\]]*)\]/g)) {
      out[m[1]] = { category: m[2], keywords: [...m[3].matchAll(/"([^"]*)"/g)].map((k) => k[1]) }
    }
  }
  return out
}

let itemsPromise
/** All registry items with name, title, kind, category, keywords. */
function items() {
  itemsPromise ??= (async () => {
    const [text, seo] = await Promise.all([read("public/r/registry.json", `${SITE}/r/registry.json`), seoMeta().catch(() => ({}))])
    if (!text) throw new Error(`Could not load the MiniDev UI registry from ${SITE}/r/registry.json. Check your network.`)
    return JSON.parse(text).items.map((it) => ({
      name: it.name,
      title: it.title,
      description: it.description ?? "",
      kind: KIND[it.files?.[0]?.path?.match(/registry\/(ui|blocks|premium)\//)?.[1]] ?? "ui",
      category: it.categories?.[0] ?? seo[it.name]?.category,
      keywords: seo[it.name]?.keywords ?? [],
      dependencies: it.dependencies ?? [],
      registryDependencies: (it.registryDependencies ?? []).map(depName),
    }))
  })().catch((e) => {
    itemsPromise = undefined
    throw e
  })
  return itemsPromise
}

const depName = (d) => d.match(/\/r\/([a-z0-9-]+)\.json$/)?.[1] ?? d
const npmDir = (kind) => ({ ui: "ui", block: "blocks", motion: "premium" })[kind]

/** Exported component names, same rule as tools/build-registry.mjs. */
function exportsOf(src, name) {
  const all = [
    ...[...src.matchAll(/export\s*\{([^}]*)\}/g)].flatMap((m) => m[1].split(",").map((x) => x.trim().split(/\s+as\s+/).pop())),
    ...[...src.matchAll(/export\s+(?:function|const)\s+(\w+)/g)].map((m) => m[1]),
  ].filter((x) => x && /^[A-Z]/.test(x))
  const want = name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("")
  const main = all.includes(want) ? want : (all.find((e) => e.startsWith(want)) ?? all[0] ?? want)
  return { all: [...new Set(all)], main }
}

/** Examples from src/registry/examples/<name>.tsx: [{ title, description, code }]. */
async function examplesOf(name) {
  const src = await readRepo(`src/registry/examples/${name}.tsx`)
  if (!src) return []
  const un = (s) => s.replace(/\\([`$\\"])/g, "$1")
  return [...src.matchAll(/title:\s*"((?:[^"\\]|\\.)*)",\s*(?:description:\s*"((?:[^"\\]|\\.)*)",\s*)?code:\s*`((?:[^`\\]|\\.)*)`/g)].map((m) => ({
    title: un(m[1]),
    description: m[2] ? un(m[2]) : "",
    code: un(m[3]).replace(/@\/registry\/(?:ui|blocks|premium)\//g, "@/components/ui/"),
  }))
}

// ---------- search ----------

function lev(a, b) {
  const d = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = d[0]
    d[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = d[j]
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return d[b.length]
}

/** Returns [termsMatched, score]. Name hits weigh most, then title/keywords, then description; typos within 1-2 edits count. */
function score(it, query) {
  const terms = query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
  const nameParts = it.name.split("-")
  const hay = `${it.title} ${it.keywords.join(" ")} ${it.category ?? ""} ${it.kind}`.toLowerCase()
  const desc = it.description.toLowerCase()
  const words = [...new Set(`${hay} ${desc} ${nameParts.join(" ")}`.split(/[^a-z0-9]+/).filter((w) => w.length > 2))]
  let matched = 0
  let s = it.name === terms.join("-") ? 30 : 0
  for (const raw of terms) {
    const t = raw.length > 3 && raw.endsWith("s") ? raw.slice(0, -1) : raw
    let hit = 0
    if (nameParts.includes(t) || nameParts.includes(raw)) hit = 8
    else if (it.name.includes(t)) hit = 5
    else if (hay.includes(t)) hit = 3
    else if (desc.includes(t)) hit = 1
    else if (t.length >= 4 && words.some((w) => Math.abs(w.length - t.length) <= 2 && lev(w, t) <= (t.length > 6 ? 2 : 1))) hit = 1
    if (hit) matched++
    s += hit
  }
  return [matched, s]
}

// ---------- tools ----------

function arg(args, key, { required = false, pattern, max = 200, values } = {}) {
  const v = args?.[key]
  if (v === undefined || v === null || v === "") {
    if (required) throw new ToolError(`"${key}" is required.`)
    return undefined
  }
  if (typeof v !== "string" || v.length > max) throw new ToolError(`"${key}" must be a string of at most ${max} characters.`)
  const s = v.trim().toLowerCase()
  if (pattern && !pattern.test(s)) throw new ToolError(`"${key}" must match ${pattern} (lowercase letters, digits and hyphens), got "${v}".`)
  if (values && !values.includes(s)) throw new ToolError(`"${key}" must be one of: ${values.join(", ")}.`)
  return s
}

class ToolError extends Error {}

async function findItem(name) {
  const all = await items()
  const it = all.find((i) => i.name === name)
  if (it) return it
  const close = all
    .map((i) => [i.name, i.name.includes(name) ? 0 : lev(i.name, name)])
    .filter(([, d]) => d <= Math.max(2, Math.floor(name.length / 3)))
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5)
    .map(([n]) => n)
  throw new ToolError(`No component named "${name}".${close.length ? ` Did you mean: ${close.join(", ")}?` : ""} Use search_components to find one.`)
}

const line = (it) => `- ${it.name} (${it.kind}${it.category ? `, ${it.category}` : ""}): ${it.description}`

const TOOLS = [
  {
    name: "list_components",
    title: "List MiniDev UI components",
    description:
      "List MiniDev UI components. With no filter, returns every name grouped by kind (ui, block, motion) plus the category names. Filter by `category` (a kind like ui, block, motion, or a category like forms, charts, billing, ai-chat) and/or a substring `query` to get one-line descriptions.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Kind (ui, block, motion) or category (forms, buttons, data-tables, charts, navigation, overlays, feedback, ai-chat, auth, billing, settings, dashboard, marketing, animation, ecommerce, developer-tools, email, layout, media, workflow)." },
        query: { type: "string", description: "Case-insensitive substring matched against name, title and description." },
      },
      additionalProperties: false,
    },
    async run(args) {
      const category = arg(args, "category", { pattern: NAME_RE, max: 64 })
      const query = arg(args, "query")
      const all = await items()
      if (!category && !query) {
        const cats = [...new Set(all.map((i) => i.category).filter(Boolean))].sort()
        const groups = ["ui", "block", "motion"].map((k) => {
          const names = all.filter((i) => i.kind === k).map((i) => i.name)
          return `## ${k} (${names.length})\n${names.join(", ")}`
        })
        return `${all.length} MiniDev UI components.\n\n${groups.join("\n\n")}\n\nCategories: ${cats.join(", ") || "(unavailable)"}\n\nNext: search_components for a need, or get_component for code.`
      }
      const hits = all.filter(
        (i) => (!category || i.kind === category || i.category === category) && (!query || `${i.name} ${i.title} ${i.description}`.toLowerCase().includes(query)),
      )
      if (!hits.length) return `No components match${category ? ` category "${category}"` : ""}${query ? ` query "${query}"` : ""}. Try search_components for fuzzy matching.`
      return `${hits.length} components:\n${hits.map(line).join("\n")}`
    },
  },
  {
    name: "search_components",
    title: "Search MiniDev UI components",
    description:
      'Fuzzy search MiniDev UI components by what you need ("date range picker", "pricing table with yearly toggle", "chat input"). Ranks by name, title, keywords and description and tolerates typos. Returns the best matches with install commands.',
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What you are looking for, in plain words." },
        limit: { type: "integer", minimum: 1, maximum: 50, default: 10 },
      },
      required: ["query"],
      additionalProperties: false,
    },
    async run(args) {
      const query = arg(args, "query", { required: true })
      const limit = Number.isInteger(args?.limit) ? Math.min(Math.max(args.limit, 1), 50) : 10
      const ranked = (await items())
        .map((i) => [i, score(i, query)])
        .filter(([, [m]]) => m > 0)
        .sort((a, b) => b[1][0] - a[1][0] || b[1][1] - a[1][1] || a[0].name.length - b[0].name.length)
        .slice(0, limit)
      if (!ranked.length) return `No components match "${query}". Try fewer or broader words, or list_components.`
      return `Top ${ranked.length} for "${query}":\n${ranked.map(([i]) => `${line(i)}\n  install: npx shadcn@latest add @minidev/${i.name}`).join("\n")}\n\nNext: get_component with the name for source, props and usage.`
    },
  },
  {
    name: "get_component",
    title: "Get a MiniDev UI component",
    description:
      "Get everything needed to use one MiniDev UI component: description, install commands (shadcn CLI and npm), npm and registry dependencies, props, the import line, an example, and the full source file.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", pattern: "^[a-z0-9-]+$", description: 'Registry name, e.g. "button", "data-table", "pricing-plans".' } },
      required: ["name"],
      additionalProperties: false,
    },
    async run(args) {
      const name = arg(args, "name", { required: true, pattern: NAME_RE, max: 64 })
      const it = await findItem(name)
      const json = await readItemJson(name)
      if (!json) throw new ToolError(`Could not load ${SITE}/r/${name}.json. Check your network.`)
      const src = json.files?.[0]?.content ?? ""
      const { all, main } = exportsOf(src, name)
      const props = json.meta?.props ?? safe(() => extractProps(src, main))
      const [example] = await examplesOf(name)
      const regDeps = (json.registryDependencies ?? []).map(depName)
      const out = [
        `# ${main} (${name})`,
        it.description,
        `Kind: ${it.kind}${it.category ? ` · Category: ${it.category}` : ""} · Docs: ${SITE}/docs/${name}`,
        `## Install`,
        "```bash",
        `npx shadcn@latest add @minidev/${name}`,
        `# or: npx shadcn@latest add ${SITE}/r/${name}.json`,
        `# or the npm package (all components): npm i minidev-ui-kit`,
        "```",
        `Writes \`${json.files?.[0]?.target ?? `components/ui/${name}.tsx`}\`. Needs the MiniDev tokens stylesheet once per app (see get_install_instructions).`,
        `npm dependencies: ${(json.dependencies ?? []).join(", ") || "none"}`,
        `Registry dependencies (installed automatically by the shadcn CLI): ${regDeps.join(", ") || "none"}`,
        `## Import`,
        "```tsx",
        `import { ${all.join(", ") || main} } from "@/components/ui/${name}"`,
        `// npm package: import { ${main} } from "minidev-ui-kit/${npmDir(it.kind)}/${name}"`,
        "```",
      ]
      if (props?.props?.length || props?.extends?.length) {
        out.push(`## Props of <${main}>`)
        for (const p of props.props ?? []) out.push(`- \`${p.name}${p.optional ? "?" : ""}: ${p.type}\`${p.default !== undefined ? ` (default \`${p.default}\`)` : ""}${p.doc ? `: ${p.doc}` : ""}`)
        if (props.extends?.length) out.push(`- Also accepts all ${props.extends.join(", ")}.`)
      }
      if (example) out.push(`## Example: ${example.title}`, example.description, "```tsx", example.code, "```", "More: get_example.")
      out.push(`## Source (${json.files?.[0]?.target ?? name})`, "```tsx", src.trimEnd(), "```")
      return out.filter((l) => l !== "").join("\n")
    },
  },
  {
    name: "get_example",
    title: "Get MiniDev UI usage examples",
    description: "Get the documented usage examples (JSX you can paste) for a MiniDev UI component, each with a title and one-line explanation.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", pattern: "^[a-z0-9-]+$", description: "Registry name of the component." } },
      required: ["name"],
      additionalProperties: false,
    },
    async run(args) {
      const name = arg(args, "name", { required: true, pattern: NAME_RE, max: 64 })
      const it = await findItem(name)
      const examples = await examplesOf(name)
      const head = `# Examples for ${it.title} (${name})\nImports use "@/components/ui/<name>" (shadcn layout).`
      if (!examples.length) {
        const json = await readItemJson(name)
        const { all, main } = exportsOf(json?.files?.[0]?.content ?? "", name)
        return `${head}\n\nNo written examples for this component yet. Import it with:\n\`\`\`tsx\nimport { ${all.join(", ") || main} } from "@/components/ui/${name}"\n\`\`\`\nUse get_component for its props and full source, or see ${SITE}/docs/${name}.`
      }
      return `${head}\n\n${examples.map((e) => `## ${e.title}\n${e.description ? `${e.description}\n` : ""}\`\`\`tsx\n${e.code}\n\`\`\``).join("\n\n")}`
    },
  },
  {
    name: "get_design_rules",
    title: "Get MiniDev UI design rules",
    description:
      "Get the MiniDev UI design system rules to follow when writing or editing UI with it: semantic color tokens, shadows, radius and spacing, type, motion and spring presets, materials (hairline, glass, metal, paper) and the five laws. Read this before styling anything.",
    inputSchema: {
      type: "object",
      properties: {
        topic: { type: "string", enum: ["all", "tokens", "materials", "motion", "laws"], default: "all", description: "Narrow to one area." },
      },
      additionalProperties: false,
    },
    async run(args) {
      const topic = arg(args, "topic", { values: ["all", "tokens", "materials", "motion", "laws"] }) ?? "all"
      const pick = {
        tokens: /colour tokens|depth|geometry|type/i,
        materials: /light and material|material law/i,
        motion: /motion|spring/i,
        laws: /five laws|material law|never|designer test/i,
      }[topic]
      const docs = (await Promise.all([readRepo("DESIGN.md"), readRepo("docs/VISION.md")])).filter(Boolean)
      const sections = docs.flatMap((d) => d.split(/\n(?=## )/).filter((s) => s.startsWith("## ")))
      const body = (pick ? sections.filter((s) => pick.test(s.split("\n")[0])) : sections).join("\n\n")
      return `${CORE_RULES}\n\n${body || "(Full design docs unavailable offline; the rules above are the essentials.)"}`
    },
  },
  {
    name: "get_install_instructions",
    title: "Get MiniDev UI install steps",
    description: "Step-by-step setup of MiniDev UI in a Next.js, Vite or Remix (React Router v7) app: Tailwind v4, shadcn init, the tokens stylesheet, fonts, dark mode, and adding components. Method `shadcn` (copy source into your repo, default) or `npm` (the minidev-ui-kit package).",
    inputSchema: {
      type: "object",
      properties: {
        framework: { type: "string", enum: ["next", "vite", "remix"] },
        method: { type: "string", enum: ["shadcn", "npm"], default: "shadcn" },
      },
      required: ["framework"],
      additionalProperties: false,
    },
    async run(args) {
      const framework = arg(args, "framework", { required: true, values: ["next", "vite", "remix"] })
      const method = arg(args, "method", { values: ["shadcn", "npm"] }) ?? "shadcn"
      return installGuide(framework, method)
    },
  },
]

const safe = (fn) => {
  try {
    return fn()
  } catch {
    return null
  }
}

// shortcut: the essentials of DESIGN.md / llms.txt "Rules for generating code", duplicated so offline agents still get them; update with DESIGN.md.
const CORE_RULES = `# MiniDev UI rules for generated code
- Semantic tokens only: bg-bg, bg-surface, bg-raised, bg-sunken, border-border, border-border-strong, text-fg, text-fg-muted, text-fg-subtle, bg-ink/text-on-ink, bg-accent/text-on-accent, bg-accent-soft, text-accent-fg, success, warning, danger, info. Never hex, never palette steps like blue-500, never bg-white/bg-black, no opacity variants on surfaces (bg-surface/80).
- Primary action: <Button> (ink). Brand action: <Button variant="accent">. Secondary: variant="outline". Quiet: variant="ghost".
- Depth only from: shadow-xs, shadow-sm, shadow-raised (cards), shadow-key, shadow-ink, shadow-md, shadow-lg, shadow-overlay (menus, dialogs). No hand-written shadow-[...]. Never backdrop-blur on surfaces.
- Radius: controls rounded-lg, cards rounded-xl, overlays rounded-2xl. Nested radius = outer minus padding.
- Sizes on the 2px grid (even numbers). Controls 28/32/36/44/48px. Numbers use tabular-nums.
- Motion: springs from the presets (snappy, morph, roll, release, data), exits faster than entrances, respect prefers-reduced-motion. Hover changes one property; press sinks 0.5px, never scales.
- Dark mode: the \`dark\` class on <html>; components never branch on theme. Materials: data-material="hairline|glass|metal|paper" on <html> or any element.
- Every component is fully keyboard and screen-reader accessible; keep labels, roles and focus rings.`

function installGuide(fw, method) {
  const f = {
    next: { name: "Next.js (App Router)", create: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app", css: "app/globals.css", dir: "app", alias: "@/components/ui", out: "components/ui", guide: "nextjs" },
    vite: { name: "Vite + React", create: "npm create vite@latest my-app -- --template react-ts", css: "src/index.css", dir: "src", alias: "@/components/ui", out: "src/components/ui", guide: "vite" },
    remix: { name: "Remix (React Router v7 framework mode; Remix merged into React Router)", create: "npx create-react-router@latest my-app", css: "app/app.css", dir: "app", alias: "~/components/ui", out: "app/components/ui", guide: "react-router" },
  }[fw]
  const steps = [`# Install MiniDev UI in ${f.name} (${method})`, `Full guide: ${SITE}/docs/installation/${f.guide}`, `## 1. Create the app (skip for an existing one)`, "```bash", f.create, "```"]
  if (fw === "vite")
    steps.push(
      `## 2. Tailwind CSS v4 and the @ alias`,
      "```bash\nnpm install tailwindcss @tailwindcss/vite\nnpm install -D @types/node\n```",
      'Replace `src/index.css` with `@import "tailwindcss";`. Add `"baseUrl": ".", "paths": { "@/*": ["./src/*"] }` to compilerOptions in both `tsconfig.json` and `tsconfig.app.json`. Then `vite.config.ts`:',
      '```ts\nimport path from "path"\nimport tailwindcss from "@tailwindcss/vite"\nimport react from "@vitejs/plugin-react"\nimport { defineConfig } from "vite"\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },\n})\n```',
    )
  else if (fw === "next") steps.push(`## 2. Tailwind CSS v4`, "The --tailwind flag sets up Tailwind v4 with `@tailwindcss/postcss`. Existing app: `npm install tailwindcss @tailwindcss/postcss postcss` and add `\"@tailwindcss/postcss\": {}` to `postcss.config.mjs` plugins. Keep the `@/*` alias.")
  else steps.push(`## 2. Tailwind CSS v4`, "The template ships Tailwind v4 via `@tailwindcss/vite` and the `~/*` alias via `vite-tsconfig-paths`. Older projects: `npm install tailwindcss @tailwindcss/vite` and add `tailwindcss()` before `reactRouter()` in `vite.config.ts`.")

  if (method === "npm") {
    steps.push(
      `## 3. Install the package`,
      "```bash\nnpm i minidev-ui-kit @base-ui/react class-variance-authority clsx tailwind-merge lucide-react motion\n```",
      `## 4. Styles: \`${f.css}\``,
      '```css\n@import "tailwindcss";\n@import "minidev-ui-kit/styles.css";\n@source "../node_modules/minidev-ui-kit";\n```',
      `Adjust the @source path so it points from \`${f.css}\` to node_modules.`,
    )
    if (fw === "next") steps.push('Add `transpilePackages: ["minidev-ui-kit"]` to `next.config.ts`.')
    steps.push(`## 5. Use it`, "```tsx", 'import { Button } from "minidev-ui-kit/ui/button"', 'import { PricingPlans } from "minidev-ui-kit/blocks/pricing-plans"', "```", "Paths: minidev-ui-kit/ui/<name>, /blocks/<name>, /premium/<name> (motion components). get_component shows the exact path.")
  } else {
    steps.push(
      `## 3. shadcn init`,
      "```bash\nnpx shadcn@latest init\n```",
      `## 4. The MiniDev tokens stylesheet`,
      "```bash",
      `curl -o ${f.dir}/minidev.css ${SITE}/r/styles.css`,
      "```",
      `Reduce \`${f.css}\` to imports, MiniDev after Tailwind:`,
      '```css\n@import "tailwindcss";\n/* keep other @import lines init added, such as tw-animate-css */\n@import "./minidev.css";\n```',
      "Delete the `:root`, `.dark` and `@theme inline` blocks that shadcn init generated: they override MiniDev's tokens and turn the accent gray. MiniDev already maps every shadcn variable name, so stock shadcn components keep working. Remove the duplicate `@custom-variant dark` line too.",
      `## 5. Add components`,
      "```bash\nnpx shadcn@latest add @minidev/button\nnpx shadcn@latest add @minidev/pricing-plans\n```",
      `Files land in \`${f.out}\`; registry dependencies install automatically.`,
      `## 6. Use it`,
      "```tsx",
      `import { Button } from "${f.alias}/button"`,
      "",
      '<Button variant="accent">Start free</Button>',
      "```",
    )
  }
  steps.push(
    `## Fonts, dark mode, light`,
    fw === "next"
      ? "Fonts read `--font-geist-sans` / `--font-geist-mono`, which the create-next-app layout sets through next/font (Geist)."
      : 'Load Geist (Google Fonts `family=Geist:wght@100..900&family=Geist+Mono:wght@100..900`) and set `:root { --font-geist-sans: "Geist", ui-sans-serif, system-ui, sans-serif; --font-geist-mono: "Geist Mono", ui-monospace, monospace; }`.',
    "Dark mode follows a `dark` class on `<html>` (set it before paint to avoid a flash). Optional: `data-material=\"glass|metal|paper\"` on `<html>`; `npx shadcn@latest add @minidev/light-provider` and render `<LightProvider />` once so shadows follow the pointer.",
    "Before writing UI, call get_design_rules.",
  )
  return steps.join("\n")
}

// ---------- JSON-RPC dispatch ----------

const INSTRUCTIONS = `MiniDev UI: 500+ free React + Tailwind v4 components on Base UI, shadcn compatible. Workflow: search_components (or list_components) to find a component, get_component for its source, props and install command, get_example for usage, get_design_rules before styling, get_install_instructions to set up a new app. Install any component with \`npx shadcn@latest add @minidev/<name>\`. Use semantic tokens only (bg-surface, text-fg-muted, shadow-raised), never hex or palette colors.`

const reply = (id, result) => ({ jsonrpc: "2.0", id, result })
export const fail = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } })

/** Handle one JSON-RPC message. Resolves to the response object, or null for notifications and responses. */
export async function handle(msg) {
  if (!msg || typeof msg !== "object" || Array.isArray(msg) || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    if (msg && typeof msg === "object" && ("result" in msg || "error" in msg)) return null // a response to us; we send no requests
    return fail(msg?.id ?? null, -32600, "Invalid Request")
  }
  const { id, method, params } = msg
  const isNotification = id === undefined
  if (isNotification) return null // notifications/initialized, notifications/cancelled: nothing to do
  switch (method) {
    case "initialize": {
      const asked = params?.protocolVersion
      return reply(id, {
        protocolVersion: PROTOCOLS.includes(asked) ? asked : PROTOCOLS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "minidev-ui", title: "MiniDev UI", version: VERSION },
        instructions: INSTRUCTIONS,
      })
    }
    case "ping":
      return reply(id, {})
    case "tools/list":
      return reply(id, {
        tools: TOOLS.map(({ name, title, description, inputSchema }) => ({ name, title, description, inputSchema, annotations: { title, readOnlyHint: true, openWorldHint: true } })),
      })
    case "tools/call": {
      const tool = TOOLS.find((t) => t.name === params?.name)
      if (!tool) return fail(id, -32602, `Unknown tool: ${params?.name}`)
      if (params.arguments !== undefined && (typeof params.arguments !== "object" || params.arguments === null || Array.isArray(params.arguments)))
        return fail(id, -32602, "arguments must be an object")
      try {
        return reply(id, { content: [{ type: "text", text: await tool.run(params.arguments ?? {}) }], isError: false })
      } catch (e) {
        if (!(e instanceof ToolError)) console.error(`[minidev-ui-mcp] ${tool.name}:`, e)
        return reply(id, { content: [{ type: "text", text: e?.message ?? String(e) }], isError: true })
      }
    }
    default:
      return fail(id, -32601, `Method not found: ${method}`)
  }
}

