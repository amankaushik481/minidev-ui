import { DangerZone } from "@/registry/ui/danger-zone"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Constrained width",
    description: "The panel stretches to its container, so set a max width when it sits alone on a page.",
    code: `<DangerZone className="w-full max-w-md" />`,
    node: <DangerZone className="w-full max-w-md" />,
  },
  {
    title: "Below other settings",
    description: "Keep it last on a settings page, after the ordinary cards, so destructive actions are never the first thing in reach.",
    code: `<div className="flex w-full max-w-md flex-col gap-4">
  <Card>
    <CardHeader>
      <CardTitle>Workspace</CardTitle>
      <CardDescription>The name shows on invoices and in the customer portal.</CardDescription>
    </CardHeader>
    <CardContent>
      <FormField id="ws-display-name" label="Name">
        <Input id="ws-display-name" defaultValue="Northwind" />
      </FormField>
    </CardContent>
    <CardFooter className="justify-end">
      <Button size="sm">Save changes</Button>
    </CardFooter>
  </Card>
  <DangerZone />
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>The name shows on invoices and in the customer portal.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField id="ws-display-name" label="Name">
              <Input id="ws-display-name" defaultValue="Northwind" />
            </FormField>
          </CardContent>
          <CardFooter className="justify-end">
            <Button size="sm">Save changes</Button>
          </CardFooter>
        </Card>
        <DangerZone />
      </div>
    ),
  },
]
