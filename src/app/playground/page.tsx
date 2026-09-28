"use client"
import * as React from "react"
import { CheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { AuthDemo, BillingDemo, ChartDemo, CommandDemo, DataDemo, SettingsDemo } from "@/components/landing/bento"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeBlock } from "@/registry/ui/code-block"
import { StatusBadge } from "@/registry/ui/status-badge"
import { useTheme } from "@/components/theme-toggle"

type Theme = { hue: number; chroma: number; radius: number; tint: number }
const DEFAULT: Theme = { hue: 283, chroma: 0.215, radius: 8, tint: 264 }

const PRESETS: { name: string; t: Partial<Theme> }[] = [
  { name: "Hairline", t: { hue: 283, chroma: 0.215, radius: 8, tint: 264 } },
  { name: "Ocean", t: { hue: 235, chroma: 0.17, radius: 10, tint: 240 } },
  { name: "Forest", t: { hue: 155, chroma: 0.14, radius: 6, tint: 160 } },
  { name: "Ember", t: { hue: 35, chroma: 0.19, radius: 12, tint: 50 } },
  { name: "Graphite", t: { hue: 264, chroma: 0.02, radius: 4, tint: 264 } },
  { name: "Rose", t: { hue: 5, chroma: 0.19, radius: 14, tint: 350 } },
]

function tokens({ hue, chroma, radius, tint }: Theme, dark: boolean) {
  const c = chroma
  const light = {
    "--accent": `oklch(0.53 ${c} ${hue})`,
    "--accent-hover": `oklch(0.48 ${c} ${hue})`,
    "--accent-fg": `oklch(0.47 ${Math.min(c, 0.2)} ${hue})`,
    "--accent-soft": `oklch(0.53 ${c} ${hue} / 0.09)`,
    "--accent-line": `oklch(0.53 ${c} ${hue} / 0.28)`,
    "--accent-2": `oklch(0.62 ${Math.max(c - 0.03, 0.02)} ${(hue + 35) % 360})`,
    "--bg": `oklch(0.985 0.0015 ${tint})`,
    "--sunken": `oklch(0.967 0.0025 ${tint})`,
    "--border": `oklch(0.917 0.004 ${tint})`,
    "--border-strong": `oklch(0.862 0.006 ${tint})`,
  }
  const darkT = {
    "--accent": `oklch(0.7 ${Math.min(c, 0.165)} ${hue})`,
    "--accent-hover": `oklch(0.76 ${Math.min(c, 0.15)} ${hue})`,
    "--accent-fg": `oklch(0.78 ${Math.min(c, 0.13)} ${hue})`,
    "--accent-soft": `oklch(0.7 ${Math.min(c, 0.165)} ${hue} / 0.13)`,
    "--accent-line": `oklch(0.7 ${Math.min(c, 0.165)} ${hue} / 0.35)`,
    "--accent-2": `oklch(0.76 ${Math.max(Math.min(c, 0.14) - 0.02, 0.02)} ${(hue + 40) % 360})`,
    "--bg": `oklch(0.145 0.004 ${tint})`,
    "--sunken": `oklch(0.125 0.004 ${tint})`,
    "--border": `oklch(0.262 0.006 ${tint})`,
    "--border-strong": `oklch(0.33 0.008 ${tint})`,
  }
  const radii = {
    "--radius-md": `${Math.max(radius - 2, 2)}px`,
    "--radius-lg": `${radius}px`,
    "--radius-xl": `${radius + 4}px`,
    "--radius-2xl": `${radius + 6}px`,
  }
  return { active: { ...(dark ? darkT : light), ...radii }, light, darkT, radii }
}

function Slider({ label, value, min, max, step, onChange, format, track }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; format?: (n: number) => string; track?: string }) {
  const id = React.useId()
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[0.8125rem] font-medium text-fg">{label}</label>
        <span className="font-mono text-[11px] text-fg-muted tabular-nums">{format ? format(value) : value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-full bg-sunken outline-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-border [&::-moz-range-thumb]:bg-white"
        style={track ? { background: track } : undefined}
      />
    </div>
  )
}

export default function Playground() {
  const [t, setT] = React.useState<Theme>(DEFAULT)
  const [copied, setCopied] = React.useState(false)
  const set = (p: Partial<Theme>) => setT((x) => ({ ...x, ...p }))
  const { dark, setDark } = useTheme()
  const tk = tokens(t, dark)
  const css = `:root {\n${Object.entries({ ...tk.light, ...tk.radii }).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}\n\n.dark {\n${Object.entries(tk.darkT).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`
  const hueTrack = `linear-gradient(90deg, ${Array.from({ length: 13 }, (_, i) => `oklch(0.62 0.17 ${i * 30})`).join(",")})`

  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader solid />
      <main className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Theme playground</p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-fg sm:text-5xl">Make it yours.</h1>
          <p className="mt-4 text-[1.0625rem] leading-[1.65] text-fg-muted">
            Move a slider and every component on the right follows, because they only speak in tokens. When it looks like your brand, copy the CSS.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="h-fit space-y-6 rounded-2xl border border-border bg-surface p-5 shadow-raised lg:sticky lg:top-20">
            <div>
              <p className="text-[0.8125rem] font-medium text-fg">Presets</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {PRESETS.map((p) => {
                  const on = p.t.hue === t.hue && p.t.chroma === t.chroma && p.t.radius === t.radius
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => set(p.t)}
                      aria-pressed={on}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-lg border p-2 text-left text-[11px] font-medium outline-none transition-[border-color,box-shadow] duration-[140ms] focus-visible:ring-2 focus-visible:ring-accent",
                        on ? "border-accent text-fg shadow-[0_0_0_3px_var(--accent-soft)]" : "border-border text-fg-muted hover:border-border-strong"
                      )}
                    >
                      <span className="h-4 w-full rounded" style={{ background: `oklch(0.55 ${p.t.chroma} ${p.t.hue})`, borderRadius: p.t.radius ? Math.min(p.t.radius, 8) / 2 : 0 }} />
                      {p.name}
                    </button>
                  )
                })}
              </div>
            </div>
            <Slider label="Accent hue" value={t.hue} min={0} max={359} step={1} onChange={(hue) => set({ hue })} format={(n) => `${n}°`} track={hueTrack} />
            <Slider label="Accent chroma" value={t.chroma} min={0.02} max={0.25} step={0.005} onChange={(chroma) => set({ chroma })} format={(n) => n.toFixed(3)} />
            <Slider label="Neutral tint" value={t.tint} min={0} max={359} step={1} onChange={(tint) => set({ tint })} format={(n) => `${n}°`} />
            <Slider label="Radius" value={t.radius} min={0} max={16} step={1} onChange={(radius) => set({ radius })} format={(n) => `${n}px`} />
            <div className="flex items-center justify-between border-t border-border pt-5">
              <div className="flex rounded-lg border border-border bg-sunken p-[3px] text-xs font-medium">
                {(["Light", "Dark"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setDark(m === "Dark")} className={cn("rounded-md px-3 py-1 outline-none focus-visible:ring-2 focus-visible:ring-accent", (m === "Dark") === dark ? "bg-surface text-fg shadow-[0_1px_2px_0_oklch(0_0_0/0.08),0_0_0_1px_var(--border)]" : "text-fg-muted")}>{m}</button>
                ))}
              </div>
              <Button size="sm" variant="ghost" onClick={() => setT(DEFAULT)}><RotateCcwIcon /> Reset</Button>
            </div>
            <Button
              className="w-full"
              onClick={async () => {
                try { await navigator.clipboard.writeText(css) } catch {}
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? "Copied" : "Copy CSS variables"}
            </Button>
          </aside>

          <div className="min-w-0 space-y-6">
            <div style={tk.active as React.CSSProperties} className={cn("rounded-2xl border border-border bg-bg p-4 text-fg shadow-raised transition-colors duration-300 sm:p-6")}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Button variant="accent" size="sm">Upgrade</Button>
                <Button size="sm">Save changes</Button>
                <Button size="sm" variant="outline">Invite</Button>
                <Button size="sm" variant="soft">Share</Button>
                <StatusBadge tone="accent">Beta</StatusBadge>
                <StatusBadge tone="success">Live</StatusBadge>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised"><DataDemo /></div>
                  <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised"><ChartDemo /></div>
                  <CommandDemo />
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised"><BillingDemo /></div>
                  <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised"><SettingsDemo /></div>
                  <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised"><AuthDemo /></div>
                </div>
              </div>
            </div>
            <CodeBlock language="css" filename="globals.css" code={css} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
