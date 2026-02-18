import { topics, getTopicBySlug } from "@/lib/topics"
import { getTopicContent } from "@/lib/topic-content"
import type { PracticeProblem } from "@/lib/topic-content"

export interface ProblemCategory {
  topicSlug: string
  topicName: string
  problemCount: number
}

export interface ProblemWithTopic extends PracticeProblem {
  topicSlug: string
  topicName: string
}

/**
 * List of problem categories for the home page (one per topic with problems).
 */
export function getProblemCategories(): ProblemCategory[] {
  return topics
    .map((topic) => {
      const content = getTopicContent(topic.slug)
      const count = content?.problems?.length ?? 0
      return { topicSlug: topic.slug, topicName: topic.name, problemCount: count }
    })
    .filter((cat) => cat.problemCount > 0)
}

/**
 * All problems for a given topic (for the problem list page).
 */
export function getProblemsByTopic(topicSlug: string): ProblemWithTopic[] {
  const topic = getTopicBySlug(topicSlug)
  const content = getTopicContent(topicSlug)
  if (!topic || !content?.problems?.length) return []
  return content.problems.map((p) => ({
    ...p,
    topicSlug,
    topicName: topic.name,
  }))
}

/**
 * Single problem by topic and id (for the practice page).
 */
export function getProblem(
  topicSlug: string,
  problemId: string
): ProblemWithTopic | undefined {
  const problems = getProblemsByTopic(topicSlug)
  return problems.find((p) => p.id === problemId)
}
