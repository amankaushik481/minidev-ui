"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * CodeBlock — an ink well in both themes. Lightweight token colouring
 * (strings, keywords, JSX tags, comments) with zero dependencies.
 */
const KEYWORDS = new Set([
  "import", "from", "export", "default", "function", "return", "const", "let", "var",
  "if", "else", "await", "async", "new", "type", "interface", "extends", "as", "npm",
  "npx", "pnpm", "yarn", "bun", "true", "false", "null", "undefined",
])

function highlight(code: string) {
  const out: React.ReactNode[] = []
  const re = /((?<![:\w])\/\/[^\n]*|(?<![\w&])#(?![\da-fA-F]{3,8}\b)[^\n]*$|\/\*[^\n]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.]*)|(\b[A-Za-z_]\w*\b)|(\d+(?:\.\d+)?)/gm
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const [t, comment, str, tag, word, num] = m
    if (comment) out.push(<span key={k++} className="text-[color-mix(in_oklch,var(--code-fg)_45%,transparent)] italic">{t}</span>)
    else if (str) out.push(<span key={k++} className="text-[var(--code-str)]">{t}</span>)
    else if (tag) out.push(<span key={k++} className="text-[var(--code-tag)]">{t}</span>)
    else if (word && KEYWORDS.has(word)) out.push(<span key={k++} className="text-[var(--code-kw)]">{t}</span>)
    else if (word && /^[A-Z]/.test(word)) out.push(<span key={k++} className="text-[var(--code-type)]">{t}</span>)
    else if (num) out.push(<span key={k++} className="text-[var(--code-num)]">{t}</span>)
    else out.push(t)
    last = m.index + t.length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
  showLineNumbers = false,
}: {
  code: string
  language?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
}) {
  const [copied, setCopied] = React.useState(false)
  const lines = React.useMemo(() => code.replace(/\n$/, "").split("\n"), [code])
  return (
    <div
      data-slot="code-block"
      className={cn(
        "group/code relative overflow-hidden rounded-xl border border-[var(--code-border)] bg-[var(--code-bg)] text-[var(--code-fg)] shadow-md",
        "[--code-bg:oklch(0.17_0.008_270)] [--code-border:oklch(0.26_0.008_270)] [--code-fg:oklch(0.9_0.006_270)]",
        "[--code-kw:oklch(0.76_0.13_300)] [--code-str:oklch(0.8_0.11_160)] [--code-tag:oklch(0.78_0.11_230)] [--code-type:oklch(0.84_0.1_80)] [--code-num:oklch(0.8_0.12_40)]",
        "dark:[--code-bg:oklch(0.12_0.005_270)] dark:[--code-border:oklch(0.24_0.006_270)]",
        className
      )}
    >
      <div className="flex h-10 items-center justify-between gap-3 border-b border-[var(--code-border)] pr-2 pl-4">
        <div className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-[color-mix(in_oklch,var(--code-fg)_55%,transparent)]">
          {filename ? <span className="truncate">{filename}</span> : null}
          <span className="rounded border border-[var(--code-border)] px-1.5 py-px uppercase tracking-[0.06em]">{language}</span>
        </div>
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={async () => {
            try { await navigator.clipboard.writeText(code) } catch {}
            setCopied(true)
            setTimeout(() => setCopied(false), 1400)
          }}
          className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] font-medium text-[color-mix(in_oklch,var(--code-fg)_65%,transparent)] outline-none transition-[color,background-color] duration-[70ms] hover:bg-white/8 hover:text-[var(--code-fg)] focus-visible:ring-2 focus-visible:ring-accent"
        >
          {copied ? <CheckIcon className="size-3.5 text-[var(--code-str)]" /> : <CopyIcon className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto py-3.5 font-mono text-[12.5px] leading-[1.7]">
        <code className="grid">
          {lines.map((line, i) => (
            <span key={i} className="px-4">
              {showLineNumbers ? (
                <span className="mr-4 inline-block w-5 text-right text-[color-mix(in_oklch,var(--code-fg)_28%,transparent)] select-none">{i + 1}</span>
              ) : null}
              {highlight(line)}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
export { CodeBlock }
