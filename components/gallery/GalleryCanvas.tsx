import { getSectionById } from "@/lib/sections-config"
import { CenterCard } from "./CenterCard"
import { BackButton } from "./BackButton"

export function GalleryCanvas({ centerId }: { centerId: string }) {
  const section = getSectionById(centerId)
  if (!section) {
    return (
      <main className="relative w-full min-h-screen flex items-center justify-center">
        <p className="font-serif text-foreground">Section not found.</p>
      </main>
    )
  }

  return (
    <main
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #F5EFE3 0%, #EDE5D2 55%, #E3D9BF 100%)",
      }}
    >
      <BackButton />

      <div
        className="absolute left-1/2 -translate-x-1/2 uppercase select-none"
        style={{
          top: 32,
          fontSize: 11,
          letterSpacing: 3,
          color: "#A89E86",
        }}
      >
        {section.title}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <CenterCard section={section} />
      </div>
    </main>
  )
}
