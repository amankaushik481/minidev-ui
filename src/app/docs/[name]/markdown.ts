import { readFileSync } from "node:fs"
import { join } from "node:path"
import { COMPONENT_INDEX, type ComponentIndexEntry } from "@/lib/component-index"
import { COMPONENT_PROPS } from "@/lib/component-props"
import { componentsInCategory } from "@/content/component-seo"
import { componentDocs } from "@/content/component-docs"
import { componentCopy, humanTitle } from "@/lib/seo-routes"
import { SITE } from "@/lib/site"

/** Where the markdown twin of a docs page is served. `/docs/<name>.md` redirects here. */
export const mdPath = (name: string) => `/docs/${name}/md`

/** Up to six components: the ones named in the JSDoc first, then the same category, same kind first. Shared by the page and its markdown. */
export function relatedTo(entry: ComponentIndexEntry) {
  const category = componentCopy(entry).category
  const sameCategory = category
    ? componentsInCategory(category.id)
        .map((n) => COMPONENT_INDEX.find((c) => c.name === n))
        .filter((c): c is ComponentIndexEntry => Boolean(c))
        .sort((a, b) => Number(b.kind === entry.kind) - Number(a.kind === entry.kind))
        .map((c) => c.name)
    : []
  return [...new Set([...(entry.related ?? []), ...sameCategory])]
    .filter((n) => n !== entry.name)
    .map((n) => COMPONENT_INDEX.find((c) => c.name === n))
    .filter((c): c is ComponentIndexEntry => Boolean(c))
    .slice(0, 6)
}

/** Read a repo file at build time; the routes that call this are prerendered, so nothing reads disk per request. */
function readRepo(path: string) {
  try {
    // Build-time only: keep the tracer from bundling the whole repo into the server output.
    return readFileSync(join(/*turbopackIgnore: true*/ process.cwd(), path), "utf8")
  } catch {
    return ""
  }
}

/** Every name the component file exports, so an agent imports the parts (AccordionItem, buttonVariants...) by their real names. */
export function exportedNames(entry: ComponentIndexEntry): string[] {
  const src = readRepo(entry.path)
  const names = new Set<string>()
  for (const m of src.matchAll(/^export\s+(?:async\s+)?(?:function|const|class)\s+([A-Za-z_]\w*)/gm)) names.add(m[1])
  for (const m of src.matchAll(/^export\s*\{([^}]+)\}/gm))
    for (const part of m[1].split(",")) {
      const n = part.trim().replace(/^type\s+/, "").split(/\s+as\s+/).pop()?.trim()
      if (n && !part.trim().startsWith("type ")) names.add(n)
    }
  return [...names]
}

/** The live examples' title, description and code, lifted from the example file's source text.
 * shortcut: regex over `title: "..", description: "..", code: \`..\`` literals; if an example file stops using that shape, parse it with TypeScript instead. */
export function exampleSources(name: string): { title: string; description?: string; code: string }[] {
  const src = readRepo(`src/registry/examples/${name}.tsx`)
  const out: { title: string; description?: string; code: string }[] = []
  const str = String.raw`"((?:[^"\\]|\\.)*)"`
  const re = new RegExp(String.raw`title:\s*${str},\s*(?:description:\s*${str},\s*)?code:\s*` + "`((?:[^`\\\\]|\\\\.)*)`", "g")
  for (const m of src.matchAll(re)) {
    const code = m[3].replace(/\\([`$\\])/g, "$1")
    out.push({ title: JSON.parse(`"${m[1]}"`), description: m[2] ? JSON.parse(`"${m[2]}"`) : undefined, code })
  }
  return out
}

const NAME_BY_TITLE = new Map(COMPONENT_INDEX.map((c) => [c.title, c.name]))

/** Links the first backticked mention of each other component (`Tabs` -> [`Tabs`](/docs/tabs)) so the prose doubles as a map. */
export function linkComponentNames(text: string, self: string): string {
  const seen = new Set<string>()
  return text.replace(/`([A-Z][A-Za-z0-9]*)`/g, (all, title: string) => {
    const name = NAME_BY_TITLE.get(title)
    if (!name || name === self || seen.has(name)) return all
    seen.add(name)
    return `[\`${title}\`](/docs/${name})`
  })
}

/** The usage snippet the page and the markdown both show. */
export function usageSnippet(entry: ComponentIndexEntry) {
  const body = entry.usage ? entry.usage.split("\n").map((l) => "    " + l).join("\n") : `    <${entry.title} />`
  return `import { ${entry.title} } from "@/components/ui/${entry.name}"\n\nexport function Example() {\n  return (\n${body}\n  )\n}`
}

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ")
/** Site-relative links in content become absolute, so the Markdown works outside the site. */
const absLinks = (s: string) => s.replace(/\]\(\//g, `](${SITE.url}/`)
const fence = (lang: string, code: string) => "```" + lang + "\n" + code + "\n```"

/** One component's docs as Markdown: what an agent needs to install it and write correct code on the first try. */
export function componentMarkdown(entry: ComponentIndexEntry): string {
  const copy = componentCopy(entry)
  const url = (p: string) => `${SITE.url}${p}`
  const kind = entry.kind === "ui" ? "Component" : entry.kind === "block" ? "Block" : "Motion component"
  const pkgPath = entry.import.replace("@/registry/", `${SITE.npmPackage}/`)
  const exports = exportedNames(entry)
  const props = COMPONENT_PROPS[entry.name]
  const examples = exampleSources(entry.name)
  const related = relatedTo(entry)
  const docs = componentDocs(entry.name)
  const L: string[] = []

  L.push(`# ${copy.name}`, "", `> ${copy.description}`, "")
  L.push(
    `- Kind: ${kind}${copy.category ? ` (${copy.category.label})` : ""}`,
    `- Docs: ${url(`/docs/${entry.name}`)}`,
    `- Source (registry JSON with the full file): ${url(`/r/${entry.name}.json`)}`,
    `- License: MIT. One file, yours to edit after install.`,
    "",
  )

  if (entry.guide) L.push("## When to use", "", absLinks(linkComponentNames(entry.guide, entry.name)), "")

  L.push("## Installation", "", "### shadcn CLI (copies the source into your project)", "", fence("bash", `npx shadcn@latest add ${SITE.registry}/${entry.name}`), "")
  L.push(`Writes \`components/ui/${entry.name}.tsx\`${entry.registryDeps.length ? ` plus the MiniDev files it is built from (${entry.registryDeps.join(", ")})` : ""} and installs its npm dependencies. Older CLI versions: \`npx shadcn@latest add ${url(`/r/${entry.name}.json`)}\`.`, "")
  L.push("### npm package", "", fence("bash", `npm i ${SITE.npmPackage}${entry.deps.length ? " " + entry.deps.join(" ") : ""}`), "")
  L.push("Add the tokens to your global stylesheet once:", "", fence("css", `@import "tailwindcss";\n@import "${SITE.npmPackage}/styles.css";\n@source "../node_modules/${SITE.npmPackage}";`), "")
  L.push(`Next.js also needs \`transpilePackages: ["${SITE.npmPackage}"]\` in next.config.`, "")

  L.push("## Import", "", "After the shadcn install:", "", fence("tsx", `import { ${exports.length ? exports.join(", ") : entry.title} } from "@/components/ui/${entry.name}"`), "")
  L.push("From the npm package:", "", fence("tsx", `import { ${entry.title} } from "${pkgPath}"`), "")

  L.push("## Usage", "", fence("tsx", usageSnippet(entry)), "")

  L.push("## Props", "")
  if (props && props.props.length) {
    L.push("| Prop | Type | Default | Required | Description |", "| --- | --- | --- | --- | --- |")
    for (const p of props.props)
      L.push(`| \`${p.name}\` | \`${cell(p.type)}\` | ${p.default ? `\`${cell(p.default)}\`` : "-"} | ${p.optional ? "no" : "yes"} | ${p.doc ? cell(p.doc) : ""} |`)
    L.push("")
  }
  if (props && props.extends.length) L.push(`Also accepts every prop of ${props.extends.map((e) => `\`${e}\``).join(", ")}, passed through to the root element.`, "")
  if (!props || (!props.props.length && !props.extends.length))
    L.push(`${entry.title} takes no props. It ships with realistic sample content: install it, then edit the copy and data in the file directly.`, "")

  if (examples.length) {
    L.push("## Examples", "")
    for (const ex of examples) L.push(`### ${ex.title}`, "", ...(ex.description ? [ex.description, ""] : []), fence("tsx", ex.code), "")
  }

  if (docs?.keyboard?.length) {
    L.push("## Keyboard interactions", "", "| Key | Action |", "| --- | --- |")
    for (const k of docs.keyboard) L.push(`| ${k.keys.split(" / ").map((x) => `\`${x}\``).join(" or ")} | ${cell(absLinks(k.action))} |`)
    L.push("")
  }

  L.push("## Accessibility", "")
  if (docs?.a11y?.length) for (const a of docs.a11y) L.push(`- ${absLinks(a)}`)
  else {
    if (entry.deps.includes("@base-ui/react"))
      L.push("- Built on Base UI primitives, which provide the ARIA roles, keyboard interaction and focus management. Keep the exported parts together so that wiring stays intact.")
    L.push("- Focus is always visible (a ring on the accent token). Give icon-only controls an `aria-label`.")
    L.push("- Colours come from semantic tokens, so light and dark mode work without extra classes.")
    if (entry.kind === "premium") L.push("- Motion respects `prefers-reduced-motion`.")
  }
  L.push("")

  if (docs?.faq?.length) {
    L.push("## FAQ", "")
    for (const f of docs.faq) L.push(`### ${f.q}`, "", absLinks(f.a), "")
  }

  L.push("## Rules for generating code", "")
  L.push(
    "- Use semantic tokens only (bg, surface, sunken, border, fg, fg-muted, fg-subtle, ink, accent, success, warning, danger). Never raw hex or palette steps like blue-500.",
    "- Shadows only from the set: shadow-xs, shadow-sm, shadow-raised, shadow-md, shadow-lg, shadow-overlay.",
    "- Numbers use tabular-nums. Dark mode is the `dark` class on <html>; components never branch on theme.",
    "",
  )

  if (entry.deps.length || entry.registryDeps.length) {
    L.push("## Dependencies", "")
    if (entry.deps.length) L.push(`- npm: ${entry.deps.map((d) => `\`${d}\``).join(", ")}`)
    if (entry.registryDeps.length) L.push(`- Built from: ${entry.registryDeps.map((d) => `[${d}](${url(mdPath(d))})`).join(", ")}`)
    L.push("")
  }

  if (related.length) {
    L.push("## Related", "")
    for (const r of related) L.push(`- [${humanTitle(r.title)}](${url(mdPath(r.name))}): ${componentCopy(r).description}`)
    L.push("")
  }

  L.push("---", "", `All ${COMPONENT_INDEX.length} components: ${url("/llms.txt")} (full text: ${url("/llms-full.txt")}).`, "")
  return L.join("\n")
}
