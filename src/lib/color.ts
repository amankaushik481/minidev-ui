/*
 * Small colour toolkit for the tools pages: sRGB <-> OKLab/OKLCH, gamut
 * mapping by chroma reduction, hex formatting and WCAG contrast.
 * Formulas from Björn Ottosson's OKLab reference.
 */

export type Oklch = { l: number; c: number; h: number }
type Rgb = [number, number, number]

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
const fromLinear = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)

export function hexToRgb(hex: string): Rgb | null {
  let h = hex.trim().replace(/^#/, "")
  if (h.length === 3) h = h.split("").map((x) => x + x).join("")
  if (!/^[0-9a-f]{6}$/i.test(h)) return null
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]
}

export function rgbToHex([r, g, b]: Rgb) {
  const f = (v: number) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0")
  return `#${f(r)}${f(g)}${f(b)}`.toUpperCase()
}

export function rgbToOklch([r, g, b]: Rgb): Oklch {
  const R = toLinear(r), G = toLinear(g), B = toLinear(b)
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B)
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B)
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const c = Math.sqrt(a * a + bb * bb)
  let h = (Math.atan2(bb, a) * 180) / Math.PI
  if (h < 0) h += 360
  return { l: L, c, h: c < 0.0001 ? 0 : h }
}

/** Linear-light sRGB, may fall outside 0..1 when the colour is out of gamut. */
function oklchToLinear({ l, c, h }: Oklch): Rgb {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const l_ = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3)
  const m_ = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3)
  const s_ = Math.pow(l - 0.0894841775 * a - 1.291485548 * b, 3)
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
}

export const inGamut = (o: Oklch) => oklchToLinear(o).every((v) => v >= -0.0005 && v <= 1.0005)

/** Reduce chroma until the colour fits sRGB, keeping lightness and hue. */
export function toGamut(o: Oklch): Oklch {
  if (inGamut(o)) return o
  let lo = 0
  let hi = o.c
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    if (inGamut({ ...o, c: mid })) lo = mid
    else hi = mid
  }
  return { ...o, c: lo }
}

export function oklchToRgb(o: Oklch): Rgb {
  const lin = oklchToLinear(toGamut(o))
  return lin.map((v) => fromLinear(Math.min(1, Math.max(0, v)))) as Rgb
}

export const oklchToHex = (o: Oklch) => rgbToHex(oklchToRgb(o))

export function hexToOklch(hex: string): Oklch | null {
  const rgb = hexToRgb(hex)
  return rgb ? rgbToOklch(rgb) : null
}

export const fmtOklch = ({ l, c, h }: Oklch, alpha?: number) =>
  `oklch(${+l.toFixed(3)} ${+c.toFixed(3)} ${+h.toFixed(1)}${alpha !== undefined ? ` / ${+alpha.toFixed(2)}` : ""})`

/** WCAG 2.x relative luminance and contrast ratio. */
export function luminance(hex: string) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const [r, g, b] = rgb.map(toLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

/** Tailwind-style 11 step scale around a hue and peak chroma. */
export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
const L_SCALE = [0.975, 0.945, 0.89, 0.81, 0.71, 0.62, 0.54, 0.46, 0.38, 0.29, 0.21]
const C_SCALE = [0.12, 0.22, 0.42, 0.66, 0.88, 1, 0.96, 0.86, 0.72, 0.56, 0.42]

export function palette(hue: number, chroma: number) {
  return STEPS.map((step, i) => {
    const o = toGamut({ l: L_SCALE[i], c: chroma * C_SCALE[i], h: hue })
    return { step, oklch: o, hex: oklchToHex(o) }
  })
}

/** Accent token set for a brand colour, matching the kit's token names. */
export function accentTokens(hex: string) {
  const o = hexToOklch(hex) ?? { l: 0.53, c: 0.2, h: 283 }
  const base = toGamut({ l: Math.min(0.72, Math.max(0.45, o.l)), c: o.c, h: o.h })
  const onAccent = base.l > 0.66 ? "oklch(0.2 0.02 " + Math.round(o.h) + ")" : "oklch(0.99 0.004 " + Math.round(o.h) + ")"
  return {
    "--accent": fmtOklch(base),
    "--accent-hover": fmtOklch(toGamut({ ...base, l: base.l - 0.05 })),
    "--accent-fg": fmtOklch(toGamut({ l: Math.min(0.5, base.l), c: Math.min(base.c, 0.2), h: base.h })),
    "--accent-soft": fmtOklch(base, 0.1),
    "--accent-line": fmtOklch(base, 0.3),
    "--accent-2": fmtOklch(toGamut({ l: base.l + 0.04, c: base.c * 0.9, h: (base.h + 40) % 360 })),
    "--on-accent": onAccent,
  }
}
