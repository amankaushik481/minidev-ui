"use client"
import * as React from "react"
import { ArrowLeftRightIcon } from "lucide-react"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { StatusBadge } from "@/registry/ui/status-badge"
import { contrast, fixContrast, oklchToHex, parseColor } from "@/lib/color"
import { ShareLink, useShareUrl } from "./share-url"

function Field({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  const o = parseColor(value)
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[13px] font-medium text-fg">{label}</label>
      <div className="flex gap-2">
        <input type="color" aria-label={`Pick ${label.toLowerCase()}`} value={o ? oklchToHex(o).toLowerCase() : "#000000"} onChange={(e) => onChange(e.target.value.toUpperCase())} className="h-9 w-12 shrink-0 cursor-pointer rounded-md border border-border bg-transparent" />
        <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} className="font-mono" spellCheck={false} aria-invalid={!o} aria-describedby={o ? undefined : `${id}-err`} />
      </div>
      {o ? null : <p id={`${id}-err`} className="text-[12.5px] text-danger">Use hex, rgb(), hsl() or oklch(), for example #6B7280.</p>}
    </div>
  )
}

const CHECKS = [
  { label: "Normal text", level: "AA", min: 4.5 },
  { label: "Normal text", level: "AAA", min: 7 },
  { label: "Large text (24px, or 18.66px bold)", level: "AA", min: 3 },
  { label: "Large text", level: "AAA", min: 4.5 },
  { label: "UI components and graphics", level: "AA", min: 3 },
]

export function ContrastChecker() {
  const [fg, setFg] = React.useState("#6B7280")
  const [bg, setBg] = React.useState("#FFFFFF")
  const fo = parseColor(fg)
  const bo = parseColor(bg)
  const fh = fo ? oklchToHex(fo) : "#000000"
  const bh = bo ? oklchToHex(bo) : "#FFFFFF"
  const ratio = contrast(fh, bh)
  const valid = !!fo && !!bo
  const fix = valid && ratio < 4.5 ? fixContrast(fo, bh, 4.5) : null
  const link = useShareUrl({ fg, bg }, (p) => {
    const f = p.get("fg")
    const b = p.get("bg")
    if (f && parseColor(f)) setFg(f)
    if (b && parseColor(b)) setBg(b)
  })
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 items-end gap-4 rounded-2xl border border-border bg-surface p-5 shadow-raised md:grid-cols-[1fr_auto_1fr]">
        <Field id="cc-fg" label="Text color" value={fg} onChange={setFg} />
        <Button variant="outline" size="icon" aria-label="Swap colors" onClick={() => { setFg(bg); setBg(fg) }}>
          <ArrowLeftRightIcon />
        </Button>
        <Field id="cc-bg" label="Background" value={bg} onChange={setBg} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border p-7" style={{ background: bh, color: fh }}>
          <p className="text-[13px] font-medium opacity-90">Preview</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">The quick brown fox</p>
          <p className="mt-3 text-[15px] leading-[1.6]">Body text at 15px. If this is hard to read, most people on a phone in sunlight will not read it at all.</p>
          <p className="mt-3 text-[12px]">Small print at 12px, where low contrast hurts most.</p>
          <span className="mt-4 inline-flex h-9 items-center rounded-lg border-2 px-3 text-sm font-medium" style={{ borderColor: fh }}>Outlined button</span>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-raised">
          <p className="text-[13px] text-fg-muted">Contrast ratio</p>
          <p className="mt-1 text-5xl font-semibold tracking-[-0.04em] text-fg tabular-nums" aria-live="polite">
            {valid ? <>{ratio.toFixed(2)}<span className="text-2xl text-fg-muted">:1</span></> : <span className="text-fg-subtle">--</span>}
          </p>
          <ul className="mt-5 space-y-2">
            {CHECKS.map((c) => (
              <li key={c.label + c.level} className="flex items-center justify-between gap-3 text-[13px]">
                <span className="text-fg">{c.label} <span className="text-fg-subtle tabular-nums">({c.level}, {c.min}:1)</span></span>
                {/* WCAG compares the unrounded ratio: 4.49 fails AA even though it rounds to 4.5. */}
                {valid ? <StatusBadge tone={ratio >= c.min ? "success" : "danger"}>{ratio >= c.min ? "Pass" : "Fail"}</StatusBadge> : <StatusBadge tone="neutral">Invalid color</StatusBadge>}
              </li>
            ))}
          </ul>
          {fix ? (
            <div className="mt-5 rounded-xl border border-accent-line bg-accent-soft p-3 text-[13px] text-fg">
              Closest passing text color (AA):{" "}
              <button type="button" onClick={() => setFg(oklchToHex(fix))} className="inline-flex items-center gap-1.5 font-mono underline underline-offset-4">
                <span className="size-3.5 rounded border border-border" style={{ background: oklchToHex(fix) }} />
                {oklchToHex(fix)}
              </button>
            </div>
          ) : null}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-[12px] text-fg-muted">The link keeps both colors.</p>
            <ShareLink href={link} />
          </div>
        </div>
      </div>
    </div>
  )
}
