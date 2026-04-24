import Link from "next/link"
import { notFound } from "next/navigation"
import { SECTIONS, getSectionById } from "@/lib/sections-config"

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ id: s.id }))
}

export const dynamicParams = false

export default async function SectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const section = getSectionById(id)
  if (!section) {
    notFound()
  }

  return (
    <main
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(ellipse at center, #F5EFE3 0%, #EDE5D2 55%, #E3D9BF 100%)",
      }}
    >
      <h1
        className="font-serif"
        style={{ fontSize: 40, color: "#2A2118", fontWeight: 400, marginBottom: 16 }}
      >
        Detail page for {section.title}
      </h1>
      <p
        className="font-serif"
        style={{ fontSize: 15, color: "#3D3324", marginBottom: 32 }}
      >
        (Placeholder — real content to be built in a future phase.)
      </p>
      <Link
        href={`/gallery/${section.id}`}
        className="font-serif underline underline-offset-4"
        style={{ fontSize: 14, color: "#8A6B3D" }}
      >
        ← Back to gallery
      </Link>
    </main>
  )
}
