import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-resizable-panels",
  title: "Resizable split panes in React, keyboard accessible",
  description:
    "Build resizable split panes in React with Tailwind: drag and keyboard operable handles, min and max sizes, collapsible sidebars, nesting and persisted sizes.",
  date: "2026-10-14",
  keywords: [
    "react resizable panels",
    "react split pane",
    "resizable sidebar react",
    "react resizable layout keyboard accessible",
    "split view react tailwind",
  ],
  related: ["resizable-panels", "file-tree", "code-block", "split-pane"],
  body: [
    {
      type: "p",
      text: "Resizable split panes in React come down to a flex container, a list of sizes in percent, and a handle between each pair of panels that moves one boundary with the pointer or the arrow keys. The handle is a `role=\"separator\"` with `aria-valuenow`, which is what makes the layout keyboard accessible, and that part is easy to forget when the drag works.",
    },
    {
      type: "p",
      text: "This guide uses the free MiniDev UI [ResizablePanels](/docs/resizable-panels), which does all of the above in one file with no dependency, and builds an editor layout around it with [FileTree](/docs/file-tree) and [CodeBlock](/docs/code-block): a collapsible explorer, a code pane and a terminal in a nested vertical group, sizes persisted between visits. It also covers where the simpler [SplitPane](/docs/split-pane) is the better choice.",
    },

    { type: "h2", text: "Split pane or resizable panels", id: "which" },
    {
      type: "p",
      text: "`SplitPane` is a static two column grid: `left` and `right` slots, a hairline between them, and it stacks on small screens. There is no handle, which is right for side by side content that the user never needs to rebalance, like a code sample next to its preview in docs. `ResizablePanels` is for workspaces where the balance is a preference: editors, inspectors, mail clients, anything with a sidebar someone wants narrower.",
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add @minidev/resizable-panels\nnpx shadcn@latest add @minidev/file-tree\nnpx shadcn@latest add @minidev/code-block",
    },
    {
      type: "p",
      text: "`ResizablePanels` has no dependencies beyond `lucide-react` for its demo icons. `FileTree` animates folders with `motion/react`. Import the token stylesheet once ([styles.css](https://ui.minidev.pro/r/styles.css)) so `bg-sunken`, `border-border` and the accent handle colour resolve.",
    },

    { type: "h2", text: "Two panes in one line", id: "shorthand" },
    {
      type: "p",
      text: "For the common case there is a shorthand: pass `left`, `right` and an `initial` percentage, and the component renders two padded, scrollable panels with a handle between them, the first clamped between 20 and 80 percent.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<ResizablePanels left={<Inbox />} right={<Message />} initial={35} className="h-[36rem] rounded-xl border border-border" />`,
    },
    {
      type: "p",
      text: "The group is `h-full w-full`, so give it a height, or put it in a parent that has one. A split layout with `height: auto` collapses to the taller pane and the handle has nothing to resize vertically.",
    },

    { type: "h2", text: "Panels and handles: the full API", id: "api" },
    {
      type: "p",
      text: "For anything beyond two panes, compose `ResizablePanel` and `ResizableHandle` as direct children of `ResizablePanels`. The group reads each panel's props to build its constraints, so the children must be those two components, not fragments or wrappers around them.",
    },
    {
      type: "table",
      head: ["Prop", "On", "What it does"],
      rows: [
        ["`orientation`", "`ResizablePanels`", "`\"horizontal\"` (columns, default) or `\"vertical\"` (rows)"],
        ["`defaultSizes` / `sizes` / `onSizesChange`", "`ResizablePanels`", "Uncontrolled start sizes, controlled sizes, and the callback fired on every drag, key press or snap, all in percent"],
        ["`keyboardStep`", "`ResizablePanels`", "Percent per arrow key, default 2; Shift multiplies by five"],
        ["`defaultSize`", "`ResizablePanel`", "Start size in percent; panels without one share what is left"],
        ["`minSize` / `maxSize`", "`ResizablePanel`", "Clamp in percent, defaults 10 and 100"],
        ["`collapsible` / `collapsedSize` / `onCollapse`", "`ResizablePanel`", "Snap to `collapsedSize` when dragged well below `minSize`; the callback fires on each change"],
        ["`aria-label`", "`ResizableHandle`", "Name of the separator, default \"Resize columns\" or \"Resize rows\""],
        ["`withGrip`", "`ResizableHandle`", "Show the grip pill at rest instead of only on hover and focus"],
      ],
    },
    {
      type: "p",
      text: "Sizes always sum to 100 within a group. Explicit `defaultSize` values are scaled only if they overflow, and the remainder is split evenly among panels without one, so `defaultSize={24}` on the sidebar with nothing on the main pane gives 24 and 76.",
    },

    { type: "h2", text: "An editor layout", id: "editor" },
    {
      type: "p",
      text: "Three panes: the explorer, a vertical group with the code and a terminal, and nothing else. `FileTree` reports the selected path through `onSelect`, which also fires for folders, so the handler checks the path is a file it knows before switching the editor.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/editor/editor.tsx",
      code: `"use client"
import * as React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { FileTree, type FileTreeNode } from "@/components/ui/file-tree"
import { ResizableHandle, ResizablePanel, ResizablePanels } from "@/components/ui/resizable-panels"

const FILES: FileTreeNode[] = [
  { name: "app", children: [{ name: "page.tsx" }, { name: "layout.tsx" }, { name: "globals.css", status: "M" }] },
  { name: "components", children: [{ name: "invoice-card.tsx", status: "A" }] },
  { name: "package.json" },
]

const SOURCE: Record<string, string> = {
  "app/page.tsx": ["import { InvoiceCard } from \\"@/components/invoice-card\\"", "", "export default function Page() {", "  return <InvoiceCard id=\\"LUM-0147\\" />", "}"].join("\\n"),
  "app/layout.tsx": ["export default function Layout({ children }) {", "  return <body>{children}</body>", "}"].join("\\n"),
  "components/invoice-card.tsx": ["export function InvoiceCard({ id }: { id: string }) {", "  return <article>{id}</article>", "}"].join("\\n"),
}

export function Editor() {
  const [file, setFile] = React.useState("app/page.tsx")
  const [explorerHidden, setExplorerHidden] = React.useState(false)

  return (
    <ResizablePanels className="h-[32rem] rounded-xl border border-border bg-surface shadow-raised">
      <ResizablePanel defaultSize={24} minSize={16} maxSize={40} collapsible collapsedSize={0} onCollapse={setExplorerHidden}>
        <FileTree
          data={FILES}
          title="lumen-web"
          defaultExpanded={["app", "components"]}
          selected={file}
          onSelect={(path) => { if (path in SOURCE) setFile(path) }}
          className="h-full max-w-none rounded-none border-0 shadow-none"
        />
      </ResizablePanel>
      <ResizableHandle aria-label="Resize file explorer" withGrip={explorerHidden} />
      <ResizablePanel minSize={30}>
        <ResizablePanels orientation="vertical">
          <ResizablePanel defaultSize={70} minSize={30} className="overflow-auto p-3">
            <CodeBlock code={SOURCE[file]} filename={file} language="tsx" showLineNumbers className="shadow-none" />
          </ResizablePanel>
          <ResizableHandle aria-label="Resize terminal" />
          <ResizablePanel defaultSize={30} minSize={15} collapsible collapsedSize={0} className="overflow-auto bg-sunken p-3 font-mono text-xs text-fg-muted">
            <p><span className="text-accent-fg">$</span> pnpm dev</p>
            <p className="text-success">ready on http://localhost:3000</p>
          </ResizablePanel>
        </ResizablePanels>
      </ResizablePanel>
    </ResizablePanels>
  )
}`,
    },
    {
      type: "list",
      items: [
        "A `ResizablePanel` is `overflow-hidden` with `min-w-0`, so its content never widens the group. Scrolling is opt in: put `overflow-auto` on the panel or on a child, as the code and terminal panes do.",
        "The nested group fills its panel because `ResizablePanels` is `h-full w-full`. Nesting works in either direction and to any depth; each group keeps its own sizes.",
        "`FileTree` ships as a card (`max-w-72`, rounded, bordered). Inside a pane, flatten it with `className` as above and give it `h-full`.",
        "`withGrip={explorerHidden}` shows the handle's grip pill permanently once the explorer is collapsed, so there is a visible affordance to bring it back. Enter on the focused handle also reopens it.",
      ],
    },
    { type: "component", name: "resizable-panels" },

    { type: "h2", text: "Collapsing with a snap", id: "collapse" },
    {
      type: "p",
      text: "A `collapsible` panel behaves normally until it is dragged below the midpoint between `collapsedSize` and `minSize`, then it snaps to `collapsedSize`. Dragging back past that point expands it to `minSize`. With `collapsedSize={0}` the panel disappears entirely but keeps its place in the group; a `collapsedSize` of 4 leaves a sliver with, for example, an icon rail.",
    },
    {
      type: "p",
      text: "`onCollapse` fires with `true` or `false` only when the state changes, which is the right hook for persisting a \"sidebar hidden\" preference or swapping the explorer for a toolbar button. The separator's `aria-valuemin` reports `collapsedSize` for collapsible panels, so screen readers hear the real range.",
    },

    { type: "h2", text: "Persist the sizes", id: "persist" },
    {
      type: "p",
      text: "Nothing is persisted by the component. Control `sizes` and write them wherever you keep preferences. Reading `localStorage` must wait for mount, so the first render uses the defaults and the saved sizes apply right after; sizes that do not match the panel count are ignored, which protects you when a panel is added later.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const KEY = "editor:sizes"
const [sizes, setSizes] = React.useState<number[] | undefined>()

React.useEffect(() => {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved) setSizes(JSON.parse(saved))
  } catch {}
}, [])

<ResizablePanels
  sizes={sizes}
  onSizesChange={(next) => {
    setSizes(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
  }}
>`,
    },
    {
      type: "p",
      text: "While `sizes` is `undefined` the group is uncontrolled and uses `defaultSizes` or each panel's `defaultSize`; once set, it is controlled. In a Next.js app you can avoid the first paint jump by reading the sizes from a cookie on the server and passing them as `defaultSizes`, which is the same approach the [sidebar layout guide](/guides/shadcn-sidebar-layout) uses for the collapsed state.",
    },

    { type: "h2", text: "Keyboard support and the separator role", id: "keyboard" },
    {
      type: "p",
      text: "Each handle is focusable and announces itself as a separator with its current size, minimum and maximum. The keys map to the group's orientation:",
    },
    {
      type: "table",
      head: ["Key", "Horizontal group", "Vertical group"],
      rows: [
        ["Left and Right arrows", "Move the boundary by `keyboardStep` percent", "Ignored"],
        ["Up and Down arrows", "Ignored", "Move the boundary by `keyboardStep` percent"],
        ["Shift plus arrow", "Five steps", "Five steps"],
        ["Home and End", "Slam to the minimum or maximum", "Same"],
        ["Enter", "Collapse or expand the panel before the handle, if it is collapsible", "Same"],
        ["Double click", "Reset the pair to its default split", "Same"],
      ],
    },
    {
      type: "list",
      items: [
        "Give every handle an `aria-label` that says what it resizes (\"Resize file explorer\"), not just \"Resize columns\". A layout with three separators is otherwise three identical names.",
        "The handle sets `aria-controls` to the panel before it, and `aria-valuenow` updates live, so a screen reader user hears \"24 percent\" change as they press the keys.",
        "The hairline swells and turns accent on focus through [focus-visible](/glossary/focus-visible) styles, so mouse users see no ring and keyboard users see where they are.",
        "The hit area is 8 pixels wide with `touch-none`, which is enough for a mouse and tolerable on a tablet. On touch screens, consider `withGrip` so the handle is discoverable.",
      ],
    },

    { type: "h2", text: "Stacking on small screens", id: "responsive" },
    {
      type: "p",
      text: "The zero prop demo switches to rows below 560 pixels, but your own layouts have to decide. Flip `orientation` on a media query with `useSyncExternalStore`, which renders the server default and swaps after hydration without a mismatch:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `function useNarrow(px: number) {
  const q = "(max-width: " + (px - 1) + "px)"
  return React.useSyncExternalStore(
    (cb) => { const m = matchMedia(q); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb) },
    () => matchMedia(q).matches,
    () => false
  )
}

const narrow = useNarrow(640)
<ResizablePanels orientation={narrow ? "vertical" : "horizontal"}>`,
    },
    {
      type: "p",
      text: "Sizes carry over when the orientation changes, so a 24 percent sidebar becomes a 24 percent top row. If that is too short, pass different `defaultSizes` per orientation and key the group on it so it remounts.",
    },

    { type: "h2", text: "Pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**Percent limits on narrow groups.** `minSize={16}` is 64 pixels in a 400 pixel group. For a pixel floor, add a `min-w-48` class to the panel: flex honours it, at the cost of the reported percentages drifting from what is drawn while the floor is active.",
        "**Wrapping panels in your own components.** The group inspects its direct children for `ResizablePanel` elements. A `<Sidebar />` that renders a `ResizablePanel` inside is not seen; render the panel at the top level and put your component inside it.",
        "**Conditional panels.** Adding or removing a panel changes the group's signature and recomputes the defaults, which discards the current sizes. Keep the panel and collapse it instead, or key the group so the reset is intentional.",
        "**Forgetting the height.** `h-full` needs a parent with a height. Use a fixed `h-[32rem]`, `h-dvh` minus the header, or a flex column parent with `min-h-0` on the group.",
        "**Dragging text selection.** The group adds `select-none` while a drag is active, so text in the panes does not highlight. If you add your own pointer handlers inside a pane, call `e.stopPropagation()` only when you must; the handle uses pointer capture and does not depend on bubbling.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All three are free and MIT licensed, with the rest of the editor and console pieces (terminal window, diff view, console output, JSON viewer) in the [developer tools category](/components/developer-tools). The explorer and code panes pair naturally with the [command palette guide](/guides/react-command-palette) for file switching by keyboard. If you want a whole IDE style product built, the [MiniDev studio](https://minidev.pro) builds on this kit.",
    },
    { type: "component", name: "file-tree" },
    { type: "component", name: "code-block" },
    { type: "component", name: "split-pane" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "How do I make a resizable panel keyboard accessible?",
      a: "Make the handle a focusable element with `role=\"separator\"`, `aria-orientation`, `aria-valuenow`, `aria-valuemin` and `aria-valuemax`, and move the boundary on the arrow keys with Home and End for the extremes. The kit's ResizableHandle does this and adds Enter to collapse and a double click to reset.",
    },
    {
      q: "Should panel sizes be in pixels or percent?",
      a: "Percent keeps the layout proportional when the window resizes and makes persisted sizes portable between screens. Use a CSS `min-width` on a panel when a pane needs a pixel floor, such as a tree that becomes useless under 200 pixels.",
    },
    {
      q: "How do I save the panel sizes between visits?",
      a: "Control the group with `sizes` and `onSizesChange`, and write the array to localStorage or the user's settings on each change. Apply the saved sizes after mount, or read them on the server into `defaultSizes` to avoid a jump on first paint.",
    },
  ],
}

export default guide
