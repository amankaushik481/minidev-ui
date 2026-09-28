"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { cn } from "@/lib/utils"

function CouponInput({ className }: { className?: string }) {
  const [code, setCode] = React.useState("")
  const [ok, setOk] = React.useState<null | boolean>(null)
  return (
    <div data-slot="coupon-input" className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => { setCode(e.target.value); setOk(null) }}
          placeholder="Coupon code"
          aria-label="Coupon code"
        />
        <Button type="button" variant="outline" onClick={() => setOk(code.trim().toUpperCase() === "HAIRLINE")}>
          Apply
        </Button>
      </div>
      {ok === true ? <p className="text-xs text-success">Coupon applied: 20% off the Pro plan</p> : null}
      {ok === false ? <p className="text-xs text-danger">Invalid code</p> : null}
    </div>
  )
}
export { CouponInput }
