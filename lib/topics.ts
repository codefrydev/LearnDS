import topicsJson from "@/content/topics.json"

export interface Topic {
  slug: string
  name: string
  description: string
  icon: string
  color: string
}

export const topics: Topic[] = topicsJson as Topic[]

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug)
}
