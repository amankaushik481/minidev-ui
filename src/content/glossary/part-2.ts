import type { GlossaryTerm } from "../types"

export const GLOSSARY_2: GlossaryTerm[] = [
  // ─────────────────────────────────────────────────────────────── ARIA
  {
    slug: "aria",
    term: "ARIA",
    short:
      "ARIA (Accessible Rich Internet Applications) is a W3C set of HTML attributes that tells assistive technology what custom UI elements are and their state.",
    body: [
      {
        type: "p",
        text: "ARIA, formally WAI-ARIA, is a set of attributes defined by the W3C that add meaning to HTML where native elements fall short. A screen reader builds its picture of a page from the accessibility tree, which the browser derives from your markup. A `<button>` arrives in that tree with a role, a name and keyboard behavior for free. A `<div>` styled to look like a tab arrives as nothing. ARIA lets you describe that div as a `tab`, say whether it is selected, and point to the panel it controls. It changes what assistive technology announces. It does not change behavior: no ARIA attribute adds focusability, keyboard handling or click events.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "ARIA has three kinds of attributes. Each one is a promise to the user, and the script behind the element has to keep it.",
      },
      {
        type: "list",
        items: [
          "**Roles** declare what an element is: `role=\"dialog\"`, `role=\"tablist\"`, `role=\"switch\"`, `role=\"status\"`. A role implies a contract, such as arrow keys moving between tabs.",
          "**States** describe values that change with interaction: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-disabled`, `aria-invalid`.",
          "**Properties** describe labels and relationships that change less often: `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-controls`, `aria-live`.",
        ],
      },
      {
        type: "p",
        text: "The W3C ARIA Authoring Practices Guide (APG) documents the expected roles, states and keyboard interactions for common widgets such as dialogs, menus, tabs, comboboxes and tree views. It is the reference to check when you build one yourself. A disclosure button is the smallest useful example:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `<button
  type="button"
  aria-expanded={open}
  aria-controls="filters-panel"
  onClick={() => setOpen(!open)}
>
  Filters
</button>
<div id="filters-panel" hidden={!open}>
  {/* filter fields */}
</div>`,
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "p",
        text: "The first rule of ARIA use, from the W3C, is to prefer a native element whenever one exists. WebAIM's yearly audit of the top million home pages keeps finding that pages using ARIA average more detected accessibility errors than pages without it. Incorrect ARIA is worse than none, because it tells users something false with full confidence.",
      },
      {
        type: "list",
        items: [
          "Adding `role=\"button\"` to a `div` without `tabIndex={0}` and Enter and Space handlers. It is announced as a button and cannot be operated from a keyboard.",
          "Putting `aria-hidden=\"true\"` on an element that contains focusable children. Keyboard users land on something screen readers claim does not exist.",
          "Letting state attributes drift: an `aria-expanded` that stays `false` after the panel opens is a false statement.",
          "Using `aria-label` on elements with no role, such as a plain `span`, where many screen readers ignore it.",
          "Labeling icon buttons with a tooltip only. Give the button an accessible name with `aria-label` or visually hidden text.",
        ],
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "Interactive primitives such as [Dialog](/docs/dialog), [Tabs](/docs/tabs) and [Accordion](/docs/accordion) are built on [Base UI](/glossary/base-ui), which applies the roles, states and keyboard handling from the APG patterns. You provide names and content. For text that only screen readers should hear, use [VisuallyHidden](/docs/visually-hidden); to let keyboard users jump past the navigation, add [SkipLink](/docs/skip-link) as the first focusable element. Pair all of this with a visible focus style (see [:focus-visible](/glossary/focus-visible)) so sighted keyboard users can follow along.",
      },
      { type: "component", name: "dialog" },
      { type: "component", name: "visually-hidden" },
    ],
    related: ["dialog", "tabs", "accordion", "visually-hidden", "skip-link"],
    see: ["headless-components", "focus-visible", "wcag-contrast", "modal-dialog"],
  },

  // ─────────────────────────────────────────────────── backdrop-filter
  {
    slug: "backdrop-filter",
    term: "backdrop-filter (CSS)",
    short:
      "backdrop-filter is a CSS property that applies filters such as blur or saturate to whatever is rendered behind an element, the basis of frosted glass UI.",
    body: [
      {
        type: "p",
        text: "`backdrop-filter` takes the same filter functions as `filter` (`blur()`, `saturate()`, `brightness()`, `contrast()` and the rest) but applies them to the pixels behind the element instead of to the element itself. The element's own background must be at least partly transparent, or there is nothing to see through. Combine a translucent fill with `backdrop-filter: blur(16px)` and content scrolling underneath turns into a soft wash of color. That is the core of the [glassmorphism](/glossary/glassmorphism) look and of most sticky headers on modern sites.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "The browser takes everything painted behind the element, runs the filter chain on it, clips the result to the element's border box (including `border-radius`), then paints the element's own background, border and content on top. Filters run in the order you list them.",
      },
      {
        type: "code",
        lang: "css",
        code: `.glass-panel {
  background: oklch(1 0 0 / 0.55);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  backdrop-filter: blur(20px) saturate(1.8);
  border: 1px solid oklch(1 0 0 / 0.6);
}`,
      },
      {
        type: "p",
        text: "`saturate()` after `blur()` keeps the colors behind the panel from turning gray, which is why most glass recipes pair them. The prefixed property covers older Safari releases; current versions of every major engine support the unprefixed form. In Tailwind CSS the same effect is `backdrop-blur-xl backdrop-saturate-150` on an element with a translucent background such as `bg-white/50`.",
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "list",
        items: [
          "**Nothing behind it.** Blur over a flat, solid page looks like a plain gray box. Glass needs color or imagery behind it.",
          "**Contrast.** Text on a translucent panel changes contrast as content moves beneath it. Check the worst case against [WCAG contrast](/glossary/wcag-contrast) and raise the fill opacity if needed.",
          "**Performance.** Whenever the region behind the element changes, the filter runs again. Large blur radii on big, full-screen or animated layers can drop frames on low-end phones. Keep blurred areas modest in size and number.",
          "**Containing blocks.** Like `filter`, any value other than `none` makes the element the containing block for `position: fixed` descendants, so a fixed child positions against the panel instead of the viewport.",
          "**Nested glass.** An ancestor with a filter, `opacity` below 1, a mask or its own `backdrop-filter` acts as a backdrop root. A blurred child samples only what lies inside that ancestor, so stacked glass can look weaker than expected.",
        ],
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "The glass material is built on it. Set `data-material=\"glass\"` on `<html>` or any subtree and every `bg-surface` and `bg-raised` element picks up `backdrop-filter: blur(22px) saturate(1.8)` through a material hook variable, with a sheen positioned by [LightProvider](/docs/light-provider). Components do not change; the [CSS variables](/glossary/css-variables) do. To tune your own values visually, use the [glassmorphism generator](/tools/glassmorphism-generator), and read [glassmorphism in Tailwind CSS](/guides/glassmorphism-tailwind-css) for the full recipe, including fallbacks.",
      },
      { type: "component", name: "light-provider" },
    ],
    related: ["light-provider", "dialog", "sheet", "topbar"],
    see: ["glassmorphism", "wcag-contrast", "css-variables"],
  },

  // ─────────────────────────────────────────────────────────── Base UI
  {
    slug: "base-ui",
    term: "Base UI",
    short:
      "Base UI is an open source library of unstyled, accessible React components from the team behind Radix, Floating UI and Material UI.",
    body: [
      {
        type: "p",
        text: "Base UI (`@base-ui/react`) provides the behavior of interactive components such as dialogs, menus, popovers, selects, tabs, sliders and accordions, with no visual styles. Each component handles focus management, keyboard interaction, ARIA roles and states, and positioning, and leaves every pixel to you. It comes from people who built Radix Primitives, Floating UI and Material UI, and it applies lessons from all three. It is a [headless component](/glossary/headless-components) library in the same category as [Radix UI](/glossary/radix-ui) and React Aria.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "Components are compound: a root that owns state, and parts you compose. Each part renders one DOM element that you style with `className`. State is exposed as data attributes such as `data-open`, `data-disabled` and `data-highlighted`, so Tailwind variants like `data-open:opacity-100` style it without extra props. Where Radix uses `asChild` to change the rendered element, Base UI uses a `render` prop.",
      },
      {
        type: "p",
        text: "`className` and `style` also accept a function of the component's state, which helps when a class depends on more than one flag. Popups are split into `Portal`, `Positioner` and `Popup` parts, so placement logic stays separate from the element you style. A basic popover looks like this:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Popover } from "@base-ui/react/popover"

export function InfoPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger className="rounded-lg border px-3 py-1.5">Info</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="rounded-xl border bg-raised p-4 shadow-overlay">
            Details go here.
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}`,
      },
      { type: "h2", text: "Why it matters", id: "why-it-matters" },
      {
        type: "list",
        items: [
          "**Accessibility you do not re-derive.** Focus trapping, focus return, typeahead, roving tab index and the right ARIA wiring come from tested code instead of your sprint.",
          "**Styling freedom.** There is nothing to override. Tailwind classes and your [design tokens](/glossary/design-tokens) are the only visual layer.",
          "**Animation hooks.** `data-starting-style` and `data-ending-style` attributes let plain CSS transitions handle enter and exit, without a separate animation library.",
          "**Positioning built in.** Popups use Floating UI techniques for collision handling, so menus flip and shift at viewport edges.",
          "**Components Radix lacks.** Base UI includes pieces such as a combobox and a number field.",
        ],
      },
      {
        type: "p",
        text: "The trade-off is the same as with any headless library: you write the styles, and you own details such as visible focus rings, contrast and reduced motion. If you want those finished, use a styled layer built on top of it.",
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI builds its interactive primitives on Base UI: [Dialog](/docs/dialog), [Popover](/docs/popover), [Select](/docs/select), [Tabs](/docs/tabs), [Accordion](/docs/accordion), [Tooltip](/docs/tooltip) and [Dropdown menu](/docs/dropdown-menu) all depend on `@base-ui/react`, and add the kit's tokens, shadows and motion on top. [shadcn/ui](/glossary/shadcn-ui) supports Base UI as an alternative to Radix, so these components sit comfortably in a shadcn project. Installing one pulls in the dependency automatically:",
      },
      {
        type: "code",
        lang: "bash",
        code: `npx shadcn@latest add https://ui.minidev.pro/r/popover.json`,
      },
      { type: "component", name: "popover" },
    ],
    related: ["dialog", "popover", "select", "tabs", "accordion"],
    see: ["headless-components", "radix-ui", "shadcn-ui", "aria"],
  },

  // ─────────────────────────────────────────────── Component library
  {
    slug: "component-library",
    term: "Component library",
    short:
      "A component library is a collection of reusable, tested UI components, such as buttons, inputs and dialogs, that teams assemble interfaces from.",
    body: [
      {
        type: "p",
        text: "A component library packages UI pieces so that each one is designed, built and tested once and reused everywhere. A good one covers the parts that are easy to get subtly wrong: focus states, keyboard support, loading and disabled states, error messages, dark mode and responsive behavior. In React the unit is a component with a typed props API, and the library also ships the styles, tokens or utility classes those components depend on. A component library is usually the most visible part of a larger [design system](/glossary/design-system).",
      },
      { type: "h2", text: "Two distribution models", id: "distribution-models" },
      {
        type: "p",
        text: "Libraries reach your app in one of two ways, and the choice decides how you customize and upgrade.",
      },
      {
        type: "table",
        head: ["", "Package from npm", "Source copied into your repo"],
        rows: [
          ["Examples", "MUI, Chakra UI, Mantine", "shadcn/ui, MiniDev UI"],
          ["Where the code lives", "`node_modules`", "Your `components/ui` folder"],
          ["Customizing", "Props, theme objects, overrides", "Edit the source directly"],
          ["Upgrading", "Bump a version", "Re-add or diff the file"],
          ["What ships", "Whatever you import from the package", "Only the files you added"],
        ],
      },
      {
        type: "p",
        text: "The copy-in model, popularized by [shadcn/ui](/glossary/shadcn-ui), treats components as source you own. A CLI fetches an item from a [shadcn registry](/glossary/shadcn-registry), resolves its dependencies and writes it into your project.",
      },
      { type: "h2", text: "What to evaluate", id: "what-to-evaluate" },
      {
        type: "list",
        items: [
          "**Accessibility.** Does it follow the WAI-ARIA patterns, or build on a [headless library](/glossary/headless-components) that does?",
          "**Styling model.** Tailwind classes, CSS modules, CSS-in-JS or theme objects. Pick one that matches your stack, since mixing systems grows the bundle and the mental load.",
          "**Theming.** Components should read [semantic tokens](/glossary/semantic-tokens), so dark mode and a rebrand change variables, not components.",
          "**Server rendering.** Check how it behaves with [React Server Components](/glossary/react-server-components) and whether it causes [hydration](/glossary/hydration) warnings.",
          "**License and maintenance.** MIT or similar, recent releases, and issues that get answered.",
        ],
      },
      { type: "h2", text: "How MiniDev UI fits", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI is a free, MIT-licensed library of React and Tailwind CSS v4 components, distributed as a shadcn registry. Each component installs with one command and lands in your repo as editable source:",
      },
      {
        type: "code",
        lang: "bash",
        code: `npx shadcn@latest add https://ui.minidev.pro/r/button.json`,
      },
      {
        type: "p",
        text: "Components share one set of tokens from a single design spec, so a [Button](/docs/button), a [Card](/docs/card) and a [Code block](/docs/code-block) look like they belong together without per-component theming. For a survey of alternatives, read [free shadcn component libraries](/guides/free-shadcn-component-libraries).",
      },
      { type: "component", name: "button" },
    ],
    related: ["button", "card", "code-block", "dialog"],
    see: ["design-system", "shadcn-ui", "shadcn-registry", "headless-components"],
  },

  // ─────────────────────────────────────────────────── CSS variables
  {
    slug: "css-variables",
    term: "CSS variables (custom properties)",
    short:
      "CSS variables, or custom properties, are author-defined properties named with two leading dashes whose values you reuse with var() and that inherit.",
    body: [
      {
        type: "p",
        text: "A custom property is any property whose name starts with `--`. You declare it like any other property and read it with `var()`. Unlike Sass or Less variables, which are replaced at build time, custom properties are live in the browser: they follow the cascade, inherit down the DOM tree, can be overridden in a selector or media query, and can be changed from JavaScript at runtime. That makes them the natural carrier for [design tokens](/glossary/design-tokens), themes and any value that depends on context.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "code",
        lang: "css",
        code: `:root {
  --accent: oklch(0.53 0.215 283);
  --radius: 0.5rem;
}
.dark {
  --accent: oklch(0.7 0.165 285);
}
.button {
  background: var(--accent);
  border-radius: var(--radius, 6px);
}`,
      },
      {
        type: "list",
        items: [
          "**Scope follows the cascade.** A value declared on `:root` applies everywhere; one declared on `.card` applies inside cards and overrides the root value there.",
          "**Fallbacks.** `var(--radius, 6px)` uses `6px` when `--radius` is not defined.",
          "**Resolution is late.** The browser substitutes the value where it is used, at computed-value time, so `calc(var(--space) * 2)` works and updates when `--space` changes.",
          "**Names are case sensitive.** `--Accent` and `--accent` are different properties.",
          "**JavaScript access.** `el.style.setProperty(\"--lx\", \"120px\")` writes one; `getComputedStyle(el).getPropertyValue(\"--lx\")` reads it.",
        ],
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "p",
        text: "An unregistered custom property is untyped, so the browser cannot interpolate it: transitioning `--angle` from `0deg` to `90deg` jumps instead of animating. Register it with `@property` and a `syntax` such as `\"<angle>\"` to make it animatable.",
      },
      {
        type: "p",
        text: "A reference to an undefined variable with no fallback makes the whole declaration invalid at computed-value time. The property then falls back to its inherited or initial value, not to an earlier declaration in your stylesheet, which surprises people who expect normal CSS error recovery. Finally, changing variables on `:root` every frame forces style recalculation across the whole page, so scope rapidly updated values to the smallest subtree that needs them.",
      },
      { type: "h2", text: "How MiniDev UI uses them", id: "minidev-ui" },
      {
        type: "p",
        text: "Every color, shadow and radius in MiniDev UI is a custom property, and Tailwind CSS v4 maps them to utilities through `@theme`. [Dark mode](/glossary/dark-mode) and the four materials only redefine variables, never components. [LightProvider](/docs/light-provider) goes further: it writes `--lx`, `--ly`, `--sx`, `--sy` and `--la` on `<html>` from the pointer position, and every shadow in the kit reads them, so all shadows fall away from one light. The [box shadow generator](/tools/box-shadow-generator) and the guide to [shadows from one light source](/guides/css-shadows-light-source) show the technique in detail.",
      },
      { type: "component", name: "light-provider" },
    ],
    related: ["light-provider", "theme-picker", "color-picker"],
    see: ["design-tokens", "semantic-tokens", "dark-mode", "tailwind-css-v4"],
  },

  // ─────────────────────────────────────────────────────── Dark mode
  {
    slug: "dark-mode",
    term: "Dark mode",
    short:
      "Dark mode is a color scheme that renders light text on dark surfaces, chosen by the user or taken from the operating system's preference.",
    body: [
      {
        type: "p",
        text: "Dark mode replaces a light interface with one built on dark surfaces and light text. Operating systems expose the user's choice, and browsers pass it to CSS through the `prefers-color-scheme` media feature. Most apps honor that preference by default and add a manual toggle with three options: light, dark and system. Done well, dark mode is not an inversion of the light theme. It is a second set of carefully chosen values for the same roles.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "There are two common strategies. The media query strategy follows the OS automatically. The class strategy puts a class such as `dark` on `<html>` so the user can override the system, which is what apps with a toggle use. In Tailwind CSS v4 you point the `dark:` variant at the class and redefine tokens under it:",
      },
      {
        type: "code",
        lang: "css",
        code: `@import "tailwindcss";
@custom-variant dark (&:is(.dark *));

:root {
  --bg: oklch(0.985 0.002 264);
  --fg: oklch(0.185 0.012 268);
  color-scheme: light;
}
.dark {
  --bg: oklch(0.145 0.004 270);
  --fg: oklch(0.965 0.003 270);
  color-scheme: dark;
}`,
      },
      {
        type: "p",
        text: "The `color-scheme` property tells the browser to render its own UI, such as scrollbars, form controls and the default canvas, in the matching scheme.",
      },
      { type: "h2", text: "Design guidelines", id: "design-guidelines" },
      {
        type: "list",
        items: [
          "**Avoid pure black.** Near-black surfaces soften the glare of white text and leave room for depth below the page color.",
          "**Lightness shows elevation.** Shadows barely read on dark backgrounds, so raised surfaces get slightly lighter instead.",
          "**Rebalance accents.** A brand color tuned for white usually needs more lightness and a little less chroma on dark surfaces. [OKLCH](/glossary/oklch) makes that adjustment predictable.",
          "**Recheck contrast.** Every text and border pairing needs its own [WCAG contrast](/glossary/wcag-contrast) check in both themes.",
          "**Theme images and charts.** Screenshots, logos and chart palettes often need dark variants.",
        ],
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "p",
        text: "The classic bug is the flash: a server-rendered page arrives light, then turns dark once JavaScript reads the saved preference. It is a form of [FOUC](/glossary/fouc). The fix is a tiny blocking script in `<head>` that sets the class before the first paint, plus `suppressHydrationWarning` on `<html>` so React tolerates the changed attribute during [hydration](/glossary/hydration). [Dark mode in Next.js without the flash](/guides/nextjs-dark-mode-no-flash) walks through the full setup, including the system option and `theme-color`.",
      },
      { type: "h2", text: "How MiniDev UI handles it", id: "minidev-ui" },
      {
        type: "p",
        text: "Dark mode in MiniDev UI redefines [semantic tokens](/glossary/semantic-tokens) under `.dark`; components carry no `dark:` overrides for their core colors. Shadows, highlights and materials are retuned per theme too. [ThemePicker](/docs/theme-picker) is a three-way light, dark and system control that toggles the class and reports changes, so you can wire it to your own persistence.",
      },
      { type: "component", name: "theme-picker" },
    ],
    related: ["theme-picker", "light-provider", "segmented-control"],
    see: ["fouc", "semantic-tokens", "css-variables", "oklch"],
  },

  // ─────────────────────────────────────────────────── Design system
  {
    slug: "design-system",
    term: "Design system",
    short:
      "A design system is the shared set of principles, tokens, components and guidelines a team uses to build consistent products at scale.",
    body: [
      {
        type: "p",
        text: "A design system is more than a component library. It is the agreed source of truth for how a product looks and behaves: the decisions (type scale, color roles, spacing, motion), the code that implements them, and the documentation that explains when to use what. Its value is consistency without meetings. When a designer and an engineer both reach for the same `Button` with the same variants, nobody debates padding again.",
      },
      { type: "h2", text: "What it contains", id: "what-it-contains" },
      {
        type: "list",
        items: [
          "**Foundations.** Principles and the raw decisions: color, typography, spacing, radius, elevation and motion, usually expressed as [design tokens](/glossary/design-tokens).",
          "**Components.** A coded [component library](/glossary/component-library) plus matching design files, covering every state: rest, hover, focus, disabled, loading, invalid and empty.",
          "**Patterns.** Recipes that combine components for recurring problems, such as forms with validation, [empty states](/glossary/empty-state), settings pages and destructive confirmations.",
          "**Guidelines.** Content style, accessibility requirements and usage rules, including when not to use something.",
          "**Governance.** Who owns it, how changes are proposed, how versions ship and how teams adopt them.",
        ],
      },
      { type: "h2", text: "Why it matters", id: "why-it-matters" },
      {
        type: "p",
        text: "Without a system, every team rebuilds the same controls with small differences, and the differences compound: five grays, three focus styles, dialogs that trap focus and dialogs that do not. A system moves those decisions to one place. Accessibility work is done once and inherited. A rebrand becomes a token change. New engineers ship consistent UI in their first week, because the easiest path is also the correct one.",
      },
      {
        type: "p",
        text: "The cost is real too. A system needs owners, documentation and a change process, or it drifts away from the product and people stop trusting it. Small teams often get most of the benefit by adopting an existing system and adjusting its tokens rather than building one from scratch.",
      },
      { type: "h2", text: "How MiniDev UI approaches it", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI is driven by one spec that every component derives from. It fixes the decisions up front: Geist Sans and Geist Mono for type, a near-black ink primary action, a violet brand color spent sparingly, a 4px spacing base, designed focus and disabled states, and one light source that all shadows follow. Colors exist only as [semantic tokens](/glossary/semantic-tokens), so no component contains a hex value or a palette step. Materials (hairline, glass, metal and paper) are an attribute that redefines those tokens for a page or a subtree:",
      },
      {
        type: "code",
        lang: "html",
        code: `<html class="dark" data-material="glass">
  <!-- every component inherits the glass tokens -->
</html>`,
      },
      {
        type: "p",
        text: "To create a starting point for your own brand, try the [brand kit generator](/tools/brand-kit-generator).",
      },
      { type: "component", name: "light-provider" },
    ],
    related: ["light-provider", "button", "card", "theme-picker"],
    see: ["design-tokens", "component-library", "semantic-tokens", "css-variables"],
  },

  // ─────────────────────────────────────────────────── Design tokens
  {
    slug: "design-tokens",
    term: "Design tokens",
    short:
      "Design tokens are named, platform-agnostic values for design decisions such as colors, spacing, type and shadows, shared between design and code.",
    body: [
      {
        type: "p",
        text: "A design token stores one design decision under a name: `color.accent`, `space.4`, `radius.control`, `shadow.overlay`. The name is what designers and engineers refer to; the value can change without anyone hunting through code. Because tokens are data, one source can generate CSS custom properties, iOS and Android constants, and design tool variables, which keeps every platform in sync.",
      },
      { type: "h2", text: "Token tiers", id: "tiers" },
      {
        type: "p",
        text: "Most systems layer tokens so that each tier has one job.",
      },
      {
        type: "list",
        items: [
          "**Primitive (or reference) tokens** name raw values: `violet-600`, `gray-900`, `space-16`. They say what a value is, not what it is for.",
          "**[Semantic tokens](/glossary/semantic-tokens)** name roles and point at primitives: `accent`, `fg-muted`, `border`, `danger`. Components use these.",
          "**Component tokens** (optional) scope a value to one component: `button-height-sm`, `dialog-radius`. Useful in large systems, noise in small ones.",
        ],
      },
      {
        type: "p",
        text: "Theming happens at the semantic tier. Dark mode, a brand variant or a high-contrast mode remaps semantic tokens to different primitives, and components never notice.",
      },
      { type: "h2", text: "Formats", id: "formats" },
      {
        type: "p",
        text: "The W3C Design Tokens Community Group maintains a JSON format that tools such as Style Dictionary and design tool plugins read. Each token has a `$value` and usually a `$type`, and tokens can reference other tokens with curly braces. In the current version of the format, colors and dimensions are structured objects:",
      },
      {
        type: "code",
        lang: "json",
        filename: "tokens.json",
        code: `{
  "color": {
    "violet-600": {
      "$type": "color",
      "$value": { "colorSpace": "oklch", "components": [0.53, 0.215, 283] }
    },
    "accent": { "$type": "color", "$value": "{color.violet-600}" }
  },
  "radius": {
    "control": { "$type": "dimension", "$value": { "value": 8, "unit": "px" } }
  }
}`,
      },
      {
        type: "p",
        text: "On the web, tokens end up as [CSS variables](/glossary/css-variables). In Tailwind CSS v4 you expose them as utilities with `@theme`, so `--color-accent` becomes `bg-accent`, `text-accent` and `border-accent`.",
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "list",
        items: [
          "Naming semantic tokens after their value (`--blue`) instead of their role. The name breaks the first time the brand changes.",
          "Letting components reach past semantic tokens to primitives. Theming then requires editing components.",
          "Creating a token for every one-off value. A token earns its place when it is reused or themed.",
          "Keeping design files and code in separate token sets. Generate both from one source, or they drift within weeks.",
        ],
      },
      { type: "h2", text: "How MiniDev UI uses them", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI ships semantic tokens only, written in [OKLCH](/glossary/oklch) and mapped to Tailwind utilities: surfaces (`bg`, `surface`, `raised`, `sunken`), text (`fg`, `fg-muted`, `fg-subtle`), brand (`accent`, `accent-soft`, `on-accent`), four status colors and a shadow scale. It also maps them onto the shadcn variable names (`--primary`, `--muted`, `--ring`), so existing shadcn components pick them up. Generate a scale of your own with the [OKLCH palette generator](/tools/oklch-palette-generator).",
      },
    ],
    related: ["light-provider", "theme-picker", "color-picker", "badge"],
    see: ["semantic-tokens", "css-variables", "design-system", "oklch"],
  },

  // ──────────────────────────────────────────────────────────── FOUC
  {
    slug: "fouc",
    term: "FOUC (flash of unstyled content)",
    short:
      "FOUC (flash of unstyled content) is when a browser briefly paints a page before its styles apply, so users see raw or wrong-looking content flicker.",
    body: [
      {
        type: "p",
        text: "A flash of unstyled content happens when HTML reaches the screen before the CSS that styles it. The user sees default fonts, stacked lists and blue links for a moment, then the layout snaps into place. The term dates from the early 2000s, when certain ways of loading stylesheets triggered it, but the underlying problem, painting before the right styles or state are ready, shows up in several modern forms.",
      },
      { type: "h2", text: "Common causes", id: "causes" },
      {
        type: "list",
        items: [
          "**Styles injected by JavaScript.** CSS-in-JS without server-side extraction, or CSS loaded only by client code, applies after the first paint.",
          "**Non-blocking stylesheets.** A stylesheet loaded with a `media` swap trick or added by a script does not block rendering, so the page paints without it.",
          "**Theme applied after hydration.** A saved dark theme read in `useEffect` produces a flash of the wrong theme, usually also called FOUC.",
          "**Web fonts.** A fallback font swapping to the web font is a related effect called FOUT (flash of unstyled text), and it can shift layout.",
          "**Client-only content.** Components that render nothing on the server and appear after mount cause visible jumps.",
        ],
      },
      { type: "h2", text: "How to prevent it", id: "prevention" },
      {
        type: "p",
        text: "Regular `<link rel=\"stylesheet\">` tags in the `<head>` are render-blocking, which is what you want for critical CSS: the browser waits for them before the first paint. Frameworks like Next.js extract CSS from your imports, including Tailwind CSS, and emit such links. For state that changes styling, such as the theme, decide it before paint with a small inline script:",
      },
      {
        type: "code",
        lang: "html",
        code: `<head>
  <script>
    try {
      var t = localStorage.getItem("theme");
      var dark = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      if (dark) document.documentElement.classList.add("dark");
    } catch (e) {}
  </script>
  <link rel="stylesheet" href="/app.css" />
</head>`,
      },
      {
        type: "p",
        text: "For fonts, use `font-display: swap` or `optional` with a size-adjusted fallback (`next/font` generates one) so the swap does not move text. For client-only widgets, reserve their space with fixed dimensions or a [skeleton screen](/glossary/skeleton-screen) so nothing jumps when they arrive. In React apps, also watch for [hydration](/glossary/hydration) mismatches, which can force parts of the page to re-render on the client.",
      },
      { type: "h2", text: "How MiniDev UI handles it", id: "minidev-ui" },
      {
        type: "p",
        text: "The ui.minidev.pro site uses one blocking head script to restore both the theme class and the `data-material` attribute before the first paint, the approach documented in [Dark mode in Next.js without the flash](/guides/nextjs-dark-mode-no-flash). Components style themselves through tokens already defined in the stylesheet, so none of them injects CSS at runtime. [Skeleton](/docs/skeleton) placeholders can match final dimensions to avoid layout shift while data loads.",
      },
      { type: "component", name: "skeleton" },
    ],
    related: ["theme-picker", "skeleton", "light-provider"],
    see: ["dark-mode", "hydration", "skeleton-screen", "react-server-components"],
  },

  // ─────────────────────────────────────────────── Headless components
  {
    slug: "headless-components",
    term: "Headless components",
    short:
      "Headless components provide behavior, state and accessibility for UI widgets without any styles, so you supply all of the visual design yourself.",
    body: [
      {
        type: "p",
        text: "A headless component separates what a widget does from how it looks. The library handles the hard, invisible parts: open and closed state, focus management, keyboard navigation, [ARIA](/glossary/aria) roles and attributes, typeahead, positioning and dismissal. You handle the visible parts: classes, layout, color and animation. The result is accessible behavior you did not have to write, with a visual design that matches your product instead of the library's.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "Headless libraries come in two shapes. Component-based libraries, such as [Base UI](/glossary/base-ui), [Radix UI](/glossary/radix-ui), React Aria Components and Headless UI, give you unstyled parts that render DOM elements you put classes on. Hook-based libraries, such as React Aria's hooks, Downshift or TanStack Table, return props and state that you spread onto your own elements. Both expose state for styling, usually as data attributes:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Switch } from "@base-ui/react/switch"

export function Toggle() {
  return (
    <Switch.Root className="h-5 w-9 rounded-full bg-sunken data-checked:bg-accent">
      <Switch.Thumb className="block size-4 translate-x-0.5 rounded-full bg-surface transition-transform data-checked:translate-x-4.5" />
    </Switch.Root>
  )
}`,
      },
      { type: "h2", text: "Why it matters", id: "why-it-matters" },
      {
        type: "list",
        items: [
          "**Accessibility is hard to get right twice.** A menu alone needs arrow-key navigation, typeahead, Escape to close, focus return and correct `aria-expanded` wiring. Headless libraries encode the WAI-ARIA Authoring Practices and test them across screen readers.",
          "**No style overrides.** Styled libraries make you fight specificity or theme objects. Headless ones have nothing to fight.",
          "**Any styling approach.** Tailwind CSS, CSS modules or plain CSS all fit.",
          "**Reusable knowledge.** You learn the behavior API once and apply it to very different designs.",
        ],
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "p",
        text: "Headless does not mean finished. You still own visible focus styles, color contrast, touch target sizes, reduced motion and responsive layout. It is easy to remove an outline and never add a [:focus-visible](/glossary/focus-visible) replacement. Also check that your styling does not hide state, for example a selected tab that differs from the others only by a subtle color change. Finally, read the library's docs on portals: popups render at the end of `<body>`, so styles scoped to a parent, such as a theme class on a wrapper, may not reach them.",
      },
      { type: "h2", text: "How MiniDev UI uses them", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI is a styled layer on top of headless primitives. Components like [Dialog](/docs/dialog), [Select](/docs/select), [Dropdown menu](/docs/dropdown-menu) and [Accordion](/docs/accordion) wrap Base UI parts and add the kit's tokens, shadows, focus rings and motion. You get tested behavior and a finished look, and because the component is installed as source, you can still change either.",
      },
      { type: "component", name: "select" },
    ],
    related: ["dialog", "select", "dropdown-menu", "accordion"],
    see: ["base-ui", "radix-ui", "aria", "shadcn-ui"],
  },

  // ────────────────────────────────────────────────────────── Hydration
  {
    slug: "hydration",
    term: "Hydration (React)",
    short:
      "Hydration is the process where React attaches event handlers and state to HTML rendered on the server, making the static markup interactive.",
    body: [
      {
        type: "p",
        text: "With server-side rendering or static generation, the server sends complete HTML, so users see content before any JavaScript runs. That HTML is inert: buttons do nothing yet. Hydration is the step where React loads the component code in the browser, renders the same tree in memory, matches it against the existing DOM, and attaches event handlers and state without recreating the nodes. React's `hydrateRoot` does this, and frameworks like Next.js call it for you.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "React expects the first client render to produce exactly the markup the server produced. When it does not, React reports a hydration mismatch. In development you get an error pointing at the differing node; React then falls back to rendering that part of the tree on the client, which costs time and can cause visible flicker. With Suspense boundaries, React hydrates in chunks and prioritizes the parts a user interacts with first, known as selective hydration.",
      },
      { type: "h2", text: "Common causes of mismatches", id: "mismatches" },
      {
        type: "list",
        items: [
          "Reading `window`, `localStorage` or `matchMedia` during render. The server has none of them, so it takes a different branch.",
          "Values that differ between runs: `Date.now()`, `Math.random()`, relative timestamps and ad hoc generated IDs. Use `useId` for IDs.",
          "Locale and time zone formatting. `toLocaleString()` on a server in UTC and a browser elsewhere produces different strings.",
          "Invalid HTML nesting, such as a `<div>` inside a `<p>`, which the browser's parser repairs before React sees it.",
          "Browser extensions and scripts that modify the DOM before hydration, including a theme script that adds a class to `<html>`.",
        ],
      },
      { type: "h2", text: "Example", id: "example" },
      {
        type: "p",
        text: "Render the same output on both sides first, then switch to client-only values after mount:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import { useEffect, useState } from "react"

export function LocalTime({ iso }: { iso: string }) {
  const [text, setText] = useState(iso.slice(0, 10))
  useEffect(() => {
    setText(new Date(iso).toLocaleString())
  }, [iso])
  return <time dateTime={iso}>{text}</time>
}`,
      },
      {
        type: "p",
        text: "For one attribute you deliberately change before hydration, such as the `dark` class on `<html>`, `suppressHydrationWarning` silences the warning for that element only. It works one level deep and should not be used to hide real bugs.",
      },
      { type: "h2", text: "How MiniDev UI relates", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev components take their content from props, so the same props produce the same HTML on server and client. Theme and material state live on `<html>` and are applied by a head script, not by component render logic, which keeps [dark mode](/glossary/dark-mode) out of React's comparison and avoids [FOUC](/glossary/fouc). Anything that reads the clock or the viewport deserves the pattern above. [React Server Components](/glossary/react-server-components) reduce hydration work further, because server-only components ship no JavaScript to hydrate.",
      },
    ],
    related: ["theme-picker", "skeleton", "light-provider"],
    see: ["react-server-components", "fouc", "dark-mode"],
  },

  // ──────────────────────────────────────────────────────────── OKLCH
  {
    slug: "oklch",
    term: "OKLCH",
    short:
      "OKLCH is a CSS color space that describes colors by perceptual lightness, chroma and hue, so equal numeric steps look like equal visual steps.",
    body: [
      {
        type: "p",
        text: "OKLCH is the polar form of Oklab, a perceptual color space published by Björn Ottosson in 2020. Colors are written as `oklch(L C H)`: **L** is perceived lightness from 0 (black) to 1 (white), **C** is chroma, how colorful the color is, from 0 (gray) up to roughly 0.37 for the most vivid colors screens can show, and **H** is the hue angle in degrees. An optional alpha follows a slash: `oklch(0.53 0.215 283 / 0.28)`. All current major browsers support it, and Tailwind CSS v4 defines its default palette in it.",
      },
      { type: "h2", text: "Why it matters", id: "why-it-matters" },
      {
        type: "p",
        text: "In HSL, lightness is a formula, not a perception. `hsl(60 100% 50%)` yellow and `hsl(240 100% 50%)` blue share a lightness of 50%, yet the yellow looks far brighter. OKLCH lightness tracks what people see, which makes several jobs straightforward.",
      },
      {
        type: "list",
        items: [
          "**Palettes.** Keep chroma and hue, step lightness, and you get an even scale. Keep lightness and chroma, rotate hue, and you get sibling colors of matching weight, useful for status colors and charts.",
          "**Dark mode.** Raise lightness and slightly reduce chroma to adapt an accent for dark backgrounds without its hue drifting.",
          "**Reasoning about contrast.** Lightness correlates with contrast, so text colors are easier to plan. Still verify the actual [WCAG ratio](/glossary/wcag-contrast), which uses a different luminance formula.",
          "**Wide gamut.** OKLCH can express colors beyond sRGB, such as the Display P3 colors modern screens show.",
        ],
      },
      { type: "h2", text: "Example", id: "example" },
      {
        type: "code",
        lang: "css",
        code: `:root {
  --accent: oklch(0.53 0.215 283);
  --accent-hover: oklch(0.48 0.215 283); /* darker, same hue and chroma */
  --accent-soft: oklch(0.53 0.215 283 / 0.09);
}
.dark {
  --accent: oklch(0.7 0.165 285); /* lighter and calmer for dark surfaces */
}`,
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "p",
        text: "Not every combination of L, C and H exists on a given screen. High chroma at very high or very low lightness often falls outside sRGB or even P3, and the browser maps it back into gamut, which can shift the color you see. Keep chroma moderate near the ends of the lightness range, and check colors on both a wide-gamut and a standard display. OKLCH hue angles also differ from HSL hue angles, so copying an HSL hue into OKLCH will not give the same color.",
      },
      {
        type: "p",
        text: "When mixing or animating colors, name the interpolation space: `color-mix(in oklch, var(--accent) 22%, transparent)` blends perceptually, where sRGB mixing can pass through muddy midpoints.",
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "Every MiniDev token is written in OKLCH, including the violet brand at hue 283 and status colors tuned to equal perceptual weight. Build your own scale with the [OKLCH palette generator](/tools/oklch-palette-generator), convert existing brand colors with the [hex to OKLCH converter](/tools/hex-to-oklch), and read [OKLCH colors in Tailwind CSS v4](/guides/oklch-colors-tailwind-v4) for the full workflow. [Color picker](/docs/color-picker) gives users a swatch control in your UI.",
      },
      { type: "component", name: "color-picker" },
    ],
    related: ["color-picker", "theme-picker", "status-badge", "badge"],
    see: ["design-tokens", "wcag-contrast", "dark-mode", "tailwind-css-v4"],
  },

  // ─────────────────────────────────────────── prefers-reduced-motion
  {
    slug: "prefers-reduced-motion",
    term: "prefers-reduced-motion",
    short:
      "prefers-reduced-motion is a CSS media feature that reports whether the user has asked the operating system to minimize nonessential animation.",
    body: [
      {
        type: "p",
        text: "Motion on screen can trigger dizziness, nausea or headaches for people with vestibular disorders, and it distracts many others. Every major operating system has a setting to reduce it: Reduce Motion on macOS and iOS, the animation effects setting on Windows, and Remove animations on Android. Browsers expose that choice to CSS through the `prefers-reduced-motion` media feature, which has two values: `no-preference` and `reduce`. JavaScript can read the same value with `matchMedia`.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "code",
        lang: "css",
        code: `.card {
  transition: transform 140ms ease-out, opacity 140ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: opacity 140ms ease-out;
  }
}`,
      },
      {
        type: "p",
        text: "Reduced motion does not mean no change at all. The usual approach removes movement, scaling, parallax and spinning, and keeps quick opacity or color changes so state changes stay clear. Removing every transition can make interfaces feel broken, because a panel that appears with no cue at all is easy to miss. In Tailwind CSS, the `motion-reduce:` and `motion-safe:` variants map to this media query, so `motion-safe:animate-bounce` animates only for users who have not asked for less motion.",
      },
      {
        type: "list",
        items: [
          "Remove parallax, scroll-linked transforms and large slide or zoom transitions.",
          "Stop autoplaying loops such as marquees and animated backgrounds, or offer a pause control.",
          "Replace spring-based position changes with instant updates or a short crossfade.",
          "Keep functional feedback: focus rings, color changes and progress indicators should still appear.",
          "Set `scroll-behavior: auto` so anchor links and scripted scrolling jump instead of gliding across the page.",
        ],
      },
      { type: "h2", text: "In JavaScript and React", id: "javascript" },
      {
        type: "p",
        text: "Animation driven from JavaScript is out of reach of CSS media queries, so read the preference and branch:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

export function Reveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
    >
      {children}
    </motion.div>
  )
}`,
      },
      {
        type: "p",
        text: "Without a library, `window.matchMedia(\"(prefers-reduced-motion: reduce)\")` returns a query list with a `matches` boolean and a `change` event. On the standards side, WCAG 2.3.3 Animation from Interactions (level AAA) asks that motion triggered by interaction can be turned off, and 2.2.2 Pause, Stop, Hide (level A) covers content that moves on its own for more than five seconds.",
      },
      { type: "h2", text: "How MiniDev UI handles it", id: "minidev-ui" },
      {
        type: "p",
        text: "Reduced motion is a rule in the kit's design spec, not an option. The global stylesheet cuts transitions and animations to near zero under `reduce`, and components that animate in JavaScript check `useReducedMotion`: [Number roll](/docs/number-roll) swaps digits without springs, [Tabs](/docs/tabs) stops animating its indicator, [Marquee](/docs/marquee) stops scrolling, and [LightProvider](/docs/light-provider) holds the light still instead of drifting. For more on purposeful motion, see [micro-interactions](/glossary/micro-interactions).",
      },
      { type: "component", name: "marquee" },
    ],
    related: ["light-provider", "marquee", "number-roll", "tabs"],
    see: ["micro-interactions", "aria", "focus-visible"],
  },

  // ─────────────────────────────────────────────────────────── Radix UI
  {
    slug: "radix-ui",
    term: "Radix UI",
    short:
      "Radix UI is an open source library of unstyled, accessible React primitives, widely known as the original foundation of shadcn/ui.",
    body: [
      {
        type: "p",
        text: "Radix Primitives is a set of low-level React components, such as Dialog, Dropdown Menu, Popover, Tooltip, Tabs and Select, that implement behavior and accessibility with no styles. It was created by the team at Modulz and is now maintained by WorkOS. Radix popularized the compound, [headless](/glossary/headless-components) approach in React and became the base of [shadcn/ui](/glossary/shadcn-ui), which made it one of the most widely installed UI dependencies in the ecosystem. The project also publishes Radix Themes, a styled library built on the primitives, and Radix Colors, a set of color scales.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "Each primitive is a set of parts that share state through React context. State shows up as `data-state` attributes (`open`, `closed`, `checked`, `active`) that you target in CSS. The `asChild` prop merges a part's behavior into your own child element instead of rendering an extra DOM node.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import * as Dialog from "@radix-ui/react-dialog"

export function ConfirmDelete() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-lg border px-3 py-1.5">Delete</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-1/2 rounded-xl bg-white p-6">
          <Dialog.Title>Delete project?</Dialog.Title>
          <Dialog.Description>This cannot be undone.</Dialog.Description>
          <Dialog.Close>Cancel</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}`,
      },
      { type: "h2", text: "Radix and Base UI", id: "radix-vs-base-ui" },
      {
        type: "p",
        text: "Several of the original Radix authors went on to build [Base UI](/glossary/base-ui) together with the Floating UI and Material UI teams. The two libraries solve the same problem and look similar in code. The practical differences are in API details:",
      },
      {
        type: "list",
        items: [
          "Radix uses `asChild` for element composition; Base UI uses a `render` prop.",
          "Radix exposes state mostly through `data-state`; Base UI uses individual attributes such as `data-open` and `data-checked`.",
          "Base UI separates positioning into a `Positioner` part and ships components Radix does not, such as a combobox and a number field.",
          "shadcn/ui now lets you choose either library as the primitive layer, so the choice is no longer tied to the component collection you use.",
        ],
      },
      {
        type: "p",
        text: "Neither is a wrong choice. Radix has years of production use and a large body of examples; Base UI has a newer API and a broader component set. For an existing Radix codebase, there is rarely a reason to migrate everything at once.",
      },
      { type: "h2", text: "How MiniDev UI relates", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI builds on Base UI rather than Radix. If your project already uses Radix-based shadcn components, MiniDev components still install alongside them, because each one declares its own dependencies. Composition patterns differ, so when you mix them, check whether a trigger expects `asChild` or `render`. MiniDev's [Dialog](/docs/dialog), [Dropdown menu](/docs/dropdown-menu), [Popover](/docs/popover) and [Tooltip](/docs/tooltip) cover the same ground as their Radix counterparts.",
      },
      { type: "component", name: "dropdown-menu" },
    ],
    related: ["dialog", "dropdown-menu", "popover", "tooltip"],
    see: ["base-ui", "headless-components", "shadcn-ui", "aria"],
  },

  // ──────────────────────────────────────────── React Server Components
  {
    slug: "react-server-components",
    term: "React Server Components",
    short:
      "React Server Components render only on the server and send their output, not their code, to the browser, which cuts the JavaScript users download.",
    body: [
      {
        type: "p",
        text: "React Server Components (RSC) split an app into two kinds of components. Server Components run on the server, at build time or per request. They can be `async`, read databases and files directly, and their code never ships to the browser. Client Components are the familiar kind: they also render on the server for the initial HTML, then [hydrate](/glossary/hydration) and run in the browser with state, effects and event handlers. The Next.js App Router made Server Components the default, and React 19 documents them as stable for frameworks to build on.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "A `\"use client\"` directive at the top of a file marks a boundary: that file and everything it imports become client code. Server Components can render Client Components and pass them props, and those props must be serializable: strings, numbers, plain objects, arrays, dates, promises and JSX, but not ordinary functions. The server streams a serialized tree to the browser, where React merges it with the client parts.",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/pricing/page.tsx",
        code: `import { getPlans } from "@/lib/db"
import { PricingToggle } from "@/components/pricing-toggle" // a "use client" file

export default async function PricingPage() {
  const plans = await getPlans()
  return (
    <section>
      <h1>Pricing</h1>
      <PricingToggle plans={plans} />
    </section>
  )
}`,
      },
      { type: "h2", text: "Why it matters", id: "why-it-matters" },
      {
        type: "list",
        items: [
          "**Less JavaScript.** Markdown rendering, syntax highlighting and data formatting can run on the server with no bundle cost.",
          "**Direct data access.** No API route just to feed your own UI, and secrets stay on the server.",
          "**Streaming.** With Suspense, slow data shows a fallback while the rest of the page is already visible.",
        ],
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "list",
        items: [
          "Using `useState`, `useEffect`, context or browser APIs in a file without `\"use client\"`. The build fails with an error pointing at the hook.",
          "Putting `\"use client\"` at the top of a layout, which pulls its whole import graph into the client bundle. Push the boundary down to the smallest interactive leaf.",
          "Passing an `onClick` handler from a Server Component to a Client Component. Plain functions cannot be serialized.",
          "Confusing `\"use server\"` with Server Components. `\"use server\"` marks Server Functions that client code can call, not components.",
        ],
      },
      { type: "h2", text: "How MiniDev UI fits", id: "minidev-ui" },
      {
        type: "p",
        text: "Interactive MiniDev components start with `\"use client\"`, so you can import them straight from a Server Component page and only those leaves ship to the browser. Purely presentational pieces such as [Card](/docs/card) carry no directive and can render entirely on the server. Fetch data in the server page and pass results down as props, as the [Next.js SaaS dashboard guide](/guides/nextjs-saas-dashboard) shows.",
      },
      { type: "component", name: "card" },
    ],
    related: ["card", "code-block", "markdown-renderer", "prose"],
    see: ["hydration", "fouc", "component-library"],
  },

  // ─────────────────────────────────────────────────── Semantic tokens
  {
    slug: "semantic-tokens",
    term: "Semantic tokens",
    short:
      "Semantic tokens are design tokens named for their purpose, such as fg-muted or danger, rather than their value, so themes can change values safely.",
    body: [
      {
        type: "p",
        text: "A semantic token describes a job: the page background, secondary text, a destructive action, the focus ring. It points at a raw value, usually through a primitive token, but the component only knows the job. `text-fg-muted` says \"secondary text\"; `text-gray-500` says \"this particular gray\". The first survives a dark theme, a rebrand and a high-contrast mode unchanged. The second has to be found and edited in every file that uses it.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "code",
        lang: "css",
        code: `/* primitives */
:root {
  --violet-600: oklch(0.53 0.215 283);
  --violet-400: oklch(0.7 0.165 285);
  --gray-950: oklch(0.185 0.012 268);
  --gray-50: oklch(0.965 0.003 270);
}

/* semantic tokens: the only names components use */
:root { --accent: var(--violet-600); --fg: var(--gray-950); }
.dark { --accent: var(--violet-400); --fg: var(--gray-50); }`,
      },
      {
        type: "p",
        text: "A component styled with `bg-accent text-on-accent` is now correct in both themes without a single `dark:` class. Adding a third theme means adding a third block of mappings, not touching components.",
      },
      { type: "h2", text: "Naming guidelines", id: "naming" },
      {
        type: "list",
        items: [
          "**Name by role and relationship.** `bg`, `surface`, `raised` and `sunken` for surfaces; `fg`, `fg-muted` and `fg-subtle` for text strength; `border` and `border-strong` for lines.",
          "**Pair foreground and background roles.** `accent` with `on-accent`, `ink` with `on-ink`. The pair is what you test for [contrast](/glossary/wcag-contrast).",
          "**Keep status roles equal in weight.** `success`, `warning`, `danger` and `info` should look equally loud, which is much easier to tune in [OKLCH](/glossary/oklch).",
          "**Keep the list short.** If two tokens always change together and never differ, merge them.",
        ],
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "p",
        text: "The most common failure is leakage: one component uses `bg-white` because it was quicker, and dark mode breaks in that one spot. Enforce the rule in review, or with a lint rule that rejects palette classes in component code. Another is naming by appearance, such as `--light-bg`, which becomes false in dark mode. Finally, avoid baking one theme's assumptions into a name; `--text-gray` means little on a dark surface. When a component truly needs a one-off value, derive it from a token, for example `color-mix(in oklch, var(--accent) 22%, transparent)`, instead of adding a raw color.",
      },
      { type: "h2", text: "How MiniDev UI uses them", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI uses semantic tokens only. Components contain no hex values and no palette steps, and dark mode and the materials redefine tokens, never components. Text roles carry contrast targets from the design spec: `fg-muted` at 7:1 or better and `fg-subtle` at 4.5:1 or better. The kit also maps its roles onto shadcn's names (`--primary`, `--muted-foreground`, `--destructive`, `--ring`), so shadcn components you already have follow the same theme. [Status badge](/docs/status-badge) and [Inline alert](/docs/inline-alert) show the status roles in use.",
      },
      { type: "component", name: "status-badge" },
    ],
    related: ["button", "badge", "status-badge", "inline-alert"],
    see: ["design-tokens", "css-variables", "dark-mode", "design-system"],
  },

  // ─────────────────────────────────────────────────── shadcn registry
  {
    slug: "shadcn-registry",
    term: "shadcn registry",
    short:
      "A shadcn registry is a set of JSON files describing components and their dependencies that the shadcn CLI can install directly into a project.",
    body: [
      {
        type: "p",
        text: "The shadcn CLI does not only install shadcn/ui's own components. It installs any item described in the registry format: a JSON document that lists the item's source files, npm dependencies, other registry items it needs, and optional CSS variables. Anyone can host a registry, whether it is a public library, a company design system or a private set of blocks. In practice a registry is a folder of JSON files served over HTTP, usually under an `/r/` path.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "Each installable item is a registry item document. The CLI fetches it, installs the npm `dependencies`, resolves `registryDependencies` recursively, rewrites import paths to match the aliases in your `components.json`, and writes the files into your project.",
      },
      {
        type: "code",
        lang: "json",
        filename: "r/badge.json",
        code: `{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "badge",
  "type": "registry:ui",
  "title": "Badge",
  "dependencies": ["@base-ui/react", "class-variance-authority"],
  "registryDependencies": ["utils"],
  "files": [
    {
      "path": "registry/ui/badge.tsx",
      "type": "registry:ui",
      "target": "components/ui/badge.tsx",
      "content": "..."
    }
  ]
}`,
      },
      {
        type: "list",
        items: [
          "`type` tells the CLI what the item is: `registry:ui` for a component, `registry:block` for a composed section, and other types for hooks, lib files, pages and themes.",
          "`dependencies` are npm packages, installed with your package manager.",
          "`registryDependencies` are other items, either shadcn names like `utils` or full URLs to items in any registry.",
          "`files` carry the source inline in `content`, so one request is enough.",
          "An index file, `registry.json`, lists every item and is what `shadcn build` reads to generate the item files.",
        ],
      },
      { type: "h2", text: "Installing from a registry", id: "installing" },
      {
        type: "code",
        lang: "bash",
        code: `# by URL
npx shadcn@latest add https://ui.minidev.pro/r/badge.json

# or register a namespace once in components.json:
#   "registries": { "@minidev": "https://ui.minidev.pro/r/{name}.json" }
npx shadcn@latest add @minidev/badge`,
      },
      { type: "h2", text: "Why it matters", id: "why-it-matters" },
      {
        type: "p",
        text: "Registries turn copy-paste code into a distribution channel with dependency resolution. Consumers get editable source and no runtime package to track, and publishers ship updates by redeploying JSON. The same files are easy for AI coding tools to read. [Build your own shadcn registry](/guides/shadcn-custom-registry) covers hosting one, from `registry.json` to deployment.",
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "Every MiniDev component, block and page is a registry item at `https://ui.minidev.pro/r/<name>.json`, generated from its source, and the full index lives at `/r/registry.json`. Each docs page, such as [Code block](/docs/code-block), shows the exact install command with a copy button. Items that build on other MiniDev components list them as full URLs in `registryDependencies`, so installing a composed component such as an activity feed also brings in the avatar and list item it uses.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Review what an item will write before you run it. Open the JSON URL in a browser: the `files` array shows every file and target path, and `dependencies` shows every npm package the CLI will install.",
      },
      { type: "component", name: "code-block" },
    ],
    related: ["code-block", "copy-button", "badge", "button"],
    see: ["shadcn-ui", "component-library", "tailwind-css-v4"],
  },

  // ─────────────────────────────────────────────────────── shadcn/ui
  {
    slug: "shadcn-ui",
    term: "shadcn/ui",
    short:
      "shadcn/ui is an open source collection of React and Tailwind CSS components that you copy into your project with a CLI instead of installing a package.",
    body: [
      {
        type: "p",
        text: "shadcn/ui, created by the developer known as shadcn, describes itself as a way to build your own component library rather than a library you depend on. You run the CLI, it writes the component's source into your repository, and from then on the code is yours: you read it, edit it and commit it. Components are styled with Tailwind CSS and built on [headless](/glossary/headless-components) primitives, originally [Radix UI](/glossary/radix-ui) and now also [Base UI](/glossary/base-ui).",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "list",
        ordered: true,
        items: [
          "`npx shadcn@latest init` creates `components.json`, which records your style, Tailwind CSS file, icon library and import aliases, and adds the base CSS variables.",
          "`npx shadcn@latest add button` fetches the Button item, installs its npm dependencies and writes `components/ui/button.tsx`.",
          "You import it like any local file: `import { Button } from \"@/components/ui/button\"`.",
        ],
      },
      {
        type: "code",
        lang: "json",
        filename: "components.json",
        code: `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": { "config": "", "css": "app/globals.css", "baseColor": "neutral", "cssVariables": true },
  "iconLibrary": "lucide",
  "aliases": { "components": "@/components", "ui": "@/components/ui", "utils": "@/lib/utils" }
}`,
      },
      {
        type: "p",
        text: "The same `add` command accepts a URL or a namespaced name, which is how third-party libraries plug in. Any [shadcn registry](/glossary/shadcn-registry) item installs the same way.",
      },
      { type: "h2", text: "Why it matters", id: "why-it-matters" },
      {
        type: "list",
        items: [
          "**Ownership.** No waiting on maintainers for a prop. Change the markup when the design needs it.",
          "**Theming by variables.** Components read CSS variables like `--primary`, `--muted` and `--ring`, so a theme is a block of variable values.",
          "**An ecosystem.** Because the registry format is open, many libraries publish compatible components that share the same variables and conventions.",
        ],
      },
      { type: "h2", text: "Trade-offs", id: "trade-offs" },
      {
        type: "p",
        text: "Owning the code means owning upgrades. When upstream fixes a bug, you re-add the component or apply the diff yourself, and local edits make that harder. Treat modified components as your own code, with your own tests, and keep changes in variants or wrapper components where you can so a fresh copy is easy to compare. shadcn/ui is also a starting point rather than a [design system](/glossary/design-system): it gives you well-built defaults, and product-specific patterns and rules are still yours to define.",
      },
      { type: "h2", text: "How MiniDev UI relates", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI is shadcn-compatible. Components install with the same CLI, build on Base UI like shadcn's Base UI styles, and map the kit's tokens onto shadcn's variable names, so existing shadcn components and MiniDev components share one theme. It adds larger pieces too, from a [Command palette](/docs/command-palette) and [Data table](/docs/data-table) to AI chat components and full pages. Tune your variables with the [shadcn theme generator](/tools/shadcn-theme-generator).",
      },
      { type: "component", name: "command-palette" },
    ],
    related: ["button", "dialog", "command-palette", "data-table"],
    see: ["shadcn-registry", "radix-ui", "base-ui", "component-library"],
  },

  // ─────────────────────────────────────────────────── Tailwind CSS v4
  {
    slug: "tailwind-css-v4",
    term: "Tailwind CSS v4",
    short:
      "Tailwind CSS v4 is the fourth major version of the utility-first CSS framework, with a faster engine and configuration written in CSS instead of JavaScript.",
    body: [
      {
        type: "p",
        text: "Tailwind CSS v4, released in early 2025, is a ground-up rewrite of the framework. The headline changes are a new high-performance engine, CSS-first configuration, automatic source detection and a design built on modern CSS: cascade layers, registered custom properties, `color-mix()` and container queries. Most utility class names carry over from v3, so reading v4 code feels familiar; the setup and customization model is what changed.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "p",
        text: "There is no `tailwind.config.js` by default. You import Tailwind in your CSS and define theme values with `@theme`. Each theme variable generates utilities and is also emitted as a normal CSS variable you can read anywhere. Build integration comes through `@tailwindcss/vite`, `@tailwindcss/postcss` or the CLI.",
      },
      {
        type: "code",
        lang: "css",
        filename: "app/globals.css",
        code: `@import "tailwindcss";

@theme {
  --color-accent: oklch(0.53 0.215 283);
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --radius-card: 12px;
}

@custom-variant dark (&:is(.dark *));

@utility bg-grid {
  background-image: linear-gradient(to right, oklch(0.2 0.02 264 / 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
}`,
      },
      {
        type: "p",
        text: "That file gives you `bg-accent`, `text-accent`, `font-sans` and `rounded-card`, a class-based `dark:` variant, and a custom `bg-grid` utility. The main directives:",
      },
      {
        type: "list",
        items: [
          "`@theme` defines [design tokens](/glossary/design-tokens) in namespaces (`--color-*`, `--font-*`, `--spacing`, `--radius-*`, `--shadow-*`) that generate utilities. `@theme inline` makes utilities use a referenced variable directly, which is how you map existing CSS variables into Tailwind.",
          "`@source` adds paths that automatic detection skips, such as a component package in `node_modules`.",
          "`@custom-variant` and `@utility` replace plugin code for most custom variants and utilities.",
          "`@plugin` and `@config` still load JavaScript plugins and legacy config files when you need them.",
        ],
      },
      { type: "h2", text: "Migrating from v3", id: "migrating" },
      {
        type: "p",
        text: "The official `npx @tailwindcss/upgrade` tool handles most of a v3 project. Check a few things by hand: several scales shifted by one step (for example `shadow-sm` became `shadow-xs` and `rounded-sm` became `rounded-xs`), the default border color is now `currentColor`, and `dark:` follows `prefers-color-scheme` unless you redefine it. v4 targets modern browsers (Safari 16.4, Chrome 111 and Firefox 128 or newer), so projects that must support older browsers should stay on v3.4.",
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI is written for Tailwind CSS v4 only. Its stylesheet defines tokens as [CSS variables](/glossary/css-variables) in [OKLCH](/glossary/oklch), maps them with `@theme inline`, adds signature utilities like `bg-grid` and `bg-dots` with `@utility`, and sets the class-based dark variant. Registry components need nothing else. If you use the npm package instead, import `minidev-ui-kit/styles.css` after Tailwind and add an `@source` line for the package. See [OKLCH colors in Tailwind CSS v4](/guides/oklch-colors-tailwind-v4) for the color side.",
      },
      { type: "component", name: "button" },
    ],
    related: ["light-provider", "button", "theme-picker"],
    see: ["css-variables", "oklch", "design-tokens", "shadcn-ui"],
  },

  // ─────────────────────────────────────────────────── WCAG contrast
  {
    slug: "wcag-contrast",
    term: "WCAG color contrast",
    short:
      "WCAG color contrast is the minimum luminance ratio between text or UI and its background: 4.5:1 for body text, 3:1 for large text and UI parts at AA.",
    body: [
      {
        type: "p",
        text: "The Web Content Accessibility Guidelines define contrast as a ratio between the relative luminance of two colors, from 1:1 (identical) to 21:1 (black on white). Enough contrast keeps text readable for people with low vision or color vision deficiencies, on dim screens and in sunlight. Most accessibility laws and procurement standards reference WCAG level AA, so its numbers are the practical baseline for any product.",
      },
      { type: "h2", text: "The thresholds", id: "thresholds" },
      {
        type: "table",
        head: ["Content", "AA", "AAA"],
        rows: [
          ["Normal text", "4.5:1", "7:1"],
          ["Large text (at least 24px, or about 18.66px bold)", "3:1", "4.5:1"],
          ["UI components and meaningful graphics", "3:1", "No additional requirement"],
        ],
      },
      {
        type: "p",
        text: "Text contrast is success criterion 1.4.3 (AA) and 1.4.6 (AAA). Non-text contrast, 1.4.11, covers the visual boundaries that identify inputs and buttons, focus indicators, icons that convey meaning, and chart elements needed to understand the data. Disabled controls, pure decoration and logos are exempt.",
      },
      { type: "h2", text: "How it is calculated", id: "calculation" },
      {
        type: "p",
        text: "Each color is converted to relative luminance, a weighted sum of linearized sRGB channels in which green counts most and blue least. The ratio is `(L1 + 0.05) / (L2 + 0.05)`, with the lighter color as L1. You rarely compute it by hand; use the [contrast checker](/tools/contrast-checker) or browser devtools, which show the ratio in their color pickers.",
      },
      {
        type: "code",
        lang: "ts",
        code: `type RGB = [number, number, number]

function luminance([r, g, b]: RGB) {
  const lin = (c: number) => {
    const s = c / 255
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

export function contrastRatio(a: RGB, b: RGB) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}`,
      },
      { type: "h2", text: "Common pitfalls", id: "common-pitfalls" },
      {
        type: "list",
        items: [
          "Light gray placeholder text. If it carries information, it needs the same 4.5:1 as body text.",
          "Faint input borders. A border that is the only thing identifying a field needs 3:1 against the adjacent background.",
          "Text over images, gradients or [glass](/glossary/glassmorphism). Check the worst spot behind the text, not the average.",
          "Checking only the light theme. [Dark mode](/glossary/dark-mode) needs its own pass.",
          "Using color alone to signal state, which fails 1.4.1 Use of Color regardless of contrast.",
        ],
      },
      {
        type: "p",
        text: "Drafts of WCAG 3 explore a different contrast model, APCA, that accounts for font size, weight and polarity. It is not a standard yet; conformance today is measured with the WCAG 2 ratio.",
      },
      { type: "h2", text: "How MiniDev UI handles it", id: "minidev-ui" },
      {
        type: "p",
        text: "The kit sets contrast targets in its tokens: `fg-muted` is tuned for at least 7:1 and `fg-subtle` for at least 4.5:1, in both themes. Focus rings use a 2px accent outline, and status colors are tuned in [OKLCH](/glossary/oklch) for equal weight. [Status badge](/docs/status-badge) pairs color with a dot and a text label, so state never depends on hue alone.",
      },
      { type: "component", name: "status-badge" },
    ],
    related: ["status-badge", "button", "input", "badge"],
    see: ["oklch", "semantic-tokens", "focus-visible", "aria"],
  },

  // ──────────────────────────────────────────────────── :focus-visible
  {
    slug: "focus-visible",
    term: ":focus-visible",
    short:
      ":focus-visible is a CSS pseudo-class that matches a focused element only when the browser decides focus should be shown, typically during keyboard use.",
    body: [
      {
        type: "p",
        text: "Keyboard users need to see which element has focus; mouse users clicking a button usually do not want a ring flashing around it. `:focus` cannot tell the two apart, which led many sites to remove outlines entirely and break keyboard navigation. `:focus-visible` solves this. It matches when an element has focus and the browser's heuristics say an indicator is useful: after keyboard navigation, on text inputs however they were focused, and when script moves focus away from an element that was already showing it. It is supported in all current major browsers.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "code",
        lang: "css",
        code: `.button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* hide the ring only for pointer focus */
.button:focus:not(:focus-visible) {
  outline: none;
}`,
      },
      {
        type: "p",
        text: "In Tailwind CSS, `focus-visible:` prefixes any utility: `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`. The related `:focus-within` matches a parent when any descendant has focus, which is useful for styling a wrapper around an input.",
      },
      {
        type: "list",
        items: [
          "Text inputs match `:focus-visible` on mouse click too, because users need to see where typing will go.",
          "Browser default focus styles already use `:focus-visible`, so do not remove outlines on `:focus` unless you replace them.",
          "Prefer `outline` for rings where you can. Outlines survive forced colors mode (Windows high contrast); box shadows do not. If your ring is a shadow, add a transparent outline so something still draws.",
          "Keep the ring clear of `overflow: hidden` parents, which clip outlines and offset rings.",
        ],
      },
      { type: "h2", text: "Accessibility requirements", id: "wcag" },
      {
        type: "p",
        text: "WCAG 2.4.7 Focus Visible (level AA) requires a visible indicator for keyboard focus. WCAG 2.2 added 2.4.11 Focus Not Obscured (Minimum, AA), which fails when a sticky header or cookie banner completely hides the focused element, and 2.4.13 Focus Appearance (AAA), which sets size and contrast targets for the indicator. As a working rule, make rings at least 2px thick and at least 3:1 against the colors next to them, in line with non-text [contrast](/glossary/wcag-contrast).",
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "Focus is a designed state in every component. [Buttons](/docs/button) get a 2px accent ring with a 2px offset, drawn with `focus-visible:` utilities; [inputs](/docs/input) get the accent border plus a 3px `accent-soft` halo. The global stylesheet sets `outline-offset: 2px` on `:focus-visible` so browser defaults stay legible too. Add [SkipLink](/docs/skip-link) as the first focusable element so keyboard users can jump past navigation, and see [ARIA](/glossary/aria) for the semantics that go with visible focus.",
      },
      { type: "component", name: "button" },
    ],
    related: ["button", "input", "skip-link", "tabs"],
    see: ["aria", "wcag-contrast", "prefers-reduced-motion"],
  },
]
