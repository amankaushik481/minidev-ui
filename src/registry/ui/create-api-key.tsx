"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * An inline "name your key, then create it" row: a labelled input and a Create key button that stays disabled until there is a name.
 *
 * Use at the top of an API keys settings page above ApiKeyList. Enter creates. Show the new secret once with SecretReveal after `onCreate`.
 *
 * @example
 * <CreateApiKey onCreate={async (name) => setSecret(await createKey(name))} />
 */
type CreateApiKeyProps = {
  /** Called with the trimmed key name. The field clears once it returns, or once its promise resolves; a rejected promise keeps the name. */
  onCreate?: (name: string) => void | Promise<void>
  /** Field label. Defaults to "Key name". */
  label?: string
  /** Input placeholder. Defaults to "Production". */
  placeholder?: string
  disabled?: boolean
  className?: string
}

function CreateApiKey({ className, onCreate, label = "Key name", placeholder = "Production", disabled }: CreateApiKeyProps) {
  const id = React.useId()
  const [name, setName] = React.useState("")
  const create = () => {
    const n = name.trim()
    if (!n || disabled) return
    // A rejection is the caller's to report; keeping the name lets them retry.
    Promise.resolve(onCreate?.(n)).then(() => setName(""), () => {})
  }
  return (
    <div data-slot="create-api-key" className={cn("flex flex-wrap items-end gap-2", className)}>
      <FormField id={id} label={label} className="min-w-56 flex-1">
        <Input
          id={id}
          value={name}
          disabled={disabled}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              create()
            }
          }}
          placeholder={placeholder}
          autoComplete="off"
        />
      </FormField>
      <Button type="button" onClick={create} disabled={disabled || !name.trim()}>
        Create key
      </Button>
    </div>
  )
}
export { CreateApiKey }
export type { CreateApiKeyProps }
