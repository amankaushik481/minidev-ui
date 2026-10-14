import type { GlossaryTerm } from "../types"

export const GLOSSARY_4: GlossaryTerm[] = [
  /* ───────────────────────────── Virtual scrolling ───────────────────────────── */
  {
    slug: "virtual-scrolling",
    term: "Virtual scrolling",
    short:
      "Virtual scrolling renders only the rows of a long list that are visible in the viewport, plus a small buffer, so a list of 100,000 items stays fast.",
    body: [
      {
        type: "p",
        text: "Virtual scrolling, also called windowing or list virtualization, keeps a long list fast by not rendering most of it. The scroll container gets a spacer as tall as the whole list would be, so the scrollbar is right, and only the rows that fall inside the viewport, plus a few above and below as overscan, exist in the DOM. As the user scrolls, rows are positioned at their offsets and recycled. The browser lays out and paints a few dozen elements instead of tens of thousands, which is the difference between a smooth log viewer and a tab that hangs.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Lists and tables past a few hundred rows** that are all loaded in memory, such as logs, file lists, large option lists and spreadsheets.",
          "**Chat and feed histories** combined with [infinite scroll](/glossary/infinite-scroll), where the DOM would otherwise grow without bound.",
          "**Not for short lists.** Virtualization adds complexity, breaks browser find-in-page for off-screen rows and complicates printing. Below a few hundred rows, plain rendering with `content-visibility: auto` on each row is often enough.",
          "**Not a substitute for [pagination](/glossary/pagination)** when data lives on the server. Virtualize what you have; page what you fetch.",
        ],
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "list",
        items: [
          "The container has a fixed height and `overflow: auto`. The total height is the row count times the row height for fixed rows, or a running sum of measured heights for variable rows.",
          "On scroll, the first visible index is `scrollTop / rowHeight` rounded down and the last is that plus the viewport height over the row height; widen by the overscan and render only those indexes.",
          "Each rendered row is placed with `position: absolute` and a `top`, or a `transform: translateY()`, at its offset.",
          "Variable heights are measured with a `ResizeObserver` after a row renders and the offsets are updated; an estimate is used until then, which is why fast scrolling can show a small jump.",
          "Keys must be stable per item, not per index, so React reuses the right nodes.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "Screen readers only see the rendered rows, so a 10,000 row list looks like 30 rows. Fix that with `aria-rowcount` on a grid, or `aria-setsize` and `aria-posinset` on list items, so the position is announced correctly. Keyboard navigation must move an active row and scroll it into view, since Tab cannot reach rows that do not exist yet. Provide a way to jump to a row by number or search, and announce the active row through a polite [live region](/glossary/live-region) when focus stays on the container.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [VirtualList](/docs/virtual-list) handles fixed or measured row heights, overscan, keyboard row navigation and scroll to index:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import { VirtualList } from "@/components/ui/virtual-list"

type Row = { id: string; number: string; customer: string }

export function InvoiceList({ rows }: { rows: Row[] }) {
  return (
    <VirtualList
      items={rows}
      rowHeight={44}
      height={480}
      aria-label="Invoices"
      renderRow={(r) => (
        <div className="flex items-center justify-between px-3 text-sm">
          <span>{r.number}</span>
          <span className="text-fg-muted">{r.customer}</span>
        </div>
      )}
    />
  )
}`,
      },
      {
        type: "p",
        text: "[VirtualizedList](/docs/virtualized-list) is a smaller fixed-height version that takes a `count` and a `renderItem`, and is easy to read if you want to see the arithmetic. For tables, TanStack Virtual pairs well with the [DataTable](/docs/data-table). All of them are in the [data tables category](/components/data-tables).",
      },
      { type: "component", name: "virtual-list" },
      { type: "component", name: "virtualized-list" },
    ],
    related: ["virtual-list", "virtualized-list", "data-table", "infinite-scroll", "logs-viewer"],
    see: ["infinite-scroll", "data-table", "pagination", "skeleton-screen"],
  },

  /* ───────────────────────────── Debounce ───────────────────────────── */
  {
    slug: "debounce",
    term: "Debounce",
    short:
      "Debouncing delays a function until its trigger has been quiet for a set time, so a search box sends one request after typing stops, not one per keystroke.",
    body: [
      {
        type: "p",
        text: "To debounce an event is to wait until it stops happening before reacting. A user typing \"invoice\" fires seven input events in under a second; a debounced search handler ignores the first six and runs once, 250 milliseconds after the last. Each new event resets the timer. The term comes from electronics, where a mechanical switch \"bounces\" and produces several signals for one press. In interfaces it is the standard answer to anything that fires rapidly and only needs the final state: search as you type, autosave, validating a username, resizing a window.",
      },
      { type: "h2", text: "Debounce or throttle", id: "debounce-or-throttle" },
      {
        type: "list",
        items: [
          "**Debounce** waits for a pause. Use it when only the end result matters: search queries, autosave, validation that calls the server.",
          "**[Throttle](/glossary/throttle)** runs at most once per interval while events keep coming. Use it when intermediate updates matter: scroll position, pointer tracking, progress.",
          "**Neither** for things that must respond to every event, such as the characters appearing in the field itself. Debounce the expensive reaction, never the input.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "The simplest form is a hook that returns a delayed copy of a value. The input stays [controlled](/glossary/controlled-component) and immediate, and the slow work is derived from the debounced value:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { SearchInput } from "@/components/ui/search-input"

export function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])
  return debounced
}

export function CustomerSearch({ search }: { search: (q: string, signal: AbortSignal) => Promise<string[]> }) {
  const [query, setQuery] = React.useState("")
  const q = useDebouncedValue(query.trim())
  const [results, setResults] = React.useState<string[]>([])
  React.useEffect(() => {
    if (!q) {
      setResults([])
      return
    }
    const ac = new AbortController()
    search(q, ac.signal).then(setResults).catch(() => {})
    return () => ac.abort()
  }, [q, search])
  return <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} placeholder="Search customers" />
}`,
      },
      {
        type: "p",
        text: "The effect's cleanup clears the pending timer, so unmounting mid-typing never calls a stale function, and the `AbortController` cancels an in-flight request when a newer query starts, so results cannot arrive out of order. Typical delays are 150 to 300ms for search and 500ms to a second for autosave. Lodash's `debounce` adds `leading` and `trailing` options and a `flush` method for the cases that need a plain function instead of a hook.",
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Creating the debounced function inside render** without memoizing it, which makes a new timer on every render and never debounces anything.",
          "**Debouncing the input value** so that typed characters appear late. Keep the field immediate and debounce the request.",
          "**No loading state** during the delay, so a slow search looks broken. Show a small [spinner](/glossary/loading-spinner) once the request is actually in flight.",
          "**Forgetting the final call** on blur or submit. If the user presses Enter before the timer fires, run the search at once.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's [SearchInput](/docs/search-input), [Autocomplete](/docs/autocomplete) and [Combobox](/docs/combobox) are controlled inputs that leave the timing to you, which is where the hook above fits. The [SearchWithResults](/docs/search-with-results) block wires a field and a result list together.",
      },
      { type: "component", name: "search-input" },
      { type: "component", name: "combobox" },
    ],
    related: ["search-input", "autocomplete", "combobox", "search-with-results"],
    see: ["throttle", "combobox", "controlled-component", "optimistic-ui"],
  },

  /* ───────────────────────────── Throttle ───────────────────────────── */
  {
    slug: "throttle",
    term: "Throttle",
    short:
      "Throttling limits how often a function can run, to at most once per interval, so a scroll or pointer handler fires on a steady schedule, not on every event.",
    body: [
      {
        type: "p",
        text: "To throttle a handler is to cap its rate. Scroll, resize, pointer move and drag events can fire far more often than a screen can update, and a handler that does real work on each one, measuring layout or setting React state, stalls the page. A throttled handler runs at most once per interval, say every 100 milliseconds, with the latest event's data, and drops the rest. Unlike [debouncing](/glossary/debounce), which waits for silence, throttling keeps producing updates while the events continue, which is what you want for anything the user watches as it moves.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Following continuous input**: a sticky header that reacts to scroll direction, a reading progress bar, a cursor spotlight, a drag preview.",
          "**Rate-limiting outbound work**: sending analytics or position updates to a server no more than a few times a second.",
          "**Expensive reads during motion**, such as `getBoundingClientRect` on scroll. Better still, avoid the read entirely with the observers below.",
        ],
      },
      { type: "h2", text: "Prefer the browser's own scheduling", id: "scheduling" },
      {
        type: "p",
        text: "For visual updates, the right interval is one frame, and `requestAnimationFrame` is the throttle. Store the latest event values in a ref and let a single frame callback write to the DOM; dozens of pointer events per frame collapse into one update. Many classic scroll handlers can go away entirely: `IntersectionObserver` reports when an element enters the viewport, `ResizeObserver` when it changes size, and CSS `position: sticky` and [scroll snap](/glossary/scroll-snap) handle pinning and paging with no JavaScript. Mark scroll and touch listeners `{ passive: true }` so the browser does not wait for them before scrolling.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"

/** Runs fn with the latest arguments at most once per animation frame. */
export function useFrameThrottle<A extends unknown[]>(fn: (...args: A) => void) {
  const latest = React.useRef<A | null>(null)
  const frame = React.useRef(0)
  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])
  return React.useCallback(
    (...args: A) => {
      latest.current = args
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        if (latest.current) fn(...latest.current)
      })
    },
    [fn]
  )
}

// const onMove = useFrameThrottle((x: number, y: number) => el.style.setProperty("--x", x + "px"))
// <div onPointerMove={(e) => onMove(e.clientX, e.clientY)} />`,
      },
      {
        type: "p",
        text: "Writing to a CSS variable or a transform inside the frame, instead of calling `setState`, keeps React out of the hot path; the component re-renders only when something the user reads changes. When React state is required, throttle the state updates to a coarse interval and let the visual follow a CSS transition.",
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Throttling with `setTimeout` for visuals**, which runs out of step with the display and looks jittery. Use frames.",
          "**Dropping the last event.** A trailing call matters: if the user stops scrolling between ticks, the final position must still be applied.",
          "**Throttling a handler that calls `preventDefault`**, such as a drag handler, which then only prevents some of the events.",
          "**Throttling instead of fixing the work.** If the handler reads layout every tick, it is still too slow. Cache measurements and use observers.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's [LightProvider](/docs/light-provider) follows this pattern: a passive `pointermove` listener only records the latest coordinates, and a single frame loop eases the light toward them and writes the variables that every shadow reads. [BackToTop](/docs/back-to-top) uses a passive scroll listener, and [ScrollProgress](/docs/scroll-progress) drives its bar from a motion value so scrolling never re-renders React.",
      },
      { type: "component", name: "light-provider" },
      { type: "component", name: "scroll-progress" },
    ],
    related: ["light-provider", "scroll-progress", "back-to-top", "sticky-bar"],
    see: ["debounce", "virtual-scrolling", "micro-interactions", "prefers-reduced-motion"],
  },

  /* ───────────────────────────── Controlled component ───────────────────────────── */
  {
    slug: "controlled-component",
    term: "Controlled component",
    short:
      "A controlled component is a React input whose value is held in state and passed down as a prop, with onChange reporting edits, so state is the source of truth.",
    body: [
      {
        type: "p",
        text: "In React, an input is controlled when its value comes from a prop and every edit goes through an `onChange` handler that updates state, which flows back into the prop. The input shows whatever state says; typing does not change it until state does. An uncontrolled input keeps its own value in the DOM, like a plain HTML form field, and React reads it when needed through a ref or `FormData`. The distinction applies to every stateful component, not just text fields: a dialog's `open`, a tab list's `value` and a switch's `checked` can each be controlled or uncontrolled.",
      },
      { type: "h2", text: "Which to use", id: "which" },
      {
        type: "list",
        items: [
          "**Controlled** when something else depends on the value as it changes: live validation, filtering a list, enabling a button, a character counter, formatting as you type, or syncing with the URL.",
          "**Uncontrolled** when you only need the value on submit. Native validation attributes, browser autofill and React 19 form actions all work with uncontrolled fields, and there is no re-render per keystroke.",
          "**Controlled from the URL or a store** for filters and view settings that should survive a reload and be shareable.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "A controlled field pairs `value` with `onChange`. For a reusable component, support both modes the way MiniDev's components do: use the `value` prop when it is given, otherwise fall back to internal state seeded from `defaultValue`:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"

type Props = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export function useControllable({ value, defaultValue = "", onChange }: Props) {
  const [internal, setInternal] = React.useState(defaultValue)
  const controlled = value !== undefined
  const current = controlled ? value : internal
  const set = React.useCallback(
    (next: string) => {
      if (!controlled) setInternal(next)
      onChange?.(next)
    },
    [controlled, onChange]
  )
  return [current, set] as const
}

export function NameField(props: Props) {
  const [name, setName] = useControllable(props)
  return <input value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" />
}`,
      },
      {
        type: "p",
        text: "This is the pattern behind [SegmentedControl](/docs/segmented-control), [MultiSelect](/docs/multi-select) and [Switch](/docs/switch): `value` or `checked` when the parent owns the state, `defaultValue` or `defaultChecked` when it does not, and the same change handler either way. [Base UI](/glossary/base-ui) primitives follow the same convention with `value` and `onValueChange`.",
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Switching modes.** Passing `value={undefined}` on one render and a string on the next makes React warn about a component changing from uncontrolled to controlled. Use an empty string for \"no value\".",
          "**A `value` with no `onChange`.** The field becomes read-only and React warns. Use `readOnly` if that is intended.",
          "**Slow renders on every keystroke.** A controlled field re-renders its owner on each edit. Keep the state close to the input, or [debounce](/glossary/debounce) the expensive work rather than the value.",
          "**Resetting on remount.** Uncontrolled fields lose their value when the component unmounts. Give the form a `key` to reset deliberately, and keep draft state in a parent if it must survive.",
        ],
      },
      {
        type: "p",
        text: "Every input in the [forms category](/components/forms) accepts both modes, so you can start uncontrolled and lift state later without changing the markup.",
      },
      { type: "component", name: "input" },
      { type: "component", name: "switch" },
    ],
    related: ["input", "switch", "multi-select", "segmented-control", "tabs"],
    see: ["compound-components", "render-props", "debounce", "headless-components"],
  },

  /* ───────────────────────────── Compound components ───────────────────────────── */
  {
    slug: "compound-components",
    term: "Compound components",
    short:
      "Compound components are a set of React components, like Tabs, TabsList and TabsTrigger, that share state through context and are composed together in JSX.",
    body: [
      {
        type: "p",
        text: "A compound component is an API made of several components that only make sense together. Instead of one `Tabs` taking an `items` array, you write `Tabs`, `TabsList`, `TabsTrigger` and `TabsContent` in JSX, nesting them however the layout needs. The parent holds the state, the selected tab, and shares it through React context; each child reads what it needs and reports changes back. The native `select` and `option` elements work this way, and most headless libraries, including [Base UI](/glossary/base-ui) and [Radix](/glossary/radix-ui), expose their primitives in this shape.",
      },
      { type: "h2", text: "Why use the pattern", id: "why" },
      {
        type: "list",
        items: [
          "**Layout stays in your hands.** Put the tab list above or beside the panels, add a badge inside one trigger, wrap a panel in a card. A config-array API would need a prop for each of those.",
          "**Each piece is a real element** that takes `className`, refs and event handlers, so styling and testing work as they do for plain HTML.",
          "**State is still coordinated.** The parts cannot drift out of sync, because the only state lives in the root.",
          "**The cost** is verbosity for the simple case. Some MiniDev components, like [SegmentedControl](/docs/segmented-control), take an `items` array instead because their layout never varies.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"

type Ctx = { open: boolean; setOpen: (open: boolean) => void; id: string }
const DisclosureContext = React.createContext<Ctx | null>(null)

function useDisclosure(part: string) {
  const ctx = React.useContext(DisclosureContext)
  if (!ctx) throw new Error(part + " must be used inside <Disclosure>")
  return ctx
}

export function Disclosure({ defaultOpen = false, children }: { defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(defaultOpen)
  const id = React.useId()
  const value = React.useMemo(() => ({ open, setOpen, id }), [open, id])
  return <DisclosureContext.Provider value={value}>{children}</DisclosureContext.Provider>
}

export function DisclosureTrigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen, id } = useDisclosure("DisclosureTrigger")
  return (
    <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      {children}
    </button>
  )
}

export function DisclosurePanel({ children }: { children: React.ReactNode }) {
  const { open, id } = useDisclosure("DisclosurePanel")
  return <div id={id} hidden={!open}>{children}</div>
}`,
      },
      {
        type: "p",
        text: "The context carries the state and a generated id, so the trigger and panel can wire `aria-expanded` and `aria-controls` without anyone passing ids by hand. The error in `useDisclosure` turns a misplaced part into a clear message instead of a silent failure, and the memoized value keeps the parts from re-rendering when the root re-renders for unrelated reasons.",
      },
      { type: "h2", text: "Details that matter", id: "details" },
      {
        type: "list",
        items: [
          "**Export the parts as separate named exports** (`Tabs`, `TabsList`) rather than properties like `Tabs.List`. Separate exports tree-shake, and a property attached to a client module is not visible from a server component in [React Server Components](/glossary/react-server-components).",
          "**Allow a controlled root.** Offer `value` and `onValueChange` alongside `defaultValue`, as described under [controlled components](/glossary/controlled-component).",
          "**Let parts render as other elements** through a `render` prop or `asChild`, the [polymorphic](/glossary/polymorphic-component) pattern, so a trigger can be your Button.",
          "**Name the parts by role**, Trigger, Content, Title, so a reader of the JSX can tell what each one does.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's [Tabs](/docs/tabs), [Accordion](/docs/accordion), [Dialog](/docs/dialog), [DropdownMenu](/docs/dropdown-menu) and [Card](/docs/card) are all compound components, the first four backed by Base UI primitives and the last a pure layout set.",
      },
      { type: "component", name: "tabs" },
      { type: "component", name: "dialog" },
    ],
    related: ["tabs", "accordion", "dialog", "card", "dropdown-menu"],
    see: ["controlled-component", "polymorphic-component", "headless-components", "base-ui"],
  },

  /* ───────────────────────────── Render props ───────────────────────────── */
  {
    slug: "render-props",
    term: "Render props",
    short:
      "A render prop is a prop whose value is a function returning React elements, letting a component hand data or state to the caller, who decides the markup.",
    body: [
      {
        type: "p",
        text: "A render prop is a function passed to a component that the component calls to produce part of its output. Instead of rendering a fixed row, a list component calls `renderRow(item)` and inserts whatever comes back. The component owns the behavior, such as virtualization, sorting or hover state, and the caller owns the markup. The pattern was the main way to share stateful logic before hooks, as in `<Mouse render={({ x, y }) => ...} />`, and hooks replaced it for pure logic. It remains the right tool when a component needs to render something it cannot know in advance, in a position it controls.",
      },
      { type: "h2", text: "Where it still fits", id: "where" },
      {
        type: "list",
        items: [
          "**Per-item rendering** in lists, tables and trees: `renderRow`, `renderItem`, a column's `cell` function.",
          "**Slots with data**: a chart's tooltip that receives the hovered point, an empty state that receives the active filters.",
          "**Children as a function**, the same idea written as `{(state) => ...}` between the tags, which reads well when the function is the whole content.",
          "**Not for element substitution.** Changing which element a part renders as, say a trigger becoming a link, is the job of the `render` prop in [Base UI](/glossary/base-ui) or `asChild` in Radix, covered under [polymorphic components](/glossary/polymorphic-component). The name overlaps; the purpose differs.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "code",
        lang: "tsx",
        code: `import * as React from "react"

type Column<T> = { id: string; header: string; cell: (row: T) => React.ReactNode }

export function SimpleTable<T>({ rows, columns, getKey, renderEmpty }: {
  rows: T[]
  columns: Column<T>[]
  getKey: (row: T) => React.Key
  renderEmpty?: () => React.ReactNode
}) {
  if (rows.length === 0) return <>{renderEmpty?.() ?? <p>No rows.</p>}</>
  return (
    <table>
      <thead>
        <tr>{columns.map((c) => <th key={c.id} scope="col">{c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={getKey(r)}>{columns.map((c) => <td key={c.id}>{c.cell(r)}</td>)}</tr>
        ))}
      </tbody>
    </table>
  )
}

// <SimpleTable rows={invoices} columns={[{ id: "amount", header: "Amount", cell: (r) => usd.format(r.amount) }]} getKey={(r) => r.id} />`,
      },
      {
        type: "p",
        text: "The generic `T` flows from `rows` into every `cell` function, so the caller gets typed rows inside the render prop with no casting. That typing is a quiet advantage over passing pre-rendered elements.",
      },
      { type: "h2", text: "Details that matter", id: "details" },
      {
        type: "list",
        items: [
          "**Inline functions are fine.** A new function per render only matters if the child is memoized; then wrap the render prop in `useCallback`.",
          "**Do not call hooks inside a render prop.** It runs inside the host component's render, so hook order would depend on data. Move hooks into a small component and render that instead.",
          "**Keep render props pure.** They are called during render, so no side effects and no state updates.",
          "**Prefer a hook for logic with no markup.** `useMouse()` beats `<Mouse render>` when the caller renders everything anyway.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's [DataTable](/docs/data-table) takes typed column definitions with `cell` functions, [VirtualList](/docs/virtual-list) takes `renderRow`, and [VirtualizedList](/docs/virtualized-list) takes `renderItem`, each keeping the behavior in the component and the row markup with you. The same split powers [headless components](/glossary/headless-components), where the library owns behavior and you own every element.",
      },
      { type: "component", name: "data-table" },
      { type: "component", name: "virtual-list" },
    ],
    related: ["data-table", "virtual-list", "virtualized-list", "button"],
    see: ["compound-components", "polymorphic-component", "headless-components", "controlled-component"],
  },

  /* ───────────────────────────── Polymorphic component ───────────────────────────── */
  {
    slug: "polymorphic-component",
    term: "Polymorphic component (asChild and render)",
    short:
      "A polymorphic component can render as a different element or component than its default, so a Button can be a link while keeping its styles and behavior.",
    body: [
      {
        type: "p",
        text: "A polymorphic component keeps its styling and behavior but lets the caller change the underlying element. The classic need is a button that must be a link: it should look and act like every other button, but navigate, be crawlable and open in a new tab, which only an anchor can do. The same need appears inside libraries: a dialog's trigger should attach `aria-haspopup`, `aria-expanded` and the click handler to your own Button component, not to a second button wrapped around it, which would be invalid HTML.",
      },
      { type: "h2", text: "Three ways to do it", id: "three-ways" },
      {
        type: "list",
        items: [
          "**The `as` prop**: `<Button as=\"a\" href=\"/docs\">`. Simple to use, but the TypeScript types for \"the props of whatever `as` is\" get complicated, and the component must forward everything it does not understand.",
          "**`asChild` ([Radix UI](/glossary/radix-ui))**: `<DialogTrigger asChild><Button /></DialogTrigger>`. The trigger renders no element of its own; a `Slot` merges the trigger's props, ref and handlers onto its single child. The child must accept and spread props and forward its ref.",
          "**The `render` prop ([Base UI](/glossary/base-ui))**: `<DialogTrigger render={<Button variant=\"outline\" />}>Rename</DialogTrigger>`. You pass the element to render, and the primitive merges its props into it. `render` can also be a function that receives props and state, for cases where the element depends on state.",
        ],
      },
      {
        type: "p",
        text: "`asChild` and `render` solve the same problem. The `render` form keeps children where they normally go and offers the function variant, which is why MiniDev adopted it along with Base UI.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "Base UI exposes the mechanism as the `useRender` hook and `mergeProps`, which is how MiniDev's own [Button](/docs/button) and [Badge](/docs/badge) support `render`. A small version:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

export function Chip({ className, render, ...props }: useRender.ComponentProps<"span">) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({ className: "inline-flex rounded-full border px-2 text-xs " + (className ?? "") }, props),
    render,
  })
}

// <Chip>Draft</Chip>                                   renders a span
// <Chip render={<a href="/tags/draft" />}>Draft</Chip>  renders a styled link`,
      },
      {
        type: "p",
        text: "`mergeProps` combines class names, chains event handlers so both the component's and the caller's run, and merges styles, which is the fiddly part of any hand-rolled Slot. In MiniDev the same prop turns a [DialogTrigger](/docs/dialog) or [PopoverTrigger](/docs/popover) into a Button, and a Button into a Next.js `Link` with `render={<Link href=\"/docs\" />}`.",
      },
      { type: "h2", text: "Details that matter", id: "details" },
      {
        type: "list",
        items: [
          "**One child only** for `asChild`, and it must be a component that spreads props and forwards its ref, or the behavior silently disappears.",
          "**Keep the semantics right.** A trigger rendered as a `div` loses keyboard activation; render a button or a link.",
          "**Type the element**, so `href` is allowed when rendering an anchor and rejected otherwise. `useRender.ComponentProps` does this for the default tag; for arbitrary elements, prefer `render` over `as`.",
          "**Tell the primitive what it rendered.** Base UI's `nativeButton` flag says whether the element is a real button, so it knows when to add `role=\"button\"` and key handling itself. MiniDev's Button sets it to false automatically whenever `render` is used, so a Button rendered as a link gets no spurious warnings.",
        ],
      },
      { type: "component", name: "button" },
      { type: "component", name: "badge" },
    ],
    related: ["button", "badge", "link", "dialog", "tooltip"],
    see: ["render-props", "compound-components", "base-ui", "radix-ui"],
  },

  /* ───────────────────────────── Portal ───────────────────────────── */
  {
    slug: "portal",
    term: "Portal",
    short:
      "A portal renders part of a React tree into a different DOM node, usually document.body, so dialogs and popovers escape overflow clipping and stacking contexts.",
    body: [
      {
        type: "p",
        text: "`createPortal(children, container)` tells React to mount some elements under a different DOM parent while keeping them in the same React tree. The usual target is `document.body`. Overlays need this because CSS does not care where the React component sits: a popover rendered inside a card with `overflow: hidden` gets clipped, one inside a transformed element is positioned relative to that element rather than the viewport, and one inside a low `z-index` stacking context is covered by a sibling. Rendering at the end of `body` sidesteps all three.",
      },
      { type: "h2", text: "What stays the same", id: "same" },
      {
        type: "list",
        items: [
          "**Context** still flows from the React parent, so a portaled dialog reads the theme, the form state and the router as if it were inline.",
          "**Events bubble through the React tree**, not the DOM tree. A click inside a portaled popover reaches an `onClick` on its React ancestor, which surprises code that uses a parent's handler to detect a click outside.",
          "**State and lifecycle** are unchanged; the portal is only about where the nodes land.",
        ],
      },
      { type: "h2", text: "What changes", id: "changes" },
      {
        type: "list",
        items: [
          "**DOM order.** The portaled content is last in the document, so Tab from the trigger would walk the whole page before reaching it. Overlays must move focus into themselves on open and back on close, and modal ones need a [focus trap](/glossary/focus-trap).",
          "**Screen reader order** follows the DOM too, which is why dialogs set `aria-modal` and popovers return focus deliberately.",
          "**CSS inheritance** from the original parent is lost. Styles that depended on a wrapper class, such as a dark section, must be applied to the portal content or the root.",
          "**Server rendering.** There is no `document` on the server, so a portal either renders after mount or uses a library component that handles it, which is what Base UI's `Portal` does.",
        ],
      },
      { type: "h2", text: "The top layer", id: "top-layer" },
      {
        type: "p",
        text: "Browsers now have a built-in answer to the stacking problem. An element opened with `dialog.showModal()` or marked with the HTML `popover` attribute is promoted to the top layer, above every z-index and outside every stacking context, without moving in the DOM, and this is supported in most browsers. It does not position an element next to its trigger by itself, so libraries still combine it with a portal or a positioning engine, but for a full-screen modal the native `dialog` element is a good fit.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { createPortal } from "react-dom"

export function BodyPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(children, document.body)
}`,
      },
      {
        type: "p",
        text: "The mounted flag keeps the server and the first client render identical, which avoids a [hydration](/glossary/hydration) mismatch. MiniDev's [Dialog](/docs/dialog), [Popover](/docs/popover), [DropdownMenu](/docs/dropdown-menu) and [Tooltip](/docs/tooltip) each wrap their popup in a Base UI `Portal`, and the [Toaster](/docs/toast) mounts once at the root so toasts are already outside every layout container. Browse the [overlays category](/components/overlays) for the full set.",
      },
      { type: "component", name: "dialog" },
      { type: "component", name: "popover" },
    ],
    related: ["dialog", "popover", "tooltip", "dropdown-menu", "toast"],
    see: ["modal-dialog", "popover", "focus-trap", "hydration"],
  },

  /* ───────────────────────────── Focus trap ───────────────────────────── */
  {
    slug: "focus-trap",
    term: "Focus trap",
    short:
      "A focus trap keeps keyboard focus inside an open modal, so Tab and Shift+Tab cycle through its controls instead of escaping to the page behind it.",
    body: [
      {
        type: "p",
        text: "A focus trap is the keyboard half of a modal. When a dialog is open, the page behind it is dimmed and not clickable, but keyboard focus has no idea; Tab would happily walk out of the dialog into the header, the sidebar and the footer, and a screen reader would follow. A trap intercepts that: from the last focusable element, Tab wraps to the first inside the dialog, and from the first, Shift+Tab wraps to the last. Together with moving focus in on open and back on close, this is what the WAI-ARIA dialog pattern requires.",
      },
      { type: "h2", text: "When to trap, and when not", id: "when" },
      {
        type: "list",
        items: [
          "**Trap** in modal dialogs, modal [drawers](/glossary/drawer) and side sheets, full-screen menus on mobile, and any overlay with a scrim that blocks the page.",
          "**Do not trap** in popovers, tooltips, non-modal panels or inline disclosures. Users must be able to Tab past them.",
          "**Always provide an exit.** Escape closes the dialog, and there is a visible close button, so a trap never becomes a cage. Touch screen reader users in particular need the button.",
        ],
      },
      { type: "h2", text: "Ways to implement it", id: "implement" },
      {
        type: "list",
        items: [
          "**The `inert` attribute** on everything except the dialog. Inert content cannot be focused, clicked or read by assistive technology, so there is nothing to trap against. It is supported in most browsers and is the cleanest approach. Apply it to the siblings of the dialog's container, never to an ancestor of the dialog itself.",
          "**The native `dialog` element** with `showModal()` makes the rest of the document inert for you and handles Escape.",
          "**A manual trap**: listen for Tab on the dialog, collect its focusable elements (`a[href]`, `button`, `input`, `[tabindex]` and so on, minus disabled and hidden ones) and wrap focus at the ends. Needed when the dialog contains a [portaled](/glossary/portal) popover that lives outside its DOM subtree, or on older browsers.",
          "**Sentinels**: an invisible focusable element before and after the dialog that pushes focus back inside when reached. Simple, but it breaks for content that is portaled out.",
        ],
      },
      { type: "h2", text: "Details that matter", id: "details" },
      {
        type: "list",
        items: [
          "On open, focus the first field, or the least destructive button in a confirmation, or the dialog container with `tabIndex={-1}` when nothing should be preselected.",
          "On close, return focus to the element that opened the dialog, even if it has re-rendered. Store a ref to it.",
          "Lock page scroll while the dialog is open, and reserve the scrollbar gutter so the page does not shift.",
          "Nested overlays, such as a select inside a dialog, must count as part of the dialog, or focus bounces between two traps.",
        ],
      },
      { type: "h2", text: "How it works in MiniDev", id: "minidev" },
      {
        type: "p",
        text: "[Dialog](/docs/dialog), [AlertDialog](/docs/alert-dialog) and [CommandDialog](/docs/command-dialog) are built on the [Base UI](/glossary/base-ui) dialog, whose `modal` mode traps focus, locks scroll and disables pointer interaction outside, with `initialFocus` and `finalFocus` props to choose where focus goes on open and close:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function Rename() {
  const first = React.useRef<HTMLInputElement>(null)
  return (
    <Dialog>
      <DialogTrigger>Rename</DialogTrigger>
      <DialogContent initialFocus={first}>
        <DialogTitle>Rename project</DialogTitle>
        <input ref={first} aria-label="Project name" className="h-9 rounded-lg border border-border px-3" />
      </DialogContent>
    </Dialog>
  )
}`,
      },
      {
        type: "p",
        text: "[Sheet](/docs/sheet) and [Drawer](/docs/drawer) move focus into the panel on open, close on Escape and hand focus back; when you use them modally, add `inert` to the page's header and main regions while they are open. Keep the [focus-visible](/glossary/focus-visible) ring strong inside overlays, where keyboard users rely on it most.",
      },
      { type: "component", name: "dialog" },
      { type: "component", name: "alert-dialog" },
    ],
    related: ["dialog", "alert-dialog", "sheet", "command-dialog", "drawer"],
    see: ["modal-dialog", "portal", "focus-visible", "roving-tabindex"],
  },

  /* ───────────────────────────── Roving tabindex ───────────────────────────── */
  {
    slug: "roving-tabindex",
    term: "Roving tabindex",
    short:
      "Roving tabindex is a keyboard pattern where a group of controls shares one Tab stop and arrow keys move focus inside it; only the active item has tabindex 0.",
    body: [
      {
        type: "p",
        text: "Roving tabindex is how composite widgets stay fast for keyboard users. A toolbar with twelve buttons should not cost twelve Tab presses to get past; a tab list, a radio group, a menu, a tree or a grid should be one stop in the page's Tab order, with the arrow keys moving around inside. The technique is simple: exactly one item in the group has `tabindex=\"0\"`, every other item has `tabindex=\"-1\"`, and when an arrow key moves focus the attributes move too, so the item the user left last is the one Tab returns to. The tabindex \"roves\" with focus.",
      },
      { type: "h2", text: "Where it applies", id: "where" },
      {
        type: "list",
        items: [
          "**[Tabs](/glossary/tabs)**, **[radio groups](/glossary/radio-group)** and **[segmented controls](/glossary/segmented-control)**: Left and Right (or Up and Down) move, Home and End jump.",
          "**Menus and menu bars**: Up and Down move, Left and Right switch menus or open submenus.",
          "**Toolbars**: arrows move between buttons, and the active tool can be remembered.",
          "**[Tree views](/glossary/tree-view)** and **grids**: four directions, plus expand and collapse.",
          "**Not** for a plain list of links or a set of independent form fields. Those are separate Tab stops, and arrow keys there would be surprising.",
        ],
      },
      { type: "h2", text: "Roving tabindex or aria-activedescendant", id: "activedescendant" },
      {
        type: "p",
        text: "There is a second way to do the same job. With `aria-activedescendant`, DOM focus stays on the container (or on a text input, as in a [combobox](/glossary/combobox)) and an attribute names the currently active item by id; the item only looks focused. That suits widgets where focus must stay in an input while the user moves through options. Roving tabindex moves real focus, which means the browser scrolls the item into view, `:focus-visible` styles apply and screen readers announce the element the usual way. For anything not attached to a text field, roving tabindex is simpler and more robust.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "Keep a ref per item and the index of the active item. The active item gets `tabIndex={0}`; arrow keys compute the next index, focus that element and update the state:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"

type Tool = { id: string; label: string; onSelect: () => void }

export function Toolbar({ tools }: { tools: Tool[] }) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const [active, setActive] = React.useState(0)
  function move(next: number) {
    const i = (next + tools.length) % tools.length
    setActive(i)
    refs.current[i]?.focus()
  }
  return (
    <div role="toolbar" aria-label="Formatting" className="flex gap-1">
      {tools.map((t, i) => (
        <button
          key={t.id}
          ref={(el) => { refs.current[i] = el }}
          type="button"
          tabIndex={i === active ? 0 : -1}
          onClick={t.onSelect}
          onFocus={() => setActive(i)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); move(i + 1) }
            if (e.key === "ArrowLeft") { e.preventDefault(); move(i - 1) }
            if (e.key === "Home") { e.preventDefault(); move(0) }
            if (e.key === "End") { e.preventDefault(); move(tools.length - 1) }
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}`,
      },
      {
        type: "p",
        text: "Call `preventDefault` on the handled keys so the page does not scroll, skip disabled items when computing the next index, and decide whether to wrap at the ends (menus and radio groups usually wrap; toolbars often stop). In a radio group or segmented control, moving also selects; in tabs with manual activation, it only moves focus. MiniDev's [SegmentedControl](/docs/segmented-control) implements the pattern by hand, and [Tabs](/docs/tabs), [RadioGroup](/docs/radio-group), [ToggleGroup](/docs/toggle-group) and [DropdownMenu](/docs/dropdown-menu) get it from [Base UI](/glossary/base-ui).",
      },
      { type: "component", name: "segmented-control" },
      { type: "component", name: "toggle-group" },
    ],
    related: ["segmented-control", "tabs", "toggle-group", "radio-group", "tree-view"],
    see: ["focus-trap", "tabs", "focus-visible", "aria"],
  },

  /* ───────────────────────────── Live region ───────────────────────────── */
  {
    slug: "live-region",
    term: "Live region (aria-live)",
    short:
      "A live region is an element marked with aria-live or role=\"status\" whose content changes are announced by screen readers without moving focus to it.",
    body: [
      {
        type: "p",
        text: "Screen readers read what has focus and what the user navigates to. They do not notice that a toast appeared in the corner, a search found 24 results, a file finished uploading or a form said \"Saved\". A live region is the fix: an element marked with `aria-live` whose text changes are announced automatically, wherever focus is. It is how status messages, counts, errors and progress reach people who cannot see them, and it is also easy to overdo, because every announcement interrupts whatever the user was listening to.",
      },
      { type: "h2", text: "Politeness and roles", id: "roles" },
      {
        type: "list",
        items: [
          "**`aria-live=\"polite\"`** waits until the screen reader is idle. Use it for nearly everything: confirmations, result counts, loading and loaded, copied.",
          "**`aria-live=\"assertive\"`** interrupts immediately. Reserve it for errors that stop the user's task, such as a session that expired.",
          "**`role=\"status\"`** is a polite region with `aria-atomic=\"true\"`, which reads the whole region rather than only the changed words. **`role=\"alert\"`** is the assertive equivalent. **`role=\"log\"`** is polite and suits chat transcripts, where only new lines are read.",
          "**`aria-atomic`** controls whether the whole region or only the change is read, and **`aria-relevant`** can limit announcements to additions, removals or text changes; the defaults are right for most uses.",
        ],
      },
      { type: "h2", text: "Rules that make it work", id: "rules" },
      {
        type: "list",
        items: [
          "**The region must exist before the message.** Screen readers watch regions already in the accessibility tree; inserting a new element that already contains text is often missed. Render the empty region first and change its text later, which is why toast systems mount one container at app start.",
          "**Change the text, do not re-create the node.** Replacing a message with identical text may not announce; clear it first.",
          "**One or two global regions** are enough. Dozens of regions compete and the result is noise.",
          "**Do not announce every keystroke or every percent.** Announce the result of typing after a pause, and progress at milestones or on completion.",
          "**Keep it short and specific.** \"3 results for invoice\" beats \"The search has completed and results are now displayed below.\"",
          "**Hide it visually when the message is redundant** with what sighted users see, using the [visually hidden](/glossary/visually-hidden) pattern, and keep the visible message when both groups need it.",
        ],
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "A small announcer hook renders one polite region and lets any component push messages:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `"use client"
import * as React from "react"

export function useAnnouncer() {
  const [message, setMessage] = React.useState("")
  const announce = React.useCallback((text: string) => {
    setMessage("")
    window.setTimeout(() => setMessage(text), 50)
  }, [])
  const region = (
    <div role="status" aria-live="polite" className="sr-only">
      {message}
    </div>
  )
  return { announce, region }
}

// const { announce, region } = useAnnouncer()
// announce(results.length + " results")
// {region}  rendered once, always mounted`,
      },
      {
        type: "p",
        text: "The brief clear before setting the text forces an announcement even when the same message repeats. MiniDev's [Toast](/docs/toast) uses `role=\"status\"` for most tones and `role=\"alert\"` only for errors, [Spinner](/docs/spinner) is a status region named by its label, and [Banner](/docs/banner) announces itself as status when it appears. The [ARIA](/glossary/aria) entry covers the attributes around these.",
      },
      { type: "component", name: "toast" },
      { type: "component", name: "spinner" },
    ],
    related: ["toast", "spinner", "banner", "streaming-message", "visually-hidden"],
    see: ["toast-notification", "visually-hidden", "aria", "loading-spinner"],
  },

  /* ───────────────────────────── Skip link ───────────────────────────── */
  {
    slug: "skip-link",
    term: "Skip link",
    short:
      "A skip link is a hidden link at the top of a page that appears on keyboard focus and jumps straight to the main content, bypassing the header and navigation.",
    body: [
      {
        type: "p",
        text: "A skip link is the first focusable element on a page. It is invisible until a keyboard user presses Tab, at which point it appears, usually as a small button at the top left, reading \"Skip to main content\". Activating it moves focus past the logo, the navigation, the search box and whatever else repeats on every page, straight to the content. Without it, someone using a keyboard or a switch device has to Tab through the same thirty links on every page before reaching anything new. WCAG success criterion 2.4.1, Bypass Blocks, is usually satisfied with exactly this element.",
      },
      { type: "h2", text: "How it should behave", id: "behavior" },
      {
        type: "list",
        items: [
          "**First in the DOM**, before the header, so it is the first Tab stop. Position it visually with CSS if the design wants it elsewhere.",
          "**Visible on focus.** Hide it with the [visually hidden](/glossary/visually-hidden) pattern, never with `display: none`, which removes it from the Tab order; on `:focus` undo the hiding and show it with strong contrast on top of everything.",
          "**A working target.** The link points at `#main`, and the `main` element has that `id`. Give the target `tabIndex={-1}` so every browser moves focus there, not only the scroll position, and remove its focus outline since it is not interactive.",
          "**More than one** on complex apps: skip to navigation, skip to search, skip to results. Keep the list to two or three.",
          "**Visible in the layout** when the audience benefits, as on government and documentation sites. A visible skip link is not a failure.",
        ],
      },
      { type: "h2", text: "Single-page apps", id: "spa" },
      {
        type: "p",
        text: "In a client-rendered app the page does not reload between routes, so the skip link alone does not restore focus order. After a route change, move focus to the new page's heading or to the `main` element, and update the document title, so keyboard and screen reader users know they have arrived. The skip link then works as it would on a fresh load. Fixed headers that overlap the target need `scroll-margin-top` on the `main` element so the content is not hidden under them after the jump.",
      },
      { type: "h2", text: "How to build one in React", id: "react" },
      {
        type: "p",
        text: "MiniDev's [SkipLink](/docs/skip-link) is a visually hidden anchor that becomes a fixed, raised button on focus. Place it first in the root layout and give `main` the matching id:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import * as React from "react"
import { SkipLink } from "@/components/ui/skip-link"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink href="#main" />
        <header>{/* logo, nav, search */}</header>
        <main id="main" tabIndex={-1} className="outline-none scroll-mt-16">
          {children}
        </main>
      </body>
    </html>
  )
}`,
      },
      {
        type: "p",
        text: "Put it above the [AppShell](/docs/app-shell), so it skips the [Topbar](/docs/topbar) and [Sidebar](/docs/sidebar) it contains. Test it by loading a page and pressing Tab once: the link should appear, and Enter should move focus into the content. Keep a [focus-visible](/glossary/focus-visible) ring on any heading you move focus to, so the jump is visible as well as audible. More landmarks and navigation pieces are in the [navigation category](/components/navigation).",
      },
      { type: "component", name: "skip-link" },
      { type: "component", name: "app-shell" },
    ],
    related: ["skip-link", "app-shell", "topbar", "sidebar"],
    see: ["visually-hidden", "focus-visible", "aria", "live-region"],
  },

  /* ───────────────────────────── Visually hidden ───────────────────────────── */
  {
    slug: "visually-hidden",
    term: "Visually hidden",
    short:
      "Visually hidden is a CSS technique that removes an element from view while keeping it in the accessibility tree, so screen readers still read its text.",
    body: [
      {
        type: "p",
        text: "Some text should exist only for people who cannot see the screen: the name of an icon-only button, the column header a layout dropped on mobile, the word \"Online\" behind a green dot, a table caption the design has no room for, a status message that is obvious visually. Visually hidden text is the way to provide it. The element stays in the DOM and in the accessibility tree, but it is shrunk to a 1px box, clipped, and taken out of the layout so nothing on screen changes. Tailwind ships the technique as the `sr-only` utility, and most design systems have a `VisuallyHidden` component for it.",
      },
      { type: "h2", text: "The CSS", id: "css" },
      {
        type: "code",
        lang: "css",
        code: `.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}`,
      },
      {
        type: "p",
        text: "Each line has a reason: the absolute position removes it from layout, the 1px box and overflow clipping keep it from painting, `white-space: nowrap` stops some screen readers from reading a word per line when the 1px width wraps text, and the negative margin cancels the box's footprint. `display: none`, `visibility: hidden` and the `hidden` attribute all remove the element from assistive technology as well, so they are not substitutes. `aria-hidden` is the reverse case: visible to sighted users, hidden from screen readers.",
      },
      { type: "h2", text: "When to use it", id: "when-to-use" },
      {
        type: "list",
        items: [
          "**Accessible names** for icon-only controls, as an alternative to `aria-label`. Hidden text is translated by translation tools; `aria-label` often is not.",
          "**Context sighted users get from layout**: \"Opens in a new tab\", \"Step 2 of 4\", the heading of a card group, a table caption.",
          "**[Live region](/glossary/live-region) messages** that duplicate what is already visible, such as \"Copied\".",
          "**[Skip links](/glossary/skip-link)** until they receive focus.",
          "**Form labels** when a placeholder is doing visual duty, though a visible label is better.",
        ],
      },
      { type: "h2", text: "Common mistakes", id: "common-mistakes" },
      {
        type: "list",
        items: [
          "**Hiding focusable elements permanently.** A visually hidden link or button is still focusable, and keyboard users see focus disappear. Reveal it on focus, as skip links do, or remove it from the Tab order.",
          "**Hiding too much.** If screen reader users hear three sentences where sighted users see an icon, the interface is inconsistent. Hidden text should be short and should name, not explain.",
          "**Applying it to a container with layout children.** Children are clipped too, which is rarely the intent; apply it to the element that holds the text.",
        ],
      },
      { type: "h2", text: "In MiniDev", id: "minidev" },
      {
        type: "p",
        text: "[VisuallyHidden](/docs/visually-hidden) renders a `span` with the class above, [IconButton](/docs/icon-button) takes an `aria-label` for its name, [Spinner](/docs/spinner) exposes its state through a role and a label rather than extra text, and [SkipLink](/docs/skip-link) uses `sr-only` with `focus:not-sr-only` to reappear on focus:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { VisuallyHidden } from "@/components/ui/visually-hidden"

export function PresenceDot({ online }: { online: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className={online ? "size-2 rounded-full bg-success" : "size-2 rounded-full bg-border"} />
      <VisuallyHidden>{online ? "Online" : "Offline"}</VisuallyHidden>
    </span>
  )
}`,
      },
      { type: "component", name: "visually-hidden" },
      { type: "component", name: "icon-button" },
    ],
    related: ["visually-hidden", "icon-button", "skip-link", "spinner", "copy-button"],
    see: ["skip-link", "live-region", "aria", "tooltip"],
  },

  /* ───────────────────────────── Container queries ───────────────────────────── */
  {
    slug: "container-queries",
    term: "Container queries",
    short:
      "Container queries let CSS style an element based on the size of its parent container rather than the viewport, so a card adapts to the column it sits in.",
    body: [
      {
        type: "p",
        text: "Media queries ask how wide the viewport is. Container queries ask how wide the box the component sits in is, which is the question a component actually needs answered. The same card is 320px wide in a sidebar and 900px wide in the main column of the same page; a media query cannot tell those apart, a container query can. The feature is supported in most browsers, and it changes how reusable components are written: the component carries its own breakpoints, and the page no longer needs to know them.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "code",
        lang: "css",
        code: `.card-grid > * {
  container-type: inline-size;
  container-name: card;
}
.card { display: grid; gap: 1rem; }
@container card (min-width: 28rem) {
  .card { grid-template-columns: 160px 1fr; }
}
.card h3 { font-size: clamp(1rem, 4cqi, 1.5rem); }`,
      },
      {
        type: "list",
        items: [
          "**`container-type: inline-size`** turns an element into a query container for its width. It applies size containment on that axis, so the container's width cannot depend on its contents; it must get its size from its parent, a grid track or an explicit value.",
          "**`@container (min-width: ...)`** styles descendants of the nearest matching container. A `container-name` lets a rule target a specific ancestor instead of the nearest one.",
          "**Container units**: `cqw` and `cqi` are 1 percent of the container's width or inline size, `cqh` and `cqb` its height or block size, and they work anywhere a length does, which makes them a good base for [fluid typography](/glossary/fluid-typography) inside components.",
          "**Style queries** (`@container style(--variant: compact)`) switch on a custom property's value instead of a size. Support is newer and narrower than for size queries, so check before relying on them.",
        ],
      },
      { type: "h2", text: "In Tailwind CSS v4", id: "tailwind" },
      {
        type: "p",
        text: "[Tailwind v4](/glossary/tailwind-css-v4) has container queries built in. `@container` on the parent sets `container-type: inline-size`, and `@md:grid-cols-2` applies at the `md` container size, with the same names as the viewport breakpoints but prefixed with `@`. Named containers use `@container/card` on the parent and `@md/card:` on the descendants, and arbitrary sizes use `@min-[30rem]:`.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `<article className="@container rounded-xl border border-border p-4">
  <div className="grid gap-4 @md:grid-cols-[160px_1fr]">
    <img className="aspect-video w-full rounded-lg object-cover" src="/cover.jpg" alt="" />
    <div>
      <h3 className="text-base font-medium @lg:text-lg">Quarterly review</h3>
      <p className="text-sm text-fg-muted">Fits a sidebar or a full column.</p>
    </div>
  </div>
</article>`,
      },
      { type: "h2", text: "Pitfalls", id: "pitfalls" },
      {
        type: "list",
        items: [
          "**A container cannot size itself by its contents** on the queried axis. A flex item with `container-type: inline-size` and no width basis collapses. Give it `flex: 1`, `min-width: 0` or a grid track.",
          "**The container is not styled by its own query.** Rules inside `@container` apply to descendants of the container, not to the container itself. Wrap the component in an extra element when it needs to style its own root.",
          "**Nesting** resolves to the nearest ancestor container of the right type, which may be a parent component's wrapper rather than the one you meant; name containers when components nest.",
        ],
      },
      {
        type: "p",
        text: "MiniDev's [Card](/docs/card) header is declared a named container (`@container/card-header`) so the title, description and action can be rearranged with `@sm/card-header:` variants, and dashboard pieces such as [StatCard](/docs/stat-card), [ChartCard](/docs/chart-card) and [KpiRow](/docs/kpi-row) are meant to be dropped into [ResizablePanels](/docs/resizable-panels) and grids of any width. The [layout category](/components/layout) has the containers themselves.",
      },
      { type: "component", name: "card" },
      { type: "component", name: "stat-card" },
    ],
    related: ["card", "stat-card", "chart-card", "kpi-row", "resizable-panels"],
    see: ["fluid-typography", "clamp", "tailwind-css-v4", "card"],
  },

  /* ───────────────────────────── Fluid typography ───────────────────────────── */
  {
    slug: "fluid-typography",
    term: "Fluid typography",
    short:
      "Fluid typography sizes text with clamp() and viewport or container units so it scales smoothly between a minimum and a maximum with no breakpoint jumps.",
    body: [
      {
        type: "p",
        text: "Fluid typography replaces a ladder of font sizes per breakpoint with one expression that grows continuously with the viewport. A hero headline that is 2rem on a phone and 4rem on a desktop monitor, with every size in between on the screens in between, is written once with `clamp()`: a minimum, a preferred value that includes a viewport unit, and a maximum. The headline never looks too small on a tablet or too large on a small laptop, and there are no breakpoint jumps to tune.",
      },
      { type: "h2", text: "The formula", id: "formula" },
      {
        type: "code",
        lang: "css",
        code: `h1 {
  font-size: clamp(2rem, 1.2rem + 2.5vw, 4rem);
}
.card-title {
  font-size: clamp(1rem, 0.8rem + 1.5cqi, 1.5rem);
}`,
      },
      {
        type: "p",
        text: "The preferred value is a line. At a 320px viewport, `1.2rem + 2.5vw` is 1.2rem plus 8px, about 1.7rem, so the 2rem minimum wins; at 1440px it is 1.2rem plus 36px, about 3.45rem; past about 1790px it would exceed 4rem, where the maximum takes over. To derive the line from two chosen points, say 2rem at 480px and 4rem at 1280px, take the size difference over the width difference as the slope, solve for the intercept, and convert to rem and vw. Tools such as Utopia do the arithmetic and generate a whole type scale.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "The rem term is not optional. A value like `font-size: 3vw` ignores the user's browser zoom and font size preference, because viewport units do not grow when the user zooms, and that fails WCAG 1.4.4, which requires text to be resizable to 200 percent. Mixing in a rem-based term keeps zoom working; keep the rem part large enough that zooming to 200 percent still roughly doubles the text. Check the result at 320px and at 400 percent zoom, and keep body text at a fixed or barely fluid size. Fluid sizing is for headings and display text, where the visual range matters.",
      },
      { type: "h2", text: "Viewport or container", id: "viewport-or-container" },
      {
        type: "p",
        text: "`vw` scales with the window, which is right for a hero that spans the page. Inside components that can land in columns of different widths, use [container query](/glossary/container-queries) units such as `cqi` instead, so a card title scales with the card. Line height should tighten as size grows; a unitless `line-height` with a slightly smaller value for the largest sizes, or a second `clamp()`, handles that.",
      },
      { type: "h2", text: "In Tailwind CSS and MiniDev", id: "tailwind" },
      {
        type: "p",
        text: "Tailwind accepts the expression as an arbitrary value, `text-[clamp(2rem,1.2rem+2.5vw,4rem)]`, or as a theme token in `@theme` so it has a name:",
      },
      {
        type: "code",
        lang: "css",
        code: `@theme {
  --text-display: clamp(2.25rem, 1.5rem + 3vw, 4.5rem);
  --text-display--line-height: 1.05;
  --text-display--letter-spacing: -0.03em;
}
/* <h1 class="text-display">...</h1> */`,
      },
      {
        type: "p",
        text: "MiniDev UI uses a stepped scale for most text: [Heading](/docs/heading) and [Text](/docs/text) map `h1` through `h6` to fixed sizes, and page titles step once at the `sm` breakpoint, the way the glossary page title goes from 2.25rem to 3rem. Fluid sizing is reserved for marketing surfaces where a headline spans the full width: [HeroAurora](/docs/hero-aurora) sizes its title with `clamp(1.75rem, 3.5vw + 1rem, 3rem)`. The [clamp()](/glossary/clamp) entry covers the function itself.",
      },
      { type: "component", name: "heading" },
      { type: "component", name: "hero-aurora" },
    ],
    related: ["heading", "text", "hero-aurora", "prose", "section-header"],
    see: ["clamp", "container-queries", "tailwind-css-v4", "hero-section"],
  },

  /* ───────────────────────────── clamp() ───────────────────────────── */
  {
    slug: "clamp",
    term: "clamp() (CSS)",
    short:
      "The CSS clamp() function picks a value between a minimum and a maximum from a preferred value in between, so one expression replaces several media queries.",
    body: [
      {
        type: "p",
        text: "`clamp(min, preferred, max)` returns the preferred value, unless it is smaller than the minimum or larger than the maximum, in which case it returns that bound. It is shorthand for `max(min, min(preferred, max))`. The preferred value is usually something that changes with the viewport or container, such as `5vw` or `50%`, and the bounds keep it sane. Because it works anywhere a length, number, angle or time is allowed, one line of `clamp()` can replace a stack of media queries for font sizes, spacing, column widths and more.",
      },
      { type: "h2", text: "Examples", id: "examples" },
      {
        type: "code",
        lang: "css",
        code: `/* A readable column: at least 20rem, ideally 60% of the parent, never more than 70ch */
.prose { width: clamp(20rem, 60%, 70ch); }

/* Section spacing that breathes on wide screens */
.section { padding-block: clamp(2rem, 6vw, 6rem); }

/* A heading that scales with the viewport but keeps zoom working */
h1 { font-size: clamp(2rem, 1.2rem + 2.5vw, 4rem); }

/* A gap that follows the container */
.grid { gap: clamp(0.75rem, 2cqi, 2rem); }`,
      },
      {
        type: "list",
        items: [
          "**Units can be mixed** and math is allowed inside without `calc()`: `clamp(1rem, 0.5rem + 2vw, 2rem)` is valid as written.",
          "**If the minimum is larger than the maximum**, the minimum wins. That can happen by accident when both come from variables.",
          "**Only one preferred value.** For a curve with more than one segment, nest `clamp()` inside `clamp()`, or use `min()` and `max()` directly.",
          "**It works in custom properties**, so a `--space-section` token can be fluid and every component that reads it inherits the behavior.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "When the preferred value is a pure viewport unit, the result ignores browser zoom, because `vw` does not change when the user zooms the page. For text that fails WCAG 1.4.4, Resize Text. Always include a rem term in the preferred value for font sizes, and prefer rem-based bounds; [fluid typography](/glossary/fluid-typography) goes into the arithmetic. Spacing and widths have no such rule, but very large viewport-based padding on small screens still deserves a check at 320px.",
      },
      { type: "h2", text: "In Tailwind CSS v4", id: "tailwind" },
      {
        type: "p",
        text: "Use an arbitrary value where the expression is a one-off, or define a token in `@theme` when it will be reused:",
      },
      {
        type: "code",
        lang: "css",
        code: `@theme {
  --spacing-section: clamp(3rem, 8vw, 8rem);
  --text-display: clamp(2.25rem, 1.5rem + 3vw, 4.5rem);
}
/* <section class="py-section"> and <h1 class="text-display"> */`,
      },
      {
        type: "p",
        text: "Arbitrary values cannot contain spaces, so write the expression without them, `py-[clamp(2rem,6vw,6rem)]`, or with underscores where a space is required, which Tailwind converts back: `w-[clamp(20rem,_60%,_70ch)]`. [Container query](/glossary/container-queries) units inside `clamp()` tie the value to the component's own width rather than the page.",
      },
      { type: "h2", text: "In MiniDev", id: "minidev" },
      {
        type: "p",
        text: "Layout primitives such as [Container](/docs/container), [Stack](/docs/stack) and [Inset](/docs/inset) take fixed size steps so pages line up with the spacing scale, and `clamp()` belongs one level up, on section padding and display headings in marketing pages built with [Hero](/docs/hero) and [SectionHeader](/docs/section-header). Keep component internals on the scale and let the page breathe. The [layout category](/components/layout) lists the primitives.",
      },
      { type: "component", name: "container" },
      { type: "component", name: "hero" },
    ],
    related: ["heading", "container", "hero", "stack", "inset"],
    see: ["fluid-typography", "container-queries", "css-variables", "logical-properties"],
  },

  /* ───────────────────────────── Logical properties ───────────────────────────── */
  {
    slug: "logical-properties",
    term: "Logical properties",
    short:
      "Logical properties are CSS properties defined relative to writing direction, like margin-inline-start rather than margin-left, so layouts mirror in RTL.",
    body: [
      {
        type: "p",
        text: "Physical CSS properties name a side of the screen: `margin-left`, `padding-right`, `border-top`, `left: 0`. Logical properties name a side of the text flow instead: `margin-inline-start`, `padding-inline-end`, `border-block-start`, `inset-inline-start: 0`. In a left-to-right language the two sets mean the same thing. In Arabic, Hebrew, Persian or Urdu, where `dir=\"rtl\"` flips the inline direction, the logical versions flip with it, so a sidebar's margin, a chevron's offset and a chip's padding all end up on the correct side without a second stylesheet.",
      },
      { type: "h2", text: "The vocabulary", id: "vocabulary" },
      {
        type: "list",
        items: [
          "**Inline** is the direction text runs in a line; **block** is the direction lines stack. In English, inline is horizontal and block is vertical. In vertical writing modes, as in traditional Japanese, they swap.",
          "**Start and end** replace left and right, and top and bottom: `margin-inline-start`, `padding-block-end`.",
          "**Sizes**: `inline-size` and `block-size` replace `width` and `height`, with `min-` and `max-` variants.",
          "**Shorthands**: `margin-inline: 1rem 2rem` sets start and end at once; `inset-inline` and `inset-block` replace the `left` and `right` and `top` and `bottom` pairs.",
          "**Corners**: `border-start-start-radius` is the corner where the block start meets the inline start, the top left corner in English.",
          "**Values too**: `text-align: start`, `float: inline-start`, `clear: inline-end`.",
        ],
      },
      { type: "h2", text: "In Tailwind CSS v4", id: "tailwind" },
      {
        type: "p",
        text: "Tailwind has logical utilities beside the physical ones: `ms-4` and `me-4` for inline margins, `ps-` and `pe-` for padding, `start-0` and `end-0` for insets, `rounded-s-lg` and `rounded-e-lg` for corners, `border-s` and `border-e`, and `text-start` and `text-end`. The `rtl:` and `ltr:` variants exist for the few cases that cannot be expressed logically.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { ChevronRightIcon } from "lucide-react"

export function NavRow() {
  return (
    <li className="flex items-center gap-2 border-s-2 border-accent ps-3 pe-2">
      <span className="me-auto">Invoices</span>
      <ChevronRightIcon className="size-4 rtl:-scale-x-100" />
    </li>
  )
}`,
      },
      { type: "h2", text: "What stays physical", id: "physical" },
      {
        type: "list",
        items: [
          "**Icons with a direction.** A \"next\" chevron must point the other way in RTL; mirror it with `rtl:-scale-x-100`. Icons that depict a physical thing, such as a clock or a check, do not mirror.",
          "**Light and shadow.** A drop shadow falls where the light says, not where the text flows. MiniDev's shadows come from the [LightProvider](/docs/light-provider), which is physical by design.",
          "**Charts.** Time axes usually keep running left to right even in RTL interfaces; follow the convention of the data, not the text.",
          "**Keyboard arrows.** Left Arrow should still move left visually, so primitives need to know the direction to map keys. MiniDev's [Slider](/docs/slider) and [RangeSlider](/docs/range-slider) need Base UI's `DirectionProvider` under `dir=\"rtl\"`, or dragging and arrow keys run backwards.",
        ],
      },
      {
        type: "p",
        text: "Set `dir` on the `html` element, or on the container that changes language, and use logical properties by default. The cost is nothing in LTR, and the first RTL customer becomes a translation job instead of a layout rewrite. [LanguagePicker](/docs/language-picker) is where a product usually switches direction, and the layout primitives [Inset](/docs/inset), [Stack](/docs/stack) and [Cluster](/docs/cluster) use symmetric spacing that reads the same either way. The [tailwind-css-v4](/glossary/tailwind-css-v4) entry lists the rest of the utility names.",
      },
      { type: "component", name: "slider" },
      { type: "component", name: "language-picker" },
    ],
    related: ["slider", "language-picker", "inset", "stack", "cluster"],
    see: ["tailwind-css-v4", "css-variables", "clamp", "design-tokens"],
  },

  /* ───────────────────────────── View Transitions API ───────────────────────────── */
  {
    slug: "view-transitions",
    term: "View Transitions API",
    short:
      "The View Transitions API animates between two states of a page by snapshotting the old view, applying the change and crossfading or morphing to the new one.",
    body: [
      {
        type: "p",
        text: "`document.startViewTransition(callback)` takes a picture of the page, runs your callback to update the DOM, takes a second picture, then animates from the first to the second. By default it crossfades the whole page. Elements given a `view-transition-name` are captured separately and animate from their old position and size to their new ones, which produces the shared-element morph seen in native apps: a thumbnail growing into a hero image, a card sliding to its place in a reordered list. The animation runs on snapshots, so the real DOM can change in one step and the browser does the interpolation.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "code",
        lang: "tsx",
        code: `export function applyTheme(next: "light" | "dark") {
  const update = () => document.documentElement.classList.toggle("dark", next === "dark")
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!document.startViewTransition || reduce) return update()
  document.startViewTransition(update)
}`,
      },
      {
        type: "code",
        lang: "css",
        code: `/* Crossfade speed for the whole page */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 240ms;
}
/* A shared element: give it the same name in both states */
.cover { view-transition-name: cover; }`,
      },
      {
        type: "list",
        items: [
          "**Pseudo-elements** `::view-transition-old(name)` and `::view-transition-new(name)` hold the two snapshots and can be animated with ordinary CSS or the Web Animations API.",
          "**Names must be unique** on the page at any moment. For lists, generate them from an id, such as `item-42`.",
          "**The page is not interactive** during the transition, so keep it under about 300ms.",
          "**Cross-document transitions**, between full page loads on the same origin, are opted into with `@view-transition { navigation: auto; }` in CSS and no JavaScript. The same-document API is in most browsers; cross-document support arrived later and is worth checking for your audience.",
        ],
      },
      { type: "h2", text: "With React and Next.js", id: "react" },
      {
        type: "p",
        text: "React batches updates, so the state change has to be applied inside the callback, wrapped in `flushSync` when the DOM must be updated before the second snapshot. React has been adding a `ViewTransition` component that drives the same browser API from state and navigation changes; check the current React and Next.js docs for its status before depending on it. Until then, the plain API works in any client component.",
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A view transition is motion, so it belongs behind [prefers-reduced-motion](/glossary/prefers-reduced-motion): skip the call, or reduce it to a quick fade. Focus is not moved by the transition; after a route change, still move focus to the new content as you otherwise would. Do not name text blocks that reflow, since a morphing paragraph is unreadable mid-flight; name images, cards and containers.",
      },
      { type: "h2", text: "In MiniDev", id: "minidev" },
      {
        type: "p",
        text: "The [LightProvider](/docs/light-provider) material switch uses the API for its reveal: it starts a transition around the attribute change, then animates `::view-transition-new(root)` with a circular `clip-path` that grows from the point of the click until the new material covers the page, and it falls back to an instant switch when the browser lacks the API or the user prefers reduced motion. [ThemePicker](/docs/theme-picker) is the natural place for the same trick with [dark mode](/glossary/dark-mode). More motion pieces are in the [animation category](/components/animation).",
      },
      { type: "component", name: "light-provider" },
      { type: "component", name: "theme-picker" },
    ],
    related: ["light-provider", "theme-picker", "morph-panel", "animated-tabs"],
    see: ["prefers-reduced-motion", "micro-interactions", "dark-mode"],
  },

  /* ───────────────────────────── Scroll snap ───────────────────────────── */
  {
    slug: "scroll-snap",
    term: "Scroll snap",
    short:
      "CSS scroll snap makes a scroll container stop at defined points, such as the start of each slide, so carousels and galleries land cleanly without JavaScript.",
    body: [
      {
        type: "p",
        text: "Scroll snap turns an ordinary scrolling container into one that settles on its children. The container declares `scroll-snap-type` with an axis and a strictness, each child declares where it wants to snap with `scroll-snap-align`, and the browser does the rest: when scrolling ends, the view eases to the nearest snap point. It gives carousels, image galleries, product rails and paginated panels a native feel on touch and trackpads, with the browser's own scroll physics, momentum and accessibility, instead of a JavaScript slider that fights them.",
      },
      { type: "h2", text: "The properties", id: "properties" },
      {
        type: "code",
        lang: "css",
        code: `.rail {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 1rem;   /* where the snap edge sits, inside the padding */
  overscroll-behavior-x: contain;
}
.rail > * {
  flex: 0 0 80%;
  scroll-snap-align: start;
  scroll-snap-stop: always;      /* never skip a slide on a fast fling */
}`,
      },
      {
        type: "list",
        items: [
          "**`mandatory`** always lands on a snap point; **`proximity`** snaps only when the scroll ends near one. Use proximity for long content where mandatory would trap the reader between tall sections.",
          "**`scroll-snap-align`**: `start`, `center` or `end` of the child aligns with the container's snap area.",
          "**`scroll-padding`** on the container and **`scroll-margin`** on children adjust where the snap edge is, for example to leave a sticky header visible.",
          "**`scroll-snap-stop: always`** stops at every child even on a fast swipe, which carousels want and long lists do not.",
        ],
      },
      { type: "h2", text: "Pitfalls", id: "pitfalls" },
      {
        type: "list",
        items: [
          "**Full-page mandatory snapping** between viewport-height sections. On short screens or with large fonts, a section taller than the viewport becomes impossible to read in full, and the hijacked scroll annoys people. Use proximity, or do not snap the page.",
          "**Children larger than the container** on the snap axis combine badly with mandatory; the browser snaps to the start and the overflow is hard to reach.",
          "**Previous and Next buttons** should scroll by one child's width with `scrollBy`, and `scroll-behavior: smooth` should be turned off under [prefers-reduced-motion](/glossary/prefers-reduced-motion).",
          "**Hidden scrollbars** remove the only visual hint that content continues. If you hide them, show dots, a count or a partially visible next item.",
        ],
      },
      { type: "h2", text: "Accessibility", id: "accessibility" },
      {
        type: "p",
        text: "A snapping rail is still a scroll container, so keyboard users can reach it only if it is focusable: give it `tabIndex={0}`, a `role=\"region\"` and an `aria-label` such as \"Featured products\", and the arrow keys then scroll it. Provide buttons for Previous and Next so users who cannot swipe or scroll horizontally can move through it. Each slide should be real content, with headings and links, not a background image with text baked in. Autoplay needs a pause control and should stop while the rail is hovered or focused.",
      },
      { type: "h2", text: "In Tailwind CSS and MiniDev", id: "tailwind" },
      {
        type: "p",
        text: "Tailwind's `snap-x`, `snap-mandatory`, `snap-proximity`, `snap-start`, `snap-center` and `snap-always` utilities map directly onto the properties. MiniDev's [Carousel](/docs/carousel) is a `snap-x snap-mandatory` flex rail with `snap-start` slides at 80, 45 and 30 percent width across breakpoints, a labeled region that takes focus, Arrow key handling, and Previous and Next buttons that scroll by 85 percent of the rail's width:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { Carousel } from "@/components/ui/carousel"

export function Featured({ slides }: { slides: { id: string; title: string }[] }) {
  return (
    <Carousel label="Featured products">
      {slides.map((s) => (
        <article key={s.id} className="rounded-xl border border-border p-4">
          <h3 className="font-medium">{s.title}</h3>
        </article>
      ))}
    </Carousel>
  )
}`,
      },
      {
        type: "p",
        text: "[HorizontalProductRail](/docs/horizontal-product-rail) applies the same mechanics to a shop rail, [ImageGallery](/docs/image-gallery) is the grid counterpart for photos, and [ScrollArea](/docs/scroll-area) styles a scrolling panel without snapping. For lists that grow as you scroll, see [infinite scroll](/glossary/infinite-scroll); for lists too long to render at all, [virtual scrolling](/glossary/virtual-scrolling).",
      },
      { type: "component", name: "carousel" },
      { type: "component", name: "horizontal-product-rail" },
    ],
    related: ["carousel", "horizontal-product-rail", "image-gallery", "scroll-area", "filmstrip-scrub"],
    see: ["infinite-scroll", "prefers-reduced-motion", "virtual-scrolling", "logical-properties"],
  },

  /* ───────────────────────────── color-mix() ───────────────────────────── */
  {
    slug: "color-mix",
    term: "color-mix()",
    short:
      "The CSS color-mix() function blends two colors by percentage in a chosen color space, for example an accent mixed with transparent to tint it from one token.",
    body: [
      {
        type: "p",
        text: "`color-mix(in oklch, var(--accent) 20%, transparent)` produces the accent color at 20 percent opacity. `color-mix(in oklch, var(--accent), white 30%)` lightens it; `color-mix(in oklch, var(--warning) 70%, var(--fg))` darkens a warning yellow toward the text color until it is readable. The function takes a color space, two colors and optional percentages, and returns the blend. Its value is that the inputs can be [CSS variables](/glossary/css-variables), which means hover states, tints, borders and alpha variants can be derived from a token at runtime instead of being hand-picked and stored as more tokens. It is supported in most browsers.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "code",
        lang: "css",
        code: `.button {
  background: var(--accent);
}
.button:hover {
  background: color-mix(in oklch, var(--accent) 88%, black);
}
.chip {
  background: color-mix(in oklch, var(--accent) 12%, transparent);
  border-color: color-mix(in oklch, var(--accent) 30%, transparent);
  color: color-mix(in oklch, var(--accent) 70%, var(--fg));
}`,
      },
      {
        type: "list",
        items: [
          "**The color space matters.** Mixing in `srgb` darkens and desaturates through gray; mixing in `oklch` or `oklab` keeps the perceived lightness and hue steadier, which is why MiniDev mixes in [OKLCH](/glossary/oklch). Mixing with `transparent` is the one case where the space barely matters.",
          "**Percentages normalize.** If only one is given, the other is the remainder. If both are given and do not sum to 100, they are scaled to it; if they sum to less than 100, the result also picks up that much transparency.",
          "**Hue interpolation** in polar spaces can take the `shorter hue` or `longer hue` route; the default, shorter, is almost always right.",
          "**It is a computed value**, so it works inside custom properties and transitions, and it animates when both inputs are colors.",
        ],
      },
      { type: "h2", text: "Where it earns its place", id: "where" },
      {
        type: "list",
        items: [
          "**Opacity variants of a token**: `bg-accent/10` in [Tailwind CSS v4](/glossary/tailwind-css-v4) compiles to a `color-mix()` with transparent, which is how opacity modifiers work on variable-based colors.",
          "**State colors** derived from a base: hover, active and disabled shades of a brand color that changes per customer.",
          "**Readable text on tinted backgrounds**, by mixing the tone color toward the foreground until it clears [WCAG contrast](/glossary/wcag-contrast).",
          "**Theming with one input.** A customer picks one accent; every tint, border and soft background follows in both light and [dark mode](/glossary/dark-mode).",
        ],
      },
      { type: "h2", text: "Relative color syntax", id: "relative-color" },
      {
        type: "p",
        text: "The newer relative color syntax, `oklch(from var(--accent) l c h / 0.2)`, edits one channel of a color directly, such as its lightness, and is more precise than mixing when you know the target. It is available in most current browsers but arrived later than `color-mix()`, so for an alpha or a tint `color-mix()` remains the safe choice, and for channel math the relative syntax is cleaner where you can use it.",
      },
      { type: "h2", text: "In MiniDev", id: "minidev" },
      {
        type: "p",
        text: "MiniDev UI derives most tinted surfaces this way. [StatusBadge](/docs/status-badge) sets its warning text to `color-mix(in oklch, var(--warning) 70%, var(--fg))` so yellow stays readable on a pale yellow background, and the light-following effects behind [LightProvider](/docs/light-provider) fade the accent into transparent with a mix rather than a second variable. [ThemePicker](/docs/theme-picker) and [ColorPicker](/docs/color-picker) are where a single accent gets chosen; everything downstream mixes from it. The [OKLCH colors in Tailwind v4 guide](/guides/oklch-colors-tailwind-v4) walks through the palette.",
      },
      { type: "component", name: "status-badge" },
      { type: "component", name: "light-provider" },
    ],
    related: ["status-badge", "badge", "light-provider", "theme-picker", "color-picker"],
    see: ["oklch", "css-variables", "design-tokens", "dark-mode"],
  },
]
