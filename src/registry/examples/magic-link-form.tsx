"use client"
import * as React from "react"
import { MagicLinkForm } from "@/registry/ui/magic-link-form"
import type { Example } from "./types"

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const examples: Example[] = [
  {
    title: "Send a sign-in link",
    description: "Return a promise from onSend for the pending state; when it resolves, the form confirms where the link went and offers Resend.",
    code: `const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

<MagicLinkForm
  className="w-full"
  title="Sign in to Lumen"
  onSend={async () => {
    await wait(800) // call your auth provider here
  }}
/>`,
    node: (
      <MagicLinkForm
        className="w-full"
        title="Sign in to Lumen"
        onSend={async () => {
          await wait(800) // call your auth provider here
        }}
      />
    ),
  },
  {
    title: "Rejecting an address",
    description: "Throw an Error from onSend and its message shows under the field. Try any address outside northwind.example.",
    code: `const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

<MagicLinkForm
  className="w-full"
  title="Sign in to Northwind"
  onSend={async (email) => {
    await wait(600)
    if (!email.endsWith("@northwind.example")) {
      throw new Error("Use your Northwind work email, ending in @northwind.example.")
    }
  }}
/>`,
    node: (
      <MagicLinkForm
        className="w-full"
        title="Sign in to Northwind"
        onSend={async (email) => {
          await wait(600)
          if (!email.endsWith("@northwind.example")) {
            throw new Error("Use your Northwind work email, ending in @northwind.example.")
          }
        }}
      />
    ),
  },
]
