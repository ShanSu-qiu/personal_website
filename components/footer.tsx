export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {currentYear} Alex Chen. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
