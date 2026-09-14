"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
function MagicLinkForm({ onSend }: { onSend?: (email: string) => void }) {
  const [email, setEmail] = React.useState("")
  return (
    <div data-slot="magic-link-form">
      <AuthCard title="Email magic link">
      <FormField id="ml-email" label="Email">
        <Input id="ml-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      <Button className="w-full" onClick={() => onSend?.(email)}>
        Send link
      </Button>
    </AuthCard>
    </div>
  )
}
export { MagicLinkForm }
