import { OnboardingWizard } from "@/registry/ui/onboarding-wizard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Constrained width",
    description: "The wizard fills its container, so cap the width where it sits alone; the stepper and the forms share that width.",
    code: `<OnboardingWizard className="w-full max-w-md" />`,
    node: <OnboardingWizard className="w-full max-w-md" />,
  },
  {
    title: "Inside a welcome card",
    description: "Wrap it in a Card with a greeting for a first-run screen; the wizard keeps its own step state.",
    code: `<Card className="w-full max-w-lg">
  <CardHeader>
    <CardTitle>Welcome to Lumen, Maya</CardTitle>
    <CardDescription>Three short steps and your team can start sending invoices.</CardDescription>
  </CardHeader>
  <CardContent>
    <OnboardingWizard />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to Lumen, Maya</CardTitle>
          <CardDescription>Three short steps and your team can start sending invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingWizard />
        </CardContent>
      </Card>
    ),
  },
]
