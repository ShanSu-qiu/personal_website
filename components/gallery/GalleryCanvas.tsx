import { getNeighbors } from "@/lib/sections-config"
import { CenterCard } from "./CenterCard"
import { SideCard } from "./SideCard"
import { BottomNav } from "./BottomNav"
import { BackButton } from "./BackButton"

export function GalleryCanvas({ centerId }: { centerId: string }) {
  const n = getNeighbors(centerId)
  if (!n) {
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
      {/* Floor pool — soft warm spotlight at bottom */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
        style={{
          width: 500,
          height: 80,
          background:
            "radial-gradient(ellipse at center, rgba(212, 200, 166, 0.4) 0%, transparent 70%)",
        }}
      />

      <BackButton />

      {/* Top-center uppercase section label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 uppercase select-none"
        style={{
          top: 32,
          fontSize: 11,
          letterSpacing: 3,
          color: "#A89E86",
        }}
      >
        {n.center.title}
      </div>

      {/* Cards row — 5 across, center highlighted */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ gap: 40 }}
      >
        <SideCard section={n.farLeft} distance="far" side="left" />
        <SideCard section={n.nearLeft} distance="near" side="left" />
        <CenterCard section={n.center} />
        <SideCard section={n.nearRight} distance="near" side="right" />
        <SideCard section={n.farRight} distance="far" side="right" />
      </div>

      <BottomNav centerId={centerId} />
    </main>
  )
}
