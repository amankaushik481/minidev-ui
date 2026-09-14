"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function CreateApiKey({ className, onCreate }: { className?: string; onCreate?: (name: string) => void }) {
  const [name, setName] = React.useState("")
  return (
    <div data-slot="create-api-key" className={cn("flex flex-wrap items-end gap-2", className)}>
      <FormField id="key-name" label="Key name" className="min-w-56 flex-1">
        <Input id="key-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Production" />
      </FormField>
      <Button onClick={() => onCreate?.(name)}>Create key</Button>
    </div>
  )
}
export { CreateApiKey }
