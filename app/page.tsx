import { HeroSection } from "@/components/hero-section"
import { TopicCard } from "@/components/topic-card"
import { ProblemCategoryCard } from "@/components/problem-category-card"
import { topics } from "@/lib/topics"
import { getProblemCategories } from "@/lib/problems"
import { getTopicBySlug } from "@/lib/topics"
import { siteConfig } from "@/lib/site-config"

export default function HomePage() {
  const problemCategories = getProblemCategories()
  const { home } = siteConfig

  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            {home.allTopicsTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {home.allTopicsDescription}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground">
            {home.problemsTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {home.problemsDescription}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problemCategories.map((category) => {
            const topic = getTopicBySlug(category.topicSlug)
            if (!topic) return null
            return (
              <ProblemCategoryCard
                key={category.topicSlug}
                category={category}
                topic={topic}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
