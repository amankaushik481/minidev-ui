"use client"
import * as React from "react"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { QrCode } from "@/registry/ui/qr-code"
import { TwoFactorSetup } from "@/registry/ui/two-factor-setup"
import type { Example } from "./types"

const OTPAUTH = "otpauth://totp/Lumen:maya@northwind.example?secret=JBSWY3DPEHPK3PXP&issuer=Lumen"

function EnrolDemo() {
  const [invalid, setInvalid] = React.useState(false)
  const [enabled, setEnabled] = React.useState(false)
  if (enabled) {
    return (
      <InlineAlert tone="success" title="Two-factor authentication is on" className="mx-auto w-full max-w-sm">
        You will be asked for a code each time you sign in on a new device.
      </InlineAlert>
    )
  }
  return (
    <TwoFactorSetup
      className="w-full"
      qr={<QrCode value={OTPAUTH} bare size={128} title="Authenticator setup code" className="mx-auto" />}
      secret="JBSW Y3DP EHPK 3PXP"
      invalid={invalid}
      onVerify={(code) => {
        // Reset first so a second wrong code shakes again. The demo accepts 123456.
        setInvalid(false)
        setTimeout(() => (code === "123456" ? setEnabled(true) : setInvalid(true)), 400)
      }}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Enrol an authenticator",
    description: "Name the QR with title so screen readers don't read the secret in the URI. Enter 123456 to finish, anything else to see the error.",
    code: `const OTPAUTH = "otpauth://totp/Lumen:maya@northwind.example?secret=JBSWY3DPEHPK3PXP&issuer=Lumen"

function EnrolDemo() {
  const [invalid, setInvalid] = React.useState(false)
  const [enabled, setEnabled] = React.useState(false)
  if (enabled) {
    return (
      <InlineAlert tone="success" title="Two-factor authentication is on" className="mx-auto w-full max-w-sm">
        You will be asked for a code each time you sign in on a new device.
      </InlineAlert>
    )
  }
  return (
    <TwoFactorSetup
      className="w-full"
      qr={<QrCode value={OTPAUTH} bare size={128} title="Authenticator setup code" className="mx-auto" />}
      secret="JBSW Y3DP EHPK 3PXP"
      invalid={invalid}
      onVerify={(code) => {
        // Reset first so a second wrong code shakes again. The demo accepts 123456.
        setInvalid(false)
        setTimeout(() => (code === "123456" ? setEnabled(true) : setInvalid(true)), 400)
      }}
    />
  )
}`,
    node: <EnrolDemo />,
  },
  {
    title: "While the QR code loads",
    description: "Leave out qr and a placeholder holds its space; the setup key already works for manual entry.",
    code: `<TwoFactorSetup className="w-full" secret="JBSW Y3DP EHPK 3PXP" />`,
    node: <TwoFactorSetup className="w-full" secret="JBSW Y3DP EHPK 3PXP" />,
  },
]
