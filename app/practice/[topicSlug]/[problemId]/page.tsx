import { notFound } from "next/navigation"
import { getProblem, getProblemCategories, getProblemsByTopic } from "@/lib/problems"
import { PracticeLayout } from "@/components/practice-layout"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ topicSlug: string; problemId: string }>
}

export async function generateStaticParams() {
  const categories = getProblemCategories()
  const params: { topicSlug: string; problemId: string }[] = []
  for (const cat of categories) {
    const problems = getProblemsByTopic(cat.topicSlug)
    for (const p of problems) {
      params.push({ topicSlug: cat.topicSlug, problemId: p.id })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topicSlug, problemId } = await params
  const problem = getProblem(topicSlug, problemId)
  if (!problem) return { title: "Not Found" }
  return {
    title: `${problem.name} - Practice - DSA Lab`,
    description: `Practice ${problem.name} with code editor and visualization`,
  }
}

export default async function PracticePage({ params }: PageProps) {
  const { topicSlug, problemId } = await params
  const problem = getProblem(topicSlug, problemId)

  if (!problem) notFound()

  return <PracticeLayout problem={problem} />
}
