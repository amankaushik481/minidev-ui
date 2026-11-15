"use client"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Stack } from "@/registry/ui/stack"
import { StatusBadge } from "@/registry/ui/status-badge"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Form fields",
    description: "Nested Stacks space the fields and each label; self-start stops the button stretching.",
    code: `<Stack gap={4} className="w-full max-w-sm">
  <Stack gap={2}>
    <Label htmlFor="company">Company name</Label>
    <Input id="company" defaultValue="Northwind Traders" />
  </Stack>
  <Stack gap={2}>
    <Label htmlFor="billing-email">Billing email</Label>
    <Input id="billing-email" type="email" defaultValue="billing@northwind.example" />
  </Stack>
  <Button className="self-start">Save</Button>
</Stack>`,
    node: (
      <Stack gap={4} className="w-full max-w-sm">
        <Stack gap={2}>
          <Label htmlFor="company">Company name</Label>
          <Input id="company" defaultValue="Northwind Traders" />
        </Stack>
        <Stack gap={2}>
          <Label htmlFor="billing-email">Billing email</Label>
          <Input id="billing-email" type="email" defaultValue="billing@northwind.example" />
        </Stack>
        <Button className="self-start">Save</Button>
      </Stack>
    ),
  },
  {
    title: "Card body",
    description: "items-start keeps the badge and button at their own width.",
    code: `<div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5">
  <Stack gap={3} className="items-start">
    <StatusBadge tone="warning">Trial ends in 3 days</StatusBadge>
    <p className="text-lg font-medium text-fg">Keep your invoices flowing</p>
    <p className="text-sm text-fg-muted">Add a card to stay on Pro. Nothing is charged before Nov 18.</p>
    <Button size="sm">Add payment method</Button>
  </Stack>
</div>`,
    node: (
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5">
        <Stack gap={3} className="items-start">
          <StatusBadge tone="warning">Trial ends in 3 days</StatusBadge>
          <p className="text-lg font-medium text-fg">Keep your invoices flowing</p>
          <p className="text-sm text-fg-muted">Add a card to stay on Pro. Nothing is charged before Nov 18.</p>
          <Button size="sm">Add payment method</Button>
        </Stack>
      </div>
    ),
  },
]
