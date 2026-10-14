"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { Switch } from "@/registry/ui/switch"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"

/*
 * SVG to JSX. The markup is parsed with the browser's DOMParser (nothing is
 * executed or inserted into the page) and serialised to JSX by hand. The
 * helpers below are pure and shared with the HTML to JSX tool.
 */

export const SVG_NS = "http://www.w3.org/2000/svg"
export const XHTML_NS = "http://www.w3.org/1999/xhtml"

/** Lower-case attribute names React spells differently. */
const RENAMED: Record<string, string> = {
  class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly", maxlength: "maxLength", minlength: "minLength",
  colspan: "colSpan", rowspan: "rowSpan", autocomplete: "autoComplete", autofocus: "autoFocus", autoplay: "autoPlay", autocapitalize: "autoCapitalize",
  autocorrect: "autoCorrect", enctype: "encType", novalidate: "noValidate", formnovalidate: "formNoValidate", formaction: "formAction",
  formenctype: "formEncType", formmethod: "formMethod", formtarget: "formTarget", accesskey: "accessKey", contenteditable: "contentEditable",
  crossorigin: "crossOrigin", datetime: "dateTime", frameborder: "frameBorder", srcset: "srcSet", spellcheck: "spellCheck",
  allowfullscreen: "allowFullScreen", cellpadding: "cellPadding", cellspacing: "cellSpacing", charset: "charSet", inputmode: "inputMode",
  itemprop: "itemProp", itemscope: "itemScope", itemtype: "itemType", itemid: "itemID", itemref: "itemRef", playsinline: "playsInline",
  referrerpolicy: "referrerPolicy", usemap: "useMap", hreflang: "hrefLang", marginheight: "marginHeight", marginwidth: "marginWidth",
  mediagroup: "mediaGroup", radiogroup: "radioGroup", controlslist: "controlsList", fetchpriority: "fetchPriority", enterkeyhint: "enterKeyHint",
  popovertarget: "popoverTarget", popovertargetaction: "popoverTargetAction", nomodule: "noModule", srcdoc: "srcDoc", srclang: "srcLang",
  keytype: "keyType", keyparams: "keyParams", classid: "classID", dirname: "dirName", imagesizes: "imageSizes", imagesrcset: "imageSrcSet",
  "http-equiv": "httpEquiv", "accept-charset": "acceptCharset", "xmlns:xlink": "xmlnsXlink",
}

/** Hyphenated SVG attributes React expects in camelCase (from React's attribute table). */
const HYPHENATED = new Set(
  (
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters " +
    "color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size " +
    "font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical " +
    "horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position " +
    "overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position " +
    "strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width " +
    "text-anchor text-decoration text-rendering transform-origin underline-position underline-thickness unicode-bidi unicode-range units-per-em " +
    "v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height"
  ).split(" "),
)

const camel = (s: string) => s.replace(/[-:]([a-z0-9])/g, (_, c: string) => c.toUpperCase())

/** Converts an HTML or SVG attribute name to its JSX prop name. Unknown names are kept as they are. */
export function attrToJsx(name: string): string {
  const lower = name.toLowerCase()
  if (RENAMED[lower]) return RENAMED[lower]
  if (lower.startsWith("data-") || lower.startsWith("aria-")) return lower
  if (lower.startsWith("xlink:") || lower.startsWith("xml:")) return camel(lower)
  if (HYPHENATED.has(lower)) return camel(lower)
  return name
}

/** CSS property name to a React style key: stroke-width to strokeWidth, -webkit-mask to WebkitMask, custom properties untouched. */
export function cssPropToJs(prop: string): string {
  const p = prop.trim()
  if (p.startsWith("--")) return p
  if (p.startsWith("-")) {
    const [, vendor, ...rest] = p.split("-")
    const head = vendor === "ms" ? "ms" : vendor.charAt(0).toUpperCase() + vendor.slice(1)
    return head + rest.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
  }
  return camel(p.toLowerCase())
}

/** Splits a declaration list on semicolons that are not inside quotes or parentheses. */
export function splitDeclarations(style: string): string[] {
  const out: string[] = []
  let depth = 0
  let quote = ""
  let cur = ""
  for (const ch of style) {
    if (quote) {
      cur += ch
      if (ch === quote) quote = ""
      continue
    }
    if (ch === '"' || ch === "'") quote = ch
    else if (ch === "(") depth++
    else if (ch === ")") depth = Math.max(0, depth - 1)
    if (ch === ";" && depth === 0) {
      out.push(cur)
      cur = ""
      continue
    }
    cur += ch
  }
  if (cur.trim()) out.push(cur)
  return out
}

/** Turns a style attribute into a JSX style expression such as `{{ fill: "red", strokeWidth: 2 }}`. Returns null when empty. */
export function styleToJsx(style: string, mapValue?: (prop: string, value: string) => string): string | null {
  const entries: string[] = []
  for (const d of splitDeclarations(style)) {
    const i = d.indexOf(":")
    if (i < 0) continue
    const prop = d.slice(0, i).trim()
    let value = d.slice(i + 1).trim().replace(/\s*!important$/i, "")
    if (!prop || !value) continue
    if (mapValue) value = mapValue(prop.toLowerCase(), value)
    const js = cssPropToJs(prop)
    const key = /^[A-Za-z_$][\w$]*$/.test(js) ? js : JSON.stringify(js)
    const v = /^-?(\d+\.?\d*|\.\d+)$/.test(value) ? value : JSON.stringify(value)
    entries.push(`${key}: ${v}`)
  }
  return entries.length ? `{{ ${entries.join(", ")} }}` : null
}

/** Escapes text for a JSX child: entities are re-encoded so the output reads back exactly. */
export function escapeJsxText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;").replace(/ /g, "&nbsp;")
}

/** Formats one JSX attribute. Plain numbers become expressions when `numeric` is set (the SVGR convention). */
export function jsxAttr(name: string, value: string, numeric = false): string {
  if (numeric && /^-?(\d+\.?\d*|\.\d+)$/.test(value)) return `${name}={${value}}`
  if (!/["\n\r]/.test(value)) return `${name}="${value.replace(/&/g, "&amp;")}"`
  return `${name}={${JSON.stringify(value)}}`
}

export type AttrResult = { name: string; value: string | { expr: string } | { bare: true } } | null

export type SerializeContext = {
  /** Number-looking attribute values become `{n}`. */
  numeric: boolean
  /** Elements whose children are laid out on one line when short. */
  inlineTags: Set<string>
  /** Elements between which whitespace-only text is kept as `{" "}`. Defaults to inlineTags. */
  spaceTags?: Set<string>
  /** Elements whose text is kept verbatim as a string expression. */
  rawTags: Set<string>
  /** Elements always written self-closed, children ignored (the `extra` hook can lift them into props). */
  selfClose?: Set<string>
  /** Set while inside a raw element: text nodes are emitted verbatim. */
  verbatim?: boolean
  /** Maps or drops an attribute. */
  attr: (el: Element, name: string, value: string) => AttrResult
  /** Return false to drop an element and its subtree. */
  keep: (el: Element) => boolean
  /** Extra JSX attributes appended to an element, such as `{...props}`. */
  extra?: (el: Element) => string[]
  notes: Set<string>
  stats: { elements: number; attributes: number }
}

const ELEMENT = 1
const TEXT = 3
const CDATA = 4
const COMMENT = 8

/** JSX tag name for an element: lower case for HTML, case preserved for SVG, prefixes kept. */
export function jsxTagName(el: Element): string {
  const name = el.prefix ? `${el.prefix}:${el.localName}` : el.localName
  return el.namespaceURI === XHTML_NS ? name.toLowerCase() : name
}

// ASCII whitespace only: a non-breaking space is content and must survive as &nbsp;.
const collapse = (s: string) => s.replace(/[ \t\n\r\f]+/g, " ")

function children(el: Element): Node[] {
  const tpl = (el as HTMLTemplateElement).content
  const list = tpl && tpl.childNodes ? tpl.childNodes : el.childNodes
  return Array.from(list)
}

function isText(n: Node) {
  return n.nodeType === TEXT || n.nodeType === CDATA
}

function visible(n: Node, ctx: SerializeContext): boolean {
  if (n.nodeType === ELEMENT) return ctx.keep(n as Element)
  if (isText(n)) return true
  if (n.nodeType === COMMENT) return true
  return false
}

function isInlineTree(n: Node, ctx: SerializeContext): boolean {
  if (isText(n)) return ctx.verbatim ? !n.textContent?.includes("\n") : !n.textContent?.includes("\n") || collapse(n.textContent ?? "").length < 60
  if (n.nodeType === COMMENT) return false
  if (n.nodeType !== ELEMENT) return false
  const el = n as Element
  const tag = jsxTagName(el)
  if (!ctx.inlineTags.has(tag) || ctx.rawTags.has(tag)) return false
  return children(el).filter((k) => visible(k, ctx)).every((k) => isInlineTree(k, ctx))
}

function openTag(el: Element, ctx: SerializeContext): string {
  const attrs: string[] = []
  for (const a of Array.from(el.attributes)) {
    const r = ctx.attr(el, a.name, a.value)
    if (!r) continue
    ctx.stats.attributes++
    if (typeof r.value === "string") attrs.push(jsxAttr(r.name, r.value, ctx.numeric))
    else if ("bare" in r.value) attrs.push(r.name)
    else attrs.push(`${r.name}=${r.value.expr}`)
  }
  for (const x of ctx.extra?.(el) ?? []) attrs.push(x)
  return `<${jsxTagName(el)}${attrs.length ? " " + attrs.join(" ") : ""}`
}

/** An HTML comment as a JSX comment child. */
export const jsxComment = (text: string) => `{/* ${collapse(text).trim().replace(/\*\//g, "* /")} */}`
const comment = jsxComment

const textExpr = (t: string, ctx: SerializeContext) => (ctx.verbatim ? `{${JSON.stringify(t)}}` : escapeJsxText(collapse(t)))

function inlineNode(n: Node, ctx: SerializeContext): string {
  if (isText(n)) return textExpr(n.textContent ?? "", ctx)
  if (n.nodeType === COMMENT) return comment(n.textContent ?? "")
  const el = n as Element
  ctx.stats.elements++
  const open = openTag(el, ctx)
  const kids = children(el).filter((k) => visible(k, ctx))
  if (!kids.length) return `${open} />`
  return `${open}>${kids.map((k) => inlineNode(k, ctx)).join("")}</${jsxTagName(el)}>`
}

/** Serialises one element to indented JSX lines. */
export function serializeElement(el: Element, depth: number, ctx: SerializeContext): string[] {
  const pad = "  ".repeat(depth)
  const tag = jsxTagName(el)
  ctx.stats.elements++
  const open = openTag(el, ctx)
  if (ctx.selfClose?.has(tag)) return [`${pad}${open} />`]
  const kids = children(el).filter((k) => visible(k, ctx))
  const raw = ctx.rawTags.has(tag)
  if (raw && !kids.some((k) => k.nodeType === ELEMENT)) {
    const text = el.textContent ?? ""
    if (!text.trim()) return [`${pad}${open} />`]
    return [`${pad}${open}>{${JSON.stringify(text)}}</${tag}>`]
  }
  if (!kids.length) return [`${pad}${open} />`]
  const wasVerbatim = ctx.verbatim
  if (raw) ctx.verbatim = true
  try {
    if (kids.every((k) => isInlineTree(k, ctx))) {
      const before = { ...ctx.stats }
      const inner = kids.map((k) => inlineNode(k, ctx)).join("")
      const line = `${open}>${ctx.verbatim ? inner : inner.trim()}</${tag}>`
      if (line.length <= 96) return [`${pad}${line}`]
      // Too long for one line: the block pass below counts the children again.
      ctx.stats.elements = before.elements
      ctx.stats.attributes = before.attributes
    }
    const lines = [`${pad}${open}>`]
    kids.forEach((k, i) => lines.push(...blockNode(k, depth + 1, ctx, kids[i - 1], kids[i + 1])))
    lines.push(`${pad}</${tag}>`)
    return lines
  } finally {
    ctx.verbatim = wasVerbatim
  }
}

/** Whitespace between two of these is significant: real text, or text-like inline elements. */
const inlineish = (n: Node | undefined, ctx: SerializeContext) =>
  !!n && ((isText(n) && !!n.textContent?.trim()) || (n.nodeType === ELEMENT && (ctx.spaceTags ?? ctx.inlineTags).has(jsxTagName(n as Element))))

/** Serialises any node (element, text or comment) as block-level JSX lines. */
export function serializeNode(n: Node, depth: number, ctx: SerializeContext, prev?: Node, next?: Node): string[] {
  return blockNode(n, depth, ctx, prev, next)
}

function blockNode(n: Node, depth: number, ctx: SerializeContext, prev: Node | undefined, next: Node | undefined): string[] {
  const pad = "  ".repeat(depth)
  if (isText(n)) {
    if (ctx.verbatim) return [`${pad}{${JSON.stringify(n.textContent ?? "")}}`]
    const t = collapse(n.textContent ?? "")
    if (!t.trim()) return inlineish(prev, ctx) && inlineish(next, ctx) ? [`${pad}{" "}`] : []
    const out: string[] = []
    if (t.startsWith(" ") && prev) out.push(`${pad}{" "}`)
    out.push(`${pad}${escapeJsxText(t.trim())}`)
    if (t.endsWith(" ") && next) out.push(`${pad}{" "}`)
    return out
  }
  if (n.nodeType === COMMENT) return [`${pad}${comment(n.textContent ?? "")}`]
  return serializeElement(n as Element, depth, ctx)
}

/* ---------------------------------- SVG ---------------------------------- */

export type SvgOptions = {
  /** Component name, PascalCase. */
  name: string
  typescript: boolean
  /** Drop fixed width and height on the root and spread props instead. */
  spreadProps: boolean
  /** Replace fill and stroke colours with currentColor. */
  currentColor: boolean
  /** Strip unreferenced ids, metadata, editor namespaces and extra whitespace. */
  optimize: boolean
}

export type SvgResult = {
  code: string
  error?: string
  notes: string[]
  stats: { elements: number; attributes: number }
  /** Data URI of the parsed SVG for an `<img>` preview. */
  preview?: string
}

const SVG_INLINE = new Set(["text", "tspan", "title", "desc", "a", "textPath"])
const SVG_RAW = new Set(["style"])
const KEEP_COLOR = /^(none|currentcolor|inherit|transparent|context-fill|context-stroke|url\(.*)$/i
const DROP_ON_OPTIMIZE = new Set(["xml:space", "version", "baseprofile", "enable-background", "data-name", "xmlns:xlink"])

/** Parses SVG text. Tries strict XML first, then the forgiving HTML parser. Browser only. */
export function parseSvg(src: string): { root: Element | null; error?: string } {
  const text = src.trim()
  if (!text) return { root: null }
  if (!/<svg[\s>]/i.test(text)) return { root: null, error: "No <svg> element found. Paste the full markup, including the opening <svg> tag." }
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, "image/svg+xml")
  const failed = xml.getElementsByTagName("parsererror").length > 0
  if (!failed && xml.documentElement && xml.documentElement.localName === "svg") return { root: xml.documentElement }
  const html = parser.parseFromString(text, "text/html")
  const svg = html.querySelector("svg")
  if (svg) return { root: svg }
  return { root: null, error: "The SVG could not be parsed. Check for unclosed tags or stray characters." }
}

/** Ids referenced through url(#id), href="#id" or aria relations, which must survive optimisation. */
export function referencedIds(root: Element): Set<string> {
  const ids = new Set<string>()
  const url = /url\(\s*['"]?#([^'")\s]+)/g
  const all = [root, ...Array.from(root.querySelectorAll("*"))]
  for (const el of all) {
    for (const a of Array.from(el.attributes)) {
      const name = a.name.toLowerCase()
      if ((name === "href" || name === "xlink:href") && a.value.startsWith("#")) ids.add(a.value.slice(1))
      if (name === "aria-labelledby" || name === "aria-describedby") a.value.split(/\s+/).forEach((id) => id && ids.add(id))
      let m: RegExpExecArray | null
      while ((m = url.exec(a.value))) ids.add(m[1])
    }
    if (el.localName === "style") {
      let m: RegExpExecArray | null
      const css = el.textContent ?? ""
      while ((m = url.exec(css))) ids.add(m[1])
      const hash = /#([A-Za-z_][\w-]*)/g
      while ((m = hash.exec(css))) ids.add(m[1])
    }
  }
  return ids
}

function previewUri(root: Element): string {
  const clone = root.cloneNode(true) as Element
  clone.querySelectorAll("script").forEach((s) => s.remove())
  let s = new XMLSerializer().serializeToString(clone)
  if (!/^<svg[^>]*\sxmlns=/.test(s)) s = s.replace(/^<svg/, `<svg xmlns="${SVG_NS}"`)
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`
}

/** Converts an SVG element to a React component. Pure apart from DOM reads, so it can run on any parsed element. */
export function svgElementToJsx(root: Element, o: SvgOptions): SvgResult {
  const notes = new Set<string>()
  const stats = { elements: 0, attributes: 0 }
  const keepIds = o.optimize ? referencedIds(root) : null
  const colour = (prop: string, value: string) => (o.currentColor && (prop === "fill" || prop === "stroke") && !KEEP_COLOR.test(value.trim()) ? "currentColor" : value)
  const ctx: SerializeContext = {
    numeric: true,
    inlineTags: SVG_INLINE,
    rawTags: SVG_RAW,
    notes,
    stats,
    keep: (el) => {
      const tag = jsxTagName(el)
      if (tag === "script") {
        notes.add("Removed a <script> element; React components should not carry inline scripts.")
        return false
      }
      if (!o.optimize) return true
      if (tag === "metadata" || el.prefix) {
        notes.add("Removed editor metadata (Inkscape, Illustrator, Figma namespaces).")
        return false
      }
      if ((tag === "defs" || tag === "g") && !children(el).some((k) => k.nodeType === ELEMENT || (isText(k) && k.textContent?.trim()))) {
        notes.add("Removed empty <defs> and <g> groups.")
        return false
      }
      return true
    },
    attr: (el, name, raw) => {
      const lower = name.toLowerCase()
      const value = o.optimize ? collapse(raw).trim() : raw
      if (/^on[a-z]/.test(lower)) {
        notes.add(`Removed inline event handler ${lower}; attach handlers as React props instead.`)
        return null
      }
      if (lower === "style") {
        const expr = styleToJsx(value, colour)
        return expr ? { name: "style", value: { expr } } : null
      }
      if (o.spreadProps && el === root && (lower === "width" || lower === "height")) return null
      if (o.optimize) {
        if (DROP_ON_OPTIMIZE.has(lower)) return null
        if (name.includes(":") && !lower.startsWith("xlink:") && !lower.startsWith("xml:")) {
          notes.add("Removed editor metadata (Inkscape, Illustrator, Figma namespaces).")
          return null
        }
        if (lower === "id" && keepIds && !keepIds.has(value)) return null
      }
      if (lower === "fill" || lower === "stroke") return { name: lower, value: colour(lower, value) }
      return { name: attrToJsx(name), value }
    },
    extra: (el) => (o.spreadProps && el === root ? ["{...props}"] : []),
  }
  const lines = serializeElement(root, 2, ctx)
  const name = /^[A-Z][\w$]*$/.test(o.name) ? o.name : "Icon"
  const sig = o.spreadProps ? (o.typescript ? "props: SVGProps<SVGSVGElement>" : "props") : ""
  const head = o.typescript && o.spreadProps ? 'import type { SVGProps } from "react"\n\n' : ""
  const code = `${head}export function ${name}(${sig}) {\n  return (\n${lines.join("\n")}\n  )\n}\n`
  if (o.spreadProps && !root.hasAttribute("viewBox")) notes.add("The root has no viewBox, so it will not scale when width and height are passed as props.")
  return { code, notes: Array.from(notes), stats, preview: previewUri(root) }
}

/** Parses and converts SVG markup. Browser only (uses DOMParser). */
export function svgToJsx(src: string, o: SvgOptions): SvgResult {
  const { root, error } = parseSvg(src)
  if (!root) return { code: "", error, notes: [], stats: { elements: 0, attributes: 0 } }
  return svgElementToJsx(root, o)
}

/* ----------------------------------- UI ----------------------------------- */

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Exported from Figma -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xml:space="preserve">
  <g id="Icon / Check" data-name="Icon / Check" style="stroke-width:1.5; stroke-linecap:round">
    <circle cx="12" cy="12" r="9" stroke="#111827" fill="url(#glow)" fill-opacity="0.25"/>
    <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#111827" stroke-linejoin="round"/>
  </g>
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c5cff"/>
      <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
</svg>`

export const useIsClient = () => React.useSyncExternalStore(() => () => {}, () => true, () => false)

export function SvgToJsx() {
  const client = useIsClient()
  const [src, setSrc] = React.useState(SAMPLE)
  const [name, setName] = React.useState("CheckIcon")
  const [lang, setLang] = React.useState<"TypeScript" | "JavaScript">("TypeScript")
  const [spreadProps, setSpreadProps] = React.useState(true)
  const [currentColor, setCurrentColor] = React.useState(true)
  const [optimize, setOptimize] = React.useState(true)
  const [bg, setBg] = React.useState<"Light" | "Dark">("Light")
  const [brokenSrc, setBrokenSrc] = React.useState<string | null>(null)
  const result = React.useMemo<SvgResult | null>(
    () => (client ? svgToJsx(src, { name: name.trim(), typescript: lang === "TypeScript", spreadProps, currentColor, optimize }) : null),
    [client, src, name, lang, spreadProps, currentColor, optimize],
  )
  const broken = !!result?.preview && brokenSrc === result.preview
  const empty = !src.trim()
  const ext = lang === "TypeScript" ? "tsx" : "jsx"
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="svg-in" className="text-[13px] font-medium text-fg">SVG markup</label>
            <button type="button" onClick={() => setSrc(SAMPLE)} className="text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Load example</button>
          </div>
          <Textarea id="svg-in" value={src} onChange={(e) => setSrc(e.target.value)} rows={14} spellCheck={false} placeholder="Paste an <svg> here" className="mt-2 min-h-[300px] flex-1 font-mono text-[12.5px] leading-[1.6]" aria-invalid={!!result?.error} />
          <p className={result?.error ? "mt-2 text-[12.5px] text-danger" : "mt-2 text-[12.5px] text-fg-muted"} aria-live="polite">
            {empty ? "Paste an SVG to convert it." : result?.error ? result.error : result ? `Converted ${result.stats.elements} elements and ${result.stats.attributes} attributes.` : "Converting..."}
          </p>
        </div>
        <div className="space-y-5">
          <div className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <div className="space-y-2">
              <label htmlFor="svg-name" className="text-[13px] font-medium text-fg">Component name</label>
              <Input id="svg-name" value={name} onChange={(e) => setName(e.target.value)} className="font-mono" spellCheck={false} aria-invalid={!/^[A-Z][\w$]*$/.test(name.trim())} />
            </div>
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-fg">Output</span>
              <SegmentedControl size="sm" fullWidth items={["TypeScript", "JavaScript"]} value={lang} onChange={(v) => setLang(v as "TypeScript" | "JavaScript")} aria-label="Output language" />
            </div>
            <Switch size="sm" label="Spread props" description="Drop fixed width and height, pass {...props}" checked={spreadProps} onCheckedChange={setSpreadProps} />
            <Switch size="sm" label="Use currentColor" description="Fill and stroke follow the text colour" checked={currentColor} onCheckedChange={setCurrentColor} />
            <Switch size="sm" label="Optimize" description="Strip unused ids, metadata and editor data" checked={optimize} onCheckedChange={setOptimize} />
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-fg">Preview</span>
              <SegmentedControl size="sm" items={["Light", "Dark"]} value={bg} onChange={(v) => setBg(v as "Light" | "Dark")} aria-label="Preview background" />
            </div>
            <div className="mt-3 grid h-40 place-items-center overflow-hidden rounded-xl border border-border" style={{ background: bg === "Light" ? "#ffffff" : "#15151a" }}>
              {result?.preview && !broken ? (
                // The preview is an image, so nothing in the SVG can run or reach the page.
                <img src={result.preview} alt="Preview of the pasted SVG" className="h-28 w-auto max-w-[90%] object-contain" onError={() => setBrokenSrc(result.preview ?? null)} />
              ) : (
                <span className="px-4 text-center text-[12.5px] text-fg-subtle">{empty ? "Nothing to preview yet" : broken ? "The browser could not render this SVG as an image" : "No preview"}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {result?.notes.length ? (
        <ul className="space-y-1 rounded-xl border border-border bg-sunken px-4 py-3 text-[12.5px] text-fg-muted">
          {result.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ) : null}
      <CodeBlock language={ext} filename={`${/^[A-Z][\w$]*$/.test(name.trim()) ? name.trim() : "Icon"}.${ext}`} code={result?.code || `// ${empty ? "Paste an SVG above to see the component." : result?.error ? "Fix the input to see the component." : "Converting..."}\n`} />
    </div>
  )
}
