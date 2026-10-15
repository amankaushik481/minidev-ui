import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-product-tour",
  title: "Product tour and feature spotlight in React",
  description:
    "Build a product tour in React: a spotlight cutout over real UI, a popover anchored to each target, step state, keyboard support and a seen flag.",
  date: "2026-10-14",
  keywords: [
    "react product tour",
    "feature spotlight react",
    "onboarding tour component react",
    "react guided tour without library",
    "react tooltip walkthrough",
  ],
  related: ["product-tour", "popover", "keyboard-shortcuts", "kbd", "cursor-spotlight-panel", "button"],
  body: [
    {
      type: "p",
      text: "A product tour in React is a list of steps, each pointing at a real element, plus three pieces of UI: a dimmed overlay with a cutout around the target, a popover anchored to it with the explanation and Next, and a seen flag so it only runs once. None of that needs a tour library; the anchored popover is the hard part and the kit's [Popover](/docs/popover) (built on Base UI) already positions, flips and dismisses.",
    },
    {
      type: "p",
      text: "This guide builds that in-app tour from `Popover` and [Button](/docs/button), reuses it as a one step feature spotlight, and shows where the kit's [ProductTour](/docs/product-tour) panel fits, which is a different thing: a step list beside a stage for onboarding and marketing pages, not an overlay. It ends with [KeyboardShortcuts](/docs/keyboard-shortcuts) and [Kbd](/docs/kbd) for the tour's last step, where you hand people the shortcuts.",
    },

    { type: "h2", text: "Two kinds of tour", id: "two-kinds" },
    {
      type: "table",
      head: ["", "In-app walkthrough", "Tour panel"],
      rows: [
        ["Where", "Over the real product, after first sign in", "On a landing page, docs home or the empty dashboard"],
        ["Points at", "Live elements, found by selector", "Nothing; each step is text beside a stage"],
        ["Built from", "`Popover`, an overlay div, your state", "`ProductTour` as shipped"],
        ["Risk", "Breaks when the UI changes; must handle missing targets", "None, it is static"],
      ],
    },
    {
      type: "p",
      text: "Most products want the panel for the empty state and the walkthrough for two or three genuinely non obvious features. Resist touring the whole app: five steps is a lot, and people skip tours that explain buttons with labels.",
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add @minidev/popover\nnpx shadcn@latest add @minidev/button\nnpx shadcn@latest add @minidev/product-tour\nnpx shadcn@latest add @minidev/keyboard-shortcuts",
    },
    {
      type: "p",
      text: "`ProductTour` is one of the kit's Motion components and animates its stage with `motion/react`; `KeyboardShortcuts` pulls in `dialog`, `input` and `kbd`. Import the token stylesheet once ([styles.css](https://ui.minidev.pro/r/styles.css)) so the overlay scrim, `bg-raised` and the accent ring resolve.",
    },

    { type: "h2", text: "The panel: ProductTour as shipped", id: "product-tour" },
    {
      type: "p",
      text: "`ProductTour` takes `steps` as `{ title, body }` objects and renders them as a column of buttons beside a stage that fades to the selected step, with Back and Next underneath. The active index is internal state; there is no controlled `active` prop and no `onChange`, so it is a self contained explainer rather than something you wire to the rest of the page.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<ProductTour
  steps={[
    { title: "Connect your bank", body: "Link accounts once. Transactions sync hourly and match to invoices." },
    { title: "Send your first invoice", body: "Pick a customer, add line items, and Lumen handles numbering and reminders." },
    { title: "Invite the team", body: "Roles for approvals and payouts, so nothing waits on one person." },
  ]}
/>`,
    },
    {
      type: "p",
      text: "The stage shows the step's title and body as text. To show a screenshot or a live component per step, add an optional `visual?: React.ReactNode` to `TourStep` in your copy and render it in the stage above the heading; it is a five line change because the file is yours. Each step button carries `aria-current=\"step\"` when selected, which is the right semantics for a list of steps.",
    },
    { type: "component", name: "product-tour" },

    { type: "h2", text: "The walkthrough: steps that point at real elements", id: "walkthrough" },
    {
      type: "p",
      text: "Describe each step by a CSS selector, a title, a body and a preferred side. Use `data-tour` attributes as the selectors rather than class names, so a restyle cannot break the tour:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/tour-steps.ts",
      code: `export type WalkStep = {
  target: string
  title: string
  body: string
  side?: "top" | "bottom" | "left" | "right"
}

export const DASHBOARD_TOUR: WalkStep[] = [
  { target: "[data-tour='new-invoice']", title: "Create an invoice", body: "Start here. Drafts save as you type.", side: "bottom" },
  { target: "[data-tour='filters']", title: "Filter by status", body: "Overdue, paid and drafts are one click away.", side: "bottom" },
  { target: "[data-tour='command']", title: "Jump anywhere", body: "Press the shortcut shown here to open the command palette.", side: "left" },
]`,
    },
    {
      type: "p",
      text: "The tour component below measures the target, draws the cutout, anchors the popover and owns the step index. The one thing it needs from the kit's `PopoverContent` that is not exposed by default is the `anchor` prop, covered in the next section.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/walkthrough.tsx",
      code: `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle } from "@/components/ui/popover"
import type { WalkStep } from "@/app/tour-steps"

const PAD = 6

export function Walkthrough({ steps, open, onClose }: { steps: WalkStep[]; open: boolean; onClose: () => void }) {
  const [i, setI] = React.useState(0)
  const [el, setEl] = React.useState<HTMLElement | null>(null)
  const [rect, setRect] = React.useState<DOMRect | null>(null)
  const step = steps[i]
  const last = i === steps.length - 1

  React.useEffect(() => { if (open) setI(0) }, [open])

  // Find and measure the target. Re-measure on scroll and resize so the cutout follows it.
  React.useEffect(() => {
    if (!open || !step) return
    const target = document.querySelector<HTMLElement>(step.target)
    setEl(target)
    setRect(null)
    if (!target) return
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    target.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" })
    const measure = () => setRect(target.getBoundingClientRect())
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(target)
    window.addEventListener("scroll", measure, true)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", measure, true)
      window.removeEventListener("resize", measure)
    }
  }, [open, step])

  // Skip steps whose target is not on the page.
  React.useEffect(() => {
    if (!open || !step) return
    if (!document.querySelector(step.target)) {
      if (last) onClose()
      else setI((n) => n + 1)
    }
  }, [open, step, last, onClose])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((n) => Math.min(steps.length - 1, n + 1))
      if (e.key === "ArrowLeft") setI((n) => Math.max(0, n - 1))
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, steps.length])

  if (!open || !step || !el || !rect) return null

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed z-40 rounded-xl outline-2 outline-accent transition-[top,left,width,height] duration-200 ease-hairline motion-reduce:transition-none"
        style={{
          top: rect.top - PAD,
          left: rect.left - PAD,
          width: rect.width + PAD * 2,
          height: rect.height + PAD * 2,
          boxShadow: "0 0 0 100vmax var(--overlay-scrim)",
        }}
      />
      <Popover open onOpenChange={(o) => { if (!o) onClose() }}>
        <PopoverContent anchor={el} side={step.side ?? "bottom"} sideOffset={PAD + 8} className="w-80">
          <PopoverHeader>
            <PopoverTitle>{step.title}</PopoverTitle>
            <PopoverDescription>{step.body}</PopoverDescription>
          </PopoverHeader>
          <div className="flex items-center justify-between gap-2">
            <span role="status" className="text-xs text-fg-muted tabular-nums">Step {i + 1} of {steps.length}</span>
            <div className="flex gap-1.5">
              {!last ? <Button variant="ghost" size="sm" onClick={onClose}>Skip</Button> : null}
              <Button variant="outline" size="sm" disabled={i === 0} onClick={() => setI(i - 1)}>Back</Button>
              <Button size="sm" onClick={() => (last ? onClose() : setI(i + 1))}>{last ? "Done" : "Next"}</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}`,
    },
    {
      type: "list",
      items: [
        "The cutout is one fixed `div` placed over the target with a huge `box-shadow` in the scrim colour. The shadow covers the whole viewport except the element's box, which is the cheapest way to dim everything but one thing, and it needs no SVG mask.",
        "`pointer-events-none` on that div keeps the target clickable, so a step can say \"try it\" and the user can. If you want the page locked during the tour, remove that class and add `role=\"presentation\"`.",
        "Steps whose selector finds nothing are skipped instead of showing a popover anchored to nowhere. This is the failure mode that makes tours look broken after a redesign.",
        "Arrow keys are handled at the document level so they work wherever focus is. Escape, outside clicks and focus return are Base UI's job through `onOpenChange`.",
      ],
    },

    { type: "h2", text: "Anchoring the popover to an element", id: "anchor" },
    {
      type: "p",
      text: "Base UI's `Popover.Positioner` accepts an `anchor` prop (an element, a ref, or a function returning one), which lets a popover float next to anything, not only its trigger. The kit's `PopoverContent` passes `align`, `alignOffset`, `side` and `sideOffset` through to the positioner; add `anchor` to that list in your copy:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/popover.tsx",
      code: `function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  anchor,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "anchor">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} anchor={anchor} className="isolate z-50">`,
    },
    {
      type: "p",
      text: "With `open` controlled and no `PopoverTrigger` rendered, the popover has no trigger to return focus to, so Base UI returns it to wherever it was. The tour moves focus into the popover on each step (the Next button is the first focusable element), which means Tab from the page lands on the tour controls and Escape takes you back where you were.",
    },

    { type: "h2", text: "Starting it once, and only when it makes sense", id: "seen" },
    {
      type: "p",
      text: "Store a seen flag per tour and per version, so a changed tour can run again. Server side storage is best because it follows the user across devices; `localStorage` is the fallback and is fine for a first version:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const KEY = "tour:dashboard:v2"

export function DashboardTour() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return
    } catch {}
    if (matchMedia("(pointer: coarse)").matches) return // the layout differs on phones
    const t = setTimeout(() => setOpen(true), 800)
    return () => clearTimeout(t)
  }, [])
  const close = () => {
    setOpen(false)
    try { localStorage.setItem(KEY, "1") } catch {}
  }
  return <Walkthrough steps={DASHBOARD_TOUR} open={open} onClose={close} />
}`,
    },
    {
      type: "list",
      items: [
        "The short delay lets the page settle so the first target has its final position before it is measured.",
        "Skip counts as seen. A tour that returns every session because someone pressed Skip is the fastest way to teach people to hate it.",
        "Keep a \"Take the tour\" entry in a help menu that calls `setOpen(true)`, so the tour is still reachable after the flag is set.",
      ],
    },

    { type: "h2", text: "A one step feature spotlight", id: "feature-spotlight" },
    {
      type: "p",
      text: "Announcing one new feature is the same machinery with one step: the cutout draws attention, the popover says what changed, and the only button is \"Got it\". Pass a single step and the component already renders Done instead of Next and hides Skip. Key the seen flag by the feature (`spotlight:bulk-export`) and remove the code after a release or two; permanent spotlights become noise.",
    },
    {
      type: "callout",
      tone: "note",
      text: "The kit's [CursorSpotlightPanel](/docs/cursor-spotlight-panel) is a different kind of spotlight: a marketing panel where a soft radial light follows the cursor across the surface. It takes `title`, `body` and `className`, has no steps or targets, and sits well on a features page. It is not part of the tour machinery.",
    },

    { type: "h2", text: "The last step: hand over the shortcuts", id: "shortcuts" },
    {
      type: "p",
      text: "A good final step teaches the keyboard. `KeyboardShortcuts` renders a searchable cheat sheet in a dialog, opens on `?` anywhere outside a text field, and shows the right modifier glyphs for the viewer's platform (it reads the platform after mount so server and client markup match). Control it from the tour's Done button:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const [sheet, setSheet] = React.useState(false)

<Walkthrough steps={DASHBOARD_TOUR} open={open} onClose={() => { close(); setSheet(true) }} />
<KeyboardShortcuts
  open={sheet}
  onOpenChange={setSheet}
  showTrigger={false}
  groups={[
    { title: "Navigation", shortcuts: [{ keys: ["mod", "K"], label: "Command palette" }, { keys: ["G", "I"], label: "Go to invoices" }] },
    { title: "Invoices", shortcuts: [{ keys: ["N"], label: "New invoice" }, { keys: ["mod", "enter"], label: "Send" }] },
  ]}
/>`,
    },
    {
      type: "p",
      text: "Write keys once with portable names (`mod`, `shift`, `alt`, `enter`, `esc`) and they render as ⌘ ⇧ ⌥ ↵ on a Mac and Ctrl, Shift, Alt, Enter elsewhere. Inside tour copy, show a single key with `Kbd`: \"Press <Kbd>?</Kbd> any time to see these again.\" The [command palette guide](/guides/react-command-palette) covers the shortcut the first group points at.",
    },

    { type: "h2", text: "Accessibility", id: "accessibility" },
    {
      type: "list",
      items: [
        "The step counter is a `role=\"status\"` element inside the popover, so each step change is announced as \"Step 2 of 3\" along with the new title.",
        "The popover carries `PopoverTitle` and `PopoverDescription`, which Base UI wires to `aria-labelledby` and `aria-describedby` on the dialog surface. See [ARIA](/glossary/aria).",
        "The cutout div is `aria-hidden`; it is purely visual. Screen reader users get the same content through the popover and are not trapped behind a scrim.",
        "Both `scrollIntoView` and the cutout transition respect [prefers-reduced-motion](/glossary/prefers-reduced-motion).",
        "Do not auto start a tour while a dialog is open or a form is half filled. Check for `document.querySelector(\"[role=dialog]\")` before opening.",
      ],
    },

    { type: "h2", text: "Pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**Selectors that match nothing after a refactor.** Use `data-tour` attributes, skip missing targets, and add a test that asserts every selector in the step list exists on the dashboard page.",
        "**Measuring before layout settles.** Fonts, images and data all move things. Delay the start and re-measure on scroll and resize, as the component does.",
        "**Targets inside a scroll container.** The scroll listener uses capture (`true`) so nested scrollers trigger a re-measure too. `scrollIntoView` handles nested containers on its own.",
        "**A tour on a phone.** Popovers next to a bottom bar flip, cutouts cover half the screen. Skip the tour on coarse pointers or write a separate, shorter one.",
        "**Toured elements that are rendered later by Suspense.** If the target streams in, start the tour from the component that renders it, not from the layout.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "`Popover`, `Button`, `KeyboardShortcuts` and `Kbd` are free and MIT licensed; `ProductTour` and `CursorSpotlightPanel` are in the [animation category](/components/animation). The tour usually runs over the layout from the [sidebar layout guide](/guides/shadcn-sidebar-layout) and points at the first [empty state](/glossary/empty-state) of the product. If you want the whole onboarding experience built, the [MiniDev studio](https://minidev.pro) builds products on this kit.",
    },
    { type: "component", name: "popover" },
    { type: "component", name: "keyboard-shortcuts" },
    { type: "component", name: "cursor-spotlight-panel" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Do I need a library like Shepherd or Intro.js for a product tour?",
      a: "Not if you already have a popover that can anchor to an element. A tour is a step index, a measured target rectangle, a dimming overlay with a cutout and a seen flag, which is about a hundred lines on top of the kit's Popover. Libraries help when you need many tours managed by non developers.",
    },
    {
      q: "How do I highlight one element and dim the rest of the page?",
      a: "Place a fixed, pointer transparent div over the element's bounding rectangle and give it a very large box-shadow in the scrim colour (`0 0 0 100vmax var(--overlay-scrim)`). The shadow covers everything except the box, so the element stays visible and clickable.",
    },
    {
      q: "Should a product tour start automatically?",
      a: "Once, after the first meaningful page has rendered, and never again after Skip or Done. Keep it to a few steps, key the seen flag by tour version so an updated tour can run again, and leave a way to replay it from the help menu.",
    },
  ],
}

export default guide
