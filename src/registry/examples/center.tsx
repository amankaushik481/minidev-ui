"use client"
import { InboxIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Center } from "@/registry/ui/center"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Empty state in a panel",
    description: "Give Center a min height; it centres the icon, text and action both ways.",
    code: `<div className="w-full max-w-lg rounded-xl border border-border bg-surface">
  <Center className="min-h-64 gap-2 p-6">
    <InboxIcon aria-hidden className="size-6 text-fg-subtle" />
    <p className="text-sm font-medium text-fg">No invoices yet</p>
    <p className="text-sm text-fg-muted">Invoices you send show up here, newest first.</p>
    <Button size="sm" className="mt-2">Create invoice</Button>
  </Center>
</div>`,
    node: (
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface">
        <Center className="min-h-64 gap-2 p-6">
          <InboxIcon aria-hidden className="size-6 text-fg-subtle" />
          <p className="text-sm font-medium text-fg">No invoices yet</p>
          <p className="text-sm text-fg-muted">Invoices you send show up here, newest first.</p>
          <Button size="sm" className="mt-2">Create invoice</Button>
        </Center>
      </div>
    ),
  },
  {
    title: "Narrow sign-in column",
    description: "size=\"sm\" caps the column at 24rem for an auth screen.",
    code: `<Center size="sm" className="min-h-80 gap-3">
  <p className="text-lg font-medium text-fg">Sign in to Lumen</p>
  <p className="text-sm text-fg-muted">Use the work account your team invited.</p>
  <Button className="mt-2 w-full">Continue with email</Button>
  <Button variant="outline" className="w-full">Continue with SSO</Button>
</Center>`,
    node: (
      <Center size="sm" className="min-h-80 gap-3">
        <p className="text-lg font-medium text-fg">Sign in to Lumen</p>
        <p className="text-sm text-fg-muted">Use the work account your team invited.</p>
        <Button className="mt-2 w-full">Continue with email</Button>
        <Button variant="outline" className="w-full">Continue with SSO</Button>
      </Center>
    ),
  },
]
