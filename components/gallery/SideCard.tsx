import type { Section } from "@/lib/sections-config"

type Distance = "near" | "far"
type Side = "left" | "right"

export function SideCard({
  section,
  distance,
  side,
}: {
  section: Section
  distance: Distance
  side: Side
}) {
  const isNear = distance === "near"
  const width = isNear ? 170 : 130
  const height = isNear ? 220 : 165
  const skewMagnitude = isNear ? 7 : 10
  // Per spec: skewY(+deg) on left, skewY(-deg) on right. Both tilt the
  // center-facing edge downward, creating a V pointing at the center card.
  const skewDeg = side === "left" ? skewMagnitude : -skewMagnitude
  const opacity = isNear ? 0.35 : 0.12
  const borderColor = isNear ? "#A89E86" : "rgba(168, 158, 134, 0.4)"
  const borderWidth = isNear ? 0.8 : 0.5

  return (
    <div
      className="shrink-0 relative"
      style={{
        width,
        height,
        transform: `skewY(${skewDeg}deg)`,
        opacity,
        backgroundColor: "#FFFFFF",
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: 4,
      }}
    >
      {isNear && (
        <div className="flex flex-col items-center justify-center gap-3 h-full px-4">
          <span
            className="font-serif text-center"
            style={{
              fontSize: 15,
              fontStyle: "italic",
              color: "#2A2118",
              lineHeight: 1.25,
            }}
          >
            {section.title}
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              backgroundColor: "#A89E86",
            }}
          />
        </div>
      )}
    </div>
  )
}
