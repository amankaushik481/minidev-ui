"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { Slider } from "@/registry/ui/slider"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { fmtOklch, hexToOklch, toGamut, type Oklch } from "@/lib/color"
import { Control } from "./shadow-generator"

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))

const NEUTRALS = { Neutral: { h: 0, c: 0 }, Zinc: { h: 286, c: 0.006 }, Slate: { h: 257, c: 0.018 }, Stone: { h: 60, c: 0.008 }, Warm: { h: 75, c: 0.014 } } as const
type Neutral = keyof typeof NEUTRALS

function build(brand: Oklch, neutral: Neutral, radius: number) {
  const n = NEUTRALS[neutral]
  const g = (l: number, cMul = 1) => fmtOklch({ l, c: n.c * cMul, h: n.h })
  const accent = toGamut({ l: Math.min(0.68, Math.max(0.5, brand.l)), c: brand.c, h: brand.h })
  const accentDark = toGamut({ l: Math.min(0.78, accent.l + 0.1), c: brand.c * 0.95, h: brand.h })
  const onAccent = (o: Oklch) => (o.l > 0.68 ? g(0.2) : "oklch(0.985 0 0)")
  const chart = (l: number, i: number) => fmtOklch(toGamut({ l, c: Math.max(0.12, brand.c * 0.9), h: (brand.h + i * 52) % 360 }))
  const light: Record<string, string> = {
    radius: `${radius / 16}rem`,
    background: g(1, 0),
    foreground: g(0.145, 1.4),
    card: g(1, 0),
    "card-foreground": g(0.145, 1.4),
    popover: g(1, 0),
    "popover-foreground": g(0.145, 1.4),
    primary: fmtOklch(accent),
    "primary-foreground": onAccent(accent),
    secondary: g(0.97),
    "secondary-foreground": g(0.205, 1.4),
    muted: g(0.97),
    "muted-foreground": g(0.52, 2),
    accent: g(0.97),
    "accent-foreground": g(0.205, 1.4),
    destructive: "oklch(0.577 0.245 27.325)",
    border: g(0.922),
    input: g(0.922),
    ring: fmtOklch({ ...accent, l: Math.min(0.75, accent.l + 0.08) }),
    ...Object.fromEntries([0, 1, 2, 3, 4].map((i) => [`chart-${i + 1}`, chart(0.62 + (i % 2) * 0.08, i)])),
    sidebar: g(0.985),
    "sidebar-foreground": g(0.145, 1.4),
    "sidebar-primary": fmtOklch(accent),
    "sidebar-primary-foreground": onAccent(accent),
    "sidebar-accent": g(0.97),
    "sidebar-accent-foreground": g(0.205, 1.4),
    "sidebar-border": g(0.922),
    "sidebar-ring": fmtOklch(accent),
  }
  const dark: Record<string, string> = {
    background: g(0.145, 1.4),
    foreground: g(0.985),
    card: g(0.205, 1.4),
    "card-foreground": g(0.985),
    popover: g(0.205, 1.4),
    "popover-foreground": g(0.985),
    primary: fmtOklch(accentDark),
    "primary-foreground": onAccent(accentDark),
    secondary: g(0.269, 1.4),
    "secondary-foreground": g(0.985),
    muted: g(0.269, 1.4),
    "muted-foreground": g(0.708, 1.4),
    accent: g(0.269, 1.4),
    "accent-foreground": g(0.985),
    destructive: "oklch(0.704 0.191 22.216)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: fmtOklch({ ...accentDark, l: accentDark.l - 0.08 }),
    ...Object.fromEntries([0, 1, 2, 3, 4].map((i) => [`chart-${i + 1}`, chart(0.66 + (i % 2) * 0.08, i)])),
    sidebar: g(0.205, 1.4),
    "sidebar-foreground": g(0.985),
    "sidebar-primary": fmtOklch(accentDark),
    "sidebar-primary-foreground": onAccent(accentDark),
    "sidebar-accent": g(0.269, 1.4),
    "sidebar-accent-foreground": g(0.985),
    "sidebar-border": "oklch(1 0 0 / 10%)",
    "sidebar-ring": fmtOklch(accentDark),
  }
  return { light, dark }
}

function Preview({ vars, label }: { vars: Record<string, string>; label: string }) {
  const v = (k: string) => `var(--t-${k})`
  const style = Object.fromEntries(Object.entries(vars).map(([k, x]) => [`--t-${k}`, x])) as React.CSSProperties
  const r = vars.radius ?? "0.625rem"
  return (
    <div style={{ ...style, background: v("background"), color: v("foreground"), borderRadius: 20 }} className="border border-border p-5">
      <p className="text-xs font-medium tracking-[0.06em] uppercase" style={{ color: v("muted-foreground") }}>{label}</p>
      <div className="mt-3 p-4" style={{ background: v("card"), color: v("card-foreground"), border: `1px solid ${v("border")}`, borderRadius: `calc(${r} + 4px)` }}>
        <p className="text-sm font-medium">Upgrade to Team</p>
        <p className="mt-1 text-xs" style={{ color: v("muted-foreground") }}>Unlimited projects, SSO and priority support.</p>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {[40, 65, 50, 85, 70].map((h, i) => (
            <span key={i} className="flex-1" style={{ height: `${h}%`, background: v(`chart-${i + 1}`), borderRadius: 4 }} />
          ))}
        </div>
        <div className="mt-3 h-9 px-3 text-sm leading-9" style={{ border: `1px solid ${v("input")}`, borderRadius: r, color: v("muted-foreground") }}>you@company.com</div>
        <div className="mt-3 flex gap-2">
          <span className="h-9 px-4 text-sm leading-9 font-medium" style={{ background: v("primary"), color: v("primary-foreground"), borderRadius: r }}>Upgrade</span>
          <span className="h-9 px-4 text-sm leading-9 font-medium" style={{ background: v("secondary"), color: v("secondary-foreground"), borderRadius: r }}>Later</span>
          <span className="ml-auto h-6 self-center px-2 text-xs leading-6" style={{ background: v("muted"), color: v("muted-foreground"), borderRadius: 999 }}>Pro</span>
        </div>
      </div>
    </div>
  )
}

export function ThemeGenerator() {
  const [hex, setHex] = React.useState("#6D5BFF")
  const [neutral, setNeutral] = React.useState<Neutral>("Zinc")
  const [radius, setRadius] = React.useState(10)
  const brand = hexToOklch(/^#[0-9a-f]{6}$/i.test(hex) ? hex : "#6D5BFF")!
  const { light, dark } = build(brand, neutral, radius)
  const block = (sel: string, vars: Record<string, string>) => `${sel} {\n${Object.entries(vars).map(([k, x]) => `  --${k}: ${x};`).join("\n")}\n}`
  const css = `${block(":root", light)}\n\n${block(".dark", dark)}`
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-surface p-5 shadow-raised md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="tg-hex" className="text-[13px] font-medium text-fg">Brand color</label>
          <div className="flex gap-2">
            <input type="color" aria-label="Pick a brand color" value={/^#[0-9a-f]{6}$/i.test(hex) ? hex : "#6d5bff"} onChange={(e) => setHex(e.target.value.toUpperCase())} className="h-9 w-12 shrink-0 cursor-pointer rounded-md border border-border bg-transparent" />
            <Input id="tg-hex" value={hex} onChange={(e) => setHex(e.target.value)} className="font-mono" />
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Neutral</span>
          <SegmentedControl size="sm" fullWidth items={Object.keys(NEUTRALS)} value={neutral} onChange={(v) => setNeutral(v as Neutral)} aria-label="Neutral" />
        </div>
        <Control label="Radius" value={`${radius}px`}>
          <Slider value={[radius]} min={0} max={20} onValueChange={(v) => setRadius(num(v))} showValue={false} aria-label="Radius" />
        </Control>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Preview vars={light} label="Light" />
        <Preview vars={{ ...dark, radius: light.radius }} label="Dark" />
      </div>
      <CodeBlock language="css" filename="globals.css (paste under @import &quot;tailwindcss&quot;)" code={css} className="max-h-[520px] overflow-y-auto" />
    </div>
  )
}
