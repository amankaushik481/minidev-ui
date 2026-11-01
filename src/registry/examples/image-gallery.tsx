import { ImageGallery, type GalleryImage } from "@/registry/ui/image-gallery"
import type { Example } from "./types"

// Stand in for photo URLs: a two colour gradient as an inline SVG, so the demo needs no image files.
const swatch = (from: string, to: string) =>
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + from + '"/><stop offset="1" stop-color="' + to + '"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/></svg>'
  )

const OFFICE: GalleryImage[] = [
  { src: swatch("hsl(210 60% 55%)", "hsl(230 50% 30%)"), alt: "Lumen office lobby" },
  { src: swatch("hsl(28 80% 65%)", "hsl(14 70% 40%)"), alt: "Team lunch on the terrace" },
  { src: swatch("hsl(160 45% 50%)", "hsl(180 40% 25%)"), alt: "Whiteboard after the planning session" },
  { src: swatch("hsl(280 40% 60%)", "hsl(260 45% 30%)"), alt: "Maya Chen presenting the roadmap" },
  { src: swatch("hsl(45 70% 62%)", "hsl(25 60% 38%)"), alt: "Demo day in the studio" },
  { src: swatch("hsl(195 50% 58%)", "hsl(215 45% 32%)"), alt: "The first invoice ever printed" },
]

const PRODUCT: GalleryImage[] = [
  { src: swatch("hsl(220 55% 60%)", "hsl(240 45% 35%)"), alt: "Dashboard overview" },
  { src: swatch("hsl(200 60% 65%)", "hsl(220 50% 40%)"), alt: "Invoice editor" },
  { src: swatch("hsl(150 45% 55%)", "hsl(170 40% 30%)"), alt: "Bank sync settings" },
  { src: swatch("hsl(35 75% 65%)", "hsl(20 65% 40%)"), alt: "Reminder schedule" },
  { src: swatch("hsl(300 35% 60%)", "hsl(280 40% 35%)"), alt: "Customer portal" },
  { src: swatch("hsl(10 65% 65%)", "hsl(350 55% 40%)"), alt: "Overdue report" },
  { src: swatch("hsl(190 55% 60%)", "hsl(210 50% 35%)"), alt: "Mobile approvals" },
  { src: swatch("hsl(60 50% 60%)", "hsl(45 60% 35%)"), alt: "Audit log" },
]

export const examples: Example[] = [
  {
    title: "Custom images",
    description: "Each image needs a src and alt text; six tiles make three rows on phones and two rows of three from the small breakpoint up.",
    code: `// Stand in for photo URLs: a two colour gradient as an inline SVG, so the demo needs no image files.
const swatch = (from: string, to: string) =>
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + from + '"/><stop offset="1" stop-color="' + to + '"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/></svg>'
  )

const OFFICE: GalleryImage[] = [
  { src: swatch("hsl(210 60% 55%)", "hsl(230 50% 30%)"), alt: "Lumen office lobby" },
  { src: swatch("hsl(28 80% 65%)", "hsl(14 70% 40%)"), alt: "Team lunch on the terrace" },
  { src: swatch("hsl(160 45% 50%)", "hsl(180 40% 25%)"), alt: "Whiteboard after the planning session" },
  { src: swatch("hsl(280 40% 60%)", "hsl(260 45% 30%)"), alt: "Maya Chen presenting the roadmap" },
  { src: swatch("hsl(45 70% 62%)", "hsl(25 60% 38%)"), alt: "Demo day in the studio" },
  { src: swatch("hsl(195 50% 58%)", "hsl(215 45% 32%)"), alt: "The first invoice ever printed" },
]

<ImageGallery images={OFFICE} className="max-w-md" />`,
    node: <ImageGallery images={OFFICE} className="max-w-md" />,
  },
  {
    title: "Four columns",
    description: "Override the column classes for a denser wall; the tiles stay square and keep the 8px gap.",
    code: `const PRODUCT: GalleryImage[] = [
  { src: swatch("hsl(220 55% 60%)", "hsl(240 45% 35%)"), alt: "Dashboard overview" },
  { src: swatch("hsl(200 60% 65%)", "hsl(220 50% 40%)"), alt: "Invoice editor" },
  { src: swatch("hsl(150 45% 55%)", "hsl(170 40% 30%)"), alt: "Bank sync settings" },
  { src: swatch("hsl(35 75% 65%)", "hsl(20 65% 40%)"), alt: "Reminder schedule" },
  { src: swatch("hsl(300 35% 60%)", "hsl(280 40% 35%)"), alt: "Customer portal" },
  { src: swatch("hsl(10 65% 65%)", "hsl(350 55% 40%)"), alt: "Overdue report" },
  { src: swatch("hsl(190 55% 60%)", "hsl(210 50% 35%)"), alt: "Mobile approvals" },
  { src: swatch("hsl(60 50% 60%)", "hsl(45 60% 35%)"), alt: "Audit log" },
]

<ImageGallery images={PRODUCT} className="max-w-3xl sm:grid-cols-4" />`,
    node: <ImageGallery images={PRODUCT} className="max-w-3xl sm:grid-cols-4" />,
  },
]
