"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { User, Briefcase, BookOpen, FileText, Heart, Mail, X } from "lucide-react"

interface FaceData {
  name: string
  icon: React.ReactNode
  transform: string
  rotateToFront: { x: number; y: number }
}

const CUBE_SIZE = 200 // half of 400px
const MOBILE_CUBE_SIZE = 140 // half of 280px

const faces: FaceData[] = [
  {
    name: "About Me",
    icon: <User className="w-8 h-8 md:w-10 md:h-10" />,
    transform: `translateZ(${CUBE_SIZE}px)`,
    rotateToFront: { x: 0, y: 0 },
  },
  {
    name: "Projects",
    icon: <Briefcase className="w-8 h-8 md:w-10 md:h-10" />,
    transform: `rotateY(90deg) translateZ(${CUBE_SIZE}px)`,
    rotateToFront: { x: 0, y: -90 },
  },
  {
    name: "Research",
    icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10" />,
    transform: `rotateX(90deg) translateZ(${CUBE_SIZE}px)`,
    rotateToFront: { x: -90, y: 0 },
  },
  {
    name: "Resume",
    icon: <FileText className="w-8 h-8 md:w-10 md:h-10" />,
    transform: `rotateY(-90deg) translateZ(${CUBE_SIZE}px)`,
    rotateToFront: { x: 0, y: 90 },
  },
  {
    name: "Hobbies",
    icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />,
    transform: `rotateX(-90deg) translateZ(${CUBE_SIZE}px)`,
    rotateToFront: { x: 90, y: 0 },
  },
  {
    name: "Contact",
    icon: <Mail className="w-8 h-8 md:w-10 md:h-10" />,
    transform: `rotateY(180deg) translateZ(${CUBE_SIZE}px)`,
    rotateToFront: { x: 0, y: 180 },
  },
]

const contentData: Record<string, { title: string; paragraphs: string[] }> = {
  "About Me": {
    title: "About Me",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
  Projects: {
    title: "Projects",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod ultrices sem, at vestibulum lectus tincidunt vel. Nulla facilisi. Integer nec odio praesent libero.",
      "Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
    ],
  },
  Research: {
    title: "Research",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit.",
      "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Curabitur arcu erat.",
    ],
  },
  Resume: {
    title: "Resume",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
      "Donec sollicitudin molestie malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel.",
    ],
  },
  Hobbies: {
    title: "Hobbies",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta.",
      "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum.",
    ],
  },
  Contact: {
    title: "Contact",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat.",
      "Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ante ipsum primis in faucibus orci luctus.",
    ],
  },
}

export function RubiksCube() {
  const [rotation, setRotation] = useState({ x: -15, y: 25 })
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [openFace, setOpenFace] = useState<string | null>(null)
  const [isFaceOpening, setIsFaceOpening] = useState(false)
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

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const delta = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      if (!isDragging && !isHovering && !openFace) {
        const rotationSpeed = 360 / 20000 // 360 degrees per 20 seconds
        setRotation((prev) => ({
          x: prev.x + rotationSpeed * delta * 0.3,
          y: prev.y + rotationSpeed * delta,
        }))
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [isDragging, isHovering, openFace]
  )

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [animate])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (openFace) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    rotationStart.current = { ...rotation }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || openFace) return
    const deltaX = e.clientX - dragStart.current.x
    const deltaY = e.clientY - dragStart.current.y
    setRotation({
      x: rotationStart.current.x - deltaY * 0.5,
      y: rotationStart.current.y + deltaX * 0.5,
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (openFace) return
    setIsDragging(true)
    const touch = e.touches[0]
    dragStart.current = { x: touch.clientX, y: touch.clientY }
    rotationStart.current = { ...rotation }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || openFace) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragStart.current.x
    const deltaY = touch.clientY - dragStart.current.y
    setRotation({
      x: rotationStart.current.x - deltaY * 0.5,
      y: rotationStart.current.y + deltaX * 0.5,
    })
  }

  const handleTouchEnd = () => setIsDragging(false)

  const handleFaceClick = (face: FaceData) => {
    if (openFace || isDragging) return
    // Rotate cube so clicked face is front
    setRotation({ x: face.rotateToFront.x, y: face.rotateToFront.y })
    setTimeout(() => {
      setOpenFace(face.name)
      setIsFaceOpening(true)
    }, 800)
  }

  const handleClose = () => {
    setIsFaceOpening(false)
    setTimeout(() => {
      setOpenFace(null)
    }, 500)
  }

  const cubeSize = isMobile ? MOBILE_CUBE_SIZE * 2 : CUBE_SIZE * 2
  const translateZ = isMobile ? MOBILE_CUBE_SIZE : CUBE_SIZE

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Cube Container */}
      <div
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1200px",
          width: cubeSize,
          height: cubeSize,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false)
          setIsDragging(false)
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cube Shadow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full bg-black/30 blur-2xl"
          style={{
            width: cubeSize * 0.8,
            height: cubeSize * 0.15,
            marginTop: cubeSize * 0.6,
          }}
        />

        {/* 3D Cube */}
        <div
          className="relative w-full h-full transition-transform duration-800 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {faces.map((face) => {
            const isOpen = openFace === face.name && isFaceOpening
            const mobileTransform = face.transform.replace(
              new RegExp(`${CUBE_SIZE}px`, "g"),
              `${translateZ}px`
            )

            return (
              <div
                key={face.name}
                className="absolute flex flex-col items-center justify-center gap-4 border border-border rounded-lg backdrop-blur-md cursor-pointer transition-all duration-800 ease-in-out hover:bg-card/20"
                style={{
                  width: cubeSize,
                  height: cubeSize,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  backfaceVisibility: "hidden",
                  transform: isMobile ? mobileTransform : face.transform,
                  transformOrigin: isOpen ? "left center" : "center center",
                  ...(isOpen && {
                    transform: `${isMobile ? mobileTransform : face.transform} rotateY(-120deg)`,
                  }),
                }}
                onClick={() => handleFaceClick(face)}
              >
                <span className="text-foreground/80">{face.icon}</span>
                <span className="font-serif text-xl md:text-2xl text-foreground/80 text-center px-4">
                  {face.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Content Panel - Desktop */}
      {openFace && !isMobile && (
        <div
          className={`absolute z-50 rounded-xl p-8 transition-all duration-500 ease-in-out ${
            isFaceOpening ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            width: 600,
            height: 700,
            backgroundColor: "var(--card-solid)",
            boxShadow: "inset 0 0 60px rgba(255, 255, 255, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-accent transition-colors text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="font-serif text-4xl mb-6 text-foreground">
            {contentData[openFace]?.title}
          </h2>
          {contentData[openFace]?.paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
              {p}
            </p>
          ))}
          <a
            href="#"
            className="inline-block mt-4 text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Learn more
          </a>
        </div>
      )}

      {/* Content Panel - Mobile (Full Screen Overlay) */}
      {openFace && isMobile && (
        <div
          className={`fixed inset-0 z-50 p-6 pt-16 overflow-y-auto transition-all duration-500 ease-in-out ${
            isFaceOpening ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundColor: "var(--card-solid)",
          }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-accent transition-colors text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="font-serif text-3xl mb-6 text-foreground">
            {contentData[openFace]?.title}
          </h2>
          {contentData[openFace]?.paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
              {p}
            </p>
          ))}
          <a
            href="#"
            className="inline-block mt-4 text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Learn more
          </a>
        </div>
      )}

      {/* Instructions */}
      {!openFace && (
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm text-center">
          Drag to rotate. Click a face to explore.
        </p>
      )}
    </div>
  )
}
