"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw } from "lucide-react"

const INITIAL_HEIGHTS = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

export function TrappingRainWaterVisualization() {
  const [heights] = useState(INITIAL_HEIGHTS)
  const [water, setWater] = useState<number[]>([])
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)

  const maxHeight = Math.max(...heights, 1)

  const runStep = useCallback(() => {
    if (water.length === heights.length) {
      setRunning(false)
      return
    }
    const n = heights.length
    const leftMax: number[] = []
    const rightMax: number[] = []
    let l = 0
    for (let i = 0; i < n; i++) {
      l = Math.max(l, heights[i] ?? 0)
      leftMax.push(l)
    }
    let r = 0
    for (let i = n - 1; i >= 0; i--) {
      r = Math.max(r, heights[i] ?? 0)
      rightMax[i] = r
    }
    const newWater: number[] = []
    for (let i = 0; i < n; i++) {
      const minSide = Math.min(leftMax[i] ?? 0, rightMax[i] ?? 0)
      newWater.push(Math.max(0, minSide - (heights[i] ?? 0)))
    }
    setWater(newWater)
    setStep(1)
    setRunning(false)
  }, [heights, water.length])

  const runFull = useCallback(() => {
    setRunning(true)
    const n = heights.length
    const leftMax: number[] = []
    const rightMax: number[] = []
    let l = 0
    for (let i = 0; i < n; i++) {
      l = Math.max(l, heights[i] ?? 0)
      leftMax.push(l)
    }
    let r = 0
    for (let i = n - 1; i >= 0; i--) {
      r = Math.max(r, heights[i] ?? 0)
      rightMax[i] = r
    }
    const newWater: number[] = []
    for (let i = 0; i < n; i++) {
      const minSide = Math.min(leftMax[i] ?? 0, rightMax[i] ?? 0)
      newWater.push(Math.max(0, minSide - (heights[i] ?? 0)))
    }
    setWater(newWater)
    setStep(1)
    setRunning(false)
  }, [heights])

  const reset = useCallback(() => {
    setWater([])
    setStep(0)
  }, [])

  const totalWater = water.reduce((a, b) => a + b, 0)

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border/60 bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm">
          <span className="text-muted-foreground">Trapped water: </span>
          <span className="font-mono font-semibold text-foreground">
            {totalWater}
          </span>
          {totalWater > 0 && (
            <span className="ml-1 text-xs text-muted-foreground">units</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={runFull}
            disabled={running}
            className="gap-1.5"
          >
            <Play className="size-3.5" />
            Show solution
          </Button>
          <Button size="sm" variant="ghost" onClick={reset} className="gap-1.5">
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>
      </div>
      <div className="flex items-end justify-center gap-1 md:gap-1.5 py-4">
        {heights.map((h, i) => {
          const w = water[i] ?? 0
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end h-36 w-8 md:w-10"
            >
              <div
                className="w-full rounded-t bg-primary/30 border border-primary/50 transition-all duration-300"
                style={{
                  height: `${(w / maxHeight) * 100}%`,
                  minHeight: w > 0 ? 4 : 0,
                }}
                title={`Water: ${w}`}
              />
              <div
                className="w-full rounded-t border-2 border-border bg-secondary transition-all duration-300"
                style={{ height: `${(h / maxHeight) * 100}%`, minHeight: 8 }}
                title={`Bar: ${h}`}
              />
              <span className="font-mono text-[10px] text-muted-foreground mt-1">
                {i}
              </span>
            </div>
          )
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Blue = trapped water. Use left/right max to compute per column.
      </p>
    </div>
  )
}
