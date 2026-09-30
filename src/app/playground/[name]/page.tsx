import { permanentRedirect } from "next/navigation"

/** The old per-component playground lives on the docs page now. */
export default async function PlaygroundRedirect({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  permanentRedirect(`/docs/${name}`)
}
