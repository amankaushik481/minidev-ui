"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { NotFoundState } from "@/registry/ui/not-found-state"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Missing record",
    description: "Name the thing that is missing and pass real links as actions; the default buttons do nothing.",
    code: `<NotFoundState
  className="w-full max-w-md"
  title="Invoice not found"
  description="INV-2099 was deleted or never existed. Check the number or search all invoices."
  actions={
    <>
      <Button size="sm" render={<a href="#invoices" />}>All invoices</Button>
      <Button size="sm" variant="outline" render={<a href="#search" />}>Search</Button>
    </>
  }
/>`,
    node: (
      <NotFoundState
        className="w-full max-w-md"
        title="Invoice not found"
        description="INV-2099 was deleted or never existed. Check the number or search all invoices."
        actions={
          <>
            <Button size="sm" render={<a href="#invoices" />}>All invoices</Button>
            <Button size="sm" variant="outline" render={<a href="#search" />}>Search</Button>
          </>
        }
      />
    ),
  },
  {
    title: "Expired share link",
    description: "code takes any short string, here 410 for a link that existed and is gone.",
    code: `<NotFoundState
  className="w-full max-w-md"
  code="410"
  title="This share link has expired"
  description="Shared reports stay open for 14 days. Ask Maya Chen to share it again."
  actions={<Button size="sm" variant="outline">Request a new link</Button>}
/>`,
    node: (
      <NotFoundState
        className="w-full max-w-md"
        code="410"
        title="This share link has expired"
        description="Shared reports stay open for 14 days. Ask Maya Chen to share it again."
        actions={<Button size="sm" variant="outline">Request a new link</Button>}
      />
    ),
  },
]
