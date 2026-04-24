"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { User, Briefcase, BookOpen, FileText, Heart, Mail } from "lucide-react"
import type { Section } from "@/lib/sections-config"

type Phase = "idle" | "zooming"

interface FaceData {
  sectionId: Section["id"]
  name: string
  icon: React.ReactNode
  transform: string
}

const CUBE_SIZE = 200 // half of 400px
const MOBILE_CUBE_SIZE = 140 // half of 280px

const LABEL_ON_FACE = "rgba(40, 35, 30, 0.75)"

const faces: FaceData[] = [
  {
    sectionId: "about",
    name: "About Me",
    icon: <User className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    transform: `translateZ(${CUBE_SIZE}px)`,
  },
  {
    sectionId: "projects",
    name: "Projects",
    icon: <Briefcase className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    transform: `rotateY(90deg) translateZ(${CUBE_SIZE}px)`,
  },
  {
    sectionId: "research",
    name: "Research",
    icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    transform: `rotateX(90deg) translateZ(${CUBE_SIZE}px)`,
  },
  {
    sectionId: "resume",
    name: "Resume",
    icon: <FileText className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    transform: `rotateY(-90deg) translateZ(${CUBE_SIZE}px)`,
  },
  {
    sectionId: "hobbies",
    name: "Hobbies",
    icon: <Heart className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    transform: `rotateX(-90deg) translateZ(${CUBE_SIZE}px)`,
  },
  {
    sectionId: "contact",
    name: "Contact",
    icon: <Mail className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    transform: `rotateY(180deg) translateZ(${CUBE_SIZE}px)`,
  },
]

export function RubiksCube() {
  const [rotation, setRotation] = useState({ x: -15, y: 25 })
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [phase] = useState<Phase>("idle")
  const [isMobile, setIsMobile] = useState(false)

  const dragStart = useRef({ x: 0, y: 0 })
  const rotationStart = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const isIdle = phase === "idle" && !isDragging && !isHovering

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const delta = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      if (isIdle) {
        const rotationSpeed = 360 / 20000
        setRotation((prev) => ({
          x: prev.x + rotationSpeed * delta * 0.3,
          y: prev.y + rotationSpeed * delta,
        }))
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [isIdle]
  )

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [animate])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (phase !== "idle") return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    rotationStart.current = { ...rotation }
  }

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStart.current.x
      const deltaY = e.clientY - dragStart.current.y
      setRotation({
        x: rotationStart.current.x - deltaY * 0.8,
        y: rotationStart.current.y + deltaX * 0.8,
      })
    }

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const deltaX = touch.clientX - dragStart.current.x
      const deltaY = touch.clientY - dragStart.current.y
      setRotation({
        x: rotationStart.current.x - deltaY * 0.8,
        y: rotationStart.current.y + deltaX * 0.8,
      })
    }

    const onEnd = () => setIsDragging(false)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onEnd)
    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("touchend", onEnd)
    window.addEventListener("touchcancel", onEnd)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onEnd)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onEnd)
      window.removeEventListener("touchcancel", onEnd)
    }
  }, [isDragging])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (phase !== "idle") return
    setIsDragging(true)
    const touch = e.touches[0]
    dragStart.current = { x: touch.clientX, y: touch.clientY }
    rotationStart.current = { ...rotation }
  }

  // Face click → navigate to /gallery/[sectionId]. Phase 3 will add the zoom
  // animation on top of this stub.
  const handleFaceClick = (_face: FaceData) => {
    if (phase !== "idle" || isDragging) return
    // Phase 3 hook-up point: router.push(`/gallery/${_face.sectionId}`) with
    // zoom-out animation on the clicked face.
  }

  const cubeSize = isMobile ? MOBILE_CUBE_SIZE * 2 : CUBE_SIZE * 2
  const translateZ = isMobile ? MOBILE_CUBE_SIZE : CUBE_SIZE

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1200px",
          width: cubeSize,
          height: cubeSize,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Ground shadow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full bg-black/20 blur-2xl pointer-events-none"
          style={{
            width: cubeSize * 0.8,
            height: cubeSize * 0.15,
            marginTop: cubeSize * 0.6,
          }}
        />

        {/* 3D Cube */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 800ms ease-in-out",
            willChange: "transform",
          }}
        >
          {faces.map((face) => {
            const mobileTransform = face.transform.replace(
              new RegExp(`${CUBE_SIZE}px`, "g"),
              `${translateZ}px`
            )
            const baseTransform = isMobile ? mobileTransform : face.transform

            return (
              <div
                key={face.name}
                className="absolute cursor-pointer flex flex-col items-center justify-center gap-4 rounded-lg"
                onClick={() => handleFaceClick(face)}
                style={{
                  width: cubeSize,
                  height: cubeSize,
                  transform: baseTransform,
                  backgroundColor: "#FAF8F2",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  color: LABEL_ON_FACE,
                  backfaceVisibility: "hidden",
                }}
              >
                <span>{face.icon}</span>
                <span
                  className="font-serif text-xl md:text-2xl text-center px-4"
                  style={{ color: LABEL_ON_FACE, fontWeight: 400 }}
                >
                  {face.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
