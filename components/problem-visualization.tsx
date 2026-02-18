"use client"

import dynamic from "next/dynamic"
import { Play } from "lucide-react"
import { uiStrings } from "@/lib/ui-strings"

const TwoSumVisualization = dynamic(
  () =>
    import("@/components/problem-visualizations/two-sum").then((m) => m.TwoSumVisualization),
  { ssr: false }
)

const TrappingRainWaterVisualization = dynamic(
  () =>
    import("@/components/problem-visualizations/trapping-rain-water").then(
      (m) => m.TrappingRainWaterVisualization
    ),
  { ssr: false }
)

function PlaceholderVisualization({ problemName }: { problemName: string }) {
  const { title, comingSoon } = uiStrings.visualizationPlaceholder
  const message = comingSoon.replace("{problemName}", problemName)
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-secondary/30 p-8 text-center md:p-12">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-secondary">
        <Play className="size-6 text-primary" />
      </div>
      <h4 className="mb-2 text-base font-semibold text-foreground">
        {title}
      </h4>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        {message}
      </p>
    </div>
  )
}

const PROBLEM_ANIMATIONS: Record<string, Record<string, React.ComponentType<object>>> = {
  arrays: {
    "1": TwoSumVisualization,
    "9": TrappingRainWaterVisualization,
  },
}

export function ProblemVisualization({
  topicSlug,
  problemId,
  problemName,
}: {
  topicSlug: string
  problemId: string
  problemName: string
}) {
  const AnimationComponent =
    PROBLEM_ANIMATIONS[topicSlug]?.[problemId] ?? null

  if (AnimationComponent) {
    return <AnimationComponent />
  }

  return <PlaceholderVisualization problemName={problemName} />
}
