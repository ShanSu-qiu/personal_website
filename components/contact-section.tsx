import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    name: "Email",
    href: "mailto:hello@alexchen.dev",
    icon: Mail,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary/50">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
          Get in touch
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Let&apos;s work together
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          I&apos;m always interested in hearing about new projects and opportunities. 
          Whether you have a question or just want to say hi, feel free to reach out.
        </p>

        <Button asChild size="lg" className="mb-12">
          <Link href="mailto:hello@alexchen.dev">
            <Mail className="h-5 w-5 mr-2" />
            Say hello
          </Link>
        </Button>

        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <Button key={link.name} asChild variant="ghost" size="icon">
              <Link href={link.href} aria-label={link.name}>
                <link.icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
