"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { RotateCcwIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * An animated terminal window that types each command and prints its output line by line, with a blinking cursor and a replay button.
 * Five line kinds (command, output, success, error, info) each get their own
 * token colour and glyph. Typing pauses while the window is off screen and
 * picks up where it left off; reduced motion prints the whole transcript at
 * once. The box reserves its full height, so nothing below it shifts.
 */
type TerminalLine = {
  /** Commands are typed character by character. Every other kind prints whole. */
  kind?: "command" | "output" | "success" | "error" | "info"
  text: string
  /** Milliseconds to wait before this line starts, overriding the component defaults. */
  delay?: number
}

type TerminalProps = {
  lines?: TerminalLine[]
  title?: string
  /** Prompt printed before each command. */
  prompt?: string
  /** Milliseconds per typed character. */
  typingSpeed?: number
  /** Milliseconds before each output line prints. */
  lineDelay?: number
  /** Milliseconds before a command starts typing. */
  commandDelay?: number
  /** Start over after the last line, with a pause. */
  loop?: boolean
  /** Show the replay button in the title bar. */
  replay?: boolean
  /** Stay dark in both themes, or follow the page theme. */
  appearance?: "dark" | "auto"
  /** Called once the last line has printed. */
  onComplete?: () => void
  className?: string
}

const SAMPLE_LINES: TerminalLine[] = [
  { kind: "command", text: "npx shadcn@latest add https://ui.minidev.pro/r/terminal.json" },
  { kind: "success", text: "Checking registry." },
  { kind: "success", text: "Installing dependencies." },
  { kind: "success", text: "Created 1 file:" },
  { kind: "output", text: "    components/ui/terminal.tsx" },
  { kind: "command", text: "npm run dev", delay: 900 },
  { kind: "info", text: "Next.js 16.0.0 (Turbopack)" },
  { kind: "output", text: "  Local:    http://localhost:3000" },
  { kind: "success", text: "Ready in 412ms" },
]

type Pos = { line: number; char: number }

const GLYPH: Record<string, { mark: string; className: string }> = {
  success: { mark: "✓", className: "text-success" },
  error: { mark: "✕", className: "text-danger" },
  info: { mark: "›", className: "text-info" },
  output: { mark: " ", className: "" },
}

const LINE_TEXT: Record<string, string> = {
  success: "text-fg",
  error: "text-danger",
  info: "text-fg",
  output: "text-fg-muted",
}

/** Deterministic rhythm for keystrokes: no Math.random, so every replay feels the same. */
function jitter(i: number) {
  const s = Math.sin(i * 12.9898) * 43758.5453
  return 0.7 + 0.6 * (s - Math.floor(s))
}

/** Light syntax tint for a command: binary, flags and URLs. */
function tokenize(text: string) {
  const parts: { t: string; c: string }[] = []
  let first = true
  for (const m of text.match(/\s+|\S+/g) ?? []) {
    if (/^\s+$/.test(m)) parts.push({ t: m, c: "" })
    else if (first) {
      parts.push({ t: m, c: "font-medium text-fg" })
      first = false
    } else if (m.includes("://")) parts.push({ t: m, c: "text-info" })
    else if (m.startsWith("-")) parts.push({ t: m, c: "text-fg-muted" })
    else parts.push({ t: m, c: "text-fg" })
  }
  return parts
}

function Cursor() {
  return (
    <span
      aria-hidden
      data-slot="terminal-cursor"
      className="ml-px inline-block h-[1.1em] w-[0.58em] translate-y-[0.2em] rounded-[1px] bg-fg animate-[caret-blink_1.1s_steps(1,end)_infinite]"
    />
  )
}

function CommandRow({ text, typed, prompt, state }: { text: string; typed: number; prompt: string; state: "hidden" | "typing" | "shown" }) {
  const parts = tokenize(text)
  const shown = state === "shown" ? text.length : typed
  let offset = 0
  let cursorPlaced = state !== "typing"
  return (
    <div data-slot="terminal-line" data-kind="command" className={cn("flex gap-2", state === "hidden" && "invisible")}>
      <span className="shrink-0 text-accent-fg select-none">{prompt}</span>
      <span className="min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]">
        {parts.map((p, i) => {
          const start = offset
          offset += p.t.length
          const vis = Math.max(0, Math.min(p.t.length, shown - start))
          const withCursor = !cursorPlaced && shown <= offset
          if (withCursor) cursorPlaced = true
          return (
            <span key={i} className={p.c}>
              {p.t.slice(0, vis)}
              {withCursor ? <Cursor /> : null}
              <span className="invisible">{p.t.slice(vis)}</span>
            </span>
          )
        })}
      </span>
    </div>
  )
}

function OutputRow({ line, hidden }: { line: TerminalLine; hidden: boolean }) {
  const kind = line.kind ?? "output"
  const glyph = GLYPH[kind] ?? GLYPH.output
  return (
    <div data-slot="terminal-line" data-kind={kind} className={cn("flex gap-2", hidden && "invisible")}>
      <span className={cn("w-[1ch] shrink-0 select-none", glyph.className)}>{glyph.mark}</span>
      <span className={cn("min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]", LINE_TEXT[kind] ?? LINE_TEXT.output)}>{line.text}</span>
    </div>
  )
}

function Terminal({
  lines = SAMPLE_LINES,
  title = "Terminal",
  prompt = "❯",
  typingSpeed = 26,
  lineDelay = 160,
  commandDelay = 600,
  loop = false,
  replay = true,
  appearance = "dark",
  onComplete,
  className,
}: TerminalProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [pos, setPos] = React.useState<Pos>({ line: 0, char: 0 })
  const done = pos.line >= lines.length
  const allShown = Boolean(reduce) || done

  React.useEffect(() => {
    if (reduce || !inView) return
    if (done) {
      if (!loop) return
      const t = setTimeout(() => setPos({ line: 0, char: 0 }), 2400)
      return () => clearTimeout(t)
    }
    const cur = lines[pos.line]
    const isCommand = cur.kind === "command"
    let wait: number
    let next: Pos
    if (isCommand && pos.char < cur.text.length) {
      wait = pos.char === 0 ? (cur.delay ?? commandDelay) : typingSpeed * jitter(pos.char)
      next = { line: pos.line, char: pos.char + 1 }
    } else {
      // A finished command pauses as if Enter were pressed; output lines wait their delay.
      wait = isCommand ? 280 : (cur.delay ?? lineDelay)
      next = { line: pos.line + 1, char: 0 }
    }
    const t = setTimeout(() => setPos(next), wait)
    return () => clearTimeout(t)
  }, [pos, inView, reduce, done, lines, loop, typingSpeed, lineDelay, commandDelay])

  const completeRef = React.useRef(onComplete)
  React.useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])
  React.useEffect(() => {
    if (allShown) completeRef.current?.()
  }, [allShown])

  const transcript = lines.map((l) => (l.kind === "command" ? `${prompt} ${l.text}` : l.text)).join("\n")

  return (
    <div
      ref={ref}
      data-slot="terminal"
      data-tier="premium"
      // A screen is not a material surface: the forced dark window stays hairline inside glass, metal and paper.
      data-material={appearance === "dark" ? "hairline" : undefined}
      className={cn(
        appearance === "dark" && "dark",
        "mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg text-fg shadow-raised",
        className
      )}
    >
      <div data-slot="terminal-bar" className="grid h-10 grid-cols-[1fr_auto_1fr] items-center border-b border-border bg-surface px-3">
        <span aria-hidden className="flex items-center gap-1.5 pl-1">
          <span className="size-2.5 rounded-full bg-danger/80" />
          <span className="size-2.5 rounded-full bg-warning/80" />
          <span className="size-2.5 rounded-full bg-success/80" />
        </span>
        <span className="truncate px-2 text-xs text-fg-muted">{title}</span>
        <span className="flex justify-end">
          {replay ? (
            <button
              type="button"
              aria-label="Replay"
              onClick={() => setPos({ line: 0, char: 0 })}
              className="grid size-7 place-items-center rounded-md text-fg-subtle outline-none transition-colors duration-[140ms] hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
            >
              <RotateCcwIcon className="size-3.5" />
            </button>
          ) : null}
        </span>
      </div>
      <div aria-hidden data-slot="terminal-body" className="p-4 font-mono text-[12.5px] leading-[1.75] tabular-nums">
        {lines.map((l, i) => {
          const state = allShown || i < pos.line ? "shown" : i === pos.line ? "typing" : "hidden"
          return l.kind === "command" ? (
            <CommandRow key={i} text={l.text} typed={pos.char} prompt={prompt} state={state} />
          ) : (
            <OutputRow key={i} line={l} hidden={state !== "shown"} />
          )
        })}
        <div data-slot="terminal-line" data-kind="idle" className={cn("flex gap-2", !allShown && "invisible")}>
          <span className="shrink-0 text-accent-fg select-none">{prompt}</span>
          <span>{allShown ? <Cursor /> : null}</span>
        </div>
      </div>
      <pre className="sr-only">{transcript}</pre>
    </div>
  )
}

export { Terminal }
export type { TerminalProps, TerminalLine }
