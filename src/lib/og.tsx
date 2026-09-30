import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

/*
 * The social card for every route: one layout, dark, with the violet light
 * in the corner. Rendered by next/og (Satori), so only flexbox and a
 * subset of CSS. Every element with more than one child needs display:flex.
 */

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_TYPE = "image/png"

let fonts: Promise<{ name: string; data: Buffer; weight: 500 | 600; style: "normal" }[]> | null = null
function loadFonts() {
  fonts ??= Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Geist-Medium.ttf")).then((data) => ({ name: "Geist", data, weight: 500 as const, style: "normal" as const })),
    readFile(join(process.cwd(), "assets/fonts/Geist-SemiBold.ttf")).then((data) => ({ name: "Geist", data, weight: 600 as const, style: "normal" as const })),
    readFile(join(process.cwd(), "assets/fonts/GeistMono-Medium.ttf")).then((data) => ({ name: "Geist Mono", data, weight: 500 as const, style: "normal" as const })),
  ])
  return fonts
}

type Card = {
  /** Small label top right, e.g. "Component", "Guide". */
  eyebrow: string
  title: string
  subtitle?: string
  /** Mono line at the bottom, e.g. the install command or a URL. */
  footer?: string
  /** CSS colour for the glow. */
  accent?: string
}

export async function ogImage({ eyebrow, title, subtitle, footer = "ui.minidev.pro", accent = "#7c6cff" }: Card) {
  const size = title.length > 46 ? 64 : title.length > 28 ? 76 : 92
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#09090d",
          backgroundImage: `radial-gradient(circle at 88% 8%, ${accent}66 0%, transparent 42%), radial-gradient(circle at 70% 120%, #c026d344 0%, transparent 45%), linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
          color: "#f5f5f7",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 13, backgroundColor: "#f5f5f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="1.8" strokeLinejoin="round">
                <path d="M4 18V6l8 8 8-8v12" />
                <circle cx="20" cy="6" r="1.9" fill="#7c6cff" stroke="none" />
              </svg>
            </div>
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>MiniDev UI</div>
          </div>
          <div style={{ display: "flex", padding: "8px 18px", borderRadius: 999, border: "1px solid #ffffff2e", backgroundColor: "#ffffff0d", fontSize: 22, color: "#d4d4dc" }}>{eyebrow}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
          <div style={{ fontSize: size, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1.02, whiteSpace: "pre-wrap" }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 30, lineHeight: 1.35, color: "#a1a1ad", fontWeight: 500 }}>{subtitle}</div> : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", padding: "12px 20px", borderRadius: 14, backgroundColor: "#ffffff0f", border: "1px solid #ffffff1f", fontFamily: "Geist Mono", fontSize: 22, color: "#e4e4ea" }}>{footer}</div>
          <div style={{ display: "flex", fontSize: 22, color: "#8b8b98" }}>Free · MIT · React + Tailwind v4</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  )
}

/** Trim to a length on a word boundary. */
export const clip = (s: string, n: number) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n)).replace(/[,.;:]$/, "") + "…")
