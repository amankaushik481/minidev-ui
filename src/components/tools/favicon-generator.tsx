"use client"
import * as React from "react"
import { CheckIcon, DownloadIcon, ImagePlusIcon, XIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Slider } from "@/registry/ui/slider"
import { Switch } from "@/registry/ui/switch"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Control } from "./shadow-generator"

/*
 * Favicon generator. A letter mark or an uploaded image is drawn onto canvases
 * at every size, encoded as PNG by the browser, and the three small PNGs are
 * packed into a real favicon.ico whose header is written by hand below. No
 * file leaves the page.
 */

export type Family = "sans" | "serif" | "mono"
export type LetterMark = { text: string; bg: string; fg: string; family: Family; weight: number }
export type Source = { kind: "letters"; mark: LetterMark } | { kind: "image"; img: HTMLImageElement; name: string; vector: boolean }
export type RenderOptions = {
  /** Padding around the image in percent of the icon size. Image mode only. */
  padding: number
  /** Corner radius in percent of the icon size, 0 to 50. */
  radius: number
  /** Background colour, or null for transparent. */
  bg: string | null
}

export const FONTS: Record<Family, string> = {
  sans: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
}

export const FILES = [
  { size: 16, name: "favicon-16x16.png", purpose: "Browser tab" },
  { size: 32, name: "favicon-32x32.png", purpose: "Tab on 2x screens, taskbar" },
  { size: 48, name: "favicon-48x48.png", purpose: "Windows shortcut" },
  { size: 180, name: "apple-touch-icon.png", purpose: "iOS home screen" },
  { size: 192, name: "icon-192.png", purpose: "Android home screen" },
  { size: 512, name: "icon-512.png", purpose: "Splash screen, PWA install" },
] as const

/* ---------------------------------- ICO ---------------------------------- */

/**
 * Packs PNG images into an ICO container: a 6 byte header, one 16 byte
 * directory entry per image, then the PNG files back to back. PNG entries have
 * been valid in ICO since Windows Vista and every browser reads them.
 */
export function buildIco(images: { size: number; png: Uint8Array }[]): Uint8Array {
  const dir = 6 + 16 * images.length
  const total = dir + images.reduce((s, i) => s + i.png.length, 0)
  const buffer = new ArrayBuffer(total)
  const out = new Uint8Array(buffer)
  const view = new DataView(buffer)
  view.setUint16(0, 0, true) // reserved
  view.setUint16(2, 1, true) // 1 = icon
  view.setUint16(4, images.length, true)
  let offset = dir
  images.forEach((img, i) => {
    const e = 6 + i * 16
    view.setUint8(e, img.size >= 256 ? 0 : img.size) // width, 0 means 256
    view.setUint8(e + 1, img.size >= 256 ? 0 : img.size) // height
    view.setUint8(e + 2, 0) // palette size
    view.setUint8(e + 3, 0) // reserved
    view.setUint16(e + 4, 1, true) // colour planes
    view.setUint16(e + 6, 32, true) // bits per pixel
    view.setUint32(e + 8, img.png.length, true)
    view.setUint32(e + 12, offset, true)
    out.set(img.png, offset)
    offset += img.png.length
  })
  return out
}

/** Reads the directory back. Used by the tests and useful for debugging. */
export function parseIco(bytes: Uint8Array): { width: number; height: number; bpp: number; length: number; offset: number; png: boolean }[] {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  if (view.getUint16(0, true) !== 0 || view.getUint16(2, true) !== 1) throw new Error("Not an ICO file")
  const count = view.getUint16(4, true)
  const out = []
  for (let i = 0; i < count; i++) {
    const e = 6 + i * 16
    const w = view.getUint8(e) || 256
    const h = view.getUint8(e + 1) || 256
    const length = view.getUint32(e + 8, true)
    const offset = view.getUint32(e + 12, true)
    const sig = Array.from(bytes.slice(offset, offset + 8))
    const png = sig.join(",") === "137,80,78,71,13,10,26,10"
    out.push({ width: w, height: h, bpp: view.getUint16(e + 6, true), length, offset, png })
  }
  return out
}

/* -------------------------------- drawing -------------------------------- */

function roundedRect(ctx: CanvasRenderingContext2D, s: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(r, 0)
  ctx.lineTo(s - r, 0)
  ctx.arcTo(s, 0, s, r, r)
  ctx.lineTo(s, s - r)
  ctx.arcTo(s, s, s - r, s, r)
  ctx.lineTo(r, s)
  ctx.arcTo(0, s, 0, s - r, r)
  ctx.lineTo(0, r)
  ctx.arcTo(0, 0, r, 0, r)
  ctx.closePath()
}

/** Halves a raster until it is within 2x of the target, which keeps 16px icons crisp. */
function downscale(img: HTMLImageElement, w: number, h: number): CanvasImageSource {
  let cur: CanvasImageSource = img
  let cw = img.naturalWidth
  let ch = img.naturalHeight
  while (cw / 2 >= w && ch / 2 >= h) {
    const c = document.createElement("canvas")
    c.width = Math.max(1, Math.round(cw / 2))
    c.height = Math.max(1, Math.round(ch / 2))
    const x = c.getContext("2d")!
    x.imageSmoothingQuality = "high"
    x.drawImage(cur, 0, 0, c.width, c.height)
    cur = c
    cw = c.width
    ch = c.height
  }
  return cur
}

/** Draws the icon at `size` onto a canvas. `square` ignores the radius (Apple touch icons are rounded by iOS). */
export function drawIcon(canvas: HTMLCanvasElement, size: number, source: Source, o: RenderOptions, square = false) {
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  ctx.clearRect(0, 0, size, size)
  const bg = source.kind === "letters" ? source.mark.bg : o.bg
  const radius = square ? 0 : (size * Math.min(50, Math.max(0, o.radius))) / 100
  if (radius > 0) {
    roundedRect(ctx, size, radius)
    ctx.clip()
  }
  if (bg) {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, size, size)
  }
  if (source.kind === "letters") {
    const text = source.mark.text.trim().slice(0, 2) || "A"
    let px = size * (text.length > 1 ? 0.5 : 0.6)
    ctx.font = `${source.mark.weight} ${px}px ${FONTS[source.mark.family]}`
    const w = ctx.measureText(text).width
    if (w > size * 0.82) {
      px = (px * size * 0.82) / w
      ctx.font = `${source.mark.weight} ${px}px ${FONTS[source.mark.family]}`
    }
    ctx.fillStyle = source.mark.fg
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, size / 2, size / 2 + px * 0.04)
    return
  }
  const img = source.img
  const iw = img.naturalWidth || img.width
  const ih = img.naturalHeight || img.height
  if (!iw || !ih) return
  const inner = size * (1 - (2 * Math.min(40, Math.max(0, o.padding))) / 100)
  const k = Math.min(inner / iw, inner / ih)
  const w = Math.max(1, Math.round(iw * k))
  const h = Math.max(1, Math.round(ih * k))
  const src = source.vector ? img : downscale(img, w, h)
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(src, Math.round((size - w) / 2), Math.round((size - h) / 2), w, h)
}

/** A scalable favicon.svg for a letter mark. Browsers render it with the viewer's system font. */
export function letterSvg(m: LetterMark, radius: number): string {
  const text = (m.text.trim().slice(0, 2) || "A").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c] ?? c)
  const px = text.length > 1 ? 32 : 38
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n  <rect width="64" height="64" rx="${Math.round((64 * Math.min(50, Math.max(0, radius))) / 100)}" fill="${m.bg}"/>\n  <text x="32" y="32" dy="0.36em" text-anchor="middle" font-family='${FONTS[m.family]}' font-weight="${m.weight}" font-size="${px}" fill="${m.fg}">${text}</text>\n</svg>`
}

export function htmlTags(hasSvg: boolean): string {
  return [
    '<link rel="icon" href="/favicon.ico" sizes="32x32">',
    hasSvg ? '<link rel="icon" href="/favicon.svg" type="image/svg+xml">' : null,
    '<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">',
    '<link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">',
    '<link rel="manifest" href="/site.webmanifest">',
  ]
    .filter(Boolean)
    .join("\n")
}

export function manifestJson(name: string, theme: string, background: string): string {
  const short = name.trim() || "App"
  return JSON.stringify(
    {
      name: short,
      short_name: short.slice(0, 12),
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: theme,
      background_color: background,
      display: "standalone",
    },
    null,
    2,
  )
}

/* ----------------------------------- UI ----------------------------------- */

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))
const CHECKER = "repeating-conic-gradient(rgb(128 128 128 / 0.18) 0% 25%, transparent 0% 50%) 0 0 / 12px 12px"
const INIT_MARK: LetterMark = { text: "Lu", bg: "#6D5BFF", fg: "#FFFFFF", family: "sans", weight: 700 }
type Output = { size: number; name: string; purpose: string; url: string }

/** Loads a file into an HTMLImageElement. SVGs without a size get one so canvas can rasterise them. */
async function loadImage(file: File): Promise<{ img: HTMLImageElement; vector: boolean }> {
  const vector = file.type === "image/svg+xml" || /\.svg$/i.test(file.name)
  let blob: Blob = file
  if (vector) {
    const text = await file.text()
    const doc = new DOMParser().parseFromString(text, "image/svg+xml")
    const root = doc.documentElement
    if (doc.getElementsByTagName("parsererror").length || root.localName !== "svg") throw new Error("That SVG could not be parsed.")
    root.querySelectorAll("script").forEach((s) => s.remove())
    if (!root.getAttribute("width") || !root.getAttribute("height")) {
      const vb = (root.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number)
      if (vb.length !== 4 || !vb[2] || !vb[3]) throw new Error("The SVG has no size or viewBox, so it cannot be rasterised. Add a viewBox and try again.")
      root.setAttribute("width", "1024")
      root.setAttribute("height", String(Math.round((1024 * vb[3]) / vb[2])))
    }
    blob = new Blob([new XMLSerializer().serializeToString(root)], { type: "image/svg+xml" })
  }
  // The object URL stays alive while the image is in use; the caller revokes it on replace or remove.
  const url = URL.createObjectURL(blob)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve(i)
      i.onerror = () => reject(new Error("That file could not be read as an image."))
      i.src = url
    })
    if (!img.naturalWidth || !img.naturalHeight) throw new Error("The image has no size.")
    return { img, vector }
  } catch (e) {
    URL.revokeObjectURL(url)
    throw e
  }
}

const toPng = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG encoding failed"))), "image/png"))

export function FaviconGenerator() {
  const [mode, setMode] = React.useState<"Letters" | "Image">("Letters")
  const [mark, setMark] = React.useState<LetterMark>(INIT_MARK)
  const [image, setImage] = React.useState<{ img: HTMLImageElement; name: string; vector: boolean; url: string } | null>(null)
  const [padding, setPadding] = React.useState(8)
  const [radius, setRadius] = React.useState(22)
  const [transparent, setTransparent] = React.useState(true)
  const [imageBg, setImageBg] = React.useState("#FFFFFF")
  const [appName, setAppName] = React.useState("Lumen")
  const [error, setError] = React.useState<string | null>(null)
  const [outputs, setOutputs] = React.useState<Output[]>([])
  const [ico, setIco] = React.useState<{ url: string; bytes: number } | null>(null)
  const [icoState, setIcoState] = React.useState<"pending" | "ok" | "failed">("pending")
  const [dragging, setDragging] = React.useState(false)
  const fileInput = React.useRef<HTMLInputElement>(null)
  const setM = <K extends keyof LetterMark>(k: K, v: LetterMark[K]) => setMark((p) => ({ ...p, [k]: v }))

  const source: Source | null = mode === "Letters" ? { kind: "letters", mark } : image ? { kind: "image", img: image.img, name: image.name, vector: image.vector } : null
  const opts: RenderOptions = { padding, radius, bg: transparent ? null : imageBg }

  React.useEffect(() => {
    if (!source) {
      setOutputs([])
      setIco(null)
      return
    }
    let cancelled = false
    let made: string[] = []
    const t = setTimeout(async () => {
      try {
        const list: Output[] = []
        const pngs: { size: number; png: Uint8Array }[] = []
        for (const f of FILES) {
          const c = document.createElement("canvas")
          drawIcon(c, f.size, source, opts, f.size === 180)
          const blob = await toPng(c)
          if (f.size <= 48) pngs.push({ size: f.size, png: new Uint8Array(await blob.arrayBuffer()) })
          const url = URL.createObjectURL(blob)
          made.push(url)
          list.push({ ...f, url })
        }
        const bytes = buildIco(pngs)
        const icoUrl = URL.createObjectURL(new Blob([bytes.buffer as ArrayBuffer], { type: "image/x-icon" }))
        made.push(icoUrl)
        if (cancelled) {
          made.forEach((u) => URL.revokeObjectURL(u))
          return
        }
        setOutputs((old) => {
          old.forEach((o) => URL.revokeObjectURL(o.url))
          return list
        })
        setIco((old) => {
          if (old) URL.revokeObjectURL(old.url)
          return { url: icoUrl, bytes: bytes.length }
        })
        setIcoState("pending")
        made = []
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Rendering failed.")
      }
    }, 120)
    return () => {
      cancelled = true
      clearTimeout(t)
      made.forEach((u) => URL.revokeObjectURL(u))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, mark, image, padding, radius, transparent, imageBg])

  const pick = async (file: File | undefined) => {
    if (!file) return
    setError(null)
    if (!/^image\/(png|jpeg|svg\+xml|webp)$/.test(file.type) && !/\.(png|jpe?g|svg|webp)$/i.test(file.name)) {
      setError("Use a PNG, JPG, WebP or SVG file.")
      return
    }
    try {
      const { img, vector } = await loadImage(file)
      setImage((old) => {
        if (old) URL.revokeObjectURL(old.url)
        return { img, name: file.name, vector, url: img.src }
      })
      setMode("Image")
    } catch (e) {
      setError(e instanceof Error ? e.message : "That file could not be read.")
    }
  }

  const downloadAll = () => {
    const items = [...outputs.map((o) => ({ url: o.url, name: o.name })), ...(ico ? [{ url: ico.url, name: "favicon.ico" }] : [])]
    if (mode === "Letters") items.push({ url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(letterSvg(mark, radius))}`, name: "favicon.svg" })
    items.forEach((it, i) => {
      setTimeout(() => {
        const a = document.createElement("a")
        a.href = it.url
        a.download = it.name
        a.click()
      }, i * 150)
    })
  }

  const theme = mode === "Letters" ? mark.bg : transparent ? "#FFFFFF" : imageBg
  const manifest = manifestJson(appName, theme, transparent && mode === "Image" ? "#FFFFFF" : theme)
  const svgText = mode === "Letters" ? letterSvg(mark, radius) : null
  const small = outputs.find((o) => o.size === 32)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-fg">Source</span>
              <SegmentedControl size="sm" items={["Letters", "Image"]} value={mode} onChange={(v) => setMode(v as "Letters" | "Image")} aria-label="Source type" />
            </div>
            {mode === "Letters" ? (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
                <div className="grid size-28 place-items-center overflow-hidden" style={{ background: mark.bg, borderRadius: `${radius}%`, color: mark.fg, fontFamily: FONTS[mark.family], fontWeight: mark.weight, fontSize: mark.text.trim().length > 1 ? 56 : 67 }} aria-hidden>
                  {mark.text.trim().slice(0, 2) || "A"}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label htmlFor="fv-text" className="text-[13px] font-medium text-fg">Letters</label>
                    <Input id="fv-text" value={mark.text} maxLength={2} onChange={(e) => setM("text", e.target.value.slice(0, 2))} className="font-medium" placeholder="Lu" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[13px] font-medium text-fg">Font</span>
                    <SegmentedControl size="sm" fullWidth items={["sans", "serif", "mono"]} value={mark.family} onChange={(v) => setM("family", v as Family)} aria-label="Font family" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[13px] font-medium text-fg">Colors</span>
                    <div className="flex items-center gap-3 text-[12px] text-fg-muted">
                      <label className="flex items-center gap-1.5">
                        <input type="color" aria-label="Background color" value={mark.bg.toLowerCase()} onChange={(e) => setM("bg", e.target.value.toUpperCase())} className="h-9 w-11 cursor-pointer rounded-md border border-border bg-transparent" />
                        fill
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input type="color" aria-label="Letter color" value={mark.fg.toLowerCase()} onChange={(e) => setM("fg", e.target.value.toUpperCase())} className="h-9 w-11 cursor-pointer rounded-md border border-border bg-transparent" />
                        letters
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[13px] font-medium text-fg">Weight</span>
                    <SegmentedControl size="sm" fullWidth items={["500", "700", "900"]} value={String(mark.weight)} onChange={(v) => setM("weight", +v)} aria-label="Font weight" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
                <div className="grid size-28 place-items-center overflow-hidden rounded-xl border border-border" style={{ background: CHECKER }} aria-hidden>
                  {image ? <img src={image.url} alt="" className="max-h-24 max-w-24 object-contain" /> : <ImagePlusIcon className="size-8 text-fg-subtle" />}
                </div>
                <div>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Upload an image: PNG, JPG, WebP or SVG"
                    onClick={() => fileInput.current?.click()}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), fileInput.current?.click())}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files?.[0]) }}
                    className={"flex h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 text-center outline-none focus-visible:ring-2 focus-visible:ring-accent " + (dragging ? "border-accent bg-accent-soft" : "border-border-strong bg-sunken hover:border-accent")}
                  >
                    <span className="text-[13px] font-medium text-fg">{image ? image.name : "Drop an image here, or click to choose"}</span>
                    <span className="mt-1 text-[12px] text-fg-muted">PNG, JPG, WebP or SVG. Square works best, 512px or larger. It never leaves your browser.</span>
                  </div>
                  <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg" className="sr-only" onChange={(e) => { pick(e.target.files?.[0]); e.target.value = "" }} tabIndex={-1} aria-hidden />
                  {image ? (
                    <div className="mt-2 flex items-center gap-2 text-[12px] text-fg-muted">
                      <span>{image.img.naturalWidth}×{image.img.naturalHeight}{image.vector ? " (vector)" : ""}</span>
                      <button type="button" onClick={() => setImage((old) => { if (old) URL.revokeObjectURL(old.url); return null })} className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-fg"><XIcon className="size-3" /> Remove</button>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            {error ? <p className="mt-3 text-[12.5px] text-danger" role="alert">{error}</p> : null}
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-fg">Generated files</span>
              <Button size="sm" onClick={downloadAll} disabled={!outputs.length}>
                <DownloadIcon /> Download all
              </Button>
            </div>
            {source && !outputs.length ? <p className="mt-3 text-[13px] text-fg-muted">Rendering...</p> : null}
            {source ? (
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {outputs.map((o) => (
                  <li key={o.name} className="flex flex-col rounded-xl border border-border p-3">
                    <div className="grid h-20 place-items-center rounded-lg" style={{ background: CHECKER }}>
                      <img src={o.url} alt={`${o.size} pixel icon`} width={Math.min(o.size, 64)} height={Math.min(o.size, 64)} style={{ imageRendering: o.size <= 32 ? "pixelated" : "auto" }} />
                    </div>
                    <span className="mt-2 truncate font-mono text-[11.5px] text-fg">{o.name}</span>
                    <span className="text-[11.5px] text-fg-muted">{o.size}×{o.size} · {o.purpose}</span>
                    <a href={o.url} download={o.name} className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">
                      <DownloadIcon className="size-3.5" /> Download
                    </a>
                  </li>
                ))}
                {ico ? (
                  <li className="flex flex-col rounded-xl border border-accent-line bg-accent-soft/40 p-3">
                    <div className="grid h-20 place-items-center rounded-lg" style={{ background: CHECKER }}>
                      {/* The ICO is decoded by the browser itself, which proves the container is valid. */}
                      <img key={ico.url} src={ico.url} alt="favicon.ico as the browser decodes it" width={32} height={32} onLoad={() => setIcoState("ok")} onError={() => setIcoState("failed")} />
                    </div>
                    <span className="mt-2 truncate font-mono text-[11.5px] text-fg">favicon.ico</span>
                    <span className="text-[11.5px] text-fg-muted">16, 32 and 48 · {(ico.bytes / 1024).toFixed(1)} KB</span>
                    <span className={"mt-1 inline-flex items-center gap-1 text-[11.5px] " + (icoState === "ok" ? "text-success" : icoState === "failed" ? "text-danger" : "text-fg-subtle")} aria-live="polite">
                      {icoState === "ok" ? <><CheckIcon className="size-3" /> Decoded by your browser</> : icoState === "failed" ? "Your browser could not decode it" : "Checking..."}
                    </span>
                    <a href={ico.url} download="favicon.ico" className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">
                      <DownloadIcon className="size-3.5" /> Download
                    </a>
                  </li>
                ) : null}
                {svgText ? (
                  <li className="flex flex-col rounded-xl border border-border p-3">
                    <div className="grid h-20 place-items-center rounded-lg" style={{ background: CHECKER }}>
                      <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`} alt="favicon.svg" width={48} height={48} />
                    </div>
                    <span className="mt-2 truncate font-mono text-[11.5px] text-fg">favicon.svg</span>
                    <span className="text-[11.5px] text-fg-muted">Any size · system font</span>
                    <a href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`} download="favicon.svg" className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">
                      <DownloadIcon className="size-3.5" /> Download
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-3 text-[13px] text-fg-muted">Upload an image to generate the files.</p>
            )}
            {mode === "Image" && transparent && outputs.length ? <p className="mt-3 text-[12px] text-fg-muted">iOS fills transparent areas of the Apple touch icon with black. Turn off transparency to give it a background.</p> : null}
          </div>
        </div>

        <div className="space-y-5 self-start rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="rounded-xl border border-border bg-sunken p-2" aria-hidden>
            <div className="flex h-9 items-center gap-2 rounded-lg bg-surface px-3 shadow-raised">
              {small ? <img src={small.url} alt="" width={16} height={16} /> : <span className="size-4 rounded-sm bg-border" />}
              <span className="truncate text-[12px] text-fg">{appName.trim() || "App"}</span>
              <XIcon className="ml-auto size-3 text-fg-subtle" />
            </div>
            <p className="px-1 pt-2 pb-1 text-[11px] text-fg-subtle">Tab preview at 16px</p>
          </div>
          <Control label="Corner radius" value={`${radius}%`}>
            <Slider value={[radius]} min={0} max={50} onValueChange={(v) => setRadius(num(v))} showValue={false} aria-label="Corner radius" />
          </Control>
          {mode === "Image" ? (
            <>
              <Control label="Padding" value={`${padding}%`}>
                <Slider value={[padding]} min={0} max={30} onValueChange={(v) => setPadding(num(v))} showValue={false} aria-label="Padding" />
              </Control>
              <Switch size="sm" label="Transparent background" description="Off adds a solid fill behind the image" checked={transparent} onCheckedChange={setTransparent} />
              {!transparent ? (
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="fv-bg" className="text-[13px] font-medium text-fg">Background</label>
                  <input id="fv-bg" type="color" value={imageBg.toLowerCase()} onChange={(e) => setImageBg(e.target.value.toUpperCase())} className="h-8 w-14 cursor-pointer rounded-md border border-border bg-transparent" />
                </div>
              ) : null}
            </>
          ) : null}
          <div className="space-y-2">
            <label htmlFor="fv-name" className="text-[13px] font-medium text-fg">App name</label>
            <Input id="fv-name" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="Lumen" />
            <p className="text-[12px] text-fg-muted">Used in the web manifest and the tab preview.</p>
          </div>
          <button type="button" onClick={() => { setMark(INIT_MARK); setRadius(22); setPadding(8); setTransparent(true); setAppName("Lumen"); setMode("Letters") }} className="text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Reset</button>
        </div>
      </div>

      <Tabs defaultValue="html">
        <TabsList aria-label="Snippets">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="manifest">site.webmanifest</TabsTrigger>
          <TabsTrigger value="next">Next.js</TabsTrigger>
        </TabsList>
        <TabsContent value="html">
          <CodeBlock language="html" filename="In <head>" code={htmlTags(mode === "Letters")} />
        </TabsContent>
        <TabsContent value="manifest">
          <CodeBlock language="json" filename="public/site.webmanifest" code={manifest} />
        </TabsContent>
        <TabsContent value="next">
          <CodeBlock language="bash" filename="App Router file conventions" code={`# Drop the files into app/ and Next.js writes the <link> tags for you\napp/favicon.ico          # from favicon.ico\napp/icon.png             # from icon-512.png (or icon.svg from favicon.svg)\napp/apple-icon.png       # from apple-touch-icon.png\napp/manifest.webmanifest # from site.webmanifest`} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
