"use client"
import { Prose } from "@/registry/ui/prose"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Help article",
    description: "Plain HTML elements get headings, lists, inline code and quotes without any classes of their own.",
    code: `<Prose>
  <h2>Send your first invoice</h2>
  <p>Open <strong>Invoices</strong> and choose <code>New invoice</code>. Lumen fills in the customer details it already knows.</p>
  <ol>
    <li>Add at least one line item.</li>
    <li>Pick a due date. Net 30 is the default.</li>
    <li>Press <strong>Send</strong>. The customer gets a link to pay by card or bank transfer.</li>
  </ol>
  <blockquote>Reminders start 3 days before the due date. You can turn them off per customer.</blockquote>
</Prose>`,
    node: (
      <Prose>
        <h2>Send your first invoice</h2>
        <p>Open <strong>Invoices</strong> and choose <code>New invoice</code>. Lumen fills in the customer details it already knows.</p>
        <ol>
          <li>Add at least one line item.</li>
          <li>Pick a due date. Net 30 is the default.</li>
          <li>Press <strong>Send</strong>. The customer gets a link to pay by card or bank transfer.</li>
        </ol>
        <blockquote>Reminders start 3 days before the due date. You can turn them off per customer.</blockquote>
      </Prose>
    ),
  },
  {
    title: "Model answer",
    description: "Wrap rendered markdown from an assistant; links are underlined and code blocks scroll sideways.",
    code: `<div className="w-full max-w-lg rounded-xl border border-border bg-surface p-4">
  <Prose>
    <p>Three invoices are overdue, worth <strong>$8,420.00</strong> in total. The oldest is from Northwind Traders, 21 days late.</p>
    <ul>
      <li>INV-2031, Northwind Traders, $5,100.00</li>
      <li>INV-2036, Blue Harbor Co., $2,350.00</li>
      <li>INV-2038, Helix Biotech, $970.00</li>
    </ul>
    <p>To list them yourself, run:</p>
    <pre><code>{"lumen invoices list --status overdue"}</code></pre>
    <p>See <a href="https://lumen.example/help/reminders">how reminders work</a> to chase them automatically.</p>
  </Prose>
</div>`,
    node: (
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface p-4">
        <Prose>
          <p>Three invoices are overdue, worth <strong>$8,420.00</strong> in total. The oldest is from Northwind Traders, 21 days late.</p>
          <ul>
            <li>INV-2031, Northwind Traders, $5,100.00</li>
            <li>INV-2036, Blue Harbor Co., $2,350.00</li>
            <li>INV-2038, Helix Biotech, $970.00</li>
          </ul>
          <p>To list them yourself, run:</p>
          <pre><code>{"lumen invoices list --status overdue"}</code></pre>
          <p>See <a href="https://lumen.example/help/reminders">how reminders work</a> to chase them automatically.</p>
        </Prose>
      </div>
    ),
  },
]
