/** Server-rendered JSON-LD. Pass a `graph(...)` document. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // < is escaped so a string can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
