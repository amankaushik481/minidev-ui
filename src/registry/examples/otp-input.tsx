"use client"
import * as React from "react"
import { OtpInput } from "@/registry/ui/otp-input"
import type { Example } from "./types"

function VerifyDemo() {
  const [code, setCode] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "invalid" | "success">("idle")
  return (
    <div className="flex flex-col gap-3">
      <OtpInput
        value={code}
        status={status}
        groups={[3, 3]}
        onChange={(v) => {
          setCode(v)
          if (status !== "idle") setStatus("idle")
        }}
        onComplete={(v) => setStatus(v === "424242" ? "success" : "invalid")}
      />
      <p className={status === "invalid" ? "text-xs text-danger" : status === "success" ? "text-xs text-success" : "text-xs text-fg-muted"}>
        {status === "invalid" ? "That code did not match. Try again." : status === "success" ? "Signed in to Lumen." : "Enter 424242 to pass."}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Grouped slots",
    description: "groups splits the slots with a divider; the numbers must add up to length.",
    code: `<OtpInput groups={[3, 3]} defaultValue="482" />`,
    node: <OtpInput groups={[3, 3]} defaultValue="482" />,
  },
  {
    title: "Verify on complete",
    description: "onComplete fires once every slot is filled; set status to show the result and reset it on the next edit.",
    code: `function VerifyDemo() {
  const [code, setCode] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "invalid" | "success">("idle")
  return (
    <div className="flex flex-col gap-3">
      <OtpInput
        value={code}
        status={status}
        groups={[3, 3]}
        onChange={(v) => {
          setCode(v)
          if (status !== "idle") setStatus("idle")
        }}
        onComplete={(v) => setStatus(v === "424242" ? "success" : "invalid")}
      />
      <p className={status === "invalid" ? "text-xs text-danger" : status === "success" ? "text-xs text-success" : "text-xs text-fg-muted"}>
        {status === "invalid" ? "That code did not match. Try again." : status === "success" ? "Signed in to Lumen." : "Enter 424242 to pass."}
      </p>
    </div>
  )
}`,
    node: <VerifyDemo />,
  },
  {
    title: "Alphanumeric and large",
    description: "The alphanumeric pattern uppercases letters as you type; size lg suits a PIN on its own screen.",
    code: `<OtpInput length={6} pattern="alphanumeric" groups={[3, 3]} defaultValue="LUM" aria-label="Invite code" />
<OtpInput length={4} size="lg" defaultValue="42" aria-label="PIN" />`,
    node: (
      <div className="flex flex-col items-start gap-4">
        <OtpInput length={6} pattern="alphanumeric" groups={[3, 3]} defaultValue="LUM" aria-label="Invite code" />
        <OtpInput length={4} size="lg" defaultValue="42" aria-label="PIN" />
      </div>
    ),
  },
  {
    title: "Status and disabled",
    description: "status invalid shakes and turns the slots red, success turns them green, disabled dims the field.",
    code: `<OtpInput status="invalid" defaultValue="914027" />
<OtpInput status="success" defaultValue="424242" />
<OtpInput disabled defaultValue="42" />`,
    node: (
      <div className="flex flex-col items-start gap-4">
        <OtpInput status="invalid" defaultValue="914027" />
        <OtpInput status="success" defaultValue="424242" />
        <OtpInput disabled defaultValue="42" />
      </div>
    ),
  },
]
