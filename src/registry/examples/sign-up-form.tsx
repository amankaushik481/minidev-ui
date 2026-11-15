"use client"
import * as React from "react"
import { SignUpForm, type SignUpValues } from "@/registry/ui/sign-up-form"
import type { Example } from "./types"

function SignUpDemo() {
  const [last, setLast] = React.useState("")
  const submit = (values: SignUpValues) => setLast("Creating an account for " + values.name + " <" + values.email + ">")
  return (
    <div className="w-full space-y-2">
      <SignUpForm
        signInHref="#sign-in"
        onSubmit={submit}
        onGithub={() => setLast("Redirecting to GitHub…")}
        onGoogle={() => setLast("Redirecting to Google…")}
      />
      <p role="status" className="text-center text-xs text-fg-muted">{last}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Wired up",
    description: "onSubmit gets name, email and password after the browser's required checks pass; the social buttons call their own handlers.",
    code: `function SignUpDemo() {
  const [last, setLast] = React.useState("")
  const submit = (values: SignUpValues) => setLast("Creating an account for " + values.name + " <" + values.email + ">")
  return (
    <div className="w-full space-y-2">
      <SignUpForm
        signInHref="#sign-in"
        onSubmit={submit}
        onGithub={() => setLast("Redirecting to GitHub…")}
        onGoogle={() => setLast("Redirecting to Google…")}
      />
      <p role="status" className="text-center text-xs text-fg-muted">{last}</p>
    </div>
  )
}`,
    node: <SignUpDemo />,
  },
  {
    title: "Next to a product pitch",
    description: "On a wide screen, put the card beside a short reason to sign up; it stacks on phones.",
    code: `<div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-2">
  <div>
    <h2 className="text-xl font-medium tracking-[-0.014em] text-balance text-fg">Send your first invoice in five minutes</h2>
    <p className="mt-2 text-sm text-pretty text-fg-muted">Lumen is free for up to 20 invoices a month. No card needed.</p>
  </div>
  <SignUpForm signInHref="#sign-in" />
</div>`,
    node: (
      <div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.014em] text-balance text-fg">Send your first invoice in five minutes</h2>
          <p className="mt-2 text-sm text-pretty text-fg-muted">Lumen is free for up to 20 invoices a month. No card needed.</p>
        </div>
        <SignUpForm signInHref="#sign-in" />
      </div>
    ),
  },
]
