"use client"
import * as React from "react"
import { BoldIcon, CodeIcon, Columns2Icon, EyeIcon, HeadingIcon, ItalicIcon, LinkIcon, ListIcon, PencilIcon, TextQuoteIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/** A markdown editor with a toolbar that wraps the selection, Cmd/Ctrl+B and I shortcuts, write, split and preview modes, a live preview rendered without innerHTML, and a word count. */
type MarkdownEditorMode = "write" | "split" | "preview"

type MarkdownEditorProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  mode?: MarkdownEditorMode
  defaultMode?: MarkdownEditorMode
  onModeChange?: (mode: MarkdownEditorMode) => void
  label?: string
  placeholder?: string
  /** Editor and preview height in px before the textarea is resized. */
  minHeight?: number
  disabled?: boolean
  className?: string
}

type Block =
  | { type: "h"; level: number; text: string }
  | { type: "p"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; blocks: Block[] }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[]; start: number }
  | { type: "hr" }

const SAMPLE = `## Lumen 2.4: Scheduled payouts

Payouts can now run on a schedule. Pick **daily**, **weekly** or **monthly** under *Settings, Payouts* and Lumen batches everything that cleared since the last run.

### What's new

- Scheduled payouts with a preview of the next batch
- Invoice reminders now respect the customer's time zone
- \`GET /v1/payouts\` returns the schedule that produced each payout

### Fixes

1. Rounding on multi-currency refunds
2. Exports above 50,000 rows no longer time out

> Heads up: the legacy \`payout.created\` webhook is deprecated and stops firing on 1 December.

Read the [full changelog](https://lumen.app/changelog) for details.`

const FENCE = /^```\s*([\w-]*)\s*$/
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/
const RULE = /^(?:-{3,}|\*{3,}|_{3,})\s*$/
const QUOTE = /^>\s?/
const BULLET = /^\s*[-*+]\s+/
const NUMBER = /^\s*(\d+)[.)]\s+/

function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n?/g, "\n").split("\n")
  const out: Block[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i++
      continue
    }
    const fence = line.match(FENCE)
    if (fence) {
      const code: string[] = []
      i++
      while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++])
      i++
      out.push({ type: "code", lang: fence[1], code: code.join("\n") })
      continue
    }
    const h = line.match(HEADING)
    if (h) {
      out.push({ type: "h", level: h[1].length, text: h[2] })
      i++
      continue
    }
    if (RULE.test(line)) {
      out.push({ type: "hr" })
      i++
      continue
    }
    if (QUOTE.test(line)) {
      const inner: string[] = []
      while (i < lines.length && QUOTE.test(lines[i])) inner.push(lines[i++].replace(QUOTE, ""))
      out.push({ type: "quote", blocks: parseBlocks(inner.join("\n")) })
      continue
    }
    if (BULLET.test(line)) {
      const items: string[] = []
      while (i < lines.length && BULLET.test(lines[i])) items.push(lines[i++].replace(BULLET, ""))
      out.push({ type: "ul", items })
      continue
    }
    const num = line.match(NUMBER)
    if (num) {
      const items: string[] = []
      while (i < lines.length && NUMBER.test(lines[i])) items.push(lines[i++].replace(NUMBER, ""))
      out.push({ type: "ol", items, start: parseInt(num[1], 10) || 1 })
      continue
    }
    const para: string[] = []
    while (i < lines.length && lines[i].trim() && !FENCE.test(lines[i]) && !HEADING.test(lines[i]) && !QUOTE.test(lines[i]) && !BULLET.test(lines[i]) && !NUMBER.test(lines[i]) && !RULE.test(lines[i])) {
      para.push(lines[i++].trim())
    }
    out.push({ type: "p", text: para.join(" ") })
  }
  return out
}

function safeHref(raw: string) {
  const u = raw.trim()
  return /^(https?:\/\/|mailto:|\/|#|\.{1,2}\/)/i.test(u) ? u : null
}

const wordy = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c)

/** Inline markdown to React nodes. Everything is a text node or an element we create, never HTML. */
function inline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  let buf = ""
  let i = 0
  let k = 0
  const flush = () => {
    if (buf) out.push(buf)
    buf = ""
  }
  const closing = (mark: string, from: number) => {
    let j = text.indexOf(mark, from)
    while (j !== -1) {
      const after = text[j + mark.length]
      const before = text[j - 1]
      if (before !== " " && (mark !== "_" || !wordy(after)) && after !== mark[0]) return j
      j = text.indexOf(mark, j + 1)
    }
    return -1
  }
  while (i < text.length) {
    const ch = text[i]
    if (ch === "\\" && i + 1 < text.length && /[\\`*_~[\]()#>+!-]/.test(text[i + 1])) {
      buf += text[i + 1]
      i += 2
      continue
    }
    if (ch === "`") {
      const end = text.indexOf("`", i + 1)
      if (end > i + 1) {
        flush()
        out.push(
          <code key={k++} className="rounded-[5px] border border-border bg-sunken px-1 py-px font-mono text-[0.85em] text-fg">
            {text.slice(i + 1, end)}
          </code>
        )
        i = end + 1
        continue
      }
    }
    let matched = false
    for (const [mark, Tag, cls] of [
      ["**", "strong", "font-semibold text-fg"],
      ["__", "strong", "font-semibold text-fg"],
      ["~~", "s", "text-fg-muted"],
    ] as const) {
      if (text.startsWith(mark, i) && text[i + 2] !== " ") {
        const end = closing(mark, i + 2)
        if (end > i + 2) {
          flush()
          out.push(
            <Tag key={k++} className={cls}>
              {inline(text.slice(i + 2, end))}
            </Tag>
          )
          i = end + 2
          matched = true
          break
        }
      }
    }
    if (matched) continue
    if ((ch === "*" || ch === "_") && text[i + 1] !== " " && text[i + 1] !== ch && (ch === "*" || !wordy(text[i - 1]))) {
      const end = closing(ch, i + 1)
      if (end > i + 1) {
        flush()
        out.push(
          <em key={k++} className="italic">
            {inline(text.slice(i + 1, end))}
          </em>
        )
        i = end + 1
        continue
      }
    }
    if (ch === "[") {
      const mid = text.indexOf("](", i + 1)
      const end = mid > 0 ? text.indexOf(")", mid + 2) : -1
      if (mid > i && end > mid) {
        const label = text.slice(i + 1, mid)
        const href = safeHref(text.slice(mid + 2, end))
        flush()
        out.push(
          href ? (
            <a
              key={k++}
              href={href}
              target={/^https?:/i.test(href) ? "_blank" : undefined}
              rel={/^https?:/i.test(href) ? "noopener noreferrer" : undefined}
              className="rounded-sm text-accent-fg underline decoration-accent-line underline-offset-4 outline-none hover:decoration-accent focus-visible:ring-2 focus-visible:ring-accent"
            >
              {inline(label)}
            </a>
          ) : (
            <span key={k++}>{inline(label)}</span>
          )
        )
        i = end + 1
        continue
      }
    }
    buf += ch
    i++
  }
  flush()
  return out
}

const HEADING_CLASS: Record<number, string> = {
  1: "text-2xl font-medium tracking-[-0.02em] text-fg",
  2: "text-xl font-medium tracking-[-0.014em] text-fg",
  3: "text-base font-medium text-fg",
  4: "text-sm font-medium text-fg",
  5: "text-sm font-medium text-fg-muted",
  6: "text-xs font-medium tracking-[0.04em] text-fg-muted uppercase",
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h": {
            const Tag = `h${Math.min(6, b.level)}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
            return (
              <Tag key={i} className={cn(HEADING_CLASS[b.level], "text-balance", i > 0 && "mt-5")}>
                {inline(b.text)}
              </Tag>
            )
          }
          case "p":
            return (
              <p key={i} className="text-pretty text-sm leading-[1.65] text-fg">
                {inline(b.text)}
              </p>
            )
          case "code":
            return (
              <pre key={i} className="overflow-x-auto rounded-lg border border-border bg-sunken p-3 font-mono text-xs leading-[1.6] text-fg" data-lang={b.lang || undefined}>
                <code>{b.code}</code>
              </pre>
            )
          case "quote":
            return (
              <blockquote key={i} className="space-y-2 border-l-2 border-border-strong pl-3 text-fg-muted [&_p]:text-fg-muted">
                <Blocks blocks={b.blocks} />
              </blockquote>
            )
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1 pl-5 text-sm leading-[1.6] text-fg marker:text-fg-subtle">
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i} start={b.start} className="list-decimal space-y-1 pl-5 text-sm leading-[1.6] text-fg marker:text-fg-subtle marker:tabular-nums">
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ol>
            )
          case "hr":
            return <hr key={i} className="border-border" />
        }
      })}
    </>
  )
}

/** Renders markdown as React elements: headings, paragraphs, emphasis, links, lists, code and quotes. */
function MarkdownPreview({ source, className }: { source: string; className?: string }) {
  const blocks = React.useMemo(() => parseBlocks(source), [source])
  return (
    <div data-slot="markdown-preview" className={cn("space-y-3", className)}>
      {blocks.length ? <Blocks blocks={blocks} /> : <p className="text-sm text-fg-subtle">Nothing to preview yet.</p>}
    </div>
  )
}

type Tool = { id: string; label: string; icon: React.ReactNode; keys?: string }

const TOOLS: Tool[] = [
  { id: "bold", label: "Bold", icon: <BoldIcon />, keys: "B" },
  { id: "italic", label: "Italic", icon: <ItalicIcon />, keys: "I" },
  { id: "code", label: "Code", icon: <CodeIcon />, keys: "E" },
  { id: "link", label: "Link", icon: <LinkIcon />, keys: "K" },
  { id: "heading", label: "Heading", icon: <HeadingIcon /> },
  { id: "list", label: "Bulleted list", icon: <ListIcon /> },
  { id: "quote", label: "Quote", icon: <TextQuoteIcon /> },
]

const MODES = [
  { value: "write", label: "Write", icon: <PencilIcon /> },
  { value: "split", label: "Split", icon: <Columns2Icon /> },
  { value: "preview", label: "Preview", icon: <EyeIcon /> },
]

/**
 * A markdown editor: a textarea with a formatting toolbar that wraps or
 * unwraps the selection, keyboard shortcuts, and a live preview built from
 * React elements rather than HTML strings. Write, split and preview modes
 * share the same text, and the footer keeps a word count.
 */
function MarkdownEditor({
  value: valueProp,
  defaultValue = SAMPLE,
  onChange,
  mode: modeProp,
  defaultMode = "split",
  onModeChange,
  label = "Release notes",
  placeholder = "Write in markdown…",
  minHeight = 300,
  disabled,
  className,
}: MarkdownEditorProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const [innerMode, setInnerMode] = React.useState<MarkdownEditorMode>(defaultMode)
  const mode = modeProp ?? innerMode
  const [sel, setSel] = React.useState<[number, number]>([0, 0])
  const [mac, setMac] = React.useState(false)
  const ta = React.useRef<HTMLTextAreaElement>(null)
  const pendingSel = React.useRef<[number, number] | null>(null)
  const id = React.useId()

  React.useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform ?? "") || /Mac/.test(navigator.userAgent))
  }, [])

  React.useLayoutEffect(() => {
    const p = pendingSel.current
    const el = ta.current
    if (!p || !el) return
    pendingSel.current = null
    el.focus()
    el.setSelectionRange(p[0], p[1])
    setSel(p)
  }, [value])

  const setMode = (m: MarkdownEditorMode) => {
    if (modeProp === undefined) setInnerMode(m)
    onModeChange?.(m)
  }

  const update = (next: string, s: number, e: number) => {
    pendingSel.current = [s, e]
    if (valueProp === undefined) setInner(next)
    onChange?.(next)
  }

  const current = () => {
    const el = ta.current
    return el ? ([el.selectionStart, el.selectionEnd] as [number, number]) : sel
  }

  const wrap = (before: string, after: string, fallback: string) => {
    const [s, e] = current()
    const chosen = value.slice(s, e)
    if (chosen.startsWith(before) && chosen.endsWith(after) && chosen.length >= before.length + after.length) {
      const text = chosen.slice(before.length, chosen.length - after.length)
      update(value.slice(0, s) + text + value.slice(e), s, s + text.length)
      return
    }
    if (value.slice(s - before.length, s) === before && value.slice(e, e + after.length) === after) {
      update(value.slice(0, s - before.length) + chosen + value.slice(e + after.length), s - before.length, e - before.length)
      return
    }
    const text = chosen || fallback
    update(value.slice(0, s) + before + text + after + value.slice(e), s + before.length, s + before.length + text.length)
  }

  const prefixLines = (test: RegExp, add: string) => {
    const [s, e] = current()
    const ls = value.lastIndexOf("\n", s - 1) + 1
    const leRaw = value.indexOf("\n", Math.max(e, ls))
    const le = leRaw === -1 ? value.length : leRaw
    const lines = value.slice(ls, le).split("\n")
    const all = lines.every((l) => test.test(l))
    const next = lines.map((l) => (all ? l.replace(test, "") : add + l.replace(test, ""))).join("\n")
    update(value.slice(0, ls) + next + value.slice(le), ls, ls + next.length)
  }

  const link = () => {
    const [s, e] = current()
    const chosen = value.slice(s, e)
    const isUrl = /^https?:\/\/\S+$/i.test(chosen)
    const text = isUrl ? "link text" : chosen || "link text"
    const url = isUrl ? chosen : "https://"
    const ins = `[${text}](${url})`
    const from = isUrl ? s + 1 : s + 1 + text.length + 2
    const to = isUrl ? s + 1 + text.length : from + url.length
    update(value.slice(0, s) + ins + value.slice(e), from, to)
  }

  const run = (tool: string) => {
    if (disabled) return
    if (tool === "bold") wrap("**", "**", "bold text")
    else if (tool === "italic") wrap("_", "_", "italic text")
    else if (tool === "code") wrap("`", "`", "code")
    else if (tool === "link") link()
    else if (tool === "heading") prefixLines(/^#{1,6}\s+/, "## ")
    else if (tool === "list") prefixLines(/^\s*[-*+]\s+/, "- ")
    else if (tool === "quote") prefixLines(/^>\s?/, "> ")
  }

  const pressed = (tool: string) => {
    const [s, e] = sel
    const m = tool === "bold" ? "**" : tool === "italic" ? "_" : tool === "code" ? "`" : null
    if (!m) return undefined
    const chosen = value.slice(s, e)
    return (chosen.length > m.length * 2 && chosen.startsWith(m) && chosen.endsWith(m)) || (value.slice(s - m.length, s) === m && value.slice(e, e + m.length) === m)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.metaKey || e.ctrlKey) || e.altKey) return
    const key = e.key.toLowerCase()
    const tool = key === "b" ? "bold" : key === "i" ? "italic" : key === "k" ? "link" : key === "e" ? "code" : null
    if (!tool) return
    e.preventDefault()
    // The editor owns these while focused, so a global command palette on Cmd+K does not open.
    e.stopPropagation()
    run(tool)
  }

  const words = value.trim() ? value.trim().split(/\s+/).length : 0
  const chars = value.length
  const combo = (k: string) => (mac ? `⌘${k}` : `Ctrl+${k}`)
  const showEditor = mode !== "preview"
  const showPreview = mode !== "write"

  return (
    <div data-slot="markdown-editor" className={cn("w-full max-w-3xl rounded-xl border border-border bg-surface shadow-raised", disabled && "opacity-60", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-2 py-2">
        <div role="toolbar" aria-label="Formatting" aria-controls={`${id}-text`} className="flex items-center gap-0.5">
          <span className="sr-only">{label}</span>
          {TOOLS.map((t, i) => (
            <React.Fragment key={t.id}>
              {i === 4 ? <span aria-hidden className="mx-1 h-4 w-px bg-border" /> : null}
              <button
                type="button"
                aria-label={t.keys ? `${t.label} (${combo(t.keys)})` : t.label}
                title={t.keys ? `${t.label} (${combo(t.keys)})` : t.label}
                aria-pressed={pressed(t.id)}
                disabled={disabled || !showEditor}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => run(t.id)}
                className={cn(
                  "grid size-8 place-items-center rounded-md text-fg-muted outline-none transition-[background-color,color] duration-[70ms] ease-hairline",
                  "hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40",
                  "aria-pressed:bg-accent-soft aria-pressed:text-accent-fg [&_svg]:size-4"
                )}
              >
                {t.icon}
              </button>
            </React.Fragment>
          ))}
        </div>
        <SegmentedControl size="sm" aria-label="Editor mode" options={MODES} value={mode} onChange={(v) => setMode(v as MarkdownEditorMode)} />
      </div>

      <div className={cn("grid gap-0", showEditor && showPreview && "sm:grid-cols-2")}>
        {showEditor ? (
          <div className={cn("flex flex-col p-2", showPreview && "border-b border-border sm:border-r sm:border-b-0")}>
            <label htmlFor={`${id}-text`} className="sr-only">
              {label}
            </label>
            <textarea
              ref={ta}
              id={`${id}-text`}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              spellCheck
              onChange={(e) => {
                if (valueProp === undefined) setInner(e.target.value)
                onChange?.(e.target.value)
              }}
              onSelect={(e) => setSel([e.currentTarget.selectionStart, e.currentTarget.selectionEnd])}
              onKeyDown={onKeyDown}
              className={cn(
                "block w-full flex-1 resize-y rounded-lg border border-transparent bg-surface px-3 py-2.5 font-mono text-[0.8125rem] leading-[1.65] text-fg outline-none placeholder:text-fg-subtle",
                "transition-[border-color,box-shadow] duration-[140ms] ease-hairline focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
                "disabled:cursor-not-allowed"
              )}
              style={{ minHeight }}
            />
          </div>
        ) : null}
        {showPreview ? (
          <div className="overflow-auto p-5" style={{ minHeight: minHeight + 16 }} aria-live="polite" aria-label="Preview">
            <MarkdownPreview source={value} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-bg px-3 py-1.5 text-[11px] text-fg-subtle">
        <span className="tabular-nums">
          {words.toLocaleString("en-US")} {words === 1 ? "word" : "words"} · {chars.toLocaleString("en-US")} characters
        </span>
        <span className="hidden items-center gap-1.5 sm:inline-flex">
          Markdown
          <kbd className="inline-flex h-4 items-center rounded-[4px] border border-border bg-surface px-1 font-sans text-[10px] font-medium text-fg-muted shadow-key">{combo("B")}</kbd>
          <kbd className="inline-flex h-4 items-center rounded-[4px] border border-border bg-surface px-1 font-sans text-[10px] font-medium text-fg-muted shadow-key">{combo("I")}</kbd>
          <kbd className="inline-flex h-4 items-center rounded-[4px] border border-border bg-surface px-1 font-sans text-[10px] font-medium text-fg-muted shadow-key">{combo("K")}</kbd>
        </span>
      </div>
    </div>
  )
}

export { MarkdownEditor, MarkdownPreview }
export type { MarkdownEditorProps, MarkdownEditorMode }
