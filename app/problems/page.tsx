import Link from "next/link"
import { ProblemCategoryCard } from "@/components/problem-category-card"
import { getProblemCategories } from "@/lib/problems"
import { getTopicBySlug } from "@/lib/topics"

export const metadata = {
  title: "Problems - DSA Lab",
  description: "Practice problems by topic with code editor and visualization",
}

export default function ProblemsIndexPage() {
  const problemCategories = getProblemCategories()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Problems</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a topic to see problems and practice with code and interactive
          visualization.
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
    </div>
  )
}
