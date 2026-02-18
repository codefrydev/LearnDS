"use client"

import Link from "next/link"
import {
  LayoutGrid,
  Link as LinkIcon,
  Layers,
  ListOrdered,
  Hash,
  GitBranch,
  Share2,
  FileText,
  ArrowRight,
  ListChecks,
} from "lucide-react"
import type { Topic } from "@/lib/topics"
import type { ProblemCategory } from "@/lib/problems"

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  Link: LinkIcon,
  Layers,
  ListOrdered,
  Hash,
  GitBranch,
  Share2,
  FileText,
}

export function ProblemCategoryCard({
  category,
  topic,
}: {
  category: ProblemCategory
  topic: Topic
}) {
  const Icon = iconMap[topic.icon] ?? ListChecks

  return (
    <Link href={`/problems/${category.topicSlug}`} className="group block">
      <div className="relative flex h-full flex-col rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-secondary">
          <Icon className={`size-5 ${topic.color}`} />
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-card-foreground">
          {category.topicName} Problems
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {category.problemCount} practice problem
          {category.problemCount !== 1 ? "s" : ""} to solve with code and
          interactive visualization.
        </p>
        <div className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
          View Problems
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
