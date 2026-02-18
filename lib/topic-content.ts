import { readFileSync } from "fs"
import path from "path"

export interface ComplexityRow {
  operation: string
  average: string
  worst: string
}

export interface CodeExample {
  language: string
  label: string
  code: string
}

export interface PracticeProblem {
  id: string
  name: string
  difficulty: "Easy" | "Medium" | "Hard"
  url: string
}

export interface TopicContent {
  slug: string
  theory: string
  useCases: string[]
  complexity: ComplexityRow[]
  spaceComplexity: string
  codeExamples: CodeExample[]
  problems: PracticeProblem[]
}

const contentDir = path.join(process.cwd(), "content", "topics")

export function getTopicContent(slug: string): TopicContent | undefined {
  try {
    const filePath = path.join(contentDir, `${slug}.json`)
    const raw = readFileSync(filePath, "utf-8")
    return JSON.parse(raw) as TopicContent
  } catch {
    return undefined
  }
}
