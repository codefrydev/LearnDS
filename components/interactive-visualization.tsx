"use client"

import { Play } from "lucide-react"
import dynamic from "next/dynamic"

const ArrayVisualization = dynamic(
  () => import("@/topics/arrays/visualization").then((mod) => mod.ArrayVisualization),
  { ssr: false }
)

const TreeVisualization = dynamic(
  () => import("@/topics/trees/visualization").then((mod) => mod.TreeVisualization),
  { ssr: false }
)

function GenericPlaceholder({ topicName }: { topicName: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-secondary/30 p-8 text-center md:p-12">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-secondary">
        <Play className="size-6 text-primary" />
      </div>
      <h4 className="mb-2 text-base font-semibold text-foreground">
        Interactive Visualization
      </h4>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        {`An interactive playground for ${topicName} will appear here. Insert elements, step through operations, and watch the data structure update in real time.`}
      </p>
    </div>
  )
}

export function InteractiveVisualization({ topicName }: { topicName: string }) {
  if (topicName === "Arrays") {
    return <ArrayVisualization />
  }

  if (topicName === "Trees") {
    return <TreeVisualization />
  }

  return <GenericPlaceholder topicName={topicName} />
}
