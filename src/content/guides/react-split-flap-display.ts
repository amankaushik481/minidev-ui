import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-split-flap-display",
  title: "Build a split-flap display (Solari board) in React",
  description:
    "Build a split-flap departure board in React: character cycling, two-half flaps with rotateX and perspective, column stagger, reduced motion and screen readers.",
  date: "2026-09-30",
  keywords: ["split flap display react", "flip board animation css", "departure board ui", "solari board css", "react flip text animation"],
  related: ["split-flap", "number-roll"],
  body: [
    {
      type: "p",
      text: "A split-flap display draws each character as a top half and a bottom half. To change a character, the top half of the current one falls forward around a horizontal hinge (`rotateX(0)` to `rotateX(-90deg)`), then the bottom half of the next one swings down into place (`rotateX(90deg)` to `rotateX(0)`). Step each cell through a fixed character set until it reaches its target, start each column a few milliseconds after the previous one, and you get the ripple of a Solari departure board. This guide walks through MiniDev's [SplitFlap](/docs/split-flap) component, which does exactly that in under 130 lines.",
    },

    { type: "h2", text: "Anatomy of one cell", id: "anatomy" },
    {
      type: "p",
      text: "Each character cell is a small box with `perspective` set on it and up to six absolutely positioned layers:",
    },
    {
      type: "table",
      head: ["Layer", "Shows", "Pivot", "Animation"],
      rows: [
        ["Static top", "Top half of the next character", "none", "none"],
        ["Static bottom", "Bottom half of the current character", "none", "none"],
        ["Falling flap", "Top half of the current character", "`origin-bottom`", "`rotateX(0)` to `rotateX(-90deg)`"],
        ["Landing flap", "Bottom half of the next character", "`origin-top`", "`rotateX(90deg)` to `rotateX(0)`"],
        ["Hinge", "A 1px dark line across the middle", "none", "none"],
        ["Bezel", "Inset top highlight and a small drop shadow", "none", "none"],
      ],
    },
    {
      type: "p",
      text: "At rest, current and next are the same character, so the two static halves form one glyph and the flaps are not rendered. During a flip, the static top already shows the next character. It is hidden behind the falling flap, and it is revealed as that flap rotates away. The landing flap then covers the old bottom half. That ordering is what makes the illusion hold at any speed.",
    },

    { type: "h2", text: "Cycling through the character set", id: "charset-cycling" },
    {
      type: "p",
      text: "A real board has a drum of printed flaps and can only turn one way. The component models that with a fixed string and an index lookup:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/split-flap.tsx",
      code: `const CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-'/·"

function idx(c: string) {
  const i = CHARSET.indexOf(c.toUpperCase())
  return i < 0 ? 0 : i
}`,
    },
    {
      type: "list",
      items: [
        "The set has 43 characters and starts with a space, so an unknown character maps to index 0 and shows blank rather than breaking.",
        "Lowercase input is uppercased, like the physical boards.",
        "Cycling only moves forward and wraps around, so going from `B` to `A` takes 42 flips. At the default `speed` of 70ms plus an 8ms gap, the worst case is about 3.3 seconds. Order matters: digits sit next to each other, so a clock going from `4` to `5` takes a single flip.",
      ],
    },
    { type: "p", text: "The flip loop lives in an effect keyed on the target:" },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/split-flap.tsx",
      code: `const [cur, setCur] = React.useState(" ")
const [next, setNext] = React.useState(" ")
const [flip, setFlip] = React.useState(0)
const curRef = React.useRef(" ")

React.useEffect(() => {
  const goal = CHARSET[idx(target)]
  if (reduce) {
    curRef.current = goal
    setCur(goal)
    setNext(goal)
    return
  }
  let t: ReturnType<typeof setTimeout>
  const step = () => {
    const c = curRef.current
    if (c === goal) return
    const n = CHARSET[(idx(c) + 1) % CHARSET.length]
    setNext(n)
    setFlip((f) => f + 1)
    t = setTimeout(() => {
      curRef.current = n
      setCur(n)
      t = setTimeout(step, 8)
    }, speed)
  }
  t = setTimeout(step, delay)
  return () => clearTimeout(t)
}, [target, speed, delay, reduce])`,
    },
    {
      type: "p",
      text: "Two details make this robust. First, the timer chain reads the current character from a ref, not from state, so no closure ever sees a stale value. State only drives rendering. Second, when the target changes mid flight, the cleanup clears the pending timeout and the new effect continues from `curRef.current`. The board never snaps back to blank; it keeps turning forward from wherever it was, which is what a physical board does too.",
    },
    {
      type: "p",
      text: "Every cell starts at a space, so on first render the whole board flips from blank to its text. That opening ripple comes for free.",
    },

    { type: "h2", text: "Two halves with rotateX and perspective", id: "two-half-flaps" },
    { type: "h3", text: "Clipping one glyph into halves" },
    {
      type: "p",
      text: "Each half is a box with `h-1/2 overflow-hidden`. Inside it, the glyph wrapper is twice as tall as the half (`h-[200%]`) and centers the character. The top half shows the upper part of that wrapper. The bottom half shifts the wrapper up by its own height (`-top-full`), so the lower part of the same centered glyph shows. Because both halves center the same character in the same full height box, the two pieces line up exactly across the hinge.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const half =
  "absolute inset-x-0 h-1/2 overflow-hidden bg-[linear-gradient(oklch(0.24_0.008_260),oklch(0.19_0.008_260))]"

const glyph = (c: string, bottom?: boolean) => (
  <span className={cn("absolute inset-x-0 flex h-[200%] items-center justify-center", bottom ? "-top-full" : "top-0")}>
    {c}
  </span>
)`,
    },
    {
      type: "p",
      text: "The top half runs from `0.24` to `0.19` lightness and the bottom half is overridden to a darker `0.2` to `0.16`, as if the light were above the board. That small difference is most of what makes the flaps read as physical.",
    },
    { type: "h3", text: "The rotation" },
    {
      type: "p",
      text: "The cell itself carries `[perspective:260px]`. Setting perspective on the parent, rather than `perspective()` inside each transform, gives both flaps one shared vanishing point. A short distance like 260px exaggerates the depth, so the falling edge visibly grows toward you before it disappears. The keyframes are two lines:",
    },
    {
      type: "code",
      lang: "css",
      code: `@keyframes flap-top {
  from { transform: rotateX(0); }
  to { transform: rotateX(-90deg); }
}
@keyframes flap-bottom {
  from { transform: rotateX(90deg); }
  to { transform: rotateX(0); }
}`,
    },
    {
      type: "p",
      text: "The two flaps are rendered only while a flip is in progress, and each one is keyed on the flip counter so React mounts a fresh element and the animation restarts every time:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/split-flap.tsx",
      code: `{animating ? (
  <>
    <span
      key={\`t\${flip}\`}
      className={cn(half, "top-0 origin-bottom rounded-t-[inherit] [backface-visibility:hidden]")}
      style={{ animation: \`flap-top \${speed * 0.55}ms cubic-bezier(0.4,0,1,1) forwards\` }}
    >
      {glyph(cur)}
    </span>
    <span
      key={\`b\${flip}\`}
      className={cn(half, "bottom-0 origin-top rounded-b-[inherit] bg-[linear-gradient(oklch(0.2_0.008_260),oklch(0.16_0.008_260))] [backface-visibility:hidden]")}
      style={{ animation: \`flap-bottom \${speed * 0.45}ms cubic-bezier(0,0,0.3,1.4) \${speed * 0.55}ms both\` }}
    >
      {glyph(next, true)}
    </span>
  </>
) : null}`,
    },
    {
      type: "list",
      items: [
        "**Timing split.** The fall takes 55% of `speed` and the landing the remaining 45%, starting exactly when the fall ends.",
        "**Easing.** The falling flap uses an ease in curve, so it accelerates like something dropping under gravity. The landing flap uses `cubic-bezier(0,0,0.3,1.4)`, whose second control point goes past 1, so it overshoots slightly and settles, like a flap hitting its stop.",
        "**Fill modes.** `forwards` holds the falling flap at `-90deg`, edge on and invisible, until the flip ends. `both` applies the landing flap's first keyframe during its delay, so it waits edge on at `90deg` instead of flashing across the full cell before its turn.",
        "**Backface.** `backface-visibility: hidden` keeps a flap from showing its mirrored back if the rotation ever passes 90 degrees.",
      ],
    },

    { type: "h2", text: "Staggering columns for the ripple", id: "stagger" },
    {
      type: "p",
      text: "The public component splits the text into cells and gives each one a start delay of `index * stagger`:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/split-flap.tsx",
      code: `function SplitFlap({ value = "NOW BOARDING", length, speed = 70, stagger = 28, size = "default", tone = "default", className }: SplitFlapProps) {
  const text = length ? value.toUpperCase().padEnd(length, " ").slice(0, length) : value.toUpperCase()
  return (
    <span data-slot="split-flap" className={cn("inline-flex gap-[2px]", className)}>
      <span className="sr-only">{value}</span>
      {text.split("").map((c, i) => (
        <Cell key={i} target={c} speed={speed} delay={i * stagger} size={size} tone={tone} />
      ))}
    </span>
  )
}`,
    },
    {
      type: "p",
      text: "The stagger only offsets the start. Each cell then needs a different number of flips to reach its letter, so cells finish at different times, and that irregular settling is what makes the board look mechanical rather than animated. The cells are keyed by index on purpose: when `value` changes, each position keeps its cell and its current character, and turns forward from there.",
    },
    {
      type: "p",
      text: "The `length` prop pads or cuts the text to a fixed number of cells, so columns in a table stay aligned while values change. The [Kura template](/templates/kura) uses this for a clinic board with doctor, clinic, wait, fee and status columns, each with its own `length` and a `stagger` between 22 and 30ms, plus a clock in the header:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/templates/kura/page.tsx",
      code: `function Clock() {
  const [t, setT] = React.useState("16:04")
  React.useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }))
    f()
    const i = setInterval(f, 15000)
    return () => clearInterval(i)
  }, [])
  return <SplitFlap value={t} length={5} size="sm" tone="warning" />
}

// in the board
<SplitFlap value={r.status} length={10} tone={STATUS_TONE[r.status]} stagger={22} />`,
    },

    { type: "h2", text: "Reduced motion and screen readers", id: "accessibility" },
    {
      type: "list",
      items: [
        "**Reduced motion.** Each cell reads `useReducedMotion()` from Motion. When it is set, the effect writes the goal character straight into state and returns, so the text appears without flipping.",
        "**One readable string.** Every cell is `aria-hidden`, and the component renders the original `value` once in a `sr-only` span. A screen reader reads the final text once instead of every intermediate letter.",
        "**No live region by default.** Changes are not announced, which is right for a clock that ticks every minute. If a change matters, such as a gate or a status, wrap the board in your own `aria-live=\"polite\"` container.",
      ],
    },
    {
      type: "callout",
      tone: "note",
      text: "The flap colors are fixed OKLCH values, not theme tokens, because a departure board is dark in both light and dark mode. Only the `accent` tone uses a token; `success`, `warning` and `danger` are brightened fixed colors that stay legible on the dark flaps.",
    },

    { type: "h2", text: "Performance notes", id: "performance" },
    {
      type: "p",
      text: "Each flip is two state updates in one cell plus the mount of two small spans, and the motion itself is a CSS transform, which the compositor handles well. The Kura board runs more than 200 cells without trouble. For boards with many hundreds of cells, a single shared timer that advances every cell in one render is cheaper than hundreds of independent `setTimeout` chains. The keyframes are injected with a `<style>` tag inside each `SplitFlap`; duplicates are harmless, but you can move them to your global CSS if you render many instances.",
    },

    { type: "h2", text: "Using SplitFlap", id: "usage" },
    {
      type: "code",
      lang: "tsx",
      code: `import { SplitFlap } from "@/components/ui/split-flap"

export function Departure({ gate }: { gate: string }) {
  return (
    <div className="flex items-center gap-3">
      <SplitFlap value="LISBON" length={10} />
      <SplitFlap value={gate} length={3} tone="accent" size="lg" />
      <SplitFlap value="ON TIME" length={8} tone="success" speed={60} />
    </div>
  )
}`,
    },
    {
      type: "table",
      head: ["Prop", "Default", "Purpose"],
      rows: [
        ["`value`", "`\"NOW BOARDING\"`", "Text to show. Uppercased; characters outside the set show blank."],
        ["`length`", "none", "Pad or cut to this many cells."],
        ["`speed`", "`70`", "Milliseconds per single flip."],
        ["`stagger`", "`28`", "Extra start delay per column, in milliseconds."],
        ["`size`", "`\"default\"`", "`sm`, `default` or `lg` cell size."],
        ["`tone`", "`\"default\"`", "`default`, `accent`, `success`, `warning` or `danger` character color."],
      ],
    },
    {
      type: "p",
      text: "For numbers that should roll smoothly rather than flip, such as prices and counters, [NumberRoll](/docs/number-roll) is the better fit.",
    },
    { type: "component", name: "split-flap" },
    { type: "component", name: "number-roll" },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/split-flap.json`,
    },
  ],
  faq: [
    {
      q: "What is a split-flap display?",
      a: "A mechanical display, often called a Solari board after the Italian maker, where each character is printed on flaps that rotate around a hinge. Train stations and airports used them for departures.",
    },
    {
      q: "How do I make a flip animation with CSS?",
      a: "Split the element into two halves, set `perspective` on the parent and `transform-origin` at the hinge, then animate the top half with `rotateX(0)` to `rotateX(-90deg)` and the bottom half with `rotateX(90deg)` to `rotateX(0)` after it.",
    },
    {
      q: "Can a split-flap display show lowercase or other symbols?",
      a: "SplitFlap uppercases its input and shows characters outside its set as blank. To support more symbols, add them to the `CHARSET` string in your copy of the component, keeping in mind that a longer set means longer cycles.",
    },
    {
      q: "How do I make a split-flap display accessible?",
      a: "Hide the animated cells from assistive technology, render the final text once in visually hidden markup, and skip the flipping for users who prefer reduced motion. SplitFlap does all three.",
    },
  ],
}

export default guide
