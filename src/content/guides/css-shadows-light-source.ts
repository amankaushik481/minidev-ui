import type { Guide } from "../types"

const guide: Guide = {
  slug: "css-shadows-light-source",
  title: "Realistic CSS shadows that follow a light source",
  description:
    "Build realistic CSS box shadows from layered, tinted shadows, drive their direction with CSS variables, and move one light source with a small pointer script.",
  date: "2026-09-30",
  keywords: ["realistic box shadow css", "layered shadows css", "dynamic shadows css variables", "css light source shadow", "box shadow follow mouse"],
  related: ["light-provider", "card", "button"],
  body: [
    {
      type: "p",
      text: "Realistic CSS shadows come from two things: stacking several `box-shadow` layers with growing offset and blur and small opacity each, and pointing every one of them away from the same light. Put the light direction in two CSS variables, derive all offsets from them with `calc()`, and a few lines of JavaScript that update those variables make every shadow on the page follow the light.",
    },

    { type: "h2", text: "Why one box-shadow looks fake", id: "why-one-shadow-looks-fake" },
    {
      type: "p",
      text: "A real object resting on a surface casts a small, dark contact shadow where it nearly touches, and a wide, faint penumbra further out. A single shadow like `0 10px 30px rgba(0, 0, 0, 0.3)` has one blur radius and one opacity, so it can only be one of those. It usually ends up as a gray smudge that floats under the element.",
    },
    {
      type: "p",
      text: "Color matters too. Shadows pick up the tint of the environment, and pure black at high opacity looks dirty on anything that is not white. MiniDev's light theme tints every shadow with the same cool hue as its neutrals: `oklch(0.22 0.025 264 / a)`.",
    },

    { type: "h2", text: "Layered shadows", id: "layered-shadows" },
    {
      type: "p",
      text: "Stack three to five layers. Each one roughly doubles the offset and blur of the previous one, while its opacity stays low, because the layers add up.",
    },
    {
      type: "code",
      lang: "css",
      code: `.card {
  box-shadow:
    inset 0 1px 0 0 oklch(1 0 0 / 0.8),
    0 1px 1px 0 oklch(0.22 0.025 264 / 0.06),
    0 2px 4px 0 oklch(0.22 0.025 264 / 0.06),
    0 6px 12px -2px oklch(0.22 0.025 264 / 0.08),
    0 16px 32px -8px oklch(0.22 0.025 264 / 0.12);
}`,
    },
    {
      type: "list",
      items: [
        "**Small layers do the contact shadow.** A 1px offset with a 1px blur draws the dark line right under the edge that makes an element feel grounded.",
        "**Large layers do the lift.** The biggest layer sets how high the element appears to float. Increase it for menus and dialogs, keep it small for cards.",
        "**Negative spread keeps it underneath.** A spread of `-8px` on a 32px blur stops the soft layer from bleeding out at the sides, so the shadow sits below the element rather than around it.",
        "**An inset highlight sells the top edge.** A 1px inset line at the top in near white reads as light catching the rim.",
      ],
    },
    {
      type: "p",
      text: "MiniDev's overlay shadow, used by menus, popovers and dialogs, follows this pattern with four layers:",
    },
    {
      type: "code",
      lang: "css",
      filename: "minidev.css",
      code: `:root {
  --sh-overlay:
    inset 0 1px 0 0 var(--highlight),
    0 0 0 1px oklch(0.22 0.025 264 / 0.05),
    0 4px 12px -4px oklch(0.22 0.025 264 / 0.1),
    0 24px 56px -12px oklch(0.22 0.025 264 / 0.24);
}

@theme inline {
  --shadow-overlay: var(--sh-overlay);
}`,
    },
    {
      type: "p",
      text: "Defining the stack as a token and mapping it through `@theme inline` gives you a normal `shadow-overlay` utility in Tailwind CSS v4, and each theme can redefine `--sh-overlay` without touching components. The `0 0 0 1px` layer is a ring: a hairline outline that keeps the overlay's edge visible on light backgrounds.",
    },

    { type: "h3", text: "Tune shadows per theme" },
    {
      type: "p",
      text: "A shadow tuned for a white page disappears on a dark one. In MiniDev's dark theme, the same layer structure switches to black and much higher opacity: the large layer of `--sh-lg` goes from `oklch(0.22 0.025 264 / 0.14)` to `oklch(0 0 0 / 0.55)`. The top highlight drops from 80 percent white to 6 percent, because a bright rim on a dark card looks like a rendering bug. Since components only reference `shadow-lg` or `shadow-raised`, each theme can make these calls on its own without a single `dark:` class in component code.",
    },

    { type: "h2", text: "Put the light direction in CSS variables", id: "light-direction-variables" },
    {
      type: "p",
      text: "Describe the light with two numbers between -1 and 1: `--sx` and `--sy`, the direction a shadow falls. A light at the top left throws shadows right and down, so both are positive. Every offset is then derived from those two values:",
    },
    {
      type: "code",
      lang: "css",
      filename: "minidev.css",
      code: `:root {
  --sx: 0.45;
  --sy: 0.9;

  --o1x: calc(var(--sx) * 1px);
  --o1y: calc(var(--sy) * 1px);
  --o4x: calc(var(--sx) * 4px);
  --o4y: calc(var(--sy) * 4px + 1px);
  --o12x: calc(var(--sx) * 12px);
  --o12y: calc(var(--sy) * 12px + 4px);
  --o28x: calc(var(--sx) * 28px);
  --o28y: calc(var(--sy) * 28px + 10px);
}`,
    },
    {
      type: "p",
      text: "The constant added to the vertical offsets is a downward bias. Even when the light drops below the middle of the screen and `--sy` goes negative, the larger layers still fall slightly down, so elements keep reading as resting on the page instead of hanging from it.",
    },
    {
      type: "p",
      text: "A shadow token then uses those offsets instead of fixed pixels. This is MiniDev's `--sh-raised` for the paper material:",
    },
    {
      type: "code",
      lang: "css",
      filename: "minidev.css",
      code: `[data-material="paper"] {
  --sh-raised:
    var(--o1x) var(--o1y) 1px 0 oklch(0.35 0.04 60 / 0.1),
    var(--o4x) var(--o4y) 8px -3px oklch(0.35 0.04 60 / 0.12),
    var(--o28x) var(--o28y) 44px -20px oklch(0.35 0.05 60 / 0.25);
}`,
    },
    { type: "h3", text: "Light the edge that faces the light" },
    {
      type: "p",
      text: "Flip the sign to move a highlight toward the light. This inset line sits on the top edge when the light is above, on the left edge when it is to the left, and anywhere in between:",
    },
    {
      type: "code",
      lang: "css",
      code: `box-shadow: inset calc(var(--sx) * -1px) calc(var(--sy) * -1px) 0 0 var(--highlight);`,
    },
    {
      type: "p",
      text: "MiniDev's glass and metal materials use exactly this line as the first layer of `--sh-raised`, `--sh-key` and `--sh-overlay`, so bevels turn as the light moves.",
    },
    {
      type: "callout",
      tone: "warning",
      text: "Declare derived variables where their inputs live. `--o4x` is declared on `:root`, so it is computed there and descendants inherit the result. If you set `--sx` on a nested element, `--o4x` inside it does not change. Either write `--sx` on `<html>`, as MiniDev does, or redeclare the derived variables in the same scope.",
    },

    { type: "h2", text: "A small pointer-driven script", id: "pointer-script" },
    {
      type: "p",
      text: "Treat the pointer as the light. The shadow direction is the vector from the light to the center of the viewport, normalized to the half width and half height and clamped to -1..1. Easing toward the target keeps the motion calm instead of twitchy.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "light.ts",
      code: `const root = document.documentElement
let tx = innerWidth * 0.3
let ty = -innerHeight * 0.1
let cx = tx
let cy = ty
let last = performance.now()

addEventListener(
  "pointermove",
  (e) => {
    if (e.pointerType === "touch") return
    tx = e.clientX
    ty = e.clientY
  },
  { passive: true }
)

function frame(now: number) {
  const dt = Math.min(64, now - last)
  last = now
  // Closes the same share of the gap per second at any frame rate.
  const k = Math.min(1, (1 - Math.pow(0.001, dt / 1000)) * 1.6)
  cx += (tx - cx) * k
  cy += (ty - cy) * k

  const hw = innerWidth / 2
  const hh = innerHeight / 2
  const sx = Math.max(-1, Math.min(1, (hw - cx) / hw))
  const sy = Math.max(-1, Math.min(1, (hh - cy) / hh))
  root.style.setProperty("--sx", sx.toFixed(3))
  root.style.setProperty("--sy", sy.toFixed(3))
  requestAnimationFrame(frame)
}

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  requestAnimationFrame(frame)
}`,
    },
    {
      type: "p",
      text: "When the pointer is left of center, `hw - cx` is positive, so shadows fall to the right, away from it. Touch events are ignored, because a finger is not a light and it jumps between taps. With reduced motion the script never starts, and the defaults in CSS keep a fixed top left light.",
    },
    { type: "h3", text: "Keep it cheap" },
    {
      type: "list",
      items: [
        "Changing a variable on `<html>` makes the browser recompute styles for everything that reads it and repaint those shadows. Skip the write when the value has not changed.",
        "Stop the loop when the tab is hidden, and restart it on `visibilitychange`.",
        "Keep any `transition` on `box-shadow` short, as for hover and press states. Each variable update restarts it, so a long transition makes the shadow trail behind the light. The script already does the easing.",
        "Unregistered custom properties cannot be transitioned by CSS at all. If you want CSS to animate `--sx`, register it with `@property --sx { syntax: \"<number>\"; inherits: true; initial-value: 0.45; }`.",
      ],
    },

    { type: "h2", text: "How MiniDev's LightProvider does it", id: "light-provider" },
    {
      type: "p",
      text: "[LightProvider](/docs/light-provider) is the production version of that script as a React component that renders nothing. It writes five variables on `<html>`: `--lx` and `--ly` (the light position in pixels, for sheens), `--sx` and `--sy` (shadow direction) and `--la` (the angle toward the light, for linear gradients). The write step, from the source:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "components/ui/light-provider.tsx",
      code: `const write = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  const sx = Math.max(-1, Math.min(1, (w / 2 - cx) / (w / 2)))
  const sy = Math.max(-1, Math.min(1, (h / 2 - cy) / (h / 2)))
  const la = (Math.atan2(-sx, sy) * 180) / Math.PI // toward the light
  const key = \`\${Math.round(cx)}|\${Math.round(cy)}\`
  if (key === lastWrite) return
  lastWrite = key
  root.style.setProperty("--lx", \`\${Math.round(cx)}px\`)
  root.style.setProperty("--ly", \`\${Math.round(cy)}px\`)
  root.style.setProperty("--sx", sx.toFixed(3))
  root.style.setProperty("--sy", sy.toFixed(3))
  root.style.setProperty("--la", \`\${Math.round(la)}deg\`)
}`,
    },
    {
      type: "list",
      items: [
        "**It only writes when the light moves a whole pixel.** The key is the rounded position, so an idle pointer costs no style recalculation.",
        "**It drifts when nobody is pointing.** With `idle` on (the default), on touch devices or after five seconds without pointer movement, the target moves slowly on an ellipse around the upper middle of the screen. Pass `idle={false}` to hold the light still instead.",
        "**It pauses with the tab.** A `visibilitychange` listener cancels the animation frame while the page is hidden.",
        "**It respects reduced motion.** The effect exits early, and the stylesheet defaults (`--sx: 0.45`, `--sy: 0.9`, a light at the upper left) stay in place.",
      ],
    },
    {
      type: "p",
      text: "Which shadows react depends on the material. The default hairline theme keeps static shadows on purpose, since a product UI should be quiet. The glass, metal and paper materials redefine the `--sh-*` tokens with the `--o*` offsets, so the same `shadow-raised` class on a card starts following the light as soon as you switch material. Components never change.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/layout.tsx",
      code: `import { LightProvider } from "@/components/ui/light-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-material="paper">
      <body>
        <LightProvider />
        {children}
      </body>
    </html>
  )
}`,
    },
    {
      type: "code",
      lang: "tsx",
      code: `<div className="rounded-xl bg-surface p-6 shadow-raised">
  Casts its shadow away from the light.
</div>`,
    },
    {
      type: "callout",
      tone: "tip",
      text: "The position variables are useful beyond shadows. MiniDev's `light-spot` utility paints `radial-gradient(600px circle at var(--lx) var(--ly), ...)` with `background-attachment: fixed`, which gives any container a soft glow under the light. The glass material uses the same idea for its sheen; see [glassmorphism in Tailwind CSS v4](/guides/glassmorphism-tailwind-css).",
    },

    { type: "h2", text: "Components to start with", id: "components" },
    {
      type: "p",
      text: "Add `LightProvider` once near the root, pick a material, and use the shadow tokens on anything raised. [Card](/docs/card) and [Button](/docs/button) already use `shadow-raised`, `shadow-key` and `shadow-ink`. The shadow colors are OKLCH tokens, covered in [OKLCH colors in Tailwind CSS v4](/guides/oklch-colors-tailwind-v4).",
    },
    { type: "component", name: "light-provider" },
    { type: "component", name: "card" },
    { type: "component", name: "button" },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/light-provider.json
npx shadcn@latest add https://ui.minidev.pro/r/card.json`,
    },
  ],
  faq: [
    {
      q: "How do I make a realistic box shadow in CSS?",
      a: "Layer three to five shadows with increasing offset and blur and low opacity each, use negative spread on the larger ones, and tint the color toward your background instead of using pure black.",
    },
    {
      q: "Can I use CSS variables inside box-shadow?",
      a: "Yes. Offsets, blur and colors can all be variables, and `calc(var(--sx) * 4px)` works for offsets. That is what lets one pair of variables steer every shadow on the page.",
    },
    {
      q: "Can box-shadow follow the mouse without JavaScript?",
      a: "Not in a general way. CSS cannot read the pointer position, so a small script writes it into custom properties and CSS does the rest.",
    },
    {
      q: "Do dynamic shadows hurt performance?",
      a: "Updating a variable on the root restyles everything that reads it. Write only when the value changes, pause while the tab is hidden, and skip the effect entirely for users who prefer reduced motion.",
    },
  ],
}

export default guide
