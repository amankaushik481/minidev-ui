"use client"
import * as React from "react"
import { OnboardingWizard } from "@/registry/ui/onboarding-wizard"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

function WelcomeCardDemo() {
  const [done, setDone] = React.useState(false)
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Welcome to Lumen, Maya</CardTitle>
        <CardDescription>Three short steps and your team can start sending invoices.</CardDescription>
      </CardHeader>
      <CardContent>
        <OnboardingWizard onComplete={() => setDone(true)} />
      </CardContent>
      <CardFooter className="justify-end">
        <Button disabled={!done}>Go to invoices</Button>
      </CardFooter>
    </Card>
  )
}

export const examples: Example[] = [
  {
    title: "Constrained width",
    description: "The wizard fills its container, so cap the width where it sits alone; the stepper and the forms share that width.",
    code: `<OnboardingWizard className="w-full max-w-md" />`,
    node: <OnboardingWizard className="w-full max-w-md" />,
  },
  {
    title: "Finish with onComplete",
    description: "onComplete fires when the last step is reached; use it to unlock the way out of the first-run screen or to route away.",
    code: `function WelcomeCardDemo() {
  const [done, setDone] = React.useState(false)
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Welcome to Lumen, Maya</CardTitle>
        <CardDescription>Three short steps and your team can start sending invoices.</CardDescription>
      </CardHeader>
      <CardContent>
        <OnboardingWizard onComplete={() => setDone(true)} />
      </CardContent>
      <CardFooter className="justify-end">
        <Button disabled={!done}>Go to invoices</Button>
      </CardFooter>
    </Card>
  )
}`,
    node: <WelcomeCardDemo />,
  },
]
