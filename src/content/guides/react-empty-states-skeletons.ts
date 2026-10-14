import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-empty-states-skeletons",
  title: "Empty states, loading skeletons and error states in React",
  description:
    "Handle loading, empty and error states in React with Tailwind: layout matched skeletons, three kinds of empty state, retryable errors, toasts and Suspense.",
  date: "2026-10-14",
  keywords: [
    "react empty state component",
    "react loading skeleton",
    "react error state ui",
    "skeleton screen react tailwind",
    "react loading empty error states",
  ],
  related: ["empty-state", "skeleton", "error-state", "spinner", "toast", "loading-overlay", "empty-search"],
  body: [
    {
      type: "p",
      text: "Every data view in React has four states, loading, empty, error and loaded, plus a fifth, refetching, once it has shown data at all. The reliable way to handle them is to decide the state once at the top of the component and return early for each, so the loaded markup never has to guard against missing data.",
    },
    {
      type: "p",
      text: "This guide does that with the free MiniDev UI [Skeleton](/docs/skeleton), [EmptyState](/docs/empty-state), [ErrorState](/docs/error-state), [Spinner](/docs/spinner), [LoadingOverlay](/docs/loading-overlay) and [Toast](/docs/toast), covers what each one announces to a screen reader, and shows where React 19's Suspense and error boundaries take over. The glossary has the vocabulary: [skeleton screen](/glossary/skeleton-screen), [empty state](/glossary/empty-state) and [toast notification](/glossary/toast-notification).",
    },

    { type: "h2", text: "One component, every state", id: "states" },
    {
      type: "p",
      text: "Whatever fetches your data, it can be reduced to a status, the data, an error and whether a refetch is in flight. TanStack Query returns exactly that shape; a hand written hook can too. The list below returns early per state and only reaches the real markup with real rows:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/invoices/invoice-list.tsx",
      code: `"use client"
import * as React from "react"
import { FileTextIcon } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { InvoiceSkeleton } from "./invoice-skeleton"

type Query<T> = { status: "pending" | "error" | "success"; data?: T; error?: Error; isFetching: boolean; refetch: () => void }
type Invoice = { id: string; customer: string; amount: number }

export function InvoiceList({ q, filtered, onClearFilters, onCreate }: { q: Query<Invoice[]>; filtered: boolean; onClearFilters: () => void; onCreate: () => void }) {
  if (q.status === "pending") return <InvoiceSkeleton />

  if (q.status === "error") {
    return <ErrorState title="Could not load invoices" description={q.error?.message ?? "Try again in a moment."} onRetry={q.refetch} />
  }

  if (!q.data?.length) {
    return filtered ? (
      <EmptyState title="No invoices match" description="Try a different status or clear the filters." actionLabel="Clear filters" onAction={onClearFilters} />
    ) : (
      <EmptyState
        title="No invoices yet"
        description="Invoices you send appear here with their payment status."
        actionLabel="Create your first invoice"
        onAction={onCreate}
        icon={<FileTextIcon className="size-8" />}
      />
    )
  }

  return (
    <div className="relative">
      {q.isFetching ? <LoadingOverlay label="Refreshing" /> : null}
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
        {q.data.map((inv) => (
          <li key={inv.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-fg">{inv.customer}</span>
            <span className="tabular-nums text-fg-muted">{inv.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
    },
    {
      type: "list",
      items: [
        "The order matters: pending, then error, then empty, then loaded. An error with stale data is still an error, and an empty success is not an error.",
        "`filtered` is passed in because the component cannot tell \"you have no invoices\" from \"nothing matches\" by looking at an empty array. Those are different messages with different actions.",
        "Refetching keeps the rows on screen and overlays them. Replacing a loaded list with a skeleton on every background refresh makes the page blink.",
      ],
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/skeleton.json\nnpx shadcn@latest add https://ui.minidev.pro/r/empty-state.json\nnpx shadcn@latest add https://ui.minidev.pro/r/error-state.json\nnpx shadcn@latest add https://ui.minidev.pro/r/spinner.json\nnpx shadcn@latest add https://ui.minidev.pro/r/loading-overlay.json\nnpx shadcn@latest add https://ui.minidev.pro/r/toast.json",
    },
    {
      type: "p",
      text: "Import the token stylesheet once ([styles.css](https://ui.minidev.pro/r/styles.css)): the skeleton's `shimmer-x` sweep and the toast's `rise-in` are keyframes defined there, and the same file stops all animations under [prefers-reduced-motion](/glossary/prefers-reduced-motion).",
    },

    { type: "h2", text: "Loading: skeletons that match the layout", id: "skeletons" },
    {
      type: "p",
      text: "`Skeleton` is a sunken rounded plate with a sheen that sweeps across once every 1.6 seconds; you give it the size with classes. It is `aria-hidden`, which is correct for a decorative block, so the loading message has to come from a wrapper. Build the skeleton out of the same boxes the real row uses:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/invoices/invoice-skeleton.tsx",
      code: `import { Skeleton } from "@/components/ui/skeleton"

export function InvoiceSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div role="status" aria-busy="true" className="divide-y divide-border rounded-xl border border-border bg-surface">
      <span className="sr-only">Loading invoices</span>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} aria-hidden className="flex items-center justify-between px-4 py-3">
          <Skeleton className="h-3.5 w-40" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      ))}
    </div>
  )
}`,
    },
    {
      type: "list",
      items: [
        "Match heights and widths to the loaded row (`py-3`, a 3.5 high bar for 14 pixel text), so the swap from skeleton to data does not shift the page.",
        "Vary the widths a little across rows if the real content varies; identical bars read as a pattern, not as text.",
        "`role=\"status\"` plus the visually hidden text announces \"Loading invoices\" once. `aria-busy` tells assistive technology the region is still changing.",
        "`SkeletonCard` is a ready made card shape (title line, two text lines, a block) for grids of cards. For tables, [LoadingTable](/docs/loading-table) draws skeleton rows under real headers.",
      ],
    },
    {
      type: "p",
      text: "A skeleton that appears for 80 milliseconds and vanishes is worse than nothing. Delay it so fast responses render straight into content, and keep it for a minimum once shown so it does not flicker:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `function useDelayed(active: boolean, delay = 150) {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    if (!active) { setShow(false); return }
    const t = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(t)
  }, [active, delay])
  return show
}

const showSkeleton = useDelayed(q.status === "pending")
if (q.status === "pending") return showSkeleton ? <InvoiceSkeleton /> : <div className="min-h-64" />`,
    },
    {
      type: "p",
      text: "The empty `min-h-64` placeholder reserves the space during the delay so the layout below does not jump up and back down.",
    },

    { type: "h2", text: "Spinners and overlays for work in place", id: "spinners" },
    {
      type: "p",
      text: "A spinner says \"something is happening here\" without promising a shape, which makes it right for a button that is saving, a refetch over existing content, or a panel too small for a skeleton. `Spinner` is a `role=\"status\"` element with an `aria-label` (\"Loading\" by default) in three sizes. `LoadingOverlay` places a spinner and a label over its nearest positioned ancestor, dimmed with `bg-bg/70`:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<Button disabled={pending}>
  {pending ? <Spinner size="sm" label="Saving" /> : null}
  {pending ? "Saving…" : "Save changes"}
</Button>

<div className="relative">
  {isFetching ? <LoadingOverlay label="Refreshing" /> : null}
  <InvoiceTable rows={rows} />
</div>`,
    },
    {
      type: "p",
      text: "The overlay is `absolute inset-0`, so the parent needs `relative` or it covers the wrong box. Disable the button while it spins; a spinner inside an enabled button invites a second click. A spinner with no label is an animation, not a status, so keep `label` meaningful when the default does not fit.",
    },

    { type: "h2", text: "Empty: three different situations", id: "empty" },
    {
      type: "p",
      text: "`EmptyState` takes `title`, `description`, `actionLabel` with `onAction`, and an optional `icon` node; without an icon it draws a neutral placeholder tile. The component is the same in every case, and the copy is what changes:",
    },
    {
      type: "table",
      head: ["Situation", "Title", "Action"],
      rows: [
        ["First use, nothing created", "\"No invoices yet\"", "Create the first one, or import"],
        ["Search with no hits", "\"No results for “acme”\"", "Clear the search; `EmptySearch` renders this from a `query` prop"],
        ["Filters exclude everything", "\"No invoices match\"", "Clear filters, named as such"],
        ["Permission or plan limit", "\"Reports are on the Team plan\"", "Upgrade, or ask an admin"],
      ],
    },
    {
      type: "list",
      items: [
        "Say what would fill the space and how. \"Invoices you send appear here\" tells people the page is working and what to do; \"No data\" tells them nothing.",
        "One action, the most likely next step. Two buttons in an empty state usually means the page has not decided what it is for.",
        "Keep the empty state the same height class as the loaded content when you can (`min-h-64` on both), so toggling filters does not bounce the footer.",
        "In tables, [EmptyTable](/docs/empty-table) takes the same props and sits inside the table frame under the headers.",
      ],
    },

    { type: "h2", text: "Errors: say what happened and offer a way out", id: "errors" },
    {
      type: "p",
      text: "`ErrorState` renders a `role=\"alert\"` card with a title, a description and a Try again button when `onRetry` is passed. Because it is an alert, it is announced immediately, which is what you want for a failed load and not what you want for a validation message (use `FormField` errors for those).",
    },
    {
      type: "list",
      items: [
        "Write the description for the person, not the log: \"We could not reach the billing service. Your invoices are safe.\" Put the request id in a smaller line if support will ask for it.",
        "Retry should actually retry: pass the query's `refetch`, not a page reload, so the rest of the page keeps its state.",
        "An error over stale data: keep the data visible and show a dismissible inline alert above it rather than replacing a working list with an error card.",
      ],
    },
    {
      type: "callout",
      tone: "note",
      text: "[ServerErrorState](/docs/server-error-state), [NotFoundState](/docs/not-found-state) and [OfflineState](/docs/offline-state) are full page previews with Lumen copy and buttons that do nothing; they take only `className`. Copy the file, replace the text and wire the buttons. They are references for a 500 page, a 404 page and an offline banner, not drop in components.",
    },
    {
      type: "p",
      text: "Rendering errors are a different class from fetch errors: a chart that throws on bad data takes the whole tree down unless something catches it. React 19 still catches render errors with a class component boundary; wrap each independent panel so one failure does not blank the dashboard:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/boundary.tsx",
      code: `"use client"
import * as React from "react"
import { ErrorState } from "@/components/ui/error-state"

type Props = { children: React.ReactNode; title?: string }
type State = { error: Error | null }

export class Boundary extends React.Component<Props, State> {
  state: State = { error: null }
  static getDerivedStateFromError(error: Error): State {
    return { error }
  }
  render() {
    if (this.state.error) {
      return <ErrorState title={this.props.title ?? "This panel ran into a problem"} description="The rest of the page still works." onRetry={() => this.setState({ error: null })} />
    }
    return this.props.children
  }
}

// usage
<Boundary title="Revenue chart failed">
  <RevenueChart />
</Boundary>`,
    },
    {
      type: "p",
      text: "Retry here resets the boundary so the child renders again; if the data is the problem it fails again, so log the error in `componentDidCatch` and send it somewhere. In Next.js, `error.tsx` is a boundary for a whole route segment and `not-found.tsx` for 404s, which is where the full page states belong.",
    },

    { type: "h2", text: "Toasts for outcomes, not for states", id: "toasts" },
    {
      type: "p",
      text: "A toast reports something that finished: the reminder was sent, the export failed. It is the wrong tool for a state the user is looking at; an empty list does not need a toast saying it is empty. Mount `Toaster` once in the root layout and call `toast` from anywhere:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `import { toast } from "@/components/ui/toast"

toast.promise(sendReminder(invoice.id), {
  loading: "Sending reminder…",
  success: "Reminder sent to Northwind",
  error: "Could not send the reminder",
})

toast.error("Export failed", {
  description: "The file was larger than 25 MB.",
  action: { label: "Try smaller range", onClick: openRangePicker },
})`,
    },
    {
      type: "p",
      text: "`toast.promise` shows one card that changes tone from loading to success or danger, so the user sees one notification, not three. Danger toasts use `role=\"alert\"`, the others `role=\"status\"`; both are inside an `aria-live=\"polite\"` stack. The [toast notifications guide](/guides/nextjs-toast-notifications) covers server actions, undo and stacking.",
    },

    { type: "h2", text: "Streaming with Suspense", id: "suspense" },
    {
      type: "p",
      text: "In a server rendered app the first loading state is not a client fetch; it is HTML that has not arrived yet. Suspense boundaries show the fallback while a server component awaits data, and the fallback should be the same skeleton the client uses, so the page looks the same whichever way it loads:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/invoices/page.tsx",
      code: `import { Suspense } from "react"
import { InvoiceSkeleton } from "./invoice-skeleton"
import { Invoices } from "./invoices"

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-medium tracking-[-0.02em] text-fg">Invoices</h1>
      <Suspense fallback={<InvoiceSkeleton />}>
        <Invoices />
      </Suspense>
    </section>
  )
}`,
    },
    {
      type: "p",
      text: "Put the boundary around the slow part, not the whole page, so the heading and the filters render immediately. In React 19 a client component can read a promise passed from the server with `use(promise)`, and the nearest Suspense boundary shows the skeleton while it settles. The [React Server Components](/glossary/react-server-components) entry explains the split.",
    },

    { type: "h2", text: "Accessibility summary", id: "accessibility" },
    {
      type: "table",
      head: ["Component", "Role", "What is announced"],
      rows: [
        ["`Skeleton`", "none (`aria-hidden`)", "Nothing; wrap in `role=\"status\"` with hidden text"],
        ["`Spinner`", "`status`", "Its `label`, once"],
        ["`LoadingOverlay`", "`status`", "Its `label`, once"],
        ["`EmptyState`", "none", "Read as normal content: heading, text, button"],
        ["`ErrorState`", "`alert`", "Title and description immediately"],
        ["`Toast`", "`status` or `alert` for danger", "Title and description when it appears"],
      ],
    },
    {
      type: "p",
      text: "Use `status` for things that are progressing and `alert` for things that went wrong; an `alert` interrupts whatever the screen reader was saying. Never put a live region inside a skeleton that re-renders every second, and do not move focus to a loading indicator. Move focus to an error's retry button only when the error replaces the thing the user was interacting with.",
    },

    { type: "h2", text: "Pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**A generic skeleton for every page.** Five grey bars that look nothing like the content make the swap jarring. Build one skeleton per layout, from the layout's own classes.",
        "**Showing the empty state while loading.** A flash of \"No invoices yet\" before the data arrives scares people. Check `pending` before checking length.",
        "**Treating a 404 as an error card.** A missing record is a not found page with a way back, not a retry button.",
        "**Toasting validation errors.** They vanish before the user finds the field. Inline errors next to the input, every time.",
        "**Spinner forever.** Every pending state needs a timeout path: after 10 seconds show an error with retry rather than spinning until the heat death of the session.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All of these are free and MIT licensed, and the rest of the [feedback category](/components/feedback) covers banners, inline alerts and progress. The list above is the body of a page from the [Next.js SaaS dashboard guide](/guides/nextjs-saas-dashboard), and its table variant is in the [TanStack data table guide](/guides/react-data-table-tanstack). If you want the whole product built, the [MiniDev studio](https://minidev.pro) builds on this kit.",
    },
    { type: "component", name: "empty-state" },
    { type: "component", name: "skeleton" },
    { type: "component", name: "error-state" },
    { type: "component", name: "spinner" },
    { type: "component", name: "toast" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Skeleton or spinner: which should I use?",
      a: "A skeleton when you know the shape of what is coming and the wait is long enough to notice (a list, a card grid, a profile). A spinner for work in place where no shape applies: a saving button, a refetch over existing data, a small panel.",
    },
    {
      q: "How do I stop the loading skeleton from flickering?",
      a: "Delay it by about 150 milliseconds so fast responses render straight to content, reserve the space with a min height during the delay, and keep loaded data on screen during background refetches with an overlay instead of swapping back to the skeleton.",
    },
    {
      q: "Should empty states and error states be announced to screen readers?",
      a: "An empty state is ordinary content, read in order like any heading and paragraph. A failed load is an alert: `ErrorState` has `role=\"alert\"` so it is announced immediately. Loading indicators use `role=\"status\"` and announce once, never on every frame.",
    },
  ],
}

export default guide
