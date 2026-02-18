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
} from "lucide-react"
import type { Topic } from "@/lib/topics"

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

export function TopicCard({ topic }: { topic: Topic }) {
  const Icon = iconMap[topic.icon] ?? LayoutGrid

  return (
    <Link href={`/topics/${topic.slug}`} className="group block">
      <div className="relative flex h-full flex-col rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-secondary">
          <Icon className={`size-5 ${topic.color}`} />
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-card-foreground">
          {topic.name}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {topic.description}
        </p>
        <div className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
          Start Learning
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
