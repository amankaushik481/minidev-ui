"use client"
import { CalendarIcon, DatabaseIcon, MailIcon, MessageSquareIcon, WebhookIcon } from "lucide-react"
import { OrbitLogoCluster } from "@/registry/premium/orbit-logo-cluster"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Integration names",
    description: "Text names on the ring; screen readers hear them as a list named by label.",
    code: `<OrbitLogoCluster
  center="Lumen"
  label="Lumen integrations"
  logos={["Acme Bank", "Northwind CRM", "Globex Pay", "Contoso HR", "Fabrikam Tax", "Tailspin Mail"]}
/>`,
    node: (
      <OrbitLogoCluster
        center="Lumen"
        label="Lumen integrations"
        logos={["Acme Bank", "Northwind CRM", "Globex Pay", "Contoso HR", "Fabrikam Tax", "Tailspin Mail"]}
      />
    ),
  },
  {
    title: "Icons with labels, slower",
    description: "logos takes any node; keep visible text in each pill so it has a name. A longer duration calms the orbit.",
    code: `<OrbitLogoCluster
  center="API"
  label="Event sources"
  duration={64}
  logos={[
    <span key="mail" className="inline-flex items-center gap-1.5"><MailIcon className="size-3.5" /> Email</span>,
    <span key="chat" className="inline-flex items-center gap-1.5"><MessageSquareIcon className="size-3.5" /> Chat</span>,
    <span key="cal" className="inline-flex items-center gap-1.5"><CalendarIcon className="size-3.5" /> Calendar</span>,
    <span key="db" className="inline-flex items-center gap-1.5"><DatabaseIcon className="size-3.5" /> Database</span>,
    <span key="hook" className="inline-flex items-center gap-1.5"><WebhookIcon className="size-3.5" /> Webhooks</span>,
  ]}
/>`,
    node: (
      <OrbitLogoCluster
        center="API"
        label="Event sources"
        duration={64}
        logos={[
          <span key="mail" className="inline-flex items-center gap-1.5"><MailIcon className="size-3.5" /> Email</span>,
          <span key="chat" className="inline-flex items-center gap-1.5"><MessageSquareIcon className="size-3.5" /> Chat</span>,
          <span key="cal" className="inline-flex items-center gap-1.5"><CalendarIcon className="size-3.5" /> Calendar</span>,
          <span key="db" className="inline-flex items-center gap-1.5"><DatabaseIcon className="size-3.5" /> Database</span>,
          <span key="hook" className="inline-flex items-center gap-1.5"><WebhookIcon className="size-3.5" /> Webhooks</span>,
        ]}
      />
    ),
  },
]
