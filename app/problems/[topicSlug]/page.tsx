import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { topics, getTopicBySlug } from "@/lib/topics"
import { getProblemsByTopic } from "@/lib/problems"
import { PracticeProblems } from "@/components/practice-problems"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ topicSlug: string }>
}

export async function generateStaticParams() {
  return topics.map((topic) => ({ topicSlug: topic.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topicSlug } = await params
  const topic = getTopicBySlug(topicSlug)
  if (!topic) return { title: "Not Found" }
  return {
    title: `Problems: ${topic.name} - DSA Lab`,
    description: `Practice problems for ${topic.name}`,
  }
}

export default async function ProblemListPage({ params }: PageProps) {
  const { topicSlug } = await params
  const topic = getTopicBySlug(topicSlug)
  const problems = getProblemsByTopic(topicSlug)

  if (!topic || problems.length === 0) notFound()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <span className="font-semibold text-foreground">
          Problems: {topic.name}
        </span>
      </nav>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">
          Problems: {topic.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Click Practice to open the code editor and interactive visualization.
        </p>
      </div>
      <PracticeProblems
        problems={problems}
        practiceBasePath={`/practice/${topicSlug}`}
      />
    </div>
  )
}
