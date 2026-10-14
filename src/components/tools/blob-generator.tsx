"use client"
import * as React from "react"
import { DownloadIcon, ShuffleIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Slider } from "@/registry/ui/slider"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Control } from "./shadow-generator"

/*
 * SVG blob generator. Points are scattered around a circle with a seeded
 * random generator, then joined by a closed Catmull-Rom spline written as
 * cubic Bezier commands. Everything is derived from (points, randomness,
 * seed, size), so the same settings always give the same blob.
 */

/** Small seeded PRNG (mulberry32). Same seed, same sequence, on every platform. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type BlobOptions = {
  /** Number of anchor points around the circle, 3 to 16. */
  points: number
  /** 0 to 100. How far radius and angle may wander. */
  randomness: number
  seed: number
  /** Width and height of the SVG viewBox. */
  size: number
}

export type Point = { x: number; y: number }

const r2 = (n: number) => Math.round(n * 100) / 100

/** Anchor points: evenly spaced angles with jitter, radii pulled inward at random. */
export function blobPoints(o: BlobOptions): Point[] {
  const n = Math.max(3, Math.min(16, Math.round(o.points)))
  const rnd = mulberry32(o.seed)
  const r = Math.max(0, Math.min(1, o.randomness / 100))
  const R = (o.size / 2) * 0.96
  const c = o.size / 2
  const out: Point[] = []
  for (let i = 0; i < n; i++) {
    const base = (i / n) * Math.PI * 2
    const jitter = (rnd() - 0.5) * r * (Math.PI * 2 / n) * 0.6
    const radius = R * (1 - r * 0.5 * rnd())
    const a = base + jitter - Math.PI / 2
    out.push({ x: c + Math.cos(a) * radius, y: c + Math.sin(a) * radius })
  }
  return out
}

/** Cubic Bezier segments through the points (closed Catmull-Rom with tension 1/6). */
export function blobSegments(pts: Point[]): { c1: Point; c2: Point; to: Point }[] {
  const n = pts.length
  const at = (i: number) => pts[((i % n) + n) % n]
  const segs: { c1: Point; c2: Point; to: Point }[] = []
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2)
    segs.push({
      c1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
      c2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
      to: p2,
    })
  }
  return segs
}

/** The path `d` attribute: one M, a C per point, Z. */
export function blobPath(o: BlobOptions): string {
  const pts = blobPoints(o)
  const segs = blobSegments(pts)
  const parts = [`M${r2(pts[0].x)} ${r2(pts[0].y)}`]
  for (const s of segs) parts.push(`C${r2(s.c1.x)} ${r2(s.c1.y)} ${r2(s.c2.x)} ${r2(s.c2.y)} ${r2(s.to.x)} ${r2(s.to.y)}`)
  return parts.join(" ") + " Z"
}

const cubic = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d
}

/** Samples the curve into `vertices` points and returns a clip-path polygon() value in percent. */
export function blobPolygon(o: BlobOptions, vertices = 48): string {
  const pts = blobPoints(o)
  const segs = blobSegments(pts)
  const per = Math.max(2, Math.round(vertices / segs.length))
  const out: string[] = []
  segs.forEach((s, i) => {
    const from = pts[i]
    for (let k = 0; k < per; k++) {
      const t = k / per
      const x = cubic(from.x, s.c1.x, s.c2.x, s.to.x, t)
      const y = cubic(from.y, s.c1.y, s.c2.y, s.to.y, t)
      out.push(`${+((x / o.size) * 100).toFixed(1)}% ${+((y / o.size) * 100).toFixed(1)}%`)
    }
  })
  return `polygon(${out.join(", ")})`
}

export type Fill = { mode: "solid" | "gradient"; color: string; color2: string; angle: number }

const fillAttr = (f: Fill, id: string) => (f.mode === "solid" ? f.color : `url(#${id})`)

const gradientDefs = (f: Fill, id: string, indent = "  ") =>
  f.mode === "gradient"
    ? `${indent}<defs>\n${indent}  <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${f.angle - 135} 0.5 0.5)">\n${indent}    <stop offset="0" stop-color="${f.color}"/>\n${indent}    <stop offset="1" stop-color="${f.color2}"/>\n${indent}  </linearGradient>\n${indent}</defs>\n`
    : ""

/** Standalone SVG markup. */
export function blobSvg(o: BlobOptions, f: Fill, id = "blob-fill"): string {
  const s = Math.round(o.size)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">\n${gradientDefs(f, id)}  <path d="${blobPath(o)}" fill="${fillAttr(f, id)}"/>\n</svg>`
}

/** The same blob as a typed React component. */
export function blobComponent(o: BlobOptions, f: Fill, name = "Blob"): string {
  const s = Math.round(o.size)
  const id = "blob-fill"
  const defs = f.mode === "gradient" ? gradientDefs(f, id, "      ").replace(/stop-color/g, "stopColor") : ""
  return `import type { SVGProps } from "react"\n\nexport function ${name}(props: SVGProps<SVGSVGElement>) {\n  return (\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width={${s}} height={${s}} aria-hidden="true" {...props}>\n${defs}      <path d="${blobPath(o)}" fill="${fillAttr(f, id)}" />\n    </svg>\n  )\n}\n`
}

/* ----------------------------------- UI ----------------------------------- */

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))
const INIT: BlobOptions = { points: 7, randomness: 55, seed: 1421, size: 480 }
const INIT_FILL: Fill = { mode: "gradient", color: "#6D5BFF", color2: "#22D3EE", angle: 135 }
const DOTS = "radial-gradient(rgb(128 128 128 / 0.35) 1px, transparent 1px) 0 0 / 18px 18px"

export function BlobGenerator() {
  const [o, setO] = React.useState<BlobOptions>(INIT)
  const [fill, setFill] = React.useState<Fill>(INIT_FILL)
  const [vertices, setVertices] = React.useState(48)
  const set = <K extends keyof BlobOptions>(k: K, v: BlobOptions[K]) => setO((p) => ({ ...p, [k]: v }))
  const setF = <K extends keyof Fill>(k: K, v: Fill[K]) => setFill((p) => ({ ...p, [k]: v }))
  const gid = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const d = React.useMemo(() => blobPath(o), [o])
  const svg = blobSvg(o, fill)
  const polygon = React.useMemo(() => blobPolygon(o, vertices), [o, vertices])
  const size = Math.round(o.size)
  const download = () => {
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }))
    a.download = `blob-${o.seed}.svg`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const shuffle = () => set("seed", Math.floor(Math.random() * 100000))
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative grid h-[360px] place-items-center overflow-hidden rounded-2xl border border-border bg-surface lg:h-[440px]" style={{ backgroundImage: DOTS }}>
          <svg viewBox={`0 0 ${size} ${size}`} className="h-[82%] w-auto max-w-[82%]" role="img" aria-label={`Blob with ${o.points} points, seed ${o.seed}`}>
            {fill.mode === "gradient" ? (
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${fill.angle - 135} 0.5 0.5)`}>
                  <stop offset="0" stopColor={fill.color} />
                  <stop offset="1" stopColor={fill.color2} />
                </linearGradient>
              </defs>
            ) : null}
            <path d={d} fill={fill.mode === "gradient" ? `url(#${gid})` : fill.color} />
          </svg>
          <span className="absolute right-3 bottom-3 rounded-md bg-surface/80 px-2 py-1 font-mono text-[11px] text-fg-muted">seed {o.seed} · {size}×{size}</span>
        </div>

        <div className="space-y-5 self-start rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <Control label="Complexity" value={`${o.points} points`}>
            <Slider value={[o.points]} min={3} max={16} onValueChange={(v) => set("points", num(v))} showValue={false} aria-label="Complexity" />
          </Control>
          <Control label="Randomness" value={`${o.randomness}%`}>
            <Slider value={[o.randomness]} min={0} max={100} onValueChange={(v) => set("randomness", num(v))} showValue={false} aria-label="Randomness" />
          </Control>
          <div className="space-y-2">
            <label htmlFor="blob-seed" className="text-[13px] font-medium text-fg">Seed</label>
            <div className="flex gap-2">
              <Input id="blob-seed" type="number" min={0} value={o.seed} onChange={(e) => set("seed", Math.max(0, Math.floor(+e.target.value || 0)))} className="font-mono" />
              <Button variant="outline" onClick={shuffle}>
                <ShuffleIcon /> Shuffle
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-fg">Fill</span>
            <SegmentedControl size="sm" fullWidth items={["solid", "gradient"]} value={fill.mode} onChange={(v) => setF("mode", v as Fill["mode"])} aria-label="Fill type" />
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <input type="color" aria-label="Fill color" value={fill.color.toLowerCase()} onChange={(e) => setF("color", e.target.value.toUpperCase())} className="h-9 w-11 cursor-pointer rounded-md border border-border bg-transparent" />
              {fill.mode === "gradient" ? (
                <>
                  <input type="color" aria-label="Second gradient color" value={fill.color2.toLowerCase()} onChange={(e) => setF("color2", e.target.value.toUpperCase())} className="h-9 w-11 cursor-pointer rounded-md border border-border bg-transparent" />
                  <label className="flex items-center gap-1.5 text-[12px] text-fg-muted">
                    <Input type="number" aria-label="Gradient angle" value={fill.angle} min={0} max={360} onChange={(e) => setF("angle", Math.max(0, Math.min(360, Math.round(+e.target.value))))} className="w-[72px] font-mono text-[12.5px]" />
                    deg
                  </label>
                </>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="blob-size" className="text-[13px] font-medium text-fg">Size (px)</label>
            <Input id="blob-size" type="number" min={16} max={4096} step={8} value={o.size} onChange={(e) => set("size", Math.max(16, Math.min(4096, Math.round(+e.target.value || 16))))} className="font-mono" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={download}>
              <DownloadIcon /> Download SVG
            </Button>
            <button type="button" onClick={() => { setO(INIT); setFill(INIT_FILL) }} className="px-2 text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Reset</button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="svg">
        <TabsList aria-label="Output format">
          <TabsTrigger value="svg">SVG</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="path">Path</TabsTrigger>
          <TabsTrigger value="clip">CSS clip-path</TabsTrigger>
        </TabsList>
        <TabsContent value="svg">
          <CodeBlock language="html" filename={`blob-${o.seed}.svg`} code={svg} />
        </TabsContent>
        <TabsContent value="react">
          <CodeBlock language="tsx" filename="Blob.tsx" code={blobComponent(o, fill)} />
        </TabsContent>
        <TabsContent value="path">
          <CodeBlock language="html" filename={`path d, viewBox 0 0 ${size} ${size}`} code={d} />
        </TabsContent>
        <TabsContent value="clip">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface p-5 shadow-raised md:grid-cols-[1fr_auto]">
              <Control label="Polygon vertices" value={String(vertices)}>
                <Slider value={[vertices]} min={12} max={120} step={4} onValueChange={(v) => setVertices(num(v))} showValue={false} aria-label="Polygon vertices" />
              </Control>
              <div className="flex items-end gap-3">
                <div aria-hidden className="size-16 shrink-0" style={{ clipPath: polygon, background: `linear-gradient(${fill.angle}deg, ${fill.color}, ${fill.mode === "gradient" ? fill.color2 : fill.color})` }} />
                <p className="max-w-[260px] text-[12px] leading-[1.5] text-fg-muted">A polygon with straight edges, so more vertices means a smoother curve and a longer value. It clips any element, image or video.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CodeBlock language="css" filename="CSS" code={`.blob {\n  clip-path: ${polygon};\n}`} />
              <CodeBlock language="html" filename="Tailwind v4 class" code={`[clip-path:${polygon.replace(/\s+/g, "_")}]`} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
