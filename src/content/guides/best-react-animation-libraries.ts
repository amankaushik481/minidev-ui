import type { Guide } from "../types"

const guide: Guide = {
  slug: "best-react-animation-libraries",
  title: "Best React animation libraries and motion component kits",
  description:
    "Motion, GSAP, React Spring and AutoAnimate compared with five motion component kits: Magic UI, Aceternity, Animate UI, Motion Primitives and MiniDev UI.",
  date: "2026-10-15",
  keywords: [
    "best react animation libraries",
    "framer motion alternatives",
    "react motion components",
    "gsap vs framer motion",
    "animated react components tailwind",
  ],
  related: ["morph-panel", "number-roll", "scroll-reveal", "hero-kinetic-type"],
  body: [
    {
      type: "p",
      text: "For writing animation in React in 2026, Motion (formerly Framer Motion) is the default, with GSAP as the free choice when you need long, precisely sequenced timelines and scroll driven scenes. If you would rather install finished animated components than write them, Magic UI, Aceternity UI, Animate UI, Motion Primitives and MiniDev UI give you copy and paste pieces built on Motion, and this guide covers all nine with licenses, prices and one limitation each.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Facts were checked on October 15, 2026 on each project's site or GitHub repository. Prices are in US dollars as listed. MiniDev UI is on this list and this guide is written by its team; it is described in the same tone as the others and placed with the other component kits.",
    },
    { type: "h2", text: "Libraries or kits?", id: "libraries-or-kits" },
    {
      type: "p",
      text: "The list has two halves. The first four are **animation libraries**: you describe motion in code and they run it. The last five are **component kits**: finished animated components (text effects, backgrounds, animated tabs, hero sections) that you copy into your project, almost all built on Motion. Most products end up with one library and, if the marketing site needs flair, one kit. Our [micro-interactions](/glossary/micro-interactions) and [prefers-reduced-motion](/glossary/prefers-reduced-motion) glossary entries cover the rules that apply to both.",
    },
    { type: "h2", text: "At a glance", id: "at-a-glance" },
    {
      type: "table",
      head: ["Name", "Kind", "License", "Paid tier"],
      rows: [
        ["Motion", "Library, React, JavaScript and Vue", "MIT", "Motion+ examples and premium components"],
        ["GSAP", "Library, JavaScript with a React hook", "GreenSock standard no-charge license", "None, free since the Webflow acquisition"],
        ["React Spring", "Library, spring physics", "MIT", "None"],
        ["AutoAnimate", "Library, zero config", "MIT", "None"],
        ["Magic UI", "Kit, 150+ components and effects", "MIT", "Magic UI Pro, $199 one time"],
        ["Aceternity UI", "Kit, 116+ free components", "Own license", "Blocks and templates, $199 lifetime"],
        ["Animate UI", "Kit, animated versions of standard components", "MIT", "None"],
        ["Motion Primitives", "Kit, composable building blocks", "MIT", "None"],
        ["MiniDev UI", "Kit, motion components inside a product registry", "MIT", "None"],
      ],
    },
    { type: "h2", text: "1. Motion", id: "motion" },
    {
      type: "p",
      text: "[Motion](https://motion.dev) is a production grade animation library for React, JavaScript and Vue, and it is what Framer Motion became: the README says Framer Motion is now Motion and you import from `motion/react` instead of `framer-motion`. It is MIT and free, and the same team sells Motion+, a bundle of over 490 examples, Motion UI sections and premium components such as Cursor, Ticker and Carousel, as a one time solo purchase with lifetime updates or an annual per seat team subscription.",
    },
    {
      type: "p",
      text: "**Who it suits:** nearly every React product. Its declarative approach to hover, layout and exit animations is the vocabulary most component kits on this list are written in. **License and price:** MIT, free; Motion+ prices are shown at purchase rather than on the overview page. **Limitation:** long, precisely sequenced timelines are possible but less natural than in GSAP, whose timeline model was built for them.",
    },
    { type: "h2", text: "2. GSAP", id: "gsap" },
    {
      type: "p",
      text: "[GSAP](https://gsap.com), the GreenSock Animation Platform, is a JavaScript animation library that became 100 percent free for all users after Webflow acquired it, including the plugins that used to be members only such as SplitText, MorphSVG and ScrollTrigger. The `@gsap/react` package exposes a `useGSAP()` hook that is a drop in replacement for `useEffect()` and reverts animations on unmount, and it is safe in Next.js client components.",
    },
    {
      type: "p",
      text: "**Who it suits:** scroll driven storytelling, complex sequences and SVG morphing, and teams who already know its API from outside React. **License and price:** free, including commercial use, under GreenSock's standard no-charge license. **Limitation:** that license is not open source. Webflow keeps the intellectual property and forbids using GSAP to build visual, no-code animation tools that compete with Webflow, which is fine for almost everyone and a blocker for a few.",
    },
    { type: "h2", text: "3. React Spring", id: "react-spring" },
    {
      type: "p",
      text: "[React Spring](https://www.react-spring.dev) is a spring physics based React animation library. Springs have no fixed curve or duration, which is why interactions animated with it feel natural when interrupted, and it renders to five targets: web, native, three, konva and zdog. The repository is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** gesture heavy interfaces, drag and drop, and projects that also animate react-three-fiber scenes with the same API. **License and price:** MIT, free. **Limitation:** because springs do not have durations, matching an animation to an exact timing (a 300ms brand transition, a sequence that must land on a beat) takes tuning rather than a number.",
    },
    { type: "h2", text: "4. AutoAnimate", id: "autoanimate" },
    {
      type: "p",
      text: "[AutoAnimate](https://auto-animate.formkit.com) by the FormKit team is a zero config, drop in animation utility: attach it to a parent element and children animate as they are added, removed or moved. It ships integrations for React, Preact, Vue, Solid, Svelte, Angular and Marko, works with plain JavaScript, and is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** lists, grids, accordions and any UI where items appear and disappear, especially when nobody has time to write transitions. **License and price:** MIT, free, supported by donations. **Limitation:** it does one thing. For keyframes, gestures, scroll or anything beyond enter, exit and move, you need one of the first three libraries.",
    },
    { type: "h2", text: "5. Magic UI", id: "magic-ui" },
    {
      type: "p",
      text: "[Magic UI](https://magicui.design) is a UI library for design engineers: over 150 free, open source animated components and effects (animated text, number tickers, marquees, backgrounds, borders, device mockups) built with React, TypeScript, Tailwind CSS and Motion, installed with the shadcn CLI. Magic UI Pro sells over 50 sections and 9 or more templates for landing pages.",
    },
    {
      type: "p",
      text: "**Who it suits:** adding polished motion to a marketing page without redesigning it. **License and price:** MIT for the components; Pro is $199 as a one time individual license with lifetime access, commercial use allowed and resale forbidden. **Limitation:** it is about effects for marketing surfaces. Animated versions of everyday controls are not its focus, which is where Animate UI picks up.",
    },
    { type: "h2", text: "6. Aceternity UI", id: "aceternity-ui" },
    {
      type: "p",
      text: "[Aceternity UI](https://ui.aceternity.com) is a React component library for landing pages with over 200 components, blocks and templates built with React, Tailwind CSS and Motion, of which 116 or more components are free. Blocks and templates are paid: Lifetime Access was $199 as a one time purchase when we checked, with Annual Access at $169 per year and a ten member Team license at $1,590.",
    },
    {
      type: "p",
      text: "**Who it suits:** a hero or launch page that needs one memorable visual moment, such as a spotlight, beam or 3D card. **License and price:** its own license rather than MIT. End products may be commercial and may be sold, but you cannot redistribute items or derivatives on marketplaces or as templates. **Limitation:** the effects are heavy visual statements that date quickly and are easy to overuse; one per page is usually the right amount.",
    },
    { type: "h2", text: "7. Animate UI", id: "animate-ui" },
    {
      type: "p",
      text: "[Animate UI](https://animate-ui.com) is a fully animated, open source component distribution built with React, TypeScript, Tailwind CSS, Motion and the shadcn CLI. Its angle is animated versions of components you already use, so tabs, accordions, dialogs and similar controls gain fluid motion without you writing it. The repository is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** products that want motion in everyday controls, not only on the marketing site. **License and price:** MIT, free, no paid tier. **Limitation:** every component carries Motion, so swapping the plain shadcn/ui versions for these adds the library's weight to screens that may not have needed it. Keep the plain versions where motion adds nothing.",
    },
    { type: "h2", text: "8. Motion Primitives", id: "motion-primitives" },
    {
      type: "p",
      text: "[Motion Primitives](https://motion-primitives.com) is an open source UI kit of animated components built with Framer Motion (now Motion) and Tailwind CSS. Rather than finished sections, it offers small, customisable building blocks such as text effects, transitions and reveal patterns that you compose into your own designs, and the repository is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** developers who want animation building blocks to combine rather than finished effects. **License and price:** MIT, free. **Limitation:** composition is the point and the cost. You still design the result, and the docs still refer to Framer Motion in places, so expect to translate the import to `motion/react` yourself.",
    },
    { type: "h2", text: "9. MiniDev UI", id: "minidev-ui" },
    {
      type: "p",
      text: "[MiniDev UI](https://ui.minidev.pro) is a shadcn-compatible registry of over 500 items, and over 100 of them are motion components built on the `motion` library: kinetic and typed headlines, scroll stories, number rolls, morphing panels, animated lists, beams, marquees and full animated hero sections, alongside the product components the rest of the registry is known for. They share the registry's semantic OKLCH tokens and its light and material system, so a hero and the billing page behind it animate and shade the same way. Install one with `npx shadcn@latest add @minidev/scroll-reveal`.",
    },
    {
      type: "p",
      text: "**Who it suits:** SaaS teams that want the marketing site and the app to feel like one product, and that already use shadcn/ui. **License and price:** MIT, free, no paid tier. **Limitation:** the motion pieces are designed to sit inside MiniDev UI's token system, so dropped into another design system they need re-theming, and the kit is React only.",
    },
    { type: "component", name: "number-roll" },
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "p",
      text: "Pick the library first and the kit second. If your animation is mostly component state (hover, open, enter, exit, layout changes), Motion is the right library and AutoAnimate handles the lists for free. If it is mostly a scripted sequence driven by scroll or time, GSAP. If it is physical, interrupted and gesture driven, React Spring. Then, for the marketing site, choose one kit built on the same library so you are not shipping two animation runtimes: Magic UI or Aceternity UI for standout effects, Animate UI for animated controls, Motion Primitives for building blocks, MiniDev UI when the app and the site should share one token system.",
    },
    {
      type: "list",
      items: [
        "**Respect `prefers-reduced-motion`.** Check every kit here against it before launch; the [glossary entry](/glossary/prefers-reduced-motion) shows how to wire the media query.",
        "**Measure bundle weight.** Kits built on Motion add it once; a second library doubles the cost. Load heavy effects below the fold or on interaction.",
        "**Keep text real.** Effects that split headlines into characters should keep an accessible label for screen readers.",
        "**Mind licenses in client work.** MIT and GSAP's no-charge license are fine for client sites; Aceternity's and Motion+'s terms forbid redistribution, so do not hand the raw components to a client as a kit.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Browser platform features cover more than they used to. CSS `@starting-style`, scroll driven animations and the [View Transitions API](/glossary/view-transitions) handle many enter, scroll and page transition cases with no JavaScript, and they are worth trying before you import anything.",
    },
  ],
  faq: [
    {
      q: "Is Framer Motion still maintained?",
      a: "Yes, under a new name. Framer Motion is now Motion, an MIT licensed library for React, JavaScript and Vue. Existing code keeps working, and the upgrade is mostly changing the import from framer-motion to motion/react.",
    },
    {
      q: "Is GSAP really free for commercial projects?",
      a: "Yes. GSAP and its formerly paid plugins are free for all users, including commercial work, under GreenSock's standard no-charge license since Webflow acquired it. The license is not open source: Webflow retains the IP and prohibits using GSAP to build visual animation tools that compete with Webflow.",
    },
    {
      q: "Do I need an animation library at all?",
      a: "Not always. CSS transitions, keyframes, scroll driven animations and the View Transitions API handle hover states, fades, reveals and page transitions without JavaScript. Reach for a library when you need layout animations, physics, gestures, orchestration or exit animations for elements leaving the DOM.",
    },
  ],
}

export default guide
