"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { TwoFactorVerify } from "@/registry/ui/two-factor-verify"
import type { Example } from "./types"

function VerifyDemo() {
  const [invalid, setInvalid] = React.useState(false)
  const [signedIn, setSignedIn] = React.useState(false)
  const verify = (code: string) => {
    setInvalid(false)
    setTimeout(() => {
      if (code === "246810") setSignedIn(true)
      else setInvalid(true)
    }, 500)
  }
  if (signedIn) {
    return (
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-sm text-fg shadow-highlight">
        Signed in as maya@northwind.example.
        <Button variant="outline" size="sm" className="mt-4 block" onClick={() => setSignedIn(false)}>Sign out</Button>
      </div>
    )
  }
  return <TwoFactorVerify className="w-full" onVerify={verify} invalid={invalid} />
}

export const examples: Example[] = [
  {
    title: "Sign-in challenge",
    description: "The code submits itself on the last digit. The demo accepts 246810; a wrong code turns the slots red and shakes them.",
    code: `function VerifyDemo() {
  const [invalid, setInvalid] = React.useState(false)
  const [signedIn, setSignedIn] = React.useState(false)
  const verify = (code: string) => {
    setInvalid(false)
    setTimeout(() => {
      if (code === "246810") setSignedIn(true)
      else setInvalid(true)
    }, 500)
  }
  if (signedIn) {
    return (
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-sm text-fg shadow-highlight">
        Signed in as maya@northwind.example.
        <Button variant="outline" size="sm" className="mt-4 block" onClick={() => setSignedIn(false)}>Sign out</Button>
      </div>
    )
  }
  return <TwoFactorVerify className="w-full" onVerify={verify} invalid={invalid} />
}`,
    node: <VerifyDemo />,
  },
  {
    title: "Code sent by text message",
    description: "description says where the code came from; the field already accepts SMS autofill.",
    code: `<TwoFactorVerify className="w-full" description="We sent a 6-digit code to the phone number ending in 0142." />`,
    node: <TwoFactorVerify className="w-full" description="We sent a 6-digit code to the phone number ending in 0142." />,
  },
]
