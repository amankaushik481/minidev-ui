import type { Guide } from "../types"

const guide: Guide = {
  slug: "tailwind-hero-section-examples",
  title: "Hero section patterns in React and Tailwind: 8 layouts that convert",
  description:
    "Eight hero section layouts for React and Tailwind v4, each with the props it takes, what it is good for, and how to keep it fast and accessible above the fold.",
  date: "2026-10-14",
  keywords: [
    "tailwind hero section",
    "react hero section examples",
    "hero section design patterns",
    "landing page hero react",
    "animated hero section tailwind",
  ],
  related: ["hero", "hero-spotlight", "hero-aurora", "hero-editorial-split", "hero-kinetic-type", "hero-typed-headline", "hero-marquee-brands", "hero-gradient-mesh", "shimmer-button", "word-rotate", "aurora-background"],
  body: [
    {
      type: "p",
      text: "A hero section has one job: say what the product does and give one clear next step before the person scrolls. The layout decides how much weight goes to the headline, the proof and the visual, and the best choice depends on what you can show above the fold on a phone. There are no conversion statistics in this guide; what each layout is good for comes from what it puts in the first screen.",
    },
    {
      type: "p",
      text: "The eight layouts below are MiniDev UI components: the free [Hero](/docs/hero) and [HeroSpotlight](/docs/hero-spotlight), and six Motion heroes animated with `motion/react`. For each one you get the real props, what is hard coded in the file (several of the Motion heroes ship with sample copy you edit in your copy), and the pieces that compose with them: [ShimmerButton](/docs/shimmer-button), [WordRotate](/docs/word-rotate) and [AuroraBackground](/docs/aurora-background). The [landing page guide](/guides/nextjs-landing-page) covers the sections that follow the hero.",
    },

    { type: "h2", text: "What every hero needs", id: "basics" },
    {
      type: "list",
      items: [
        "**A headline that states the outcome**, not the category. \"Close the month in one pass\" beats \"Financial automation platform\".",
        "**One primary action** and at most one secondary. The primary is the thing you want; the secondary is for people who are not ready (docs, a demo, pricing).",
        "**A proof line** under the actions: who uses it, a number you can defend, or the terms (\"Free for 14 days, no card\").",
        "**The whole thing in the first 700 pixels on a 390 pixel wide phone**, which is where most first visits happen. Visuals go below the actions on small screens, not above.",
        "**Text as the largest contentful paint.** A headline paints immediately; a hero image needs `priority` and explicit dimensions or it is the slowest thing on the page.",
      ],
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/hero.json\nnpx shadcn@latest add https://ui.minidev.pro/r/hero-spotlight.json\nnpx shadcn@latest add https://ui.minidev.pro/r/hero-aurora.json\nnpx shadcn@latest add https://ui.minidev.pro/r/hero-editorial-split.json\nnpx shadcn@latest add https://ui.minidev.pro/r/hero-kinetic-type.json\nnpx shadcn@latest add https://ui.minidev.pro/r/hero-typed-headline.json\nnpx shadcn@latest add https://ui.minidev.pro/r/hero-marquee-brands.json\nnpx shadcn@latest add https://ui.minidev.pro/r/hero-gradient-mesh.json",
    },
    {
      type: "p",
      text: "Every file except `Hero` depends on `motion`. Import the token stylesheet once ([styles.css](https://ui.minidev.pro/r/styles.css)); `HeroSpotlight` in particular uses the `light-spot` and `text-lit` utilities and the `--sx` and `--sy` variables defined there.",
    },

    { type: "h2", text: "1. The centred statement", id: "centred" },
    {
      type: "p",
      text: "`Hero` is the baseline: eyebrow, headline, description and two buttons, centred in a `max-w-3xl` column with no motion and no background. It takes `title` (required), `eyebrow`, `description`, `primaryAction` and `secondaryAction` as `{ label, onClick }`.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<Hero
  eyebrow="Lumen for finance teams"
  title="Close the month in one pass"
  description="Bank feeds, invoices and approvals in one calm workspace, reconciled as you go."
  primaryAction={{ label: "Start free", onClick: () => router.push("/signup") }}
  secondaryAction={{ label: "See pricing", onClick: () => router.push("/pricing") }}
/>`,
    },
    {
      type: "p",
      text: "Good for: products whose promise fits in one line and does not need a screenshot to be believed, docs homes, and any page where the hero is not the point. The actions take `onClick` only, so for real links wrap the hero or swap the buttons for `Button` with `render={<a href />}` in your copy.",
    },

    { type: "h2", text: "2. The launch spotlight", id: "spotlight" },
    {
      type: "p",
      text: "`HeroSpotlight` is the free block for a product launch: a pill eyebrow with a pulsing dot, a two line headline where the second line (`highlight`) is lit by the cursor, a description, two actions that accept `href` or `onClick`, a `proof` line, and a `visual` slot that rises in last with a slight perspective tilt. `align` is `\"center\"` or `\"left\"`.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<HeroSpotlight
  eyebrow="Now in public beta"
  title="Answers from your data,"
  highlight="before you ask."
  description="Lumen watches revenue, churn and pipeline and tells your team what changed and why."
  primary={{ label: "Start free", href: "/signup" }}
  secondary={{ label: "Watch the 2 min tour", href: "/tour" }}
  proof="Free for 14 days · No card · SOC 2 Type II"
  visual={<DeviceFrame><img src="/screens/overview.png" alt="The Lumen overview with revenue, churn and pipeline cards" width={1600} height={1000} /></DeviceFrame>}
/>`,
    },
    {
      type: "p",
      text: "Good for: a launch where you have a real screenshot. The headline staggers in with a blur that settles, and the whole sequence is skipped under reduced motion. The cursor lighting reads the page light from [LightProvider](/docs/light-provider) when it is mounted and falls back to a fixed angle when it is not, so the block works either way.",
    },

    { type: "h2", text: "3. Aurora", id: "aurora" },
    {
      type: "p",
      text: "`HeroAurora` puts the centred layout over two drifting radial glows in the accent colour. It takes `eyebrow`, `title`, `description`, `primaryLabel`, `secondaryLabel`, `onPrimary` and `onSecondary`, all optional with Lumen defaults.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<HeroAurora
  eyebrow="Interfaces that feel composed"
  title="Plan, ship and measure in one place"
  description="Built for teams who care about the details."
  primaryLabel="Start free trial"
  secondaryLabel="View the free kit"
  onPrimary={() => router.push("/signup")}
/>

{/* Or compose your own copy over the standalone background */}
<AuroraBackground intensity={0.8} speed={0.7} className="h-[520px]">
  <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
    <h1 className="max-w-[18ch] text-4xl font-medium tracking-[-0.035em] text-balance text-fg sm:text-5xl">Finance, without the Friday scramble</h1>
    <ShimmerButton>Start free</ShimmerButton>
  </div>
</AuroraBackground>`,
    },
    {
      type: "p",
      text: "`AuroraBackground` is the reusable half: three blurred curtains in `colors` (defaults to the accent, accent-2 and info tokens) that sway at different periods so the loop never shows, pause when the panel is off screen, and hold still under reduced motion. Good for: a brand led page where colour does the work and there is no screenshot yet.",
    },

    { type: "h2", text: "4. The editorial split", id: "editorial-split" },
    {
      type: "p",
      text: "`HeroEditorialSplit` is a two column grid: eyebrow, a two line headline whose lines rise from behind a mask, a description and a `MagneticCta` next to an outline button on the left, a `DeviceFrameStack` on the right. It stacks on screens below `lg`.",
    },
    {
      type: "callout",
      tone: "note",
      text: "This hero takes only `className`. The copy (\"Local craft. Public-ready polish.\"), the button labels and the stacked device frames are written into the file. Copy it, edit the text, and pass your own screenshots into `DeviceFrameStack` in your copy. The same is true of the marquee, typed headline and gradient mesh heroes below; the table at the end lists which take props.",
    },
    {
      type: "p",
      text: "Good for: a product with a strong visual and a short, confident headline. The gradient on the second line uses `bg-clip-text` from `--fg` through the accent, which stays readable in both themes.",
    },

    { type: "h2", text: "5. Kinetic type", id: "kinetic-type" },
    {
      type: "p",
      text: "`HeroKineticType` is headline first: `lines` (an array, one per row) rise in one after another, the last one in gradient, above a `description` and two buttons. There is no visual slot and that is the point; the type is the visual.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<HeroKineticType
  lines={["Close the month", "without the", "spreadsheet."]}
  description="Bank feeds, invoices and approvals, reconciled as you go."
/>`,
    },
    {
      type: "p",
      text: "Good for: a message that reads as a sentence across three lines, developer tools, anything where a screenshot would look like every other screenshot. Keep each line under about 16 characters or it wraps on phones and the rhythm breaks. The button labels are hard coded; edit them in your copy.",
    },

    { type: "h2", text: "6. The rotating word", id: "rotating-word" },
    {
      type: "p",
      text: "`HeroTypedHeadline` cycles a word inside the headline (\"Ship beautiful dashboards / AI apps / billing flows\") every 2.2 seconds, with the list written in the file. For your own copy, use `WordRotate` inside any hero: it takes `words`, `interval` and a `prefix`, keeps the slot as wide as the longest word so the sentence never jumps, and renders the full list once for screen readers.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<h1 className="text-balance">
  <WordRotate prefix="Invoices for" words={["agencies", "consultancies", "studios", "freelancers"]} interval={2400} />
</h1>`,
    },
    {
      type: "p",
      text: "Good for: a product that serves several audiences equally. Bad for: a product with one audience, where the rotation reads as indecision. Both components stop rotating under reduced motion and show the first word.",
    },

    { type: "h2", text: "7. The brand marquee", id: "marquee" },
    {
      type: "p",
      text: "`HeroMarqueeBrands` is the centred layout with a scrolling row of customer names under it, duplicated so the loop is seamless. The names are a constant in the file; replace them with logos (an `<img>` with `alt` per brand) in your copy. The marquee stops under reduced motion and shows the first screen of logos.",
    },
    {
      type: "p",
      text: "Good for: when the strongest thing you can say is who already uses you. Only use real customers with permission; a marquee of \"Vercel-ish\" placeholders is exactly what the sample ships with and exactly what should not reach production.",
    },

    { type: "h2", text: "8. The dark gradient mesh", id: "gradient-mesh" },
    {
      type: "p",
      text: "`HeroGradientMesh` is always dark: a near black panel with an accent glow at the top and a cool glow at the bottom right, white type, and two buttons whose colours are fixed in the file rather than taken from the theme. It is deliberately independent of light and dark mode, which makes it a good band on an otherwise light page.",
    },
    {
      type: "p",
      text: "Good for: a launch or event page that wants a cinematic first screen. Check the contrast of any copy you change against the panel's `oklch(0.14 0.02 285)` background; the shipped text passes, custom colours may not. See [WCAG contrast](/glossary/wcag-contrast).",
    },

    { type: "h2", text: "The button that earns the click", id: "shimmer-button" },
    {
      type: "p",
      text: "`ShimmerButton` is a large call to action with a slow band of light that sweeps across its face every `duration` seconds, in `ink` or `accent` tone. It renders a `<button>`, or a link when you pass `render={<a href=\"/signup\" />}`. One per hero: a shimmer on both buttons is a shimmer on neither.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<ShimmerButton tone="accent" duration={3} render={<a href="/signup" />}>
  Start free <ArrowRightIcon className="size-4" />
</ShimmerButton>`,
    },

    { type: "h2", text: "Which heroes take props", id: "props" },
    {
      type: "table",
      head: ["Hero", "Props", "Hard coded in the file"],
      rows: [
        ["`Hero`", "`eyebrow`, `title`, `description`, `primaryAction`, `secondaryAction`", "Nothing"],
        ["`HeroSpotlight`", "`eyebrow`, `title`, `highlight`, `description`, `primary`, `secondary`, `proof`, `visual`, `align`", "Nothing"],
        ["`HeroAurora`", "`eyebrow`, `title`, `description`, `primaryLabel`, `secondaryLabel`, `onPrimary`, `onSecondary`", "Nothing"],
        ["`HeroKineticType`", "`lines`, `description`", "Button labels"],
        ["`HeroEditorialSplit`", "`className`", "All copy, buttons, device frames"],
        ["`HeroTypedHeadline`", "`className`", "All copy and the word list"],
        ["`HeroMarqueeBrands`", "`className`", "All copy and the brand list"],
        ["`HeroGradientMesh`", "`className`", "All copy and the dark palette"],
      ],
    },
    {
      type: "p",
      text: "The kit also has [HeroBento](/docs/hero-bento) (headline over a feature tile grid), [HeroSplitShowcase](/docs/hero-split-showcase) (copy beside a browser mockup), [HeroPosterType](/docs/hero-poster-type) (oversized type on a ruled grid) and [HeroClientPitch](/docs/hero-client-pitch) (stats row for agency pitches); all four take `className` only. Because every file is copied into your project, hard coded copy is a text edit, not a limitation, but know it before you plan a CMS driven hero.",
    },

    { type: "h2", text: "Performance and accessibility", id: "performance-accessibility" },
    {
      type: "list",
      items: [
        "**One `h1` per page.** Each hero renders its headline as an `h1`. If a page stacks a hero band above another hero style section, demote the second one to `h2` in your copy.",
        "**Reduced motion is handled.** Every hero reads `useReducedMotion` and renders its final state immediately; the marquee and aurora stop; the token stylesheet also zeroes animation durations globally. Nothing extra to do.",
        "**Entrance animations and LCP.** Headlines start at `opacity: 0` and fade in within half a second, which is fine for Largest Contentful Paint as long as the text is in the server rendered HTML, which it is. Do not lazy load the hero component.",
        "**Images in `visual`.** Give them `width`, `height`, `priority` (Next.js) and an `alt` that describes what the screenshot shows, or an empty `alt` if the headline already says it.",
        "**Gradient text.** `bg-clip-text` with `text-transparent` relies on the gradient for contrast. The kit gradients run from the foreground colour, so the start of the line is always readable; keep it that way if you change the stops.",
        "**Buttons are buttons.** Primary actions that navigate should be links (`render={<a />}`) so they work with middle click and show the URL; the free `Hero` uses `onClick` only, which is the one place you will want to edit.",
      ],
    },

    { type: "h2", text: "Pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**Three calls to action.** Primary, secondary, and a \"Book a demo\" is a hero that cannot decide. Pick two.",
        "**A visual above the headline on phones.** The screenshot pushes the words below the fold. Every layout here stacks visual last for a reason.",
        "**Motion on everything.** A rising headline is pleasant; a rising headline over an aurora behind a marquee with a shimmer button is a fairground. One effect per hero.",
        "**Sample copy in production.** Half the Motion heroes ship with Lumen copy and placeholder brand names. Search your build for \"Lumen\" before launch.",
        "**Forgetting the second theme.** Preview in dark mode. The gradient mesh is immune; the others use tokens and should look right, but a custom `visual` with a white screenshot on a dark page will not.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "`Hero` and `HeroSpotlight` are free and MIT licensed; the Motion heroes, `ShimmerButton`, `WordRotate` and `AuroraBackground` are in the [marketing category](/components/marketing) and the [animation category](/components/animation). After the hero come features, proof, pricing and a footer, which the [Next.js landing page guide](/guides/nextjs-landing-page) assembles, with the [pricing page guide](/guides/react-pricing-page) for the section that closes. If you want the whole site built, the [MiniDev studio](https://minidev.pro) builds on this kit.",
    },
    { type: "component", name: "hero-spotlight" },
    { type: "component", name: "hero-aurora" },
    { type: "component", name: "hero-kinetic-type" },
    { type: "component", name: "hero-editorial-split" },
    { type: "component", name: "shimmer-button" },
    { type: "component", name: "word-rotate" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "What should a hero section contain?",
      a: "A headline that states the outcome, a one or two sentence description, one primary action, optionally one secondary action, a proof line, and a visual only if it fits under the actions on a phone. Everything else belongs in the sections below.",
    },
    {
      q: "Do animated hero sections hurt performance?",
      a: "Not when the text is server rendered and the animation is a short opacity and transform transition, which is what these heroes do. What hurts is a large unoptimised image, a lazy loaded hero component, or a background that repaints constantly; the aurora pauses off screen for that reason.",
    },
    {
      q: "Why do some of these heroes only accept className?",
      a: "They are shipped as finished compositions with sample copy, meant to be copied into your project and edited like any other file. The free Hero, HeroSpotlight, HeroAurora and HeroKineticType take their copy as props; the others are a text edit away.",
    },
  ],
}

export default guide
