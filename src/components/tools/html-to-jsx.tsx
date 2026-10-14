"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { Switch } from "@/registry/ui/switch"
import { CodeBlock } from "@/registry/ui/code-block"
import { attrToJsx, serializeNode, styleToJsx, useIsClient, type SerializeContext } from "./svg-to-jsx"

/*
 * HTML to JSX. Parsed with the browser's HTML parser (DOMParser, nothing is
 * rendered or executed), then serialised to JSX with React's attribute names.
 */

export type HtmlOptions = {
  /** Wrap the JSX in an exported function component. */
  wrap: boolean
  name: string
}

export type HtmlResult = {
  code: string
  error?: string
  notes: string[]
  stats: { elements: number; attributes: number }
}

/** Attributes React treats as booleans. Written bare when present. */
export const BOOLEAN_ATTRS = new Set(
  "allowfullscreen async autofocus autoplay checked controls default defer disabled formnovalidate hidden inert ismap itemscope loop multiple muted nomodule novalidate open playsinline readonly required reversed selected".split(" "),
)

/** Text-like inline elements: whitespace between two of them renders, so it is kept. */
const TEXT_INLINE = new Set("a abbr b bdi bdo cite code data dfn em i kbd mark q rp rt ruby s samp small span strong sub sup time u var".split(" "))
/** Elements that may share a line with text when the result is short. */
const INLINE = new Set([...TEXT_INLINE, "br", "wbr", "img", "input", "label", "button", "select", "option", "textarea"])
const RAW = new Set(["style", "pre", "script"])
const SELF_CLOSE = new Set(["textarea"])

/** Converts parsed top-level nodes (elements, comments, text) to JSX. */
export function nodesToJsx(roots: Node[], o: HtmlOptions): HtmlResult {
  const notes = new Set<string>()
  const stats = { elements: 0, attributes: 0 }
  const ctx: SerializeContext = {
    numeric: false,
    inlineTags: INLINE,
    spaceTags: TEXT_INLINE,
    rawTags: RAW,
    selfClose: SELF_CLOSE,
    notes,
    stats,
    extra: (el) => {
      if (el.localName === "textarea" && el.textContent?.trim()) {
        notes.add("Moved <textarea> content into defaultValue, which is how React sets the initial text.")
        return [`defaultValue=${JSON.stringify(el.textContent)}`]
      }
      return []
    },
    keep: (el) => {
      if (el.localName === "script") {
        notes.add("Removed <script> elements. React does not run inline scripts; move that logic into the component.")
        return false
      }
      return true
    },
    attr: (el, name, value) => {
      const lower = name.toLowerCase()
      const tag = el.localName.toLowerCase()
      if (/^on[a-z]/.test(lower)) {
        notes.add(`Removed inline event handlers such as ${lower}. Attach them as props, for example onClick={handleClick}.`)
        return null
      }
      if (lower === "style") {
        const expr = styleToJsx(value)
        return expr ? { name: "style", value: { expr } } : null
      }
      if ((tag === "input" || tag === "textarea" || tag === "select") && lower === "value") {
        notes.add("Changed value to defaultValue on form fields so the input stays editable (uncontrolled). Use value with onChange for a controlled field.")
        return { name: "defaultValue", value }
      }
      if (tag === "input" && lower === "checked") {
        notes.add("Changed checked to defaultChecked so the input stays uncontrolled.")
        return { name: "defaultChecked", value: { bare: true } }
      }
      if (BOOLEAN_ATTRS.has(lower) && (value === "" || value.toLowerCase() === lower)) return { name: attrToJsx(name), value: { bare: true } }
      return { name: attrToJsx(name), value }
    },
  }
  const depth = o.wrap ? 2 : 0
  let lines: string[]
  if (roots.length === 1 && roots[0].nodeType === 1) lines = serializeNode(roots[0], depth, ctx)
  else {
    const pad = "  ".repeat(depth)
    lines = [`${pad}<>`]
    roots.forEach((r, i) => lines.push(...serializeNode(r, depth + 1, ctx, roots[i - 1], roots[i + 1])))
    lines.push(`${pad}</>`)
  }
  const name = /^[A-Z][\w$]*$/.test(o.name) ? o.name : "Component"
  const code = o.wrap ? `export function ${name}() {\n  return (\n${lines.join("\n")}\n  )\n}\n` : lines.join("\n") + "\n"
  return { code, notes: Array.from(notes), stats }
}

const isComment = (n: Node) => n.nodeType === 8
const hasContent = (n: Node) => n.nodeType === 1 || isComment(n) || (n.nodeType === 3 && !!n.textContent?.trim())

/** Parses HTML and converts it to JSX. Browser only (uses DOMParser). */
export function htmlToJsx(src: string, o: HtmlOptions): HtmlResult {
  const text = src.trim()
  const empty = { code: "", notes: [], stats: { elements: 0, attributes: 0 } }
  if (!text) return empty
  const doc = new DOMParser().parseFromString(text, "text/html")
  const whole = /<\s*(html|head|body)[\s>]/i.test(text)
  // The HTML parser files leading comments on the document, head content in <head>, and trailing comments on <html>.
  const roots: Node[] = whole
    ? [doc.documentElement]
    : [
        ...Array.from(doc.childNodes).filter(isComment),
        ...Array.from(doc.head.childNodes).filter(hasContent),
        ...Array.from(doc.body.childNodes).filter(hasContent),
        ...Array.from(doc.documentElement.childNodes).filter(isComment),
      ]
  if (!roots.some((n) => n.nodeType === 1)) return { ...empty, error: "No elements found. Paste some HTML tags, for example <div class=\"card\">...</div>." }
  return nodesToJsx(roots, o)
}

/* ----------------------------------- UI ----------------------------------- */

const SAMPLE = `<!-- Pricing card -->
<section class="card" id="pro" style="padding: 24px; border-radius: 12px; --accent: #7c5cff">
  <h2 class="title">Lumen&nbsp;Pro</h2>
  <p>Everything in Starter, plus <strong>unlimited</strong> workspaces &amp; priority support.</p>
  <img src="/img/lumen-pro.png" alt="Lumen Pro" width="320" loading="lazy">
  <form action="/checkout" method="post">
    <label for="seats">Seats</label>
    <input id="seats" type="number" name="seats" value="5" min="1" required>
    <label><input type="checkbox" name="annual" checked> Bill annually</label>
    <button type="submit" class="btn btn-primary" onclick="track('buy')" disabled>Buy now</button>
  </form>
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>
</section>`

export function HtmlToJsx() {
  const client = useIsClient()
  const [src, setSrc] = React.useState(SAMPLE)
  const [wrap, setWrap] = React.useState(true)
  const [name, setName] = React.useState("PricingCard")
  const result = React.useMemo<HtmlResult | null>(() => (client ? htmlToJsx(src, { wrap, name: name.trim() }) : null), [client, src, wrap, name])
  const empty = !src.trim()
  const validName = /^[A-Z][\w$]*$/.test(name.trim())
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="html-in" className="text-[13px] font-medium text-fg">HTML</label>
            <button type="button" onClick={() => setSrc(SAMPLE)} className="text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Load example</button>
          </div>
          <Textarea id="html-in" value={src} onChange={(e) => setSrc(e.target.value)} rows={16} spellCheck={false} placeholder="Paste HTML here" className="mt-2 min-h-[320px] font-mono text-[12.5px] leading-[1.6]" aria-invalid={!!result?.error} />
          <p className={result?.error ? "mt-2 text-[12.5px] text-danger" : "mt-2 text-[12.5px] text-fg-muted"} aria-live="polite">
            {empty ? "Paste some HTML to convert it." : result?.error ? result.error : result ? `Converted ${result.stats.elements} elements and ${result.stats.attributes} attributes.` : "Converting..."}
          </p>
        </div>
        <div className="space-y-4 self-start rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <Switch size="sm" label="Wrap in a component" description="Export a function that returns the JSX" checked={wrap} onCheckedChange={setWrap} />
          <div className="space-y-2">
            <label htmlFor="html-name" className="text-[13px] font-medium text-fg">Component name</label>
            <Input id="html-name" value={name} onChange={(e) => setName(e.target.value)} className="font-mono" spellCheck={false} disabled={!wrap} aria-invalid={wrap && !validName} />
          </div>
          <ul className="space-y-1.5 text-[12.5px] leading-[1.5] text-fg-muted">
            <li>class becomes className, for becomes htmlFor</li>
            <li>style strings become objects</li>
            <li>Boolean attributes are written bare</li>
            <li>Void tags self-close, comments become {"{/* */}"}</li>
            <li>SVG attributes are camelCased</li>
          </ul>
        </div>
      </div>
      {result?.notes.length ? (
        <ul className="space-y-1 rounded-xl border border-border bg-sunken px-4 py-3 text-[12.5px] text-fg-muted">
          {result.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ) : null}
      <CodeBlock language="tsx" filename={wrap ? `${validName ? name.trim() : "Component"}.tsx` : "snippet.jsx"} code={result?.code || `// ${empty ? "Paste HTML above to see the JSX." : result?.error ? "Fix the input to see the JSX." : "Converting..."}\n`} />
    </div>
  )
}
