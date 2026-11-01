"use client"
import * as React from "react"
import { TableOfContents, type TocItem } from "@/registry/ui/table-of-contents"
import type { Example } from "./types"

const GUIDE: (TocItem & { body: string })[] = [
  { id: "guide-install", level: 2, title: "Install", body: "Add the package with your package manager, then import the stylesheet once in your root layout. Nothing else is global." },
  { id: "guide-tokens", level: 2, title: "Tokens", body: "Every colour, radius and shadow is a CSS variable. Override them on :root to rebrand the whole kit without touching a component." },
  { id: "guide-dark-mode", level: 3, title: "Dark mode", body: "Put the dark class on html and the tokens swap. Components never check the theme themselves, so there is nothing to wire up." },
  { id: "guide-first-component", level: 2, title: "First component", body: "Copy Button into your app and render it with no props. If it looks right, the tokens are loaded and everything else will follow." },
  { id: "guide-deploy", level: 2, title: "Deploy", body: "Lumen ships behind a CDN with long cache headers. Fonts and tokens are small enough to inline, so the first paint is already styled." },
]

function ItemsDemo() {
  const [active, setActive] = React.useState("guide-install")
  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:gap-6">
      <div className="h-80 min-w-0 overflow-y-auto sm:flex-1 rounded-xl border border-border bg-surface px-5 py-4 shadow-raised">
        <p className="text-xl font-medium text-fg">Setting up Lumen</p>
        {GUIDE.map((s) => {
          const H = s.level === 3 ? "h3" : "h2"
          return (
            <section key={s.id}>
              <H id={s.id} className={s.level === 3 ? "mt-5 text-base font-medium text-fg" : "mt-7 text-lg font-medium text-fg"}>{s.title}</H>
              <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">{s.body}</p>
            </section>
          )
        })}
      </div>
      <div className="shrink-0 sm:w-44 sm:pt-4">
        <TableOfContents
          items={GUIDE.map(({ id, title, level }) => ({ id, title, level }))}
          title="Setup guide"
          offset={16}
          sticky={false}
          onActiveChange={setActive}
        />
        <p className="mt-3 pl-3 text-xs text-fg-muted">Reading: {GUIDE.find((s) => s.id === active)?.title}</p>
      </div>
    </div>
  )
}

function SelectorDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:gap-6">
      <article id="lumen-release-notes" className="h-80 min-w-0 overflow-y-auto sm:flex-1 rounded-xl border border-border bg-surface px-5 py-4 shadow-raised">
        <p className="font-mono text-[10px] font-medium tracking-[0.08em] text-fg-subtle uppercase">Changelog</p>
        <p className="mt-1 text-xl font-medium text-fg">Lumen 2.4</p>
        <h2 className="mt-7 text-lg font-medium text-fg">Scheduled payouts</h2>
        <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">Pick daily, weekly or monthly and Lumen batches everything that cleared since the last run. A preview shows the next batch before it goes out.</p>
        <h3 className="mt-5 text-base font-medium text-fg">Cut-off times</h3>
        <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">Batches close at 16:00 in the workspace time zone. Payments that settle later roll into the next run, so totals never change after you have seen them.</p>
        <h2 className="mt-7 text-lg font-medium text-fg">Invoice reminders</h2>
        <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">Reminders now respect the customer's time zone. Northwind's finance team gets theirs at 9:00 Seattle time instead of the middle of the night.</p>
        <h2 className="mt-7 text-lg font-medium text-fg">API changes</h2>
        <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">GET /v1/payouts returns the schedule that produced each payout. The legacy payout.created webhook is deprecated and stops firing on 1 December.</p>
        <h2 className="mt-7 text-lg font-medium text-fg">Fixes</h2>
        <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">Rounding on multi-currency refunds is corrected and exports above 50,000 rows no longer time out.</p>
      </article>
      <div className="shrink-0 sm:w-44 sm:pt-4">
        <TableOfContents selector="#lumen-release-notes" title="Release notes" sticky={false} />
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "From a selector",
    description: "Point selector at the container and the h2 and h3 headings are read after mount; headings without an id get one from their text.",
    code: `<div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:gap-6">
  <article id="lumen-release-notes" className="h-80 min-w-0 overflow-y-auto sm:flex-1 rounded-xl border border-border bg-surface px-5 py-4 shadow-raised">
    <p className="font-mono text-[10px] font-medium tracking-[0.08em] text-fg-subtle uppercase">Changelog</p>
    <p className="mt-1 text-xl font-medium text-fg">Lumen 2.4</p>
    <h2 className="mt-7 text-lg font-medium text-fg">Scheduled payouts</h2>
    <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">Pick daily, weekly or monthly and Lumen batches everything that cleared since the last run. A preview shows the next batch before it goes out.</p>
    <h3 className="mt-5 text-base font-medium text-fg">Cut-off times</h3>
    <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">Batches close at 16:00 in the workspace time zone. Payments that settle later roll into the next run, so totals never change after you have seen them.</p>
    <h2 className="mt-7 text-lg font-medium text-fg">Invoice reminders</h2>
    <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">Reminders now respect the customer's time zone. Northwind's finance team gets theirs at 9:00 Seattle time instead of the middle of the night.</p>
    <h2 className="mt-7 text-lg font-medium text-fg">API changes</h2>
    <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">GET /v1/payouts returns the schedule that produced each payout. The legacy payout.created webhook is deprecated and stops firing on 1 December.</p>
    <h2 className="mt-7 text-lg font-medium text-fg">Fixes</h2>
    <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">Rounding on multi-currency refunds is corrected and exports above 50,000 rows no longer time out.</p>
  </article>
  <div className="shrink-0 sm:w-44 sm:pt-4">
    <TableOfContents selector="#lumen-release-notes" title="Release notes" sticky={false} />
  </div>
</div>`,
    node: <SelectorDemo />,
  },
  {
    title: "Explicit items with callback",
    description: "Pass items when you already know the headings, and use onActiveChange to mirror the reading position elsewhere, for example in the URL.",
    code: `const GUIDE: (TocItem & { body: string })[] = [
  { id: "guide-install", level: 2, title: "Install", body: "Add the package with your package manager, then import the stylesheet once in your root layout. Nothing else is global." },
  { id: "guide-tokens", level: 2, title: "Tokens", body: "Every colour, radius and shadow is a CSS variable. Override them on :root to rebrand the whole kit without touching a component." },
  { id: "guide-dark-mode", level: 3, title: "Dark mode", body: "Put the dark class on html and the tokens swap. Components never check the theme themselves, so there is nothing to wire up." },
  { id: "guide-first-component", level: 2, title: "First component", body: "Copy Button into your app and render it with no props. If it looks right, the tokens are loaded and everything else will follow." },
  { id: "guide-deploy", level: 2, title: "Deploy", body: "Lumen ships behind a CDN with long cache headers. Fonts and tokens are small enough to inline, so the first paint is already styled." },
]

function ItemsDemo() {
  const [active, setActive] = React.useState("guide-install")
  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:gap-6">
      <div className="h-80 min-w-0 overflow-y-auto sm:flex-1 rounded-xl border border-border bg-surface px-5 py-4 shadow-raised">
        <p className="text-xl font-medium text-fg">Setting up Lumen</p>
        {GUIDE.map((s) => {
          const H = s.level === 3 ? "h3" : "h2"
          return (
            <section key={s.id}>
              <H id={s.id} className={s.level === 3 ? "mt-5 text-base font-medium text-fg" : "mt-7 text-lg font-medium text-fg"}>{s.title}</H>
              <p className="mt-2 text-[0.8125rem] leading-[1.65] text-fg-muted">{s.body}</p>
            </section>
          )
        })}
      </div>
      <div className="shrink-0 sm:w-44 sm:pt-4">
        <TableOfContents
          items={GUIDE.map(({ id, title, level }) => ({ id, title, level }))}
          title="Setup guide"
          offset={16}
          sticky={false}
          onActiveChange={setActive}
        />
        <p className="mt-3 pl-3 text-xs text-fg-muted">Reading: {GUIDE.find((s) => s.id === active)?.title}</p>
      </div>
    </div>
  )
}`,
    node: <ItemsDemo />,
  },
]
