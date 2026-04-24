import Link from "next/link"
import { SECTIONS, getSectionById } from "@/lib/sections-config"

export function BottomNav({ centerId }: { centerId: string }) {
  const current = getSectionById(centerId)
  if (!current) return null

  const total = SECTIONS.length
  const currentNumber = current.displayOrder + 1
  const orderedDots = [...SECTIONS].sort(
    (a, b) => a.displayOrder - b.displayOrder
  )

  return (
    <div className="absolute left-1/2 bottom-12 -translate-x-1/2 flex flex-col items-center gap-3">
      <div className="flex items-center" style={{ gap: 14 }}>
        {orderedDots.map((s) => {
          const isActive = s.id === centerId
          const size = isActive ? 10 : 6
          return (
            <Link
              key={s.id}
              href={`/gallery/${s.id}`}
              aria-label={`Go to ${s.title}`}
              aria-current={isActive ? "page" : undefined}
              className="inline-flex items-center justify-center"
              style={{ width: 14, height: 14 }}
            >
              <span
                className="rounded-full inline-block"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: isActive ? "#3D3324" : "#C8BFA8",
                  transition: "background-color 200ms ease, width 200ms ease, height 200ms ease",
                }}
              />
            </Link>
          )
        })}
      </div>
      <span
        className="uppercase select-none"
        style={{
          fontSize: 10,
          letterSpacing: 2,
          color: "#8A7F6B",
        }}
      >
        {currentNumber} of {total} · Drag to explore
      </span>
    </div>
  )
}
