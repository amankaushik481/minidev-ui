"use client"
import { Button } from "@/registry/ui/button"
import { WelcomeScreen } from "@/registry/ui/welcome-screen"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "After sign-up",
    description: "Your own headline, steps and actions; always pass actions, since the defaults do nothing.",
    code: `<WelcomeScreen
  className="w-full max-w-xl"
  title="Welcome to Lumen, Maya"
  description="Get paid faster: connect a bank, bring in your team, send the first invoice."
  steps={["Connect your bank account", "Invite your finance team", "Send your first invoice"]}
  actions={
    <>
      <Button>Connect bank</Button>
      <Button variant="ghost">Skip for now</Button>
    </>
  }
/>`,
    node: (
      <WelcomeScreen
        className="w-full max-w-xl"
        title="Welcome to Lumen, Maya"
        description="Get paid faster: connect a bank, bring in your team, send the first invoice."
        steps={["Connect your bank account", "Invite your finance team", "Send your first invoice"]}
        actions={
          <>
            <Button>Connect bank</Button>
            <Button variant="ghost">Skip for now</Button>
          </>
        }
      />
    ),
  },
  {
    title: "Joining a workspace",
    description: "Pass an empty steps array for a single message and one action.",
    code: `<WelcomeScreen
  className="w-full max-w-xl"
  eyebrow="Invite accepted"
  title="You joined Northwind Labs"
  description="Maya Chen added you as a Member. Your first assigned invoices are waiting."
  steps={[]}
  actions={<Button>Open my invoices</Button>}
/>`,
    node: (
      <WelcomeScreen
        className="w-full max-w-xl"
        eyebrow="Invite accepted"
        title="You joined Northwind Labs"
        description="Maya Chen added you as a Member. Your first assigned invoices are waiting."
        steps={[]}
        actions={<Button>Open my invoices</Button>}
      />
    ),
  },
]
