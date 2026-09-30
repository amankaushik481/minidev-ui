"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { BrandKit } from "@/components/templates/brand-kit"
import { GEIST, MONO, SERIF, Tile, base, type Brand } from "@/components/templates/brands"
import { accentTokens, hexToOklch } from "@/lib/color"

const SWATCHES = ["#6D5BFF", "#0E9F6E", "#E0533F", "#FF8A3D", "#2F6FEB", "#0E8AA6", "#C026D3", "#111827"]

const VOICES = {
  Calm: { are: ["Clear", "Steady", "Kind"], not: ["Pushy", "Vague", "Loud"], say: (n: string) => `${n} handles it. Here is what changed.`, never: "Revolutionize your workflow today!" },
  Bold: { are: ["Direct", "Confident", "Brief"], not: ["Timid", "Wordy", "Corporate"], say: (n: string) => `${n}. Done in a day.`, never: "We are a leading provider of innovative solutions." },
  Playful: { are: ["Warm", "Witty", "Honest"], not: ["Stiff", "Snarky", "Try-hard"], say: (n: string) => `Meet ${n}. Your new favorite tab.`, never: "Leverage synergies across your ecosystem." },
  Technical: { are: ["Precise", "Transparent", "Calm"], not: ["Hype", "Magic", "Hand-wavy"], say: (n: string) => `${n} ships in 40 KB with zero dependencies.`, never: "AI-powered next-gen platform for everything." },
} as const

type Voice = keyof typeof VOICES
type Type = "Sans" | "Serif" | "Mono"
type Shape = "Square" | "Round"
type Mat = "hairline" | "glass" | "metal" | "paper"

export function BrandKitGenerator() {
  const [name, setName] = React.useState("Northwind")
  const [tagline, setTagline] = React.useState("Payroll that runs itself.")
  const [color, setColor] = React.useState("#6D5BFF")
  const [type, setType] = React.useState<Type>("Sans")
  const [shape, setShape] = React.useState<Shape>("Square")
  const [voice, setVoice] = React.useState<Voice>("Calm")
  const [material, setMaterial] = React.useState<Mat>("hairline")

  const valid = /^#[0-9a-f]{6}$/i.test(color)
  const vars = accentTokens(valid ? color : "#6D5BFF") as unknown as React.CSSProperties
  const display = type === "Serif" ? SERIF : type === "Mono" ? MONO : GEIST
  const clean = name.trim() || "Brand"
  const initials = clean.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  const hueName = React.useMemo(() => {
    const o = hexToOklch(valid ? color : "#6D5BFF")
    if (!o || o.c < 0.04) return "Graphite"
    const names = ["Red", "Coral", "Amber", "Gold", "Lime", "Green", "Jade", "Teal", "Cyan", "Azure", "Blue", "Indigo", "Violet", "Orchid", "Magenta", "Rose"]
    return names[Math.floor((((o.h + 11) % 360) / 360) * names.length)]
  }, [color, valid])
  const v = VOICES[voice]

  const brand: Brand = {
    slug: clean.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "brand",
    name: clean,
    kind: "Brand kit",
    tagline: tagline || "Your tagline here.",
    className: "",
    material,
    mark: <Tile round={shape === "Round"}>{initials}</Tile>,
    wordmark: (
      <span style={{ fontFamily: display }} className={type === "Serif" ? "tracking-[-0.02em]" : "font-semibold tracking-[-0.045em]"}>
        {clean}
      </span>
    ),
    display: { family: type === "Serif" ? "A classic serif" : type === "Mono" ? "Geist Mono" : "Geist", css: display, sample: tagline || "Your tagline here." },
    text: { family: "Geist", css: GEIST },
    voice: { are: [...v.are], not: [...v.not], say: v.say(clean), never: v.never },
    palette: base(`${clean} ${hueName}`, "Partner"),
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-surface p-5 shadow-raised md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label htmlFor="bk-name" className="text-[13px] font-medium text-fg">Name</label>
          <Input id="bk-name" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="bk-tag" className="block pt-2 text-[13px] font-medium text-fg">Tagline</label>
          <Input id="bk-tag" value={tagline} maxLength={60} onChange={(e) => setTagline(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="bk-color" className="text-[13px] font-medium text-fg">Brand color</label>
          <div className="flex gap-2">
            <input type="color" aria-label="Pick a brand color" value={valid ? color : "#6d5bff"} onChange={(e) => setColor(e.target.value.toUpperCase())} className="h-9 w-12 shrink-0 cursor-pointer rounded-md border border-border bg-transparent" />
            <Input id="bk-color" value={color} onChange={(e) => setColor(e.target.value)} className="font-mono" />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {SWATCHES.map((c) => (
              <button key={c} type="button" aria-label={`Use ${c}`} onClick={() => setColor(c)} className="size-6 rounded-full border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <span className="text-[13px] font-medium text-fg">Type</span>
            <SegmentedControl size="sm" fullWidth items={["Sans", "Serif", "Mono"]} value={type} onChange={(x) => setType(x as Type)} aria-label="Type style" />
          </div>
          <div className="space-y-1.5">
            <span className="text-[13px] font-medium text-fg">Logo shape</span>
            <SegmentedControl size="sm" fullWidth items={["Square", "Round"]} value={shape} onChange={(x) => setShape(x as Shape)} aria-label="Logo shape" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <span className="text-[13px] font-medium text-fg">Voice</span>
            <SegmentedControl size="sm" fullWidth items={["Calm", "Bold", "Playful", "Technical"]} value={voice} onChange={(x) => setVoice(x as Voice)} aria-label="Voice" />
          </div>
          <div className="space-y-1.5">
            <span className="text-[13px] font-medium text-fg">Material</span>
            <SegmentedControl size="sm" fullWidth items={["hairline", "glass", "metal", "paper"]} value={material} onChange={(x) => setMaterial(x as Mat)} aria-label="Material" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border shadow-overlay" style={vars}>
        <BrandKit brand={brand} back={{ href: "/tools", label: "All tools" }} refresh={`${color}|${material}`} embedded />
      </div>
    </div>
  )
}
