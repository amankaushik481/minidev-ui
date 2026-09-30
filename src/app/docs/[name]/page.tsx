import { notFound } from "next/navigation"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { PropsTable } from "@/components/seo/props-table"
import { ComponentDocs } from "./client"

/** Server shell: the interactive docs are a client component; the API table renders on the server. */
export default async function ComponentDocsPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const entry = COMPONENT_INDEX.find((c) => c.name === name)
  if (!entry) notFound()
  return <ComponentDocs name={name} api={<PropsTable name={entry.name} title={entry.title} />} />
}
