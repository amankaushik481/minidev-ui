"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowDownIcon, CheckIcon, ChevronRightIcon, ZapIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { NumberRoll } from "@/registry/ui/number-roll"

/* Ponte: the transfer app that lives inside the phone on the Ponte template. */

export function useLiveRate(base = 7.2841, spread = 0.004) {
  const [rate, setRate] = React.useState(base)
  React.useEffect(() => {
    const t = setInterval(() => setRate((r) => Math.max(base - spread * 3, Math.min(base + spread * 3, r + (Math.random() - 0.5) * spread))), 2200)
    return () => clearInterval(t)
  }, [base, spread])
  return rate
}

const STEPS = ["Payment received", "Converted at 7.2841", "Delivered to Itaú"]

export function PonteApp() {
  const reduce = useReducedMotion()
  const rate = useLiveRate()
  const [amount, setAmount] = React.useState(250)
  const [phase, setPhase] = React.useState<"idle" | "sending" | "done">("idle")
  const [step, setStep] = React.useState(0)
  const fee = 0.99
  const receive = Math.max(0, (amount - fee) * rate)

  const send = () => {
    if (phase !== "idle" || amount <= fee) return
    setPhase("sending")
    setStep(0)
    const t1 = setTimeout(() => setStep(1), 900)
    const t2 = setTimeout(() => setStep(2), 1900)
    const t3 = setTimeout(() => setPhase("done"), 2700)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }

  return (
    <div className="flex h-full flex-col px-4 pt-2 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] text-fg-muted">Good evening</p>
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-fg">Ana Ribeiro</p>
        </div>
        <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-[12px] font-semibold text-accent-fg">AR</span>
      </div>

      <div className="mt-4 rounded-2xl bg-ink p-4 text-on-ink shadow-ink">
        <p className="text-[11.5px] opacity-60">GBP balance</p>
        <p className="mt-1 text-[28px] leading-8 font-semibold tracking-[-0.03em]">
          <NumberRoll value={2480.2 - (phase === "done" ? amount : 0)} format={{ style: "currency", currency: "GBP" }} />
        </p>
        <div className="mt-3 flex gap-1.5 text-[10.5px]">
          {["£ GBP", "R$ BRL", "€ EUR"].map((c, i) => (
            <span key={c} className={cn("rounded-full px-2 py-0.5", i === 0 ? "bg-on-ink text-ink" : "bg-on-ink/12")}>{c}</span>
          ))}
        </div>
      </div>

      <div className="relative mt-3">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "idle" ? (
            <motion.div key="form" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8, transition: { duration: 0.14 } }}>
              <div className="rounded-2xl border border-border bg-surface p-3.5 shadow-raised">
                <label className="text-[11px] text-fg-muted" htmlFor="ponte-send">You send</label>
                <div className="mt-1 flex items-center justify-between">
                  <input
                    id="ponte-send"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(Math.min(9999, Number(e.target.value.replace(/[^0-9.]/g, "")) || 0))}
                    className="w-32 bg-transparent text-[24px] font-semibold tracking-[-0.03em] text-fg tabular-nums outline-none"
                  />
                  <span className="rounded-full border border-border bg-bg px-2.5 py-1 text-[12px] font-medium text-fg">GBP</span>
                </div>
                <div className="my-2.5 flex items-center gap-2 text-[11px] text-fg-muted">
                  <span className="grid size-5 place-items-center rounded-full bg-accent-soft text-accent-fg">
                    <ArrowDownIcon className="size-3" />
                  </span>
                  <span className="tabular-nums">
                    1 GBP = <NumberRoll value={rate} format={{ minimumFractionDigits: 4, maximumFractionDigits: 4 }} /> BRL
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-success">
                    <span className="size-1.5 animate-pulse rounded-full bg-success" /> live
                  </span>
                </div>
                <p className="text-[11px] text-fg-muted">They receive</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[24px] font-semibold tracking-[-0.03em] text-fg">
                    <NumberRoll value={receive} format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }} />
                  </span>
                  <span className="rounded-full border border-border bg-bg px-2.5 py-1 text-[12px] font-medium text-fg">BRL</span>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-3 rounded-2xl border border-border bg-surface px-3.5 py-3 shadow-raised">
                <span className="grid size-8 place-items-center rounded-full bg-sunken text-[11px] font-semibold text-fg-muted">MR</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-fg">Mãe</p>
                  <p className="text-[11px] text-fg-muted">Itaú · •• 4821</p>
                </div>
                <ChevronRightIcon className="size-4 text-fg-subtle" />
              </div>
              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-fg-muted">
                <ZapIcon className="size-3 text-accent-fg" /> Fee £0.99 · arrives in about 12 seconds
              </p>
            </motion.div>
          ) : (
            <motion.div key="track" initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-border bg-surface p-4 shadow-raised">
              <p className="text-[11px] text-fg-muted">To Mãe</p>
              <p className="text-[24px] font-semibold tracking-[-0.03em] text-fg tabular-nums">
                R$ {receive.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <ol className="mt-4 space-y-3">
                {STEPS.map((s, i) => {
                  const done = phase === "done" || i < step
                  const active = phase === "sending" && i === step
                  return (
                    <li key={s} className="flex items-center gap-2.5 text-[12.5px]">
                      <span className={cn("grid size-5 place-items-center rounded-full border transition-colors duration-300", done ? "border-accent bg-accent text-on-accent" : active ? "border-accent text-accent-fg" : "border-border text-fg-subtle")}>
                        {done ? <CheckIcon className="size-3 animate-[pop-in_280ms_var(--ease-hairline)_both]" strokeWidth={3} /> : active ? <span className="size-1.5 animate-pulse rounded-full bg-accent" /> : null}
                      </span>
                      <span className={done || active ? "text-fg" : "text-fg-subtle"}>{s}</span>
                      {done ? <span className="ml-auto font-mono text-[10.5px] text-fg-subtle">{(i + 1) * 3.8}s</span> : null}
                    </li>
                  )
                })}
              </ol>
              {phase === "done" ? (
                <p className="mt-4 animate-[rise-in_300ms_var(--ease-hairline)_both] rounded-xl bg-accent-soft px-3 py-2 text-center text-[12px] font-medium text-accent-fg">Delivered in 11.4 seconds</p>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={phase === "done" ? () => setPhase("idle") : send}
        disabled={phase === "sending"}
        className="mt-auto h-12 rounded-2xl bg-accent text-[15px] font-semibold text-on-accent shadow-ink outline-none transition-opacity active:translate-y-px disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {phase === "idle" ? `Send £${amount.toLocaleString("en-GB")}` : phase === "sending" ? "Sending…" : "Send again"}
      </button>
    </div>
  )
}
