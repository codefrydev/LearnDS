import { notFound } from "next/navigation"
import { topics, getTopicBySlug } from "@/lib/topics"
import { getTopicContent } from "@/lib/topic-content"
import { TopicPageLayout } from "@/components/topic-page-layout"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) return { title: "Not Found" }
  return {
    title: `${topic.name} - DSA Lab`,
    description: topic.description,
  }
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  const content = getTopicContent(slug)

  if (!topic || !content) notFound()

  return <TopicPageLayout topic={topic} content={content} />
}
