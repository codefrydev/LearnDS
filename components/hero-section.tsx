import { Terminal } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const statColorClass: Record<string, string> = {
  topic1: "bg-topic-1",
  topic3: "bg-topic-3",
  primary: "bg-primary",
}

export function HeroSection() {
  const { hero } = siteConfig
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
            {hero.badge}
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            {hero.stats.flatMap((stat, i) => [
              ...(i > 0 ? [<span key={`sep-${i}`} className="text-border">|</span>] : []),
              <span key={stat.label} className="flex items-center gap-1.5">
                <span
                  className={`size-1.5 rounded-full ${statColorClass[stat.colorKey] ?? "bg-primary"}`}
                />
                {stat.label}
              </span>,
            ])}
          </div>
        </div>
      </div>
    </section>
  )
}
