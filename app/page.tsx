import { HeroSection } from "@/components/hero-section"
import { TopicCard } from "@/components/topic-card"
import { topics } from "@/lib/topics"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            All Topics
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a data structure to begin your deep dive.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>
    </>
  )
}
