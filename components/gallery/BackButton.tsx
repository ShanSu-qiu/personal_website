import Link from "next/link"

export function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Back to cube"
      className="absolute top-6 left-6 flex items-center gap-3 group"
    >
      <div
        className="flex items-center justify-center rounded-md transition-shadow group-hover:shadow-md"
        style={{
          width: 42,
          height: 42,
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(138, 127, 107, 0.35)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div
          className="grid grid-cols-3"
          style={{ width: 18, height: 18, gap: 2 }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#8A7F6B",
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>
      <span
        className="font-serif text-sm"
        style={{ color: "#3D3324", fontWeight: 400 }}
      >
        Back to cube
      </span>
    </Link>
  )
}
