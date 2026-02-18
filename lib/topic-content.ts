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

import { content as arraysContent } from "@/topics/arrays/content"
import { content as linkedListsContent } from "@/topics/linked-lists/content"
import { content as stacksContent } from "@/topics/stacks/content"
import { content as queuesContent } from "@/topics/queues/content"
import { content as hashTablesContent } from "@/topics/hash-tables/content"
import { content as treesContent } from "@/topics/trees/content"
import { content as graphsContent } from "@/topics/graphs/content"
import { content as triesContent } from "@/topics/tries/content"

const topicContentMap: Record<string, TopicContent> = {
  arrays: arraysContent,
  "linked-lists": linkedListsContent,
  stacks: stacksContent,
  queues: queuesContent,
  "hash-tables": hashTablesContent,
  trees: treesContent,
  graphs: graphsContent,
  tries: triesContent,
}

export function getTopicContent(slug: string): TopicContent | undefined {
  return topicContentMap[slug]
}
