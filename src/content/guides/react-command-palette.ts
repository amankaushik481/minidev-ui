import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-command-palette",
  title: "Add a Cmd+K command palette to your React app",
  description:
    "Add a Cmd+K command palette to React or Next.js: a global shortcut, grouped commands, fuzzy search, recent items, router navigation and combobox accessibility.",
  date: "2026-09-30",
  keywords: [
    "react command palette",
    "cmd k menu react",
    "command menu nextjs",
    "react cmdk",
    "keyboard shortcuts react",
  ],
  related: ["command-palette", "command-dialog", "command-item", "kbd", "shortcut-cheat-sheet", "dialog"],
  body: [
    {
      type: "p",
      text: "A Cmd+K command palette in React is a modal dialog with a search input and a filtered list of actions, opened by a global `keydown` listener that checks for `k` with `metaKey` or `ctrlKey`. What makes it feel good is everything around that: commands grouped by kind, fuzzy matching that forgives typos, recent items at the top, arrow key navigation while focus stays in the input, and running a command with Enter.",
    },
    {
      type: "p",
      text: "This guide starts with the free MiniDev UI [CommandPalette](/docs/command-palette) for a working palette in a few lines, then builds the full version from [Dialog](/docs/dialog), [CommandItem](/docs/command-item) and [Kbd](/docs/kbd), and adds a [ShortcutCheatSheet](/docs/shortcut-cheat-sheet). For background on the pattern itself, see the [command palette glossary entry](/glossary/command-palette).",
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/command-palette.json\nnpx shadcn@latest add https://ui.minidev.pro/r/command-item.json\nnpx shadcn@latest add https://ui.minidev.pro/r/kbd.json\nnpx shadcn@latest add https://ui.minidev.pro/r/shortcut-cheat-sheet.json",
    },
    {
      type: "p",
      text: "`command-palette` brings in `dialog`, which is built on Base UI and handles focus trapping, Escape, the backdrop and returning focus to whatever opened it. Import the token stylesheet once (`@import \"minidev-ui-kit/styles.css\"` or a copy of [styles.css](https://ui.minidev.pro/r/styles.css)).",
    },

    { type: "h2", text: "A working palette in a few lines", id: "quick-start" },
    {
      type: "p",
      text: "`CommandPalette` takes `open`, `onOpenChange` and `commands` of `{ id, label, onSelect? }`. It renders a search field and a list, filters by substring as you type, and closes after running a command. `CommandDialog` has the same props and wraps it, if you prefer that name.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { CommandPalette } from "@/components/ui/command-palette"

export function QuickPalette() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  useCmdK(() => setOpen((o) => !o)) // defined in the next section
  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      commands={[
        { id: "dashboard", label: "Go to dashboard", onSelect: () => router.push("/dashboard") },
        { id: "invite", label: "Invite a teammate", onSelect: () => router.push("/settings/team?invite=1") },
        { id: "new-project", label: "Create project", onSelect: () => router.push("/projects/new") },
      ]}
    />
  )
}`,
    },
    {
      type: "p",
      text: "That is enough for a handful of commands. It is deliberately minimal: a flat list, plain substring matching, mouse selection only, and the query stays filled in between openings. The rest of this guide builds the version you want once the list grows past a dozen items.",
    },

    { type: "h2", text: "The global keyboard shortcut", id: "global-shortcut" },
    {
      type: "p",
      text: "macOS users expect Cmd+K and everyone else Ctrl+K. Accept both rather than sniffing the platform: nobody presses Ctrl+K on a Mac by accident.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "hooks/use-cmd-k.ts",
      code: `import * as React from "react"

export function useCmdK(onTrigger: () => void) {
  const ref = React.useRef(onTrigger)
  React.useEffect(() => { ref.current = onTrigger })

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey || e.repeat) return
      const target = e.target as HTMLElement | null
      if (target?.isContentEditable) return // rich text editors use Cmd+K for links
      e.preventDefault()
      ref.current()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])
}`,
    },
    {
      type: "list",
      items: [
        "`preventDefault()` matters: Ctrl+K focuses the browser's search bar in Chrome and Firefox.",
        "Cmd+K is safe to capture inside ordinary inputs because it does not type anything. Skip `contentEditable` targets, where it usually means \"insert link\".",
        "Single key shortcuts are different. `/` or `?` must be ignored while the user types in an `input`, `textarea` or `select`, or they could never type those characters.",
        "The ref keeps the listener registered once while always calling the latest callback.",
        "Mount the palette and the hook once, in the root layout of the signed in area, so every page gets it.",
      ],
    },

    { type: "h2", text: "Model commands as data", id: "command-model" },
    {
      type: "p",
      text: "Give every command a stable `id` (for recents), a `group`, optional `keywords` for synonyms, and either an `href` or a `perform` function:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/commands.ts",
      code: `export type Command = {
  id: string
  label: string
  group: "Navigation" | "Actions" | "Preferences"
  keywords?: string[]
  shortcut?: string
  href?: string
  perform?: () => void
}

export const COMMANDS: Command[] = [
  { id: "nav-dashboard", label: "Go to dashboard", group: "Navigation", href: "/dashboard", shortcut: "G D" },
  { id: "nav-billing", label: "Go to billing", group: "Navigation", href: "/billing", keywords: ["invoices", "plan", "payment"] },
  { id: "nav-settings", label: "Open settings", group: "Navigation", href: "/settings", keywords: ["preferences", "profile"] },
  { id: "new-project", label: "Create project", group: "Actions", href: "/projects/new", shortcut: "C" },
  { id: "invite", label: "Invite a teammate", group: "Actions", href: "/settings/team?invite=1", keywords: ["member", "user", "add"] },
  { id: "theme", label: "Toggle dark mode", group: "Preferences", keywords: ["theme", "light"] },
]`,
    },
    {
      type: "p",
      text: "Commands that need runtime values, like `theme` above, get their `perform` attached where the value is available, for example `{ ...cmd, perform: () => setTheme(next) }` inside a component. Page specific commands (\"Archive this project\") can be registered from a context while that page is mounted and removed on unmount.",
    },

    { type: "h2", text: "Fuzzy filtering", id: "fuzzy-filtering" },
    {
      type: "p",
      text: "Substring matching fails on \"gobil\" for \"Go to billing\". A small scorer that prefers prefix matches, then word starts, then substrings, then in-order subsequences covers most of what people type, with no dependency:",
    },
    {
      type: "code",
      lang: "ts",
      code: `export function score(text: string, query: string) {
  const t = text.toLowerCase()
  const q = query.toLowerCase().trim()
  if (!q) return 1
  if (t.startsWith(q)) return 3
  if (t.includes(" " + q)) return 2.5
  if (t.includes(q)) return 2
  let i = 0
  let gaps = 0
  for (const ch of t) {
    if (ch === q[i]) i++
    else if (i > 0) gaps++
    if (i === q.length) return 1 - Math.min(gaps, 20) / 40 // 0.5 to 1
  }
  return 0
}

export function rank(commands: Command[], query: string) {
  return commands
    .map((c) => ({ c, s: Math.max(score(c.label, query), ...(c.keywords ?? []).map((k) => score(k, query) * 0.9)) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.c)
}`,
    },
    {
      type: "p",
      text: "Keywords score slightly below the label so a direct hit wins, and `Array.prototype.sort` is stable, so ties keep your authored order. With hundreds of commands or long documents to search, reach for a library such as `match-sorter` or `fuse.js`, or query the server for records and show them as their own group.",
    },

    { type: "h2", text: "Groups and recent items", id: "groups-and-recents" },
    {
      type: "p",
      text: "Show groups while the query is empty, because that is when people browse. Once they type, show one ranked list, because they are searching. Keep recent command IDs in `localStorage` and put them first:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const RECENT_KEY = "command-menu-recent"

export function useRecent(max = 5) {
  const [recent, setRecent] = React.useState<string[]>([])
  React.useEffect(() => {
    try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]")) } catch {}
  }, [])
  const push = React.useCallback((id: string) => {
    setRecent((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, max)
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [max])
  return { recent, push }
}

function buildSections(commands: Command[], query: string, recentIds: string[]) {
  if (query.trim()) return [{ title: "Results", items: rank(commands, query).slice(0, 50) }]
  const recent = recentIds.map((id) => commands.find((c) => c.id === id)).filter((c): c is Command => !!c)
  const rest = commands.filter((c) => !recentIds.includes(c.id))
  const groups = [...new Set(rest.map((c) => c.group))].map((title) => ({ title, items: rest.filter((c) => c.group === title) }))
  return recent.length ? [{ title: "Recent", items: recent }, ...groups] : groups
}`,
    },
    {
      type: "p",
      text: "Recent commands are removed from their normal group so an item never appears twice, which also keeps option IDs unique. Storage is read in an effect, not during render, so the server and client HTML match.",
    },

    { type: "h2", text: "Build the full palette", id: "build-the-palette" },
    {
      type: "p",
      text: "`CommandItem` renders a row with an optional `shortcut` hint and an `active` highlight. To use it as a listbox option it needs an `id`, a `role` and `aria-selected`, so let it pass extra props through. In your copy:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/command-item.tsx",
      code: `function CommandItem({
  children,
  shortcut,
  active,
  onSelect,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "onSelect"> & {
  shortcut?: string
  active?: boolean
  onSelect?: () => void
}) {
  return (
    <button type="button" data-slot="command-item" onClick={onSelect} className={cn(/* unchanged */)} {...props}>
      <span>{children}</span>
      {shortcut ? <kbd className="font-mono text-[10px] text-fg-muted">{shortcut}</kbd> : null}
    </button>
  )
}`,
    },
    {
      type: "p",
      text: "`onSelect` is omitted from the button props because the native attribute has a different type. Now the palette itself. Focus stays in the input the whole time; the arrow keys change which option is active, and `aria-activedescendant` tells assistive technology which one that is:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/command-menu.tsx",
      code: `"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CommandItem } from "@/components/ui/command-item"
import type { Command } from "@/lib/commands"

export function CommandMenu({ open, onOpenChange, commands }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  commands: Command[]
}) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const { recent, push } = useRecent()
  const listId = React.useId()
  const optionId = (id: string) => listId + "-" + id

  const sections = React.useMemo(() => buildSections(commands, query, recent), [commands, query, recent])
  const flat = sections.flatMap((s) => s.items)
  const current = flat[active]

  React.useEffect(() => setActive(0), [query])
  React.useEffect(() => { if (!open) setQuery("") }, [open])
  React.useEffect(() => {
    if (current) document.getElementById(optionId(current.id))?.scrollIntoView({ block: "nearest" })
  }, [current])

  function run(cmd: Command) {
    onOpenChange(false)
    push(cmd.id)
    if (cmd.href) router.push(cmd.href)
    else cmd.perform?.()
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!flat.length) return
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % flat.length) }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + flat.length) % flat.length) }
    if (e.key === "Enter" && current) { e.preventDefault(); run(current) }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="top-[20%] max-w-lg translate-y-0 gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <SearchIcon className="size-4 text-fg-muted" aria-hidden />
          <input
            role="combobox"
            aria-expanded
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={current ? optionId(current.id) : undefined}
            aria-label="Search commands"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            className="h-11 w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div id={listId} role="listbox" aria-label="Commands" className="max-h-80 overflow-auto p-1">
          {sections.map((section) => (
            <div key={section.title} role="group" aria-label={section.title}>
              <p aria-hidden className="px-2.5 pt-2 pb-1 text-[11px] font-medium text-fg-muted">{section.title}</p>
              {section.items.map((cmd) => (
                <CommandItem
                  key={cmd.id}
                  id={optionId(cmd.id)}
                  role="option"
                  aria-selected={cmd.id === current?.id}
                  tabIndex={-1}
                  active={cmd.id === current?.id}
                  shortcut={cmd.shortcut}
                  onSelect={() => run(cmd)}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseMove={() => setActive(flat.indexOf(cmd))}
                >
                  {cmd.label}
                </CommandItem>
              ))}
            </div>
          ))}
          {flat.length === 0 ? <p className="px-2.5 py-6 text-center text-sm text-fg-muted">No results for "{query}"</p> : null}
        </div>
        <div role="status" className="sr-only">{query ? flat.length + " results" : ""}</div>
      </DialogContent>
    </Dialog>
  )
}`,
    },
    {
      type: "list",
      items: [
        "The Base UI dialog moves focus to the first focusable element when it opens, which is the input, and returns focus to the trigger when it closes. Escape closes it without extra code.",
        "Options have `tabIndex={-1}` and `onMouseDown` prevents the default, so clicking an option never pulls focus out of the input.",
        "Hovering updates the active option with `onMouseMove` rather than `onMouseEnter`, so a list scrolling under a still pointer does not steal the keyboard selection.",
        "The query clears when the palette closes, and the active option resets to the top on every keystroke.",
      ],
    },

    { type: "h2", text: "Navigate with the Next.js router", id: "navigation" },
    {
      type: "p",
      text: "In the App Router, `useRouter` comes from `next/navigation` and `router.push(href)` performs a client side navigation. In the Pages Router the hook comes from `next/router` and `push` works the same way. Close the palette before navigating so the dialog's exit animation and focus restore are not interrupted by the route change. For instant results, call `router.prefetch(current.href)` when an option becomes active; routes rendered by `Link` are prefetched automatically, but commands are not links.",
    },
    {
      type: "p",
      text: "Commands that open external URLs should use `window.open(url, \"_blank\", \"noopener\")` and say so in the label (\"Open docs in a new tab\").",
    },

    { type: "h2", text: "Accessibility: the combobox pattern", id: "accessibility" },
    {
      type: "p",
      text: "A command palette is a [combobox](/glossary/combobox) with a listbox popup, inside a [modal dialog](/glossary/modal-dialog). The attributes in the component above map to the WAI-ARIA pattern:",
    },
    {
      type: "table",
      head: ["Element", "Attributes", "Why"],
      rows: [
        ["Search input", "`role=\"combobox\"`, `aria-expanded`, `aria-controls`, `aria-autocomplete=\"list\"`", "Announces a text field that controls a list of suggestions"],
        ["Input", "`aria-activedescendant`", "Points at the active option while DOM focus stays in the input"],
        ["List", "`role=\"listbox\"` with an `aria-label`", "Names the popup"],
        ["Group", "`role=\"group\"` with an `aria-label`", "Screen readers announce \"Navigation\" when entering the group"],
        ["Row", "`role=\"option\"`, `aria-selected`, unique `id`", "The item that is read out as you arrow through"],
        ["Status", "`role=\"status\"`", "Announces the result count after typing"],
      ],
    },
    {
      type: "callout",
      tone: "note",
      text: "Keep the visible active style and `aria-selected` driven by the same state (`current` above). If they can disagree, keyboard users see one item highlighted while screen reader users hear another.",
    },
    {
      type: "p",
      text: "Also provide a visible way to open the palette, not only the shortcut: a search button in the topbar with the shortcut drawn in [Kbd](/docs/kbd) keycaps and `aria-keyshortcuts` for assistive technology:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<Button variant="outline" size="sm" aria-keyshortcuts="Meta+K Control+K" onClick={() => setOpen(true)} className="w-56 justify-between text-fg-muted">
  <span className="inline-flex items-center gap-2"><SearchIcon /> Search</span>
  <KbdGroup>
    <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</Button>`,
    },
    {
      type: "p",
      text: "Compute `isMac` in an effect (`/Mac|iPhone|iPad/.test(navigator.userAgent)`) after mount and default to `false`, so the server render and the first client render agree.",
    },

    { type: "h2", text: "A shortcut cheat sheet", id: "shortcut-cheat-sheet" },
    {
      type: "p",
      text: "Once the palette lists shortcuts, people want them all in one place. `ShortcutCheatSheet` takes `rows` of `{ keys, action }` and renders each key as a keycap. Open it in a dialog on `?` (skipping inputs, as discussed) and add a \"Keyboard shortcuts\" command to the palette:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<Dialog open={helpOpen} onOpenChange={setHelpOpen}>
  <DialogContent className="max-w-md p-0">
    <DialogTitle className="sr-only">Keyboard shortcuts</DialogTitle>
    <ShortcutCheatSheet
      className="border-0"
      rows={[
        { keys: [isMac ? "⌘" : "Ctrl", "K"], action: "Open command menu" },
        { keys: [isMac ? "⌘" : "Ctrl", "B"], action: "Toggle sidebar" },
        { keys: ["C"], action: "Create project" },
        { keys: ["?"], action: "Show this list" },
      ]}
    />
  </DialogContent>
</Dialog>`,
    },
    {
      type: "p",
      text: "The component keys rows by `action` and keycaps by their label, so keep actions unique and avoid a row that repeats a key (such as `G G`); write it as one keycap or give the second a different label. Generate both the palette's `shortcut` hints and these rows from one list so they never drift apart.",
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All free and MIT licensed. The [navigation category](/components/navigation) has the rest of the menus, and the [sidebar layout guide](/guides/shadcn-sidebar-layout) shows where the palette trigger and the Cmd+B shortcut live in an app shell. If you want a product with this level of keyboard polish built for you, the [MiniDev studio](https://minidev.pro) builds complete apps with this kit.",
    },
    { type: "component", name: "command-palette" },
    { type: "component", name: "command-dialog" },
    { type: "component", name: "command-item" },
    { type: "component", name: "kbd" },
    { type: "component", name: "shortcut-cheat-sheet" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "How do I listen for Cmd+K in React?",
      a: "Add a `keydown` listener on `document` in a `useEffect`, check `e.key.toLowerCase() === \"k\"` and `e.metaKey || e.ctrlKey`, call `preventDefault()` and toggle your open state. Remove the listener in the effect's cleanup.",
    },
    {
      q: "Should I use cmdk or build my own command palette?",
      a: "`cmdk` is a good headless choice if you want filtering and keyboard handling done for you. Building it yourself is about 150 lines, as shown here, and gives you full control over ranking, groups, recents and markup. Either way, keep the combobox and listbox semantics.",
    },
    {
      q: "Why does focus stay in the input instead of moving to the options?",
      a: "So the user can keep typing while choosing. The combobox pattern uses `aria-activedescendant` on the input to point at the active option, which screen readers announce as if it had focus.",
    },
    {
      q: "How do I navigate from a command palette in Next.js?",
      a: "Use `useRouter` from `next/navigation` in the App Router (or `next/router` in the Pages Router), close the palette, then call `router.push(href)`.",
    },
  ],
}

export default guide
