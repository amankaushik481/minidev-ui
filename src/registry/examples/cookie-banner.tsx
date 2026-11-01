"use client"
import * as React from "react"
import { CookieBanner } from "@/registry/ui/cookie-banner"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ConsentDemo() {
  const [choice, setChoice] = React.useState<"accepted" | "rejected" | null>(null)
  if (choice) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-fg-muted">Non-essential cookies {choice}.</span>
        <Button variant="outline" size="sm" onClick={() => setChoice(null)}>Change</Button>
      </div>
    )
  }
  return <CookieBanner className="static" onAccept={() => setChoice("accepted")} onReject={() => setChoice("rejected")} />
}

export const examples: Example[] = [
  {
    title: "Remembering the choice",
    description: "onAccept and onReject are where you store the decision, in a cookie or localStorage, and stop rendering the banner.",
    code: `function ConsentDemo() {
  const [choice, setChoice] = React.useState<"accepted" | "rejected" | null>(null)
  if (choice) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-fg-muted">Non-essential cookies {choice}.</span>
        <Button variant="outline" size="sm" onClick={() => setChoice(null)}>Change</Button>
      </div>
    )
  }
  return <CookieBanner className="static" onAccept={() => setChoice("accepted")} onReject={() => setChoice("rejected")} />
}`,
    node: <ConsentDemo />,
  },
  {
    title: "Inline placement",
    description: "The banner is fixed to the bottom right corner by default; static through className places it in the flow, for a settings page or a preview.",
    code: `<CookieBanner className="static w-full max-w-md" />`,
    node: <CookieBanner className="static w-full max-w-md" />,
  },
]
