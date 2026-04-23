import { ArrowDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">
          Software Developer
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">
          Hi, I&apos;m Alex Chen
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
          I build beautiful, functional web experiences with a focus on clean code and thoughtful design. 
          Currently crafting digital products that make a difference.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#projects">View my work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#about">Learn more about me</Link>
          </Button>
        </div>
      </div>

      <Link
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-6 w-6" />
      </Link>
    </section>
  )
}
