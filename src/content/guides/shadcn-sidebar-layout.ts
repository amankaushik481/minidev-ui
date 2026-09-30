import type { Guide } from "../types"

const guide: Guide = {
  slug: "shadcn-sidebar-layout",
  title: "Build a collapsible sidebar layout for a SaaS app",
  description:
    "Build a collapsible React sidebar layout in Next.js: active links with usePathname, a Cmd+B shortcut, collapsed state saved in a cookie and a mobile drawer.",
  date: "2026-09-30",
  keywords: [
    "shadcn sidebar",
    "react sidebar layout",
    "collapsible sidebar tailwind",
    "nextjs app router sidebar",
    "saas app shell",
  ],
  related: [
    "app-shell",
    "sidebar",
    "collapsible-sidebar",
    "sidebar-section",
    "nested-nav",
    "topbar",
    "mobile-nav-drawer",
    "org-switcher",
  ],
  body: [
    {
      type: "p",
      text: "A collapsible sidebar layout for a SaaS app in Next.js is a server `layout.tsx` that reads the saved collapsed state from a cookie, a small client shell that holds that state and toggles it with a button and Cmd+B, a sidebar of real links that mark the current route with `usePathname` and `aria-current`, and a drawer that replaces the sidebar on small screens. Every page under the layout keeps the shell mounted, so navigation never resets it.",
    },
    {
      type: "p",
      text: "This guide assembles that layout from free MiniDev UI parts: [AppShell](/docs/app-shell), [Sidebar](/docs/sidebar), [CollapsibleSidebar](/docs/collapsible-sidebar), [SidebarSection](/docs/sidebar-section), [NestedNav](/docs/nested-nav), [Topbar](/docs/topbar), [MobileNavDrawer](/docs/mobile-nav-drawer) and [OrgSwitcher](/docs/org-switcher). Some of them are deliberately small, so where a part stops short of production behavior, the guide shows the few lines to add in your copy.",
    },

    { type: "h2", text: "Install the parts", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/app-shell.json\nnpx shadcn@latest add https://ui.minidev.pro/r/sidebar.json\nnpx shadcn@latest add https://ui.minidev.pro/r/collapsible-sidebar.json\nnpx shadcn@latest add https://ui.minidev.pro/r/sidebar-section.json\nnpx shadcn@latest add https://ui.minidev.pro/r/nested-nav.json\nnpx shadcn@latest add https://ui.minidev.pro/r/topbar.json\nnpx shadcn@latest add https://ui.minidev.pro/r/mobile-nav-drawer.json\nnpx shadcn@latest add https://ui.minidev.pro/r/org-switcher.json",
    },
    {
      type: "p",
      text: "Files land in `components/ui`, and you own them. Add the token stylesheet once (`@import \"minidev-ui-kit/styles.css\"` or a copy of [styles.css](https://ui.minidev.pro/r/styles.css)) so `bg-sunken`, `border-border` and the `ease-hairline` easing resolve.",
    },

    { type: "h2", text: "Start with AppShell", id: "app-shell" },
    {
      type: "p",
      text: "`AppShell` is the whole frame in 20 lines: an `aside` for the sidebar that is hidden below the `md` breakpoint, a column with the `topbar` slot, and a scrolling content area. It is the fastest way to see your navigation in place:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<AppShell
  className="h-dvh rounded-none border-0"
  sidebar={<nav aria-label="Main" className="py-2"><SidebarNavLinks /></nav>}
  topbar={<Topbar title="Projects" />}
>
  {children}
</AppShell>`,
    },
    {
      type: "p",
      text: "Two things to know. `AppShell` is styled as a framed panel (rounded border, `min-h-[420px]`), so override that with `className` for a full page. And its sidebar slot is already an `aside` with a fixed `w-56`, so pass it content rather than the `Sidebar` component, and expect a fixed width. When you need collapsing, you have outgrown `AppShell`: copy its flex structure into your own shell, as the rest of this guide does.",
    },

    { type: "h2", text: "Put the shell in a route group layout", id: "route-group-layout" },
    {
      type: "p",
      text: "Use an App Router route group so the product pages share the shell and your marketing pages do not. The group folder name in parentheses does not appear in the URL:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(dashboard)/layout.tsx",
      code: `import { cookies } from "next/headers"
import { Shell } from "./shell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const collapsed = cookieStore.get("sidebar_collapsed")?.value === "1"
  return <Shell defaultCollapsed={collapsed}>{children}</Shell>
}`,
    },
    {
      type: "p",
      text: "Layouts persist across navigations inside the group, so the sidebar's state, scroll position and open menus survive moving from `/projects` to `/team`. The layout stays a server component; only `Shell` needs `\"use client\"`. `cookies()` is async since Next.js 15, hence the `await`.",
    },

    { type: "h2", text: "Navigation links with an active state", id: "active-state" },
    {
      type: "p",
      text: "Keep the navigation in one typed config so the desktop sidebar and the mobile drawer render the same items:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/nav.ts",
      code: `import { CreditCardIcon, FolderIcon, HomeIcon, SettingsIcon, UsersIcon, type LucideIcon } from "lucide-react"

export type NavItem = { href: string; label: string; icon: LucideIcon }

export const NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Workspace",
    items: [
      { href: "/dashboard", label: "Overview", icon: HomeIcon },
      { href: "/projects", label: "Projects", icon: FolderIcon },
      { href: "/team", label: "Team", icon: UsersIcon },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/billing", label: "Billing", icon: CreditCardIcon },
      { href: "/settings", label: "Settings", icon: SettingsIcon },
    ],
  },
]`,
    },
    {
      type: "p",
      text: "`SidebarNavItem` from the sidebar file is a `button`, which is right for actions but wrong for navigation: links should be links, so middle click, open in new tab and prefetching work. Reuse its classes on a Next.js `Link` and compute the active state from `usePathname()`:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(dashboard)/app-sidebar.tsx",
      code: `"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarSection } from "@/components/ui/sidebar-section"
import { cn } from "@/lib/utils"
import { NAV, type NavItem } from "@/lib/nav"

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/")
}

function SidebarLink({ href, label, icon: Icon, collapsed }: NavItem & { collapsed?: boolean }) {
  const pathname = usePathname()
  const active = isActive(pathname, href)
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      title={collapsed ? label : undefined}
      className={cn(
        "mx-2 flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-fg-muted outline-none",
        "transition-[background-color,color] duration-[70ms] hover:bg-sunken hover:text-fg",
        "focus-visible:ring-2 focus-visible:ring-accent data-[active]:bg-sunken data-[active]:text-fg"
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className={collapsed ? "sr-only" : "truncate"}>{label}</span>
    </Link>
  )
}

export function SidebarNavLinks({ collapsed }: { collapsed?: boolean }) {
  return NAV.map((section) => (
    <SidebarSection key={section.title} title={collapsed ? undefined : section.title}>
      {section.items.map((item) => (
        <SidebarLink key={item.href} {...item} collapsed={collapsed} />
      ))}
    </SidebarSection>
  ))
}`,
    },
    {
      type: "list",
      items: [
        "`aria-current=\"page\"` tells screen readers which link is the current page. The `data-active` attribute drives the visual state, so the two can never disagree.",
        "Prefix matching keeps **Projects** highlighted on `/projects/42/settings`. The trailing slash in `href + \"/\"` stops `/team` from matching `/teams`.",
        "When collapsed, the label becomes `sr-only` instead of being removed, so the link keeps its accessible name, and `title` gives sighted mouse users a hint.",
        "`SidebarSection` renders its `title` as a small uppercase label. Drop the title when collapsed; a 56px rail has no room for it.",
      ],
    },
    { type: "h3", text: "Nested navigation" },
    {
      type: "p",
      text: "For a docs tree or a project with sub pages, `NestedNav` renders `nodes` of `{ id, label, children? }` as an indented disclosure tree. Out of the box its rows are buttons that only expand and collapse, and every branch starts open. For navigation, add an optional `href` to `NavNode` and render a `Link` for leaves, put `aria-expanded` on the branch buttons, and initialize `open` to whether the branch contains the current path.",
    },

    { type: "h2", text: "Collapse the sidebar", id: "collapse" },
    {
      type: "p",
      text: "`Sidebar` takes a `collapsed` prop that switches its width from `w-56` to `w-14` and sets `data-collapsed` on the element. `CollapsibleSidebar` wraps it with a toggle button that floats on the edge, but it keeps the state inside, so nothing else can read or change it. That is fine for a prototype. For a keyboard shortcut and persistence, control `Sidebar` from your shell:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(dashboard)/shell.tsx",
      code: `"use client"
import * as React from "react"
import { PanelLeftIcon } from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"
import { Topbar } from "@/components/ui/topbar"
import { Button } from "@/components/ui/button"
import { MobileNavDrawer } from "@/components/ui/mobile-nav-drawer"
import { SidebarNavLinks } from "./app-sidebar"
import { WorkspaceSwitcher } from "./workspace-switcher"

export function Shell({ defaultCollapsed, children }: { defaultCollapsed: boolean; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const toggle = React.useCallback(() => setCollapsed((c) => !c), [])

  React.useEffect(() => {
    document.cookie = "sidebar_collapsed=" + (collapsed ? "1" : "0") + "; path=/; max-age=31536000; samesite=lax"
  }, [collapsed])

  useToggleShortcut(toggle)

  return (
    <div className="flex h-dvh overflow-hidden bg-bg">
      <div id="app-sidebar" className="hidden md:flex">
        <Sidebar collapsed={collapsed} className="transition-[width] duration-200 ease-hairline motion-reduce:transition-none">
          {collapsed ? null : <WorkspaceSwitcher />}
          <nav aria-label="Main" className="flex-1 overflow-x-hidden overflow-y-auto">
            <SidebarNavLinks collapsed={collapsed} />
          </nav>
        </Sidebar>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          left={
            <>
              <MobileNavDrawer className="md:hidden">
                <SidebarNavLinks />
              </MobileNavDrawer>
              <Button
                variant="ghost"
                size="icon-sm"
                className="hidden md:inline-flex"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!collapsed}
                aria-controls="app-sidebar"
                onClick={toggle}
              >
                <PanelLeftIcon />
              </Button>
            </>
          }
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}`,
    },
    {
      type: "p",
      text: "Only the width transitions, over 200ms with the hairline easing, and `motion-reduce:transition-none` makes the change instant for people who ask for less motion. Animating `width` does reflow the content column on each frame; on a heavy page, switch to animating a `transform` on an overlay rail instead, or skip the animation.",
    },

    { type: "h2", text: "Toggle with Cmd+B", id: "keyboard-shortcut" },
    {
      type: "p",
      text: "Cmd+B on macOS and Ctrl+B elsewhere is the convention from code editors, and the shadcn sidebar uses it too. Listen on `window`, match the key and modifier exactly, and step aside when the user is typing, because Cmd+B means bold in a rich text editor:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `function useToggleShortcut(toggle: () => void) {
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "b" || !(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey || e.repeat) return
      const target = e.target as HTMLElement | null
      if (target?.isContentEditable || target?.closest("input, textarea, select")) return
      e.preventDefault()
      toggle()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [toggle])
}`,
    },
    {
      type: "p",
      text: "`preventDefault` stops the browser's own Ctrl+B action (the bookmarks sidebar in Firefox, for example). Document the shortcut in the toggle's tooltip or a shortcuts sheet; an undiscoverable shortcut helps nobody. The [command palette guide](/guides/react-command-palette) covers a shared shortcut registry if you have more than a couple.",
    },

    { type: "h2", text: "Persist the collapsed state without a flash", id: "persist-collapsed-state" },
    {
      type: "p",
      text: "If you store the collapsed flag in `localStorage`, the server renders the expanded sidebar, the client reads storage after hydration, and the sidebar visibly snaps shut. A cookie avoids that: the shell writes it on every change, the layout reads it on the server, and the first HTML already has the right width. It is the same idea as avoiding a theme flash, covered in the [dark mode guide](/guides/nextjs-dark-mode-no-flash).",
    },
    {
      type: "callout",
      tone: "note",
      text: "Calling `cookies()` makes the layout render dynamically on each request. That is normal for a signed in app, which is dynamic anyway. With Cache Components enabled in Next.js 16, read the cookie in a component wrapped in `<Suspense>` so the rest of the layout can still prerender. For a statically rendered area, use `localStorage` and accept the snap, or hide the sidebar until mounted.",
    },

    { type: "h2", text: "Mobile drawer", id: "mobile-drawer" },
    {
      type: "p",
      text: "Below `md` the desktop sidebar is hidden and a menu button in the topbar opens `MobileNavDrawer`. The shipped drawer is a starting point: it renders a fixed list of links from the MiniDev site and opens from the right. Make these edits in your copy:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/mobile-nav-drawer.tsx",
      code: `function MobileNavDrawer({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname() // from "next/navigation"

  // Close after navigating, and on Escape.
  React.useEffect(() => setOpen(false), [pathname])
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // ...same trigger button, then in the panel:
  // "absolute inset-y-0 left-0 flex w-72 flex-col border-r ..." (open from the sidebar's side)
  // <nav aria-label="Main" className="flex flex-col gap-1">{children}</nav> (replaces the LINKS map)
}`,
    },
    {
      type: "list",
      items: [
        "Pass the same `SidebarNavLinks` as children so both navigations stay in sync with `lib/nav.ts`.",
        "Closing on `pathname` change replaces the per-link `onClick`, which also covers links inside nested sections.",
        "Change the hardcoded heading in the panel to your product name.",
        "The panel is `role=\"dialog\"` with `aria-modal`, but it does not trap focus. For full [modal dialog](/glossary/modal-dialog) behavior, move the panel into the `dialog` component, which traps focus and returns it to the menu button on close.",
      ],
    },

    { type: "h2", text: "Topbar and workspace switcher", id: "topbar-org-switcher" },
    {
      type: "p",
      text: "`Topbar` is a 56px header with a `left` slot (or a plain `title`) and a `right` slot. Put breadcrumbs or the page title on the left and search, notifications and the user menu on the right. `OrgSwitcher` takes `orgs` of `{ id, name, plan? }`, the current `value` and an `onChange` with the chosen id; it renders a popover with a check next to the current workspace. Stretch it to the sidebar width and route on change:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(dashboard)/workspace-switcher.tsx",
      code: `"use client"
import { useRouter } from "next/navigation"
import { OrgSwitcher } from "@/components/ui/org-switcher"

const ORGS = [
  { id: "acme", name: "Acme Inc", plan: "Pro" },
  { id: "side", name: "Side project", plan: "Free" },
]

export function WorkspaceSwitcher({ current = "acme" }: { current?: string }) {
  const router = useRouter()
  return (
    <div className="p-3">
      <OrgSwitcher orgs={ORGS} value={current} onChange={(id) => router.push("/w/" + id + "/dashboard")} className="w-full" />
    </div>
  )
}`,
    },
    {
      type: "p",
      text: "The switcher is hidden in the collapsed rail because a 56px trigger cannot show a name. In a real app the org list comes from the session, so fetch it in the server layout and pass it down as props.",
    },

    { type: "h2", text: "Accessibility checklist", id: "accessibility" },
    {
      type: "list",
      items: [
        "The sidebar navigation is a `nav` with an `aria-label`, and the mobile drawer uses the same label, so there is one \"Main\" landmark at a time.",
        "The current page link has `aria-current=\"page\"`.",
        "The toggle button has a label that describes the action and `aria-expanded` plus `aria-controls` pointing at the sidebar.",
        "Collapsed links keep their text as `sr-only`. Icons are `aria-hidden`.",
        "Every link and button shows a [focus-visible](/glossary/focus-visible) ring; the link classes above include one.",
        "Add a skip link to `main` if the sidebar has more than a handful of links.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All of these are free and MIT licensed; browse the rest in the [navigation](/components/navigation) and [layout](/components/layout) categories. The [SaaS dashboard guide](/guides/nextjs-saas-dashboard) fills the content area of this shell, and the [settings page guide](/guides/saas-settings-page) builds the `/settings` route. If you would rather have the whole product built, the [MiniDev studio](https://minidev.pro) ships SaaS apps on this kit.",
    },
    { type: "component", name: "sidebar" },
    { type: "component", name: "collapsible-sidebar" },
    { type: "component", name: "topbar" },
    { type: "component", name: "mobile-nav-drawer" },
    { type: "component", name: "org-switcher" },
    { type: "component", name: "app-shell" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "How do I highlight the active link in a Next.js sidebar?",
      a: "Read the current path with `usePathname()` from `next/navigation` in a client component, compare it to each link's `href` (exact match or prefix plus a slash), and set both `aria-current=\"page\"` and a data attribute for styling.",
    },
    {
      q: "How do I remember whether the sidebar was collapsed?",
      a: "Write the state to a cookie when it changes and read it in the server layout with `cookies()`. The server then renders the right width on the first paint. `localStorage` also works but causes a visible snap after hydration.",
    },
    {
      q: "Why does my sidebar reset when I navigate?",
      a: "It is probably rendered inside `page.tsx` instead of `layout.tsx`. Layouts stay mounted across navigations within their segment; pages remount.",
    },
    {
      q: "Is this the same as the shadcn sidebar?",
      a: "The approach matches (cookie persistence, Cmd+B, a mobile sheet), but the pieces are smaller and composable: a controlled `Sidebar`, sections, a topbar and a drawer you wire yourself, styled with MiniDev tokens.",
    },
  ],
}

export default guide
