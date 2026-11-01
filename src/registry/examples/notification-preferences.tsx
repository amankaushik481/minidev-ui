import { NotificationPreferences } from "@/registry/ui/notification-preferences"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Constrained width",
    description: "The rows stretch to fill their container, so give them a max width when they are not inside a card.",
    code: `<NotificationPreferences className="w-full max-w-xs" />`,
    node: <NotificationPreferences className="w-full max-w-xs" />,
  },
  {
    title: "Inside a settings card",
    description: "Wrap the rows in a Card with a title and a footer action; the switches keep their own state until you save.",
    code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>Choose what Lumen emails to maya@northwind.io.</CardDescription>
  </CardHeader>
  <CardContent>
    <NotificationPreferences />
  </CardContent>
  <CardFooter className="justify-end">
    <Button size="sm">Save preferences</Button>
  </CardFooter>
</Card>`,
    node: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what Lumen emails to maya@northwind.io.</CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationPreferences />
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm">Save preferences</Button>
        </CardFooter>
      </Card>
    ),
  },
]
