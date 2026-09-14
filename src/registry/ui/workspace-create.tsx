"use client"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function WorkspaceCreate({ className, onCreate }: { className?: string; onCreate?: () => void }) {
  return (
    <div data-slot="workspace-create" className={cn("space-y-3", className)}>
      <FormField id="ws-name" label="Workspace name" required>
        <Input id="ws-name" placeholder="Acme Inc" />
      </FormField>
      <FormField id="ws-url" label="URL">
        <Input id="ws-url" placeholder="acme" />
      </FormField>
      <Button onClick={onCreate}>Create workspace</Button>
    </div>
  )
}
export { WorkspaceCreate }
