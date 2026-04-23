const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-secondary/50">
      <div className="mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
              About me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Passionate about creating impactful digital experiences
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a software developer with 5+ years of experience building web applications. 
                I specialize in frontend development with React and TypeScript, but I&apos;m equally 
                comfortable working across the full stack.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to 
                open source projects, or sharing knowledge through technical writing.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">
              Technologies I work with
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
