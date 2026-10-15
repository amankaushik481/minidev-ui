"use client"
import * as React from "react"
import { InboxIcon, SearchIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { EmptyState } from "@/registry/ui/empty-state"
import type { Example } from "./types"

function FilteredList() {
  const [query, setQuery] = React.useState("northwind traders")
  return (
    <div className="w-full max-w-md">
      {query ? (
        <EmptyState
          className="py-10"
          icon={<SearchIcon className="size-6" strokeWidth={1.5} />}
          title={`No customers match "${query}"`}
          description="Check the spelling or clear the search to see all 48 customers."
          actionLabel="Clear search"
          onAction={() => setQuery("")}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface px-6 py-10 text-center">
          <p className="text-sm text-fg">Showing all 48 customers</p>
          <Button variant="outline" size="sm" onClick={() => setQuery("northwind traders")}>
            Search again
          </Button>
        </div>
      )}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With action",
    description: "Title, one line of help and a single primary action; keep the copy about what to do next.",
    code: `<EmptyState
  className="w-full max-w-md"
  title="No invoices yet"
  description="Create your first invoice and Lumen will track payment, reminders and receipts for you."
  actionLabel="New invoice"
  onAction={() => {}}
/>`,
    node: (
      <EmptyState
        className="w-full max-w-md"
        title="No invoices yet"
        description="Create your first invoice and Lumen will track payment, reminders and receipts for you."
        actionLabel="New invoice"
        onAction={() => {}}
      />
    ),
  },
  {
    title: "With icon",
    description: "Pass any icon as a node; it replaces the default tile and inherits the muted colour.",
    code: `<EmptyState
  className="w-full max-w-md"
  icon={<InboxIcon className="size-8" strokeWidth={1.5} />}
  title="Inbox zero"
  description="Every approval has been handled. New requests from your team will show up here."
/>`,
    node: (
      <EmptyState
        className="w-full max-w-md"
        icon={<InboxIcon className="size-8" strokeWidth={1.5} />}
        title="Inbox zero"
        description="Every approval has been handled. New requests from your team will show up here."
      />
    ),
  },
  {
    title: "No search results",
    description: "Echo the query in the title and make the action undo the filter that caused it.",
    code: `function FilteredList() {
  const [query, setQuery] = React.useState("northwind traders")
  return (
    <div className="w-full max-w-md">
      {query ? (
        <EmptyState
          className="py-10"
          icon={<SearchIcon className="size-6" strokeWidth={1.5} />}
          title={\`No customers match "\${query}"\`}
          description="Check the spelling or clear the search to see all 48 customers."
          actionLabel="Clear search"
          onAction={() => setQuery("")}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface px-6 py-10 text-center">
          <p className="text-sm text-fg">Showing all 48 customers</p>
          <Button variant="outline" size="sm" onClick={() => setQuery("northwind traders")}>
            Search again
          </Button>
        </div>
      )}
    </div>
  )
}`,
    node: <FilteredList />,
  },
]
