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
  {
    slug: "shadcn-theme-generator",
    name: "shadcn theme generator",
    title: "shadcn/ui Theme Generator for Tailwind CSS v4 (OKLCH)",
    h1: "shadcn/ui theme generator for Tailwind CSS v4",
    description: "Pick a brand color, neutral and radius to get a complete shadcn/ui theme in OKLCH for light and dark, with chart and sidebar colors. Preview it, copy the CSS.",
    keywords: ["shadcn theme generator", "shadcn ui themes", "tailwind v4 theme generator", "shadcn colors oklch", "shadcn dark mode theme"],
    steps: [
      "Choose your brand color. It becomes primary, ring, sidebar primary and the start of the chart palette.",
      "Pick a neutral family for backgrounds, borders and muted text.",
      "Set the radius. shadcn components derive their corner sizes from it.",
      "Copy the CSS and replace the :root and .dark blocks in your globals.css.",
    ],
    body: [
      { type: "h2", text: "What the generated theme covers", id: "covers" },
      { type: "p", text: "The output uses the same variable names the shadcn/ui CLI writes: `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, five chart colors, the sidebar set and `--radius`. Every value is OKLCH, which is what Tailwind CSS v4 and current shadcn/ui use." },
      { type: "p", text: "Neutrals are built from one hue at very low chroma, so grays feel related to each other instead of mixed from different palettes. The dark theme is not an inversion: surfaces step up in lightness with elevation, borders become translucent white, and the primary gets lighter so it keeps contrast on dark backgrounds." },
      { type: "h2", text: "Using it with MiniDev UI", id: "minidev" },
      { type: "p", text: "MiniDev UI uses its own semantic token names (`--surface`, `--ink`, `--accent`) and maps the shadcn names onto them, so both sets of components can live in one project. Note that shadcn uses `accent` for a subtle hover fill while MiniDev uses it for the brand color. The [shadcn registry guide](/guides/shadcn-custom-registry) explains how to reconcile the two." },
      { type: "callout", tone: "tip", text: "Check your primary against white text with the [contrast checker](/tools/contrast-checker). Bright yellows and cyans usually need dark text instead." },
    ],
    faq: [
      { q: "Does this work with Tailwind CSS v4?", a: "Yes. Paste the output below `@import \"tailwindcss\";` in your global CSS. It matches the v4 format that `npx shadcn@latest init` generates." },
      { q: "Why OKLCH instead of HSL?", a: "OKLCH lightness is perceptual, so a light and dark theme built from it keep predictable contrast. shadcn/ui and Tailwind CSS v4 both moved to OKLCH." },
      { q: "Can I use more than one theme?", a: "Yes. Scope a second set of variables to a class or data attribute, such as `[data-theme=\"ocean\"]`, and switch it on a wrapper." },
    ],
    related: ["theme-picker", "button", "card"],
  },
  {
    slug: "hex-to-oklch",
    name: "Hex to OKLCH converter",
    title: "Hex to OKLCH Converter (and RGB, HSL, Tailwind)",
    h1: "Hex to OKLCH color converter",
    description: "Convert hex, RGB and HSL colors to OKLCH in bulk, or OKLCH back to hex. Get Tailwind v4 arbitrary classes and warnings for colors outside sRGB. Free and instant.",
    keywords: ["hex to oklch", "oklch converter", "rgb to oklch", "oklch to hex", "hsl to oklch"],
    steps: ["Paste colors, one per line, in hex, rgb(), hsl() or oklch().", "Read every format side by side.", "Click any value to copy it."],
    body: [
      { type: "h2", text: "How the conversion works", id: "how" },
      { type: "p", text: "Hex, RGB and HSL all describe sRGB. The converter turns sRGB into linear light, then into OKLab with the matrices from Björn Ottosson's reference, and finally into OKLCH polar form: lightness from 0 to 1, chroma from 0 to about 0.37, and hue in degrees." },
      { type: "p", text: "Going the other way, some OKLCH colors have no sRGB equivalent. Those rows are flagged, and the hex shown is the nearest displayable color with the same lightness and hue and reduced chroma, which is how browsers gamut map too." },
      { type: "h2", text: "Using OKLCH in Tailwind CSS v4", id: "tailwind" },
      { type: "code", lang: "css", code: "@theme {\n  --color-brand: oklch(0.62 0.21 283);\n}\n\n/* bg-brand, text-brand, border-brand */" },
      { type: "p", text: "For one-off values, the arbitrary class the tool prints, like `bg-[oklch(0.62_0.21_283)]`, works directly. For a whole scale, use the [OKLCH palette generator](/tools/oklch-palette-generator)." },
    ],
    faq: [
      { q: "What is OKLCH?", a: "A perceptual color space with lightness, chroma and hue axes. Equal lightness values look equally bright across hues, which makes palettes and contrast predictable. See the [OKLCH glossary entry](/glossary/oklch)." },
      { q: "Is OKLCH supported in browsers?", a: "Yes, in all current major browsers. Tailwind CSS v4 uses OKLCH for its default palette." },
      { q: "Why does my OKLCH color look different as hex?", a: "It is probably outside the sRGB gamut. Hex can only express sRGB, so the converter reduces chroma to the nearest color it can show." },
    ],
    related: ["color-picker"],
  },
  {
    slug: "contrast-checker",
    name: "Contrast checker",
    title: "WCAG Color Contrast Checker with Auto Fix",
    h1: "WCAG color contrast checker",
    description: "Check text and background contrast against WCAG 2.2 AA and AAA for normal text, large text and UI parts. Get the closest passing color in one click. Free.",
    keywords: ["color contrast checker", "wcag contrast checker", "contrast ratio calculator", "accessible color contrast", "aa contrast checker"],
    steps: ["Enter a text color and a background in any format.", "Read the ratio and the pass or fail for each WCAG level.", "If it fails, click the suggested color to adopt the nearest passing shade."],
    body: [
      { type: "h2", text: "The WCAG thresholds", id: "thresholds" },
      { type: "list", items: ["**4.5:1** for normal text (AA).", "**3:1** for large text, meaning 24px regular or 18.66px bold, and for UI components and graphical objects such as input borders and icons (AA).", "**7:1** for normal text and **4.5:1** for large text at AAA."] },
      { type: "p", text: "Contrast is computed from relative luminance, so it depends only on the two colors, not on font rendering. Treat the numbers as a floor: thin weights and small sizes need more than the minimum to be comfortable." },
      { type: "h2", text: "How the fix works", id: "fix" },
      { type: "p", text: "When a pair fails, the tool keeps your hue and chroma and moves lightness in OKLCH, darker on light backgrounds and lighter on dark ones, until the pair reaches 4.5:1. Because OKLCH is perceptual, the suggestion still looks like your color, just firmer." },
      { type: "callout", tone: "note", text: "MiniDev UI's text tokens are tuned for this: `fg-muted` clears 7:1 and `fg-subtle` clears 4.5:1 on the page background in light and dark. See [WCAG contrast](/glossary/wcag-contrast)." },
    ],
    faq: [
      { q: "What contrast ratio do I need?", a: "At least 4.5:1 for body text and 3:1 for large text and interface parts to meet WCAG 2.2 AA, which most accessibility laws reference." },
      { q: "Does contrast apply to placeholder text?", a: "Yes. Placeholder text is text, so it needs 4.5:1. Many default placeholder grays fail." },
      { q: "What about APCA?", a: "APCA is a newer contrast model proposed for future WCAG versions. WCAG 2.2 ratios remain the legal and practical baseline today." },
    ],
    related: ["badge", "callout", "button"],
  },
  {
    slug: "fluid-type-calculator",
    name: "Fluid type calculator",
    title: "Fluid Typography Calculator: CSS clamp() Type Scale",
    h1: "Fluid type scale calculator (CSS clamp)",
    description: "Generate a fluid type scale with CSS clamp(): set the viewport range, base sizes and scale ratios, preview at any width and copy Tailwind v4 or plain CSS.",
    keywords: ["fluid typography calculator", "css clamp calculator", "fluid type scale", "responsive font size css", "tailwind fluid typography"],
    steps: ["Set the smallest and largest viewport widths you design for.", "Choose the base font size at each end and a scale ratio for small and large screens.", "Drag the preview slider to check every step, then copy the CSS."],
    body: [
      { type: "h2", text: "How clamp() makes type fluid", id: "clamp" },
      { type: "p", text: "`clamp(min, preferred, max)` picks the preferred value unless it falls outside the range. The preferred value here is a straight line between two points, the minimum size at the small viewport and the maximum at the large one, written as `rem + vw`. Keeping a `rem` term means text still scales when people change their browser font size, which pure `vw` values break." },
      { type: "code", lang: "css", code: "/* 16px at 360px wide, 18px at 1280px wide */\nfont-size: clamp(1rem, 0.9511rem + 0.2174vw, 1.125rem);" },
      { type: "h2", text: "Why two ratios", id: "ratios" },
      { type: "p", text: "A 1.333 scale looks confident on a laptop but makes headings enormous on a phone. Using a tighter ratio on small screens and a wider one on large screens keeps hierarchy clear everywhere, so small text barely changes while display sizes grow the most." },
    ],
    faq: [
      { q: "Is fluid typography accessible?", a: "Yes, if the formula includes a rem term, as this tool's output does. WCAG requires text to scale to 200% with browser zoom, and rem based clamp values respect that." },
      { q: "How do I use it in Tailwind CSS v4?", a: "Paste the `@theme` block. It overrides `--text-*` sizes, so `text-xl` and friends become fluid across the whole project." },
      { q: "What viewport range should I use?", a: "Common choices are 360px to 1280px or 1440px. Below the minimum and above the maximum, sizes stay fixed." },
    ],
    related: ["heading", "prose"],
  },
  {
    slug: "mesh-gradient-generator",
    name: "Mesh gradient generator",
    title: "Mesh Gradient Generator: Free CSS Gradients",
    h1: "Mesh gradient generator",
    description: "Drag color points to design a soft mesh gradient, adjust softness and base color, randomize palettes and copy pure CSS with layered radial gradients. No images.",
    keywords: ["mesh gradient generator", "css mesh gradient", "gradient background generator", "aurora gradient css", "radial gradient generator"],
    steps: ["Drag the four color points, or focus one and use arrow keys.", "Pick colors and a base, and set how soft the blend is.", "Randomize for new palettes, then copy the CSS."],
    body: [
      { type: "h2", text: "A mesh gradient in pure CSS", id: "css" },
      { type: "p", text: "True mesh gradients interpolate color across a grid of points. CSS does not have one, but several layered `radial-gradient()`s fading to transparent over a base color get very close, stay tiny, and scale to any size without an image request." },
      { type: "p", text: "Keep text readable on top by adding a dark or light scrim, or place content in a frosted panel from the [glassmorphism generator](/tools/glassmorphism-generator). Add fine grain from the [noise generator](/tools/noise-texture-generator) to prevent visible banding on large screens." },
      { type: "h2", text: "Animate it", id: "animate" },
      { type: "p", text: "For a living background, MiniDev UI's LightField draws a similar mesh in a small WebGL shader that drifts and follows the pointer, and pauses when off screen." },
      { type: "component", name: "light-field" },
    ],
    faq: [
      { q: "Will a CSS mesh gradient slow my page?", a: "No. Static gradients are drawn once by the browser. Avoid animating many large gradients, which forces repaints." },
      { q: "Why do I see banding?", a: "Smooth gradients across large areas can show steps on 8 bit screens. A subtle noise overlay breaks up the bands." },
      { q: "Can I use it in Tailwind?", a: "Yes. Put the CSS in a class, or use an arbitrary `bg-[...]` value for the background-image." },
    ],
    related: ["light-field", "hero-gradient-mesh", "hero-aurora"],
  },
  {
    slug: "noise-texture-generator",
    name: "Noise texture generator",
    title: "Noise Texture Generator: CSS Grain Overlay",
    h1: "Noise and grain texture generator",
    description: "Create a film grain overlay with SVG noise: tune frequency, octaves, opacity and blend mode, preview on a gradient and copy tiny CSS or download the SVG.",
    keywords: ["noise texture generator", "css grain effect", "svg noise background", "film grain css", "noise overlay css"],
    steps: ["Adjust frequency for grain size and octaves for detail.", "Set opacity and a blend mode that suits your background.", "Copy the CSS or download the SVG tile."],
    body: [
      { type: "h2", text: "How the grain is made", id: "how" },
      { type: "p", text: "The texture is an SVG filter: `feTurbulence` generates Perlin noise and `feColorMatrix` removes its color, leaving gray grain. The SVG is inlined as a data URI, so there is no image to download, and `stitchTiles` makes it repeat seamlessly." },
      { type: "p", text: "Laid over a gradient with `mix-blend-mode: overlay` or `soft-light` at 10 to 25 percent opacity, grain adds tactile depth and hides gradient banding. MiniDev UI's paper material uses the same technique for its warm stock texture." },
      { type: "code", lang: "css", code: ".grain::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background-image: url(\"data:image/svg+xml,...\");\n  opacity: 0.2;\n  mix-blend-mode: overlay;\n}" },
    ],
    faq: [
      { q: "Does an SVG noise overlay affect performance?", a: "The filter is rasterized once per tile, so a static grain overlay is cheap. Avoid animating it on large areas." },
      { q: "Which blend mode should I use?", a: "Overlay and soft light keep colors intact on mid tones. Use multiply on light backgrounds for darker grain and screen on dark ones for lighter grain." },
      { q: "Can I use it without JavaScript?", a: "Yes. The output is plain CSS with an inline SVG, so it works in any site." },
    ],
    related: ["light-field", "card"],
  },
]

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug)
