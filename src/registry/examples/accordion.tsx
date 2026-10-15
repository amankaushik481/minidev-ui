"use client"
import * as React from "react"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/ui/accordion"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ControlledAccordion() {
  const [open, setOpen] = React.useState<string[]>(["plans"])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setOpen(["plans", "billing", "cancel"])}>
          Expand all
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen([])}>
          Collapse all
        </Button>
      </div>
      <Accordion multiple value={open} onValueChange={setOpen}>
        <AccordionItem value="plans">
          <AccordionTrigger>Which plan do I need?</AccordionTrigger>
          <AccordionPanel>Starter covers up to 20 invoices a month. Pro removes the limit and adds reminders.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="billing">
          <AccordionTrigger>When am I billed?</AccordionTrigger>
          <AccordionPanel>On the first of the month, for the seats you had on the last day of the previous one.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="cancel">
          <AccordionTrigger>Can I cancel any time?</AccordionTrigger>
          <AccordionPanel>Yes. Your data stays readable for 90 days after the last invoice.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Single open",
    description: "By default one item is open at a time; defaultValue takes an array of item values.",
    code: `<Accordion defaultValue={["invoices"]} className="max-w-md">
  <AccordionItem value="invoices">
    <AccordionTrigger>How do reminders work?</AccordionTrigger>
    <AccordionPanel>Lumen emails the customer three days before the due date and again seven days after it, then stops.</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="currency">
    <AccordionTrigger>Can I invoice in other currencies?</AccordionTrigger>
    <AccordionPanel>Yes, 140 of them. Rates are locked when the invoice is sent.</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="export">
    <AccordionTrigger>Does it export to my accounting tool?</AccordionTrigger>
    <AccordionPanel>CSV and a direct sync with the big three. Exports run nightly.</AccordionPanel>
  </AccordionItem>
</Accordion>`,
    node: (
      <Accordion defaultValue={["invoices"]} className="max-w-md">
        <AccordionItem value="invoices">
          <AccordionTrigger>How do reminders work?</AccordionTrigger>
          <AccordionPanel>Lumen emails the customer three days before the due date and again seven days after it, then stops.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="currency">
          <AccordionTrigger>Can I invoice in other currencies?</AccordionTrigger>
          <AccordionPanel>Yes, 140 of them. Rates are locked when the invoice is sent.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="export">
          <AccordionTrigger>Does it export to my accounting tool?</AccordionTrigger>
          <AccordionPanel>CSV and a direct sync with the big three. Exports run nightly.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    title: "Multiple open",
    description: "Set multiple so items open independently, which suits settings groups more than FAQs.",
    code: `<Accordion multiple defaultValue={["general", "team"]} className="max-w-md">
  <AccordionItem value="general">
    <AccordionTrigger>General</AccordionTrigger>
    <AccordionPanel>Workspace name, logo and the email invoices are sent from.</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="team">
    <AccordionTrigger>Team</AccordionTrigger>
    <AccordionPanel>Maya Chen, Theo Okafor and 10 others. Admins can invite and remove people.</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="danger">
    <AccordionTrigger>Danger zone</AccordionTrigger>
    <AccordionPanel>Export everything or delete the workspace. Both need an owner to confirm.</AccordionPanel>
  </AccordionItem>
</Accordion>`,
    node: (
      <Accordion multiple defaultValue={["general", "team"]} className="max-w-md">
        <AccordionItem value="general">
          <AccordionTrigger>General</AccordionTrigger>
          <AccordionPanel>Workspace name, logo and the email invoices are sent from.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="team">
          <AccordionTrigger>Team</AccordionTrigger>
          <AccordionPanel>Maya Chen, Theo Okafor and 10 others. Admins can invite and remove people.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="danger">
          <AccordionTrigger>Danger zone</AccordionTrigger>
          <AccordionPanel>Export everything or delete the workspace. Both need an owner to confirm.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    title: "Controlled value",
    description: "Keep the open items in state to add expand all and collapse all buttons.",
    code: `function ControlledAccordion() {
  const [open, setOpen] = React.useState<string[]>(["plans"])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setOpen(["plans", "billing", "cancel"])}>
          Expand all
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen([])}>
          Collapse all
        </Button>
      </div>
      <Accordion multiple value={open} onValueChange={setOpen}>
        <AccordionItem value="plans">
          <AccordionTrigger>Which plan do I need?</AccordionTrigger>
          <AccordionPanel>Starter covers up to 20 invoices a month. Pro removes the limit and adds reminders.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="billing">
          <AccordionTrigger>When am I billed?</AccordionTrigger>
          <AccordionPanel>On the first of the month, for the seats you had on the last day of the previous one.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="cancel">
          <AccordionTrigger>Can I cancel any time?</AccordionTrigger>
          <AccordionPanel>Yes. Your data stays readable for 90 days after the last invoice.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}`,
    node: <ControlledAccordion />,
  },
]
