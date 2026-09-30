import type { Block, Faq } from "./types"

export type Tool = {
  slug: string
  name: string
  /** <title> before the brand suffix. */
  title: string
  h1: string
  description: string
  keywords: string[]
  /** How-to steps, also emitted as HowTo structured data. */
  steps: string[]
  body: Block[]
  faq: Faq[]
  related: string[]
}

export const TOOLS: Tool[] = [
  {
    slug: "box-shadow-generator",
    name: "Box shadow generator",
    title: "CSS Box Shadow Generator with a Light Source",
    h1: "CSS box shadow generator with a real light source",
    description: "Drag a light and get layered, realistic CSS box shadows that fall away from it. Copy plain CSS or a Tailwind class. Free, no sign up, works in the browser.",
    keywords: ["css box shadow generator", "tailwind shadow generator", "realistic box shadow", "layered box shadow css", "soft shadow generator"],
    steps: [
      "Drag the light anywhere on the stage. Shadows fall away from it.",
      "Set elevation for how far the card floats, and softness for how diffuse the light is.",
      "Choose how many layers to stack. More layers read as more natural.",
      "Copy the CSS or the Tailwind arbitrary class into your project.",
    ],
    body: [
      { type: "h2", text: "Why layered shadows look real", id: "why-layered" },
      { type: "p", text: "A single `box-shadow` reads as a flat grey halo. Real objects cast a tight, dark contact shadow close to the edge and a wide, faint penumbra further out. Stacking three to six shadows with doubling offsets and blur, and shrinking opacity, reproduces that falloff." },
      { type: "p", text: "Direction matters as much as softness. When every shadow on a page falls away from the same light, surfaces feel like they share one space. This generator computes the offset from the light position, so you can match shadows across a whole design." },
      { type: "h2", text: "Use the output with Tailwind CSS", id: "tailwind" },
      { type: "p", text: "Paste the CSS into a class, or use the Tailwind arbitrary value `shadow-[...]` the tool prints. In Tailwind CSS v4 you can also register it as a theme token with `--shadow-raised` inside `@theme` and use `shadow-raised` everywhere." },
      { type: "code", lang: "css", code: "@theme {\n  --shadow-raised: 0 1px 1px rgb(0 0 0 / 0.08), 0 2px 4px rgb(0 0 0 / 0.07), 0 6px 12px rgb(0 0 0 / 0.06);\n}" },
      { type: "h2", text: "Shadows that move with the pointer", id: "dynamic" },
      { type: "p", text: "MiniDev UI takes this one step further: a light provider writes the light position into CSS variables, and every shadow token reads them, so the whole interface re-lights as the pointer moves. The [light source shadows guide](/guides/css-shadows-light-source) shows how it works." },
    ],
    faq: [
      { q: "How many shadow layers should I use?", a: "Three to five layers look natural for cards. Use one or two for small controls like buttons and inputs, where heavy shadows feel muddy." },
      { q: "Do layered box shadows hurt performance?", a: "Static shadows are cheap. Animating box-shadow on many elements can be costly, so animate transform or opacity instead, or fade between two shadow states." },
      { q: "Why do my shadows look dirty on colored backgrounds?", a: "Pure black shadows desaturate what is below them. Tint the shadow toward the background hue, or lower the opacity, for a cleaner result." },
      { q: "Can I use the result in Tailwind?", a: "Yes. Copy the `shadow-[...]` class, or add the value to `@theme` as a named shadow token in Tailwind CSS v4." },
    ],
    related: ["light-provider", "card", "stat-card"],
  },
  {
    slug: "glassmorphism-generator",
    name: "Glassmorphism generator",
    title: "Glassmorphism CSS Generator for Tailwind",
    h1: "Glassmorphism generator: frosted glass CSS and Tailwind",
    description: "Design frosted glass cards live: blur, transparency, saturation, border and tint over a real background. Copy the CSS or Tailwind classes. Free and instant.",
    keywords: ["glassmorphism generator", "glassmorphism css", "frosted glass css", "tailwind glassmorphism", "backdrop filter blur"],
    steps: [
      "Pick a background so you can judge the glass against real color.",
      "Adjust blur and transparency until text stays readable.",
      "Add saturation for richer color through the glass, and a light border for the edge.",
      "Copy the CSS or the Tailwind classes.",
    ],
    body: [
      { type: "h2", text: "What makes glass readable", id: "readable" },
      { type: "p", text: "Glassmorphism fails when text sits on a busy background. Enough blur (16 to 28 pixels) removes detail, a fill of 10 to 30 percent white or black evens out brightness, and a slight saturation boost keeps the color behind from turning grey. The contrast readout in the tool checks your text against the average color under the glass." },
      { type: "h2", text: "The CSS behind it", id: "css" },
      { type: "code", lang: "css", code: ".glass {\n  background: rgb(255 255 255 / 0.18);\n  backdrop-filter: blur(20px) saturate(160%);\n  -webkit-backdrop-filter: blur(20px) saturate(160%);\n  border: 1px solid rgb(255 255 255 / 0.35);\n  border-radius: 20px;\n}" },
      { type: "callout", tone: "tip", text: "`backdrop-filter` needs something behind the element to blur. On a flat background, glass just looks grey, so place it over imagery, gradients or content." },
      { type: "h2", text: "A whole glass theme", id: "theme" },
      { type: "p", text: "If you want every surface in a product to become glass, set it at the token level rather than per component. MiniDev UI does this with `data-material=\"glass\"`, which the [glassmorphism in Tailwind guide](/guides/glassmorphism-tailwind-css) walks through." },
    ],
    faq: [
      { q: "Is backdrop-filter supported in all browsers?", a: "Yes, in all current major browsers. Safari needs the `-webkit-backdrop-filter` prefix, which the generated CSS includes." },
      { q: "Does glassmorphism hurt performance?", a: "Blur is computed every frame for whatever sits behind the element. Keep glass to a few large surfaces and avoid animating many blurred layers at once." },
      { q: "How do I make glassmorphism accessible?", a: "Blur enough to remove background detail, add a tint, and check text contrast. Provide a solid fallback for users who enable reduced transparency." },
    ],
    related: ["card", "dialog", "popover"],
  },
  {
    slug: "oklch-palette-generator",
    name: "OKLCH palette generator",
    title: "OKLCH Color Palette Generator for Tailwind v4",
    h1: "OKLCH color palette generator for Tailwind CSS v4",
    description: "Generate an 11 step OKLCH color scale from any hex or hue, gamut mapped to sRGB with contrast checks. Export Tailwind CSS v4 @theme variables or hex values.",
    keywords: ["oklch color palette generator", "tailwind v4 color palette", "oklch generator", "tailwind color scale generator", "oklch to hex"],
    steps: [
      "Paste a brand hex or drag the hue and chroma sliders.",
      "Check each step's contrast against white and black text.",
      "Name the color, then copy the Tailwind v4 @theme block or the hex list.",
    ],
    body: [
      { type: "h2", text: "Why OKLCH for palettes", id: "why-oklch" },
      { type: "p", text: "In OKLCH, lightness is perceptual, so a 500 blue and a 500 yellow look equally bright. That makes scales predictable: step 600 reliably carries white text, step 100 reliably works as a tint, whatever the hue. HSL cannot promise that." },
      { type: "p", text: "Very saturated colors do not exist in sRGB at every lightness, so the generator reduces chroma where needed and keeps hue and lightness fixed. Every swatch you see is a real, displayable color." },
      { type: "h2", text: "Using the scale in Tailwind CSS v4", id: "tailwind-v4" },
      { type: "code", lang: "css", code: "@import \"tailwindcss\";\n\n@theme {\n  --color-brand-500: oklch(0.62 0.19 250);\n  --color-brand-600: oklch(0.54 0.18 250);\n}\n\n/* then: bg-brand-500 text-white hover:bg-brand-600 */" },
      { type: "p", text: "For product UI, map the scale to semantic tokens such as `--accent` and `--accent-hover` rather than using steps directly. The [OKLCH in Tailwind v4 guide](/guides/oklch-colors-tailwind-v4) shows a full light and dark token set." },
    ],
    faq: [
      { q: "What is OKLCH?", a: "OKLCH is a color space with lightness, chroma and hue axes designed to match human perception. Tailwind CSS v4 uses it for its default palette." },
      { q: "Can I convert OKLCH to hex?", a: "Yes. Every swatch shows its hex value, converted after gamut mapping to sRGB, so the hex matches what the browser renders." },
      { q: "Which step should I use for buttons?", a: "Steps 500 to 600 usually carry white text at 4.5:1 or better. The contrast badges on each swatch tell you for your exact color." },
    ],
    related: ["color-picker", "theme-picker"],
  },
  {
    slug: "brand-kit-generator",
    name: "Brand kit generator",
    title: "Free Brand Kit Generator: Logo, Colors, Type",
    h1: "Free brand kit generator",
    description: "Type a name and pick a color to get a live brand kit: logo lockups, color tokens, type scale, voice, business card, app icon and share card. Download the CSS tokens.",
    keywords: ["brand kit generator", "free brand kit", "brand style guide generator", "brand guidelines template", "startup brand kit"],
    steps: [
      "Enter your product name and a one line tagline.",
      "Pick a brand color, a type style and a logo shape.",
      "Review the kit: logos, palette, type, voice and real world mockups.",
      "Download the CSS tokens, or ask MiniDev to design the full brand.",
    ],
    body: [
      { type: "h2", text: "What a brand kit should contain", id: "contents" },
      { type: "list", items: [
        "**Logo usage:** the mark and wordmark on light, dark and brand color, with clear space and a minimum size.",
        "**Color:** a primary, a secondary for gradients and charts, ink, canvas and surface, with rough proportions of use.",
        "**Type:** a display face and a text face with a small, named scale.",
        "**Voice:** three words you are, three you are not, and one sentence to say and one to never say.",
        "**Tokens:** the same decisions as CSS variables, so the product and the site cannot drift apart.",
      ] },
      { type: "h2", text: "From brand kit to product", id: "product" },
      { type: "p", text: "The tokens this tool exports use the same names as MiniDev UI, so dropping them into a project restyles every component. That is how each of the eight [templates](/templates) gets its own look from one component set." },
    ],
    faq: [
      { q: "Is the brand kit generator free?", a: "Yes. Everything runs in your browser, nothing is stored, and the CSS tokens download for free." },
      { q: "Can I use the generated logo commercially?", a: "The generated lockups are simple starting points built from your name and a basic shape. For a distinctive mark you can trademark, work with a designer." },
      { q: "How do I use the tokens?", a: "Paste the downloaded CSS into your global stylesheet. With MiniDev UI or any shadcn-style setup, components pick up the new accent colors immediately." },
    ],
    related: ["brand-kit-page", "color-picker"],
  },
]

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug)
