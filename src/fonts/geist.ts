import localFont from "next/font/local"

/*
 * Geist and Geist Mono from the geist package, subset to Latin plus the
 * punctuation, currency, arrows, maths and symbols the site uses (Mono also
 * keeps box drawing for code). Every layout feature and the full weight axis
 * stay. 38 KB + 43 KB instead of 70 KB + 71 KB, on every first visit.
 * Regenerate with: python3 tools/subset-fonts.py
 */
export const GeistSans = localFont({
  src: "./Geist-Variable.subset.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const GeistMono = localFont({
  src: "./GeistMono-Variable.subset.woff2",
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Roboto Mono", "Menlo", "Monaco", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
  weight: "100 900",
})
