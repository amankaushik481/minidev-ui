"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { Button } from "@/registry/ui/button"
import { ForgotPasswordForm } from "@/registry/ui/forgot-password-form"
import type { Example } from "./types"

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function ForgotPasswordFlow() {
  const [sentTo, setSentTo] = React.useState("")
  if (sentTo) {
    return (
      <AuthCard
        title="Check your inbox"
        description={"If " + sentTo + " has an account, a reset link is on its way. It expires in 1 hour."}
      >
        <Button variant="outline" className="w-full" onClick={() => setSentTo("")}>Use another email</Button>
      </AuthCard>
    )
  }
  return (
    <ForgotPasswordForm
      className="w-full"
      onSubmit={async (email) => {
        await wait(800)
        setSentTo(email)
      }}
    />
  )
}

export const examples: Example[] = [
  {
    title: "With a confirmation step",
    description: "The form only shows Sending… while your promise runs; swap in your own confirmation when it resolves. The same message either way hides which emails have accounts.",
    code: `const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function ForgotPasswordFlow() {
  const [sentTo, setSentTo] = React.useState("")
  if (sentTo) {
    return (
      <AuthCard
        title="Check your inbox"
        description={"If " + sentTo + " has an account, a reset link is on its way. It expires in 1 hour."}
      >
        <Button variant="outline" className="w-full" onClick={() => setSentTo("")}>Use another email</Button>
      </AuthCard>
    )
  }
  return (
    <ForgotPasswordForm
      className="w-full"
      onSubmit={async (email) => {
        await wait(800)
        setSentTo(email)
      }}
    />
  )
}`,
    node: <ForgotPasswordFlow />,
  },
  {
    title: "Your own wording",
    description: "title and description take any node.",
    code: `<ForgotPasswordForm
  className="w-full"
  title="Reset your Lumen password"
  description="Enter the email you sign in with. The link works once."
/>`,
    node: (
      <ForgotPasswordForm
        className="w-full"
        title="Reset your Lumen password"
        description="Enter the email you sign in with. The link works once."
      />
    ),
  },
]
