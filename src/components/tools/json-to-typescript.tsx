"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { Switch } from "@/registry/ui/switch"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { CodeBlock } from "@/registry/ui/code-block"

/*
 * JSON to TypeScript. A small hand-written JSON parser reports the exact line
 * and column of a mistake, then the value is sampled into a shape tree that
 * the TypeScript and Zod emitters print. All of it is pure and exported.
 */

/* -------------------------------- parsing ------------------------------- */

export type JsonError = { message: string; line: number; column: number; index: number }
export type JsonParse = { ok: true; value: unknown } | { ok: false; error: JsonError }

class Fail {
  constructor(public message: string, public index: number) {}
}

export function lineColumn(src: string, index: number): { line: number; column: number } {
  let line = 1
  let last = 0
  for (let i = 0; i < index && i < src.length; i++) {
    if (src[i] === "\n") {
      line++
      last = i + 1
    }
  }
  return { line, column: index - last + 1 }
}

/** Strict JSON parser with positions. Mistakes common in hand-written JSON get a specific message. */
export function parseJson(src: string): JsonParse {
  let i = 0
  const n = src.length
  const peek = () => src[i]
  const ws = () => {
    while (i < n && /[ \t\n\r]/.test(src[i])) i++
    if (src[i] === "/" && (src[i + 1] === "/" || src[i + 1] === "*")) throw new Fail("Comments are not allowed in JSON", i)
  }
  const describe = (at: number) => (at >= n ? "end of input" : `'${src[at]}'`)
  const value = (): unknown => {
    ws()
    if (i >= n) throw new Fail("Unexpected end of input, expected a value", i)
    const ch = peek()
    if (ch === "{") return object()
    if (ch === "[") return array()
    if (ch === '"') return string()
    if (ch === "'") throw new Fail("Strings must use double quotes", i)
    if (ch === "-" || (ch >= "0" && ch <= "9")) return number()
    if (ch === "+" || ch === ".") throw new Fail(`Numbers cannot start with ${ch}`, i)
    for (const [word, lit] of [["true", true], ["false", false], ["null", null]] as const) {
      if (src.startsWith(word, i)) {
        i += word.length
        return lit
      }
    }
    const word = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, i + 32))?.[0]
    if (word === "undefined" || word === "NaN" || word === "Infinity") throw new Fail(`${word} is not valid JSON`, i)
    if (word) throw new Fail(`Unexpected ${describe(i)}, expected a value (property names and strings need double quotes)`, i)
    if (ch === "]" || ch === "}") throw new Fail(`Unexpected ${describe(i)}, expected a value (remove the trailing comma)`, i)
    throw new Fail(`Unexpected ${describe(i)}, expected a value`, i)
  }
  const string = (): string => {
    const start = i
    i++
    let out = ""
    for (;;) {
      if (i >= n) throw new Fail("Unterminated string", start)
      const ch = src[i]
      if (ch === '"') {
        i++
        return out
      }
      if (ch === "\\") {
        const e = src[i + 1]
        const map: Record<string, string> = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: "\n", r: "\r", t: "\t" }
        if (e === "u") {
          const hex = src.slice(i + 2, i + 6)
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) throw new Fail("Invalid unicode escape", i)
          out += String.fromCharCode(parseInt(hex, 16))
          i += 6
          continue
        }
        if (!(e in map)) throw new Fail(`Invalid escape \\${e ?? ""}`, i)
        out += map[e]
        i += 2
        continue
      }
      if (ch < " ") throw new Fail(ch === "\n" ? "Unterminated string (line breaks inside strings must be written as \\n)" : "Control characters must be escaped", i)
      out += ch
      i++
    }
  }
  const number = (): number => {
    const start = i
    const m = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(src.slice(i, i + 64))
    if (!m) throw new Fail("Invalid number", i)
    i += m[0].length
    if (src[i] === "." || /[\d]/.test(src[i] ?? "")) throw new Fail(m[1] === "0" && /\d/.test(src[i] ?? "") ? "Numbers cannot have leading zeros" : "Invalid number", start)
    return parseFloat(m[0])
  }
  const array = (): unknown[] => {
    i++
    const out: unknown[] = []
    ws()
    if (peek() === "]") {
      i++
      return out
    }
    for (;;) {
      out.push(value())
      ws()
      if (peek() === ",") {
        i++
        ws()
        if (peek() === "]") throw new Fail("Trailing comma before ]", i - 1)
        continue
      }
      if (peek() === "]") {
        i++
        return out
      }
      throw new Fail(`Expected ',' or ']' after an array element, found ${describe(i)}`, i)
    }
  }
  const object = (): Record<string, unknown> => {
    i++
    const out: Record<string, unknown> = {}
    ws()
    if (peek() === "}") {
      i++
      return out
    }
    for (;;) {
      ws()
      if (peek() !== '"') {
        if (peek() === "}") throw new Fail("Trailing comma before }", i - 1)
        if (peek() === "'") throw new Fail("Property names must use double quotes", i)
        throw new Fail(`Expected a double-quoted property name, found ${describe(i)}`, i)
      }
      const key = string()
      ws()
      if (peek() !== ":") throw new Fail(`Expected ':' after property name "${key}", found ${describe(i)}`, i)
      i++
      out[key] = value()
      ws()
      if (peek() === ",") {
        i++
        continue
      }
      if (peek() === "}") {
        i++
        return out
      }
      throw new Fail(`Expected ',' or '}' after the value of "${key}", found ${describe(i)}`, i)
    }
  }
  try {
    ws()
    if (i >= n) throw new Fail("The input is empty", 0)
    const v = value()
    ws()
    if (i < n) throw new Fail(`Unexpected ${describe(i)} after the end of the JSON value`, i)
    return { ok: true, value: v }
  } catch (e) {
    if (e instanceof Fail) {
      const at = Math.min(e.index, n)
      return { ok: false, error: { message: e.message, index: at, ...lineColumn(src, at) } }
    }
    throw e
  }
}

/* -------------------------------- shapes -------------------------------- */

export type Shape =
  | { kind: "string" | "number" | "boolean" | "null" | "unknown" }
  | { kind: "array"; items: Shape[] }
  | { kind: "object"; props: Map<string, { shapes: Shape[]; seen: number }>; count: number }

export type ObjectShape = Extract<Shape, { kind: "object" }>

const prim = (kind: "string" | "number" | "boolean" | "null" | "unknown"): Shape => ({ kind })

/** Adds a shape to a union list, merging objects with objects and arrays with arrays. */
export function mergeInto(union: Shape[], s: Shape): Shape[] {
  if (s.kind === "object") {
    const o = union.find((u) => u.kind === "object")
    if (o && o.kind === "object") {
      for (const [k, v] of s.props) {
        const p = o.props.get(k)
        if (p) {
          p.seen += v.seen
          for (const vs of v.shapes) p.shapes = mergeInto(p.shapes, vs)
        } else o.props.set(k, { shapes: [...v.shapes], seen: v.seen })
      }
      o.count += s.count
      return union
    }
    return [...union, s]
  }
  if (s.kind === "array") {
    const a = union.find((u) => u.kind === "array")
    if (a && a.kind === "array") {
      for (const it of s.items) a.items = mergeInto(a.items, it)
      return union
    }
    return [...union, s]
  }
  return union.some((u) => u.kind === s.kind) ? union : [...union, s]
}

/** Infers the shape of a JSON value. Arrays of objects are sampled into one object shape with optional keys. */
export function shapeOf(v: unknown): Shape {
  if (v === null) return prim("null")
  if (Array.isArray(v)) {
    let items: Shape[] = []
    for (const x of v) items = mergeInto(items, shapeOf(x))
    return { kind: "array", items }
  }
  if (typeof v === "object") {
    const props = new Map<string, { shapes: Shape[]; seen: number }>()
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) props.set(k, { shapes: [shapeOf(x)], seen: 1 })
    return { kind: "object", props, count: 1 }
  }
  if (typeof v === "string") return prim("string")
  if (typeof v === "number") return prim("number")
  if (typeof v === "boolean") return prim("boolean")
  return prim("unknown")
}

/* -------------------------------- naming -------------------------------- */

export function singular(word: string): string {
  const w = word
  if (/children$/i.test(w)) return w.replace(/children$/i, "child")
  if (/people$/i.test(w)) return w.replace(/people$/i, "person")
  if (/(ss|us|is|os|news|data|status)$/i.test(w)) return w
  if (/ies$/i.test(w)) return w.replace(/ies$/i, "y")
  if (/(ches|shes|sses|xes|zes)$/i.test(w)) return w.replace(/es$/i, "")
  if (/s$/i.test(w)) return w.slice(0, -1)
  return w
}

export function pascal(name: string): string {
  const parts = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^A-Za-z0-9]+/).filter(Boolean)
  const out = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("")
  return /^[A-Za-z_$]/.test(out) ? out : `T${out}`
}

const RESERVED = new Set(["Object", "Array", "String", "Number", "Boolean", "Date", "Record", "Map", "Set", "Function", "Symbol", "Promise", "Error"])

class Namer {
  used = new Set<string>()
  bySig = new Map<string, string>()
  constructor(root: string) {
    this.used.add(root)
  }
  claim(hint: string, sig: string): { name: string; fresh: boolean } {
    const existing = this.bySig.get(sig)
    if (existing) return { name: existing, fresh: false }
    let base = pascal(hint) || "Item"
    if (RESERVED.has(base)) base += "Type"
    let name = base
    for (let k = 2; this.used.has(name); k++) name = `${base}${k}`
    this.used.add(name)
    this.bySig.set(sig, name)
    return { name, fresh: true }
  }
}

/** A structural signature so identical object shapes share one type. */
export function signature(s: Shape): string {
  if (s.kind === "array") return `[${s.items.map(signature).sort().join("|")}]`
  if (s.kind === "object") return `{${[...s.props.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([k, p]) => `${k}${p.seen < s.count ? "?" : ""}:${p.shapes.map(signature).sort().join("|")}`).join(",")}}`
  return s.kind
}

const key = (k: string) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k))

/* ------------------------------- emitters ------------------------------- */

export type TsOptions = { rootName: string; style: "interface" | "type"; readonly: boolean }

/** Emits TypeScript types for a shape, root type first, then nested types in order of appearance. */
export function emitTypescript(root: Shape, o: TsOptions): string {
  const rootName = pascal(o.rootName) || "Root"
  const namer = new Namer(rootName)
  const decls: string[] = []
  const ro = o.readonly ? "readonly " : ""
  const unionRef = (shapes: Shape[], hint: string): string => {
    if (!shapes.length) return "unknown"
    const ordered = [...shapes.filter((s) => s.kind !== "null"), ...shapes.filter((s) => s.kind === "null")]
    return ordered.map((s) => ref(s, hint)).join(" | ")
  }
  const ref = (s: Shape, hint: string): string => {
    if (s.kind === "array") {
      const inner = unionRef(s.items, singular(hint))
      const needsParens = s.items.length > 1
      return `${ro ? "readonly " : ""}${needsParens ? `(${inner})` : inner}[]`
    }
    if (s.kind === "object") {
      if (!s.props.size) return "Record<string, unknown>"
      const { name, fresh } = namer.claim(hint, signature(s))
      if (fresh) declare(s, name)
      return name
    }
    return s.kind
  }
  // Reserve the slot before building the body so a parent type prints before the types it uses.
  const declare = (s: ObjectShape, name: string) => {
    const slot = decls.length
    decls.push("")
    decls[slot] = objectDecl(s, name)
  }
  const objectDecl = (s: ObjectShape, name: string): string => {
    const lines = [...s.props.entries()].map(([k, p]) => `  ${ro}${key(k)}${p.seen < s.count ? "?" : ""}: ${unionRef(p.shapes, k)}`)
    const body = lines.length ? `{\n${lines.join("\n")}\n}` : "Record<string, unknown>"
    return o.style === "interface" && lines.length ? `export interface ${name} ${body}` : `export type ${name} = ${body}`
  }
  if (root.kind === "object" && root.props.size) {
    namer.bySig.set(signature(root), rootName)
    declare(root, rootName)
  } else {
    const slot = decls.length
    decls.push("")
    decls[slot] = `export type ${rootName} = ${ref(root, rootName)}`
  }
  return decls.join("\n\n") + "\n"
}

/** Emits Zod schemas, dependencies first, and infers the root type from the schema. */
export function emitZod(root: Shape, o: TsOptions): string {
  const rootName = pascal(o.rootName) || "Root"
  const namer = new Namer(rootName)
  const decls: string[] = []
  const ro = (s: string) => (o.readonly ? `${s}.readonly()` : s)
  const unionRef = (shapes: Shape[], hint: string, optional: boolean): string => {
    const nonNull = shapes.filter((s) => s.kind !== "null")
    const nullable = nonNull.length < shapes.length
    let out: string
    if (!shapes.length) out = "z.unknown()"
    else if (!nonNull.length) out = "z.null()"
    else if (nonNull.length === 1) out = ref(nonNull[0], hint)
    else out = `z.union([${nonNull.map((s) => ref(s, hint)).join(", ")}])`
    if (nullable && nonNull.length) out += ".nullable()"
    if (optional) out += ".optional()"
    return out
  }
  const ref = (s: Shape, hint: string): string => {
    if (s.kind === "array") return ro(`z.array(${unionRef(s.items, singular(hint), false)})`)
    if (s.kind === "object") {
      if (!s.props.size) return "z.record(z.string(), z.unknown())"
      const { name, fresh } = namer.claim(hint, signature(s))
      if (fresh) decls.push(objectDecl(s, name, false))
      return `${name}Schema`
    }
    if (s.kind === "unknown") return "z.unknown()"
    return `z.${s.kind}()`
  }
  const objectDecl = (s: ObjectShape, name: string, isRoot: boolean): string => {
    const lines = [...s.props.entries()].map(([k, p]) => `  ${key(k)}: ${unionRef(p.shapes, k, p.seen < s.count)},`)
    return `${isRoot ? "export " : ""}const ${name}Schema = ${ro(`z.object({\n${lines.join("\n")}\n})`)}`
  }
  let rootExpr: string
  if (root.kind === "object" && root.props.size) {
    namer.bySig.set(signature(root), rootName)
    rootExpr = objectDecl(root, rootName, true)
  } else rootExpr = `export const ${rootName}Schema = ${ref(root, rootName)}`
  return [`import { z } from "zod"`, ...decls, rootExpr, `export type ${rootName} = z.infer<typeof ${rootName}Schema>`].join("\n\n") + "\n"
}

export type JsonToTsResult = { ts: string; zod: string; error?: JsonError; types: number; props: number }

function countTypes(s: Shape): { types: number; props: number } {
  let types = 0
  let props = 0
  const walk = (x: Shape) => {
    if (x.kind === "object") {
      if (x.props.size) types++
      props += x.props.size
      for (const p of x.props.values()) p.shapes.forEach(walk)
    } else if (x.kind === "array") x.items.forEach(walk)
  }
  walk(s)
  return { types, props }
}

/** Parses JSON text and emits TypeScript and Zod. */
export function jsonToTypescript(src: string, o: TsOptions): JsonToTsResult {
  const parsed = parseJson(src)
  if (!parsed.ok) return { ts: "", zod: "", error: parsed.error, types: 0, props: 0 }
  const shape = shapeOf(parsed.value)
  return { ts: emitTypescript(shape, o), zod: emitZod(shape, o), ...countTypes(shape) }
}

/* ----------------------------------- UI ----------------------------------- */

const SAMPLE = `{
  "id": "inv_1042",
  "status": "open",
  "customer": {
    "name": "Maya Chen",
    "email": "maya@northwind.com",
    "vat_number": null
  },
  "lines": [
    { "sku": "LUMEN-PRO", "qty": 2, "unit_price": 49, "note": "Annual plan" },
    { "sku": "LUMEN-SEAT", "qty": 5, "unit_price": 9 }
  ],
  "tags": ["saas", "annual", 2026],
  "paid": false,
  "metadata": {}
}`

export function JsonToTypescript() {
  const [src, setSrc] = React.useState(SAMPLE)
  const [rootName, setRootName] = React.useState("Invoice")
  const [style, setStyle] = React.useState<"interface" | "type">("interface")
  const [readonly, setReadonly] = React.useState(false)
  const result = React.useMemo(() => jsonToTypescript(src, { rootName: rootName.trim() || "Root", style, readonly }), [src, rootName, style, readonly])
  const empty = !src.trim()
  const err = empty ? undefined : result.error
  const errLine = err ? src.split("\n")[err.line - 1] ?? "" : ""
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="json-in" className="text-[13px] font-medium text-fg">JSON</label>
            <button type="button" onClick={() => setSrc(SAMPLE)} className="text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Load example</button>
          </div>
          <Textarea id="json-in" value={src} onChange={(e) => setSrc(e.target.value)} rows={16} spellCheck={false} placeholder="Paste a JSON object or array" className="mt-2 min-h-[320px] font-mono text-[12.5px] leading-[1.6]" aria-invalid={!!err} />
          {err ? (
            <div className="mt-2 text-[12.5px]" aria-live="polite">
              <p className="text-danger">Line {err.line}, column {err.column}: {err.message}.</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-sunken px-3 py-2 font-mono text-[12px] leading-[1.6] text-fg"><code>{errLine}{"\n"}{" ".repeat(Math.max(0, err.column - 1))}^</code></pre>
            </div>
          ) : (
            <p className="mt-2 text-[12.5px] text-fg-muted" aria-live="polite">{empty ? "Paste JSON to generate types." : `Valid JSON. ${result.types} ${result.types === 1 ? "type" : "types"}, ${result.props} ${result.props === 1 ? "property" : "properties"}.`}</p>
          )}
        </div>
        <div className="space-y-4 self-start rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="space-y-2">
            <label htmlFor="json-root" className="text-[13px] font-medium text-fg">Root type name</label>
            <Input id="json-root" value={rootName} onChange={(e) => setRootName(e.target.value)} className="font-mono" spellCheck={false} />
          </div>
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-fg">Declarations</span>
            <SegmentedControl size="sm" fullWidth items={["interface", "type"]} value={style} onChange={(v) => setStyle(v as "interface" | "type")} aria-label="Declaration style" />
          </div>
          <Switch size="sm" label="Readonly" description="Mark properties and arrays readonly" checked={readonly} onCheckedChange={setReadonly} />
          <ul className="space-y-1.5 text-[12.5px] leading-[1.5] text-fg-muted">
            <li>Nested objects become named types</li>
            <li>Arrays of objects are merged, keys missing from some items become optional</li>
            <li>Mixed arrays become union element types</li>
            <li>null stays null so you can decide the real type</li>
          </ul>
        </div>
      </div>
      <Tabs defaultValue="ts">
        <TabsList aria-label="Output format">
          <TabsTrigger value="ts">TypeScript</TabsTrigger>
          <TabsTrigger value="zod">Zod</TabsTrigger>
        </TabsList>
        <TabsContent value="ts">
          <CodeBlock language="ts" filename="types.ts" code={result.ts || `// ${empty ? "Paste JSON above to see the types." : "Fix the JSON to see the types."}\n`} />
        </TabsContent>
        <TabsContent value="zod">
          <CodeBlock language="ts" filename="schema.ts" code={result.zod || `// ${empty ? "Paste JSON above to see the schema." : "Fix the JSON to see the schema."}\n`} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
