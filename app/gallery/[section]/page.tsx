import { notFound } from "next/navigation"
import { GalleryCanvas } from "@/components/gallery/GalleryCanvas"
import { SECTIONS, getSectionById } from "@/lib/sections-config"

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.id }))
}

export const dynamicParams = false

export default async function GallerySectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  const found = getSectionById(section)
  if (!found) {
    notFound()
  }
  return <GalleryCanvas centerId={found.id} />
}
