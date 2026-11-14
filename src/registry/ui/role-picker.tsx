"use client"
import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { Label } from "@/registry/ui/label"
import { cn } from "@/lib/utils"

/**
 * RolePicker — labelled radios for choosing one workspace role (Owner, Admin, Member by default).
 *
 * Use it in invite dialogs and member settings. Built on RadioGroup, so arrow keys move and
 * select. For editing what each role can do use RolePermissionMatrix.
 *
 * @example
 * <RolePicker value={role} onValueChange={setRole} roles={[{ value: "admin", label: "Admin" }, { value: "viewer", label: "Viewer" }]} />
 */

type RoleOption = { value: string; label: string }

const SAMPLE_ROLES: RoleOption[] = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
]

function RolePicker({
  roles = SAMPLE_ROLES,
  value,
  defaultValue = "member",
  onValueChange,
  "aria-label": ariaLabel = "Role",
  className,
}: {
  /** Roles to offer, in order. */
  roles?: RoleOption[]
  /** Controlled role value. */
  value?: string
  /** Starting role when uncontrolled. */
  defaultValue?: string
  /** Fires with the picked role value. */
  onValueChange?: (value: string) => void
  /** Accessible name of the group. */
  "aria-label"?: string
  className?: string
}) {
  const id = React.useId()
  return (
    <RadioGroup
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      onValueChange={(v) => onValueChange?.(v as string)}
      aria-label={ariaLabel}
      data-slot="role-picker"
      className={cn("gap-2", className)}
    >
      {roles.map((r) => (
        <div key={r.value} className="flex items-center gap-2">
          <RadioGroupItem value={r.value} id={`${id}-${r.value}`} />
          <Label htmlFor={`${id}-${r.value}`}>{r.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
export { RolePicker }
export type { RoleOption }
