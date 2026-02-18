import { Terminal } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-background">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-border/60 bg-secondary px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Terminal className="size-3.5 text-primary" />
            Interactive Learning Platform
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Master Data Structures
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Build a solid foundation in computer science through interactive
            visualizations, real code examples, and guided practice problems.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              8 Topics
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-400" />
              Code in 3 Languages
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              Practice Problems
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
