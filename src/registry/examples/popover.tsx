"use client"
import * as React from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/registry/ui/popover"
import type { Example } from "./types"

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>Archive customer</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Archive Globex?</PopoverTitle>
          <PopoverDescription>Open invoices stay payable. You can restore the customer later.</PopoverDescription>
        </PopoverHeader>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" onClick={() => setOpen(false)}>Archive</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const examples: Example[] = [
  {
    title: "Quick form",
    description: "A header, one field and a button make a lightweight create flow that does not need a dialog.",
    code: `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}><PlusIcon /> Add tag</PopoverTrigger>
  <PopoverContent align="start">
    <PopoverHeader>
      <PopoverTitle>New tag</PopoverTitle>
      <PopoverDescription>Tags are visible to everyone in Northwind.</PopoverDescription>
    </PopoverHeader>
    <FormField id="tag-name" label="Name">
      <Input id="tag-name" size="sm" placeholder="enterprise" />
    </FormField>
    <Button size="sm" className="self-end">Create tag</Button>
  </PopoverContent>
</Popover>`,
    node: (
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}><PlusIcon /> Add tag</PopoverTrigger>
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>New tag</PopoverTitle>
            <PopoverDescription>Tags are visible to everyone in Northwind.</PopoverDescription>
          </PopoverHeader>
          <FormField id="tag-name" label="Name">
            <Input id="tag-name" size="sm" placeholder="enterprise" />
          </FormField>
          <Button size="sm" className="self-end">Create tag</Button>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    title: "Placement",
    description: "side and align position the panel; it flips automatically when there is no room on that side.",
    code: `<div className="flex flex-wrap items-center gap-2">
  <Popover>
    <PopoverTrigger render={<Button variant="outline" />}>Next payout</PopoverTrigger>
    <PopoverContent side="top" className="w-56">
      <PopoverHeader>
        <PopoverTitle>$4,320 on Friday</PopoverTitle>
        <PopoverDescription>12 payments, minus $86 in fees.</PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
  <Popover>
    <PopoverTrigger render={<Button variant="outline" />}>Plan limits</PopoverTrigger>
    <PopoverContent side="right" align="start" className="w-56">
      <PopoverHeader>
        <PopoverTitle>Scale plan</PopoverTitle>
        <PopoverDescription>Unlimited invoices, 25 seats, 3 of them in use.</PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
  <Popover>
    <PopoverTrigger render={<Button variant="outline" />}>Last sync</PopoverTrigger>
    <PopoverContent align="end" className="w-56">
      <PopoverHeader>
        <PopoverTitle>Synced 4 minutes ago</PopoverTitle>
        <PopoverDescription>Bank feed from Northwind Bank, 18 new transactions.</PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
</div>`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Next payout</PopoverTrigger>
          <PopoverContent side="top" className="w-56">
            <PopoverHeader>
              <PopoverTitle>$4,320 on Friday</PopoverTitle>
              <PopoverDescription>12 payments, minus $86 in fees.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Plan limits</PopoverTrigger>
          <PopoverContent side="right" align="start" className="w-56">
            <PopoverHeader>
              <PopoverTitle>Scale plan</PopoverTitle>
              <PopoverDescription>Unlimited invoices, 25 seats, 3 of them in use.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Last sync</PopoverTrigger>
          <PopoverContent align="end" className="w-56">
            <PopoverHeader>
              <PopoverTitle>Synced 4 minutes ago</PopoverTitle>
              <PopoverDescription>Bank feed from Northwind Bank, 18 new transactions.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    ),
  },
  {
    title: "Controlled open",
    description: "Own the open state so buttons inside the panel can close it, which turns a popover into an inline confirm.",
    code: `function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>Archive customer</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Archive Globex?</PopoverTitle>
          <PopoverDescription>Open invoices stay payable. You can restore the customer later.</PopoverDescription>
        </PopoverHeader>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" onClick={() => setOpen(false)}>Archive</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
    node: <ControlledDemo />,
  },
]
