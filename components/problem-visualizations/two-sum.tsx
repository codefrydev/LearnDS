"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw } from "lucide-react"

const INITIAL = [2, 7, 11, 15]
const TARGET = 9

const cellStyle = (state: "idle" | "left" | "right" | "found") => {
  switch (state) {
    case "left":
      return "border-blue-500 bg-blue-500/20 text-blue-400 scale-105"
    case "right":
      return "border-amber-500 bg-amber-500/20 text-amber-400 scale-105"
    case "found":
      return "border-emerald-500 bg-emerald-500/20 text-emerald-400 scale-110"
    default:
      return "border-border/60 bg-secondary text-foreground"
  }
}

export function TwoSumVisualization() {
  const [nums] = useState(INITIAL)
  const [target] = useState(TARGET)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(nums.length - 1)
  const [found, setFound] = useState<[number, number] | null>(null)
  const [step, setStep] = useState(0)

  const runStep = useCallback(() => {
    if (found) return
    const sum = nums[left]! + nums[right]!
    if (sum === target) {
      setFound([left, right])
    } else if (sum < target) {
      setLeft((l) => Math.min(l + 1, right))
    } else {
      setRight((r) => Math.max(r - 1, left))
    }
    setStep((s) => s + 1)
  }, [nums, target, left, right, found])

  const reset = useCallback(() => {
    setLeft(0)
    setRight(nums.length - 1)
    setFound(null)
    setStep(0)
  }, [nums.length])

  const getState = (i: number): "idle" | "left" | "right" | "found" => {
    if (found && (i === found[0] || i === found[1])) return "found"
    if (i === left) return "left"
    if (i === right) return "right"
    return "idle"
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border/60 bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm">
          <span className="text-muted-foreground">Target: </span>
          <span className="font-mono font-semibold text-foreground">{target}</span>
          {found !== null && (
            <span className="ml-2 text-emerald-500">
              Found at indices [{found[0]}, {found[1]}]
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={runStep}
            disabled={!!found}
            className="gap-1.5"
          >
            <Play className="size-3.5" />
            Step
          </Button>
          <Button size="sm" variant="ghost" onClick={reset} className="gap-1.5">
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-center gap-2 md:gap-3">
        {nums.map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`flex size-12 items-center justify-center rounded-lg border-2 font-mono text-sm font-semibold transition-all duration-300 md:size-14 md:text-base ${cellStyle(getState(i))}`}
            >
              {value}
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              i={i}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Two pointers: move left if sum &lt; target, right if sum &gt; target.
        Steps: {step}
      </p>
    </div>
  )
}
