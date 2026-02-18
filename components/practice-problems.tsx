"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { PracticeProblem } from "@/lib/topic-content"
import { uiStrings } from "@/lib/ui-strings"

const difficultyStyles: Record<string, string> = {
  Easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/15 text-rose-400 border-rose-500/20",
}

export function PracticeProblems({
  problems,
  practiceBasePath,
}: {
  problems: PracticeProblem[]
  practiceBasePath?: string
}) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const toggleProblem = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (problems.length === 0) {
    return (
      <div className="rounded-lg border border-border/60 bg-secondary/30 px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">{uiStrings.practice.noProblems}</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60 bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="w-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="sr-only">{uiStrings.practice.tableHeaders.status}</span>
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {uiStrings.practice.tableHeaders.problem}
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {uiStrings.practice.tableHeaders.difficulty}
            </TableHead>
            <TableHead className="w-20 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="sr-only">{uiStrings.practice.tableHeaders.actions}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem) => (
            <TableRow
              key={problem.id}
              className={`border-border/40 transition-colors hover:bg-secondary/30 ${
                completed.has(problem.id) ? "opacity-60" : ""
              }`}
            >
              <TableCell>
                <Checkbox
                  checked={completed.has(problem.id)}
                  onCheckedChange={() => toggleProblem(problem.id)}
                  aria-label={`${uiStrings.practice.markComplete}: ${problem.name}`}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </TableCell>
              <TableCell>
                <span
                  className={`font-medium text-foreground ${
                    completed.has(problem.id) ? "line-through" : ""
                  }`}
                >
                  {problem.name}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`text-xs ${difficultyStyles[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {practiceBasePath ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 px-2 text-xs text-primary hover:text-primary/80"
                    asChild
                  >
                    <Link href={`${practiceBasePath}/${problem.id}`}>
                      {uiStrings.practice.practiceButton}
                      <ArrowRight className="size-3" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 px-2 text-xs text-primary hover:text-primary/80"
                    asChild
                  >
                    <a href={problem.url} target="_blank" rel="noopener noreferrer">
                      Solve
                      <ExternalLink className="size-3" />
                    </a>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-border/40 bg-secondary/30 px-4 py-2.5">
        <p className="text-xs text-muted-foreground">
          {completed.size} of {problems.length} completed
        </p>
      </div>
    </div>
  )
}
