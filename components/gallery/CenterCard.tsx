import Link from "next/link"
import type { Section } from "@/lib/sections-config"

export function CenterCard({ section }: { section: Section }) {
  return (
    <div
      className="relative flex flex-col shrink-0"
      style={{
        width: 360,
        height: 370,
        backgroundColor: "#FFFFFF",
        border: "1.2px solid #8A7F6B",
        borderRadius: 6,
        padding: 32,
        boxShadow: "0 4px 16px rgba(138, 127, 107, 0.08)",
      }}
    >
      <h1
        className="font-serif"
        style={{
          fontSize: 32,
          fontWeight: 400,
          color: "#2A2118",
          lineHeight: 1.15,
          marginBottom: 12,
        }}
      >
        {section.title}
      </h1>
      <div
        style={{
          width: 70,
          height: 1.2,
          backgroundColor: "#B89968",
          marginBottom: 20,
        }}
      />
      <div className="font-serif flex-1" style={{ marginBottom: 16 }}>
        {section.paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: 15,
              color: "#3D3324",
              lineHeight: 1.5,
              marginBottom: i < section.paragraphs.length - 1 ? 12 : 0,
            }}
          >
            {p}
          </p>
        ))}
      </div>
      {section.learnMoreHref && (
        <Link
          href={section.learnMoreHref}
          className="font-serif self-start underline underline-offset-4 transition-opacity hover:opacity-80"
          style={{
            fontSize: 14,
            color: "#8A6B3D",
          }}
        >
          Learn more →
        </Link>
      )}
    </div>
  )
}
