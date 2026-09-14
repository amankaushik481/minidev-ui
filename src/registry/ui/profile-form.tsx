"use client"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function ProfileForm({ className }: { className?: string }) {
  return (
    <form data-slot="profile-form" className={cn("space-y-3", className)} onSubmit={(e) => e.preventDefault()}>
      <FormField id="pf-name" label="Display name">
        <Input id="pf-name" defaultValue="Aman" />
      </FormField>
      <FormField id="pf-bio" label="Bio">
        <Textarea id="pf-bio" placeholder="Short bio" />
      </FormField>
      <Button type="submit">Save profile</Button>
    </form>
  )
}
export { ProfileForm }
