/**
 * Best-effort props extraction for the docs API tables. Reads the main
 * component's parameter type (inline object, a named type/interface, or an
 * intersection with React.ComponentProps) and the defaults from destructuring.
 */

function matchClose(src, i, open, close) {
  let depth = 0
  for (let j = i; j < src.length; j++) {
    const c = src[j]
    if (c === '"' || c === "'" || c === "`") {
      const q = c
      for (j++; j < src.length && src[j] !== q; j++) if (src[j] === "\\") j++
      continue
    }
    if (c === open) depth++
    else if (c === close) {
      depth--
      if (depth === 0) return j
    }
  }
  return -1
}

/** Split on a separator at bracket depth 0. */
function splitTop(s, seps) {
  const out = []
  let depth = 0
  let cur = ""
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '"' || c === "'" || c === "`") {
      const q = c
      let j = i + 1
      for (; j < s.length && s[j] !== q; j++) if (s[j] === "\\") j++
      cur += s.slice(i, j + 1)
      i = j
      continue
    }
    if (c === "/" && s[i + 1] === "*") {
      const e = s.indexOf("*/", i + 2)
      cur += s.slice(i, e + 2)
      i = e + 1
      continue
    }
    if (c === "/" && s[i + 1] === "/") {
      const e = s.indexOf("\n", i)
      i = e === -1 ? s.length : e - 1
      continue
    }
    if ("{([<".includes(c)) depth++
    if ("})]>".includes(c) && !(c === ">" && s[i - 1] === "=")) depth--
    if (depth === 0 && seps.includes(c)) {
      out.push(cur)
      cur = ""
    } else cur += c
  }
  if (cur.trim()) out.push(cur)
  return out
}

function parseMembers(body) {
  const props = []
  for (let raw of splitTop(body, [";", ",", "\n"])) {
    let doc
    const d = raw.match(/\/\*\*([\s\S]*?)\*\//)
    if (d) {
      doc = d[1].replace(/^\s*\*\s?/gm, "").replace(/\s+/g, " ").trim()
      raw = raw.replace(d[0], "")
    }
    raw = raw.trim()
    if (!raw) continue
    const m = raw.match(/^(readonly\s+)?["']?([A-Za-z_$][\w$-]*)["']?(\?)?\s*:\s*([\s\S]+)$/)
    if (!m) continue
    props.push({ name: m[2], optional: Boolean(m[3]), type: m[4].replace(/\s+/g, " ").trim(), ...(doc ? { doc } : {}) })
  }
  return props
}

function findTypeBody(src, name, seen = new Set()) {
  if (seen.has(name)) return { members: [], extends: [] }
  seen.add(name)
  const t = src.match(new RegExp(`(?:type|interface)\\s+${name}(?:<[^>]*>)?\\s*(=|extends|\\{)`))
  if (!t) return null
  let i = t.index + t[0].length - 1
  if (t[1] === "=") {
    const start = t.index + t[0].length
    // read until end of statement: a newline followed by a non-continuation line at depth 0
    let depth = 0
    let j = start
    for (; j < src.length; j++) {
      const c = src[j]
      if ("{([<".includes(c)) depth++
      if ("})]>".includes(c) && !(c === ">" && src[j - 1] === "=")) depth--
      if (depth === 0 && src[j] === "\n" && !/^\s*[&|]/.test(src.slice(j + 1, j + 40))) {
        if (src.slice(start, j).trim().length) break
      }
    }
    return typeExpr(src, src.slice(start, j), seen)
  }
  const brace = src.indexOf("{", i)
  const head = src.slice(t.index, brace)
  const ext = (head.match(/extends\s+([\s\S]+)$/)?.[1] ?? "").trim()
  const close = matchClose(src, brace, "{", "}")
  return { members: parseMembers(src.slice(brace + 1, close)), extends: ext ? [ext] : [] }
}

function typeExpr(src, expr, seen) {
  const members = []
  const ext = []
  for (let part of splitTop(expr, ["&"])) {
    part = part.trim()
    if (!part) continue
    if (part.startsWith("{")) {
      const close = matchClose(part, 0, "{", "}")
      members.push(...parseMembers(part.slice(1, close)))
    } else if (/^VariantProps<typeof\s+\w+>$/.test(part)) {
      members.push(...cvaVariants(src, part.match(/typeof\s+(\w+)/)[1]))
    } else if (/^(Omit|Pick|Partial)</.test(part)) {
      ext.push(part.replace(/\s+/g, " "))
    } else if (/^[A-Z]\w*(<[\s\S]*>)?$/.test(part)) {
      const r = findTypeBody(src, part.replace(/<[\s\S]*>$/, ""), seen)
      if (r) {
        members.push(...r.members)
        ext.push(...r.extends)
      } else ext.push(part)
    } else ext.push(part.replace(/\s+/g, " "))
  }
  return { members, extends: ext }
}

/** Props implied by a class-variance-authority config: each variant key becomes a union prop. */
function cvaVariants(src, name) {
  const m = src.match(new RegExp(`const\\s+${name}\\s*=\\s*cva\\(`))
  if (!m) return []
  const open = src.indexOf("(", m.index)
  const body = src.slice(open, matchClose(src, open, "(", ")"))
  const v = body.indexOf("variants:")
  if (v === -1) return []
  const vo = body.indexOf("{", v)
  const variants = body.slice(vo + 1, matchClose(body, vo, "{", "}"))
  const defaults = {}
  const dv = body.indexOf("defaultVariants:")
  if (dv !== -1) {
    const o = body.indexOf("{", dv)
    for (const e of splitTop(body.slice(o + 1, matchClose(body, o, "{", "}")), [","])) {
      const mm = e.trim().match(/^(\w+)\s*:\s*["']?([\w-]+)["']?/)
      if (mm) defaults[mm[1]] = `"${mm[2]}"`
    }
  }
  const out = []
  let i = 0
  while (i < variants.length) {
    const km = variants.slice(i).match(/(\w+)\s*:\s*\{/)
    if (!km) break
    const start = i + km.index + km[0].length - 1
    const end = matchClose(variants, start, "{", "}")
    const keys = splitTop(variants.slice(start + 1, end), [","]).map((e) => e.trim().match(/^["']?([\w-]+)["']?\s*:/)?.[1]).filter(Boolean)
    out.push({ name: km[1], optional: true, type: keys.map((k) => `"${k}"`).join(" | "), ...(defaults[km[1]] ? { default: defaults[km[1]] } : {}) })
    i = end + 1
  }
  return out
}

export function extractProps(src, title) {
  const fn = src.match(new RegExp(`function\\s+${title}\\s*(?:<[^(]*>)?\\s*\\(`))
  let paramText = null
  if (fn) {
    const open = fn.index + fn[0].length - 1
    const close = matchClose(src, open, "(", ")")
    paramText = src.slice(open + 1, close)
  } else {
    const c = src.match(new RegExp(`const\\s+${title}\\s*=\\s*(?:React\\.forwardRef<[^>]*>\\()?\\(`))
    if (c) {
      const open = c.index + c[0].length - 1
      const close = matchClose(src, open, "(", ")")
      paramText = src.slice(open + 1, close)
    }
  }
  if (!paramText || !paramText.trim()) return null
  // destructuring defaults
  const defaults = {}
  let typePart = ""
  const t = paramText.trim()
  if (t.startsWith("{")) {
    const close = matchClose(t, 0, "{", "}")
    for (const entry of splitTop(t.slice(1, close), [","])) {
      const m = entry.trim().match(/^([\w$]+)(?:\s*:\s*[\w$]+)?\s*=\s*([\s\S]+)$/)
      if (m) defaults[m[1]] = m[2].replace(/\s+/g, " ").trim()
    }
    const rest = t.slice(close + 1).trim()
    typePart = rest.startsWith(":") ? rest.slice(1).trim() : ""
  } else {
    const m = t.match(/^[\w$]+\s*:\s*([\s\S]+)$/)
    typePart = m ? m[1] : ""
  }
  if (!typePart) return null
  const { members, extends: ext } = typeExpr(src, typePart, new Set())
  const seen = new Set()
  const props = members
    .filter((p) => (seen.has(p.name) ? false : (seen.add(p.name), true)))
    .map((p) => ({ ...p, type: p.type.length > 90 ? p.type.slice(0, 87) + "..." : p.type, ...(defaults[p.name] !== undefined ? { default: defaults[p.name].length > 40 ? defaults[p.name].slice(0, 37) + "..." : defaults[p.name] } : {}) }))
  const extendsText = ext
    .map((e) => {
      const el = e.match(/ComponentProps(?:WithoutRef)?<\s*["'](\w+)["']\s*>/)?.[1]
      if (el) return `<${el}>`
      const prim = e.match(/(\w+(?:\.\w+)*)\.Props/)?.[1]
      if (prim) return `${prim} props`
      const base = e.match(/React\.ComponentProps<typeof\s+([\w.]+)>/)?.[1]
      if (base) return `${base} props`
      return null
    })
    .filter(Boolean)
  if (!props.length && !extendsText.length) return null
  return { props, extends: [...new Set(extendsText)] }
}
