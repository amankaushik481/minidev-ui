"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function CancelFlow({ className }: { className?: string }) {
  const [step, setStep] = React.useState<"why" | "confirm">("why")
  return (
    <div data-slot="cancel-flow" className={cn("space-y-4 rounded-xl border border-border bg-surface p-5 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <h3 className="text-sm font-medium text-fg">Cancel Premium</h3>
      {step === "why" ? (
        <>
          <p className="text-sm text-fg-muted">Free UI stays. Kinetic heroes and the showcase soft-lock after the period ends.</p>
          <ul className="space-y-2 text-sm text-fg">
            {["Too expensive", "Not using motion", "Switching kits"].map((r) => (
              <li key={r}><label className="flex items-center gap-2"><input type="radio" name="why" className="accent-[var(--accent)]" /> {r}</label></li>
            ))}
          </ul>
          <Button size="sm" onClick={() => setStep("confirm")}>Continue</Button>
        </>
      ) : (
        <>
          <p className="text-sm text-fg-muted">Confirm cancellation. You keep Premium until the end of the billing period.</p>
          <div className="flex gap-2">
            <Button size="sm" variant="destructive">Confirm cancel</Button>
            <Button size="sm" variant="outline" onClick={() => setStep("why")}>Back</Button>
          </div>
        </>
      )}
    </div>
  )
}
export { CancelFlow }
