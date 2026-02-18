"use client"

import { useState, useCallback, useRef } from "react"
import { Plus, Trash2, Search, PointerIcon, RotateCcw, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface ArrayCell {
  value: number
  id: string
  state: "idle" | "highlighted" | "found" | "inserting" | "removing" | "searching" | "accessed"
}

let cellId = 0
function nextId() {
  return `cell-${++cellId}`
}

const INITIAL_VALUES = [12, 5, 23, 8, 17, 42, 3]

function buildCells(values: number[]): ArrayCell[] {
  return values.map((v) => ({ value: v, id: nextId(), state: "idle" }))
}

const stateStyles: Record<ArrayCell["state"], string> = {
  idle: "border-border/60 bg-secondary text-foreground",
  highlighted: "border-primary bg-primary/15 text-primary scale-105",
  found: "border-emerald-500 bg-emerald-500/15 text-emerald-400 scale-110",
  inserting: "border-primary bg-primary text-primary-foreground scale-110",
  removing: "border-destructive bg-destructive/15 text-destructive scale-90 opacity-50",
  searching: "border-amber-500 bg-amber-500/15 text-amber-400 scale-105",
  accessed: "border-primary bg-primary/20 text-primary scale-110",
}

const STATE_STYLES = stateStyles

function BoxesView({ cells }: { cells: ArrayCell[] }) {
  if (cells.length === 0) {
    return (
      <p className="py-8 text-sm text-muted-foreground">
        Array is empty. Insert an element to begin.
      </p>
    )
  }
  return (
    <div className="flex items-end justify-center gap-1 md:gap-1.5" role="img" aria-label={`Array with ${cells.length} elements`}>
      {cells.map((cell, i) => (
        <div key={cell.id} className="flex flex-col items-center gap-1">
          <div
            className={`flex size-11 items-center justify-center rounded-md border-2 font-mono text-sm font-semibold transition-all duration-300 md:size-14 md:text-base ${STATE_STYLES[cell.state]}`}
          >
            {cell.value}
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/60 md:text-xs">
            {i}
          </span>
        </div>
      ))}
    </div>
  )
}

function BarsView({ cells }: { cells: ArrayCell[] }) {
  if (cells.length === 0) {
    return (
      <p className="py-8 text-sm text-muted-foreground">
        Array is empty. Insert an element to begin.
      </p>
    )
  }
  const maxVal = Math.max(1, ...cells.map((c) => c.value))
  return (
    <div className="flex items-end justify-center gap-2 md:gap-3 py-4" role="img" aria-label={`Bar chart of array with ${cells.length} elements`}>
      {cells.map((cell, i) => (
        <div key={cell.id} className="flex flex-col items-center gap-1.5">
          <div className="flex flex-col items-center justify-end h-32 md:h-40 w-10 md:w-12">
            <div
              className={`w-full min-h-[28px] rounded-t border-2 font-mono text-xs font-semibold flex items-center justify-center transition-all duration-300 ${STATE_STYLES[cell.state]}`}
              style={{ height: `${Math.max(20, (cell.value / maxVal) * 100)}%` }}
            >
              {cell.value}
            </div>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/60 md:text-xs">
            {i}
          </span>
        </div>
      ))}
    </div>
  )
}

function ListView({ cells }: { cells: ArrayCell[] }) {
  if (cells.length === 0) {
    return (
      <p className="py-8 text-sm text-muted-foreground">
        Array is empty. Insert an element to begin.
      </p>
    )
  }
  return (
    <div className="flex flex-col gap-1 max-w-xs mx-auto" role="img" aria-label={`List view of array with ${cells.length} elements`}>
      {cells.map((cell, i) => (
        <div
          key={cell.id}
          className={`flex items-center gap-3 rounded-md border-2 px-3 py-2 font-mono text-sm font-semibold transition-all duration-300 ${STATE_STYLES[cell.state]}`}
        >
          <span className="text-muted-foreground/70 w-6 text-right">{i}</span>
          <span>{cell.value}</span>
        </div>
      ))}
    </div>
  )
}

function RingView({ cells }: { cells: ArrayCell[] }) {
  if (cells.length === 0) {
    return (
      <p className="py-8 text-sm text-muted-foreground">
        Array is empty. Insert an element to begin.
      </p>
    )
  }
  const size = 280
  const radius = size / 2 - 36
  return (
    <div className="relative flex items-center justify-center py-6" style={{ width: size, height: size, margin: "0 auto" }} role="img" aria-label={`Ring view of array with ${cells.length} elements`}>
      <div className="absolute inset-0 rounded-full border-2 border-border/40" style={{ width: size, height: size }} />
      {cells.map((cell, i) => {
        const angle = (i / cells.length) * 360 - 90
        const rad = (angle * Math.PI) / 180
        const x = size / 2 + radius * Math.cos(rad) - 20
        const y = size / 2 + radius * Math.sin(rad) - 20
        return (
          <div
            key={cell.id}
            className={`absolute flex size-10 flex-col items-center justify-center gap-0.5 rounded-full border-2 font-mono text-sm font-semibold transition-all duration-300 md:size-11 ${STATE_STYLES[cell.state]}`}
            style={{ left: x, top: y }}
          >
            <span className="leading-none">{cell.value}</span>
            <span className="font-mono text-[10px] text-muted-foreground/60">{i}</span>
          </div>
        )
      })}
    </div>
  )
}

export function ArrayVisualization() {
  const [cells, setCells] = useState<ArrayCell[]>(() => buildCells(INITIAL_VALUES))
  const [isAnimating, setIsAnimating] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [inputIndex, setInputIndex] = useState("")
  const [activeOp, setActiveOp] = useState<string | null>(null)
  const logRef = useRef<HTMLDivElement>(null)

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [...prev.slice(-8), msg])
    setTimeout(() => {
      logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" })
    }, 50)
  }, [])

  const resetStates = useCallback(() => {
    setCells((prev) => prev.map((c) => ({ ...c, state: "idle" })))
  }, [])

  const handleInsert = useCallback(() => {
    const val = inputValue.trim()
    if (!val || isNaN(Number(val))) return
    const num = Number(val)
    setIsAnimating(true)
    setInputValue("")

    const newCell: ArrayCell = { value: num, id: nextId(), state: "inserting" }
    setCells((prev) => [...prev.map((c) => ({ ...c, state: "idle" as const })), newCell])
    addLog(`Appended ${num} at index ${cells.length} -- O(1)`)

    setTimeout(() => {
      setCells((prev) => prev.map((c) => ({ ...c, state: "idle" })))
      setIsAnimating(false)
    }, 800)
  }, [inputValue, cells.length, isAnimating, addLog])

  const handleInsertAt = useCallback(() => {
    const val = inputValue.trim()
    const idx = inputIndex.trim()
    if (!val || isNaN(Number(val)) || !idx || isNaN(Number(idx))) return
    const num = Number(val)
    const index = Math.min(Math.max(0, Math.floor(Number(idx))), cells.length)
    setIsAnimating(true)
    setInputValue("")
    setInputIndex("")

    setCells((prev) =>
      prev.map((c, i) => ({
        ...c,
        state: i >= index ? "highlighted" : "idle",
      }))
    )
    addLog(`Inserting ${num} at index ${index} -- shifting ${cells.length - index} elements -- O(n)`)

    setTimeout(() => {
      const newCell: ArrayCell = { value: num, id: nextId(), state: "inserting" }
      setCells((prev) => {
        const copy = prev.map((c) => ({ ...c, state: "idle" as const }))
        copy.splice(index, 0, newCell)
        return copy
      })

      setTimeout(() => {
        setCells((prev) => prev.map((c) => ({ ...c, state: "idle" })))
        setIsAnimating(false)
      }, 600)
    }, 600)
  }, [inputValue, inputIndex, cells.length, isAnimating, addLog])

  const handleDelete = useCallback(() => {
    const idx = inputIndex.trim()
    if (!idx || isNaN(Number(idx))) return
    const index = Math.floor(Number(idx))
    if (index < 0 || index >= cells.length) {
      addLog(`Index ${index} out of bounds [0..${cells.length - 1}]`)
      return
    }
    setIsAnimating(true)
    setInputIndex("")

    setCells((prev) =>
      prev.map((c, i) => ({
        ...c,
        state: i === index ? "removing" : i > index ? "highlighted" : "idle",
      }))
    )
    addLog(`Deleting index ${index} (value ${cells[index].value}) -- shifting ${cells.length - 1 - index} elements -- O(n)`)

    setTimeout(() => {
      setCells((prev) => {
        const copy = [...prev]
        copy.splice(index, 1)
        return copy.map((c) => ({ ...c, state: "idle" }))
      })
      setIsAnimating(false)
    }, 800)
  }, [inputIndex, cells, isAnimating, addLog])

  const handleSearch = useCallback(() => {
    const val = inputValue.trim()
    if (!val || isNaN(Number(val))) return
    const num = Number(val)
    setIsAnimating(true)
    setInputValue("")

    let step = 0

    const interval = setInterval(() => {
      if (step < cells.length) {
        setCells((prev) =>
          prev.map((c, i) => ({
            ...c,
            state:
              i === step
                ? c.value === num
                  ? "found"
                  : "searching"
                : i < step
                ? c.value === num
                  ? "found"
                  : "idle"
                : "idle",
          }))
        )
        if (cells[step].value === num) {
          clearInterval(interval)
          addLog(`Found ${num} at index ${step} after ${step + 1} comparison(s) -- O(n)`)
          setTimeout(() => {
            resetStates()
            setIsAnimating(false)
          }, 1200)
          return
        }
        step++
      } else {
        clearInterval(interval)
        addLog(`${num} not found after ${cells.length} comparisons -- O(n)`)
        setTimeout(() => {
          resetStates()
          setIsAnimating(false)
        }, 600)
      }
    }, 350)
  }, [inputValue, cells, isAnimating, addLog, resetStates])

  const handleAccess = useCallback(() => {
    const idx = inputIndex.trim()
    if (!idx || isNaN(Number(idx))) return
    const index = Math.floor(Number(idx))
    if (index < 0 || index >= cells.length) {
      addLog(`Index ${index} out of bounds [0..${cells.length - 1}]`)
      return
    }
    setIsAnimating(true)
    setInputIndex("")

    setCells((prev) =>
      prev.map((c, i) => ({
        ...c,
        state: i === index ? "accessed" : "idle",
      }))
    )
    addLog(`Accessed index ${index} = ${cells[index].value} -- O(1) direct access`)

    setTimeout(() => {
      resetStates()
      setIsAnimating(false)
    }, 1200)
  }, [inputIndex, cells, isAnimating, addLog, resetStates])

  const handleReset = useCallback(() => {
    setCells(buildCells(INITIAL_VALUES))
    setLog([])
    setActiveOp(null)
    setIsAnimating(false)
  }, [])

  return (
    <div className="rounded-lg border border-border/60 bg-card">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border/40 px-3 py-2.5 md:px-4 md:gap-2">
        <Button
          size="sm"
          variant={activeOp === "insert" ? "default" : "outline"}
          onClick={() => setActiveOp(activeOp === "insert" ? null : "insert")}
          disabled={isAnimating}
          className="h-8 gap-1.5 text-xs"
        >
          <Plus className="size-3.5" />
          Insert
        </Button>
        <Button
          size="sm"
          variant={activeOp === "delete" ? "default" : "outline"}
          onClick={() => setActiveOp(activeOp === "delete" ? null : "delete")}
          disabled={isAnimating}
          className="h-8 gap-1.5 text-xs"
        >
          <Trash2 className="size-3.5" />
          Delete
        </Button>
        <Button
          size="sm"
          variant={activeOp === "search" ? "default" : "outline"}
          onClick={() => setActiveOp(activeOp === "search" ? null : "search")}
          disabled={isAnimating}
          className="h-8 gap-1.5 text-xs"
        >
          <Search className="size-3.5" />
          Search
        </Button>
        <Button
          size="sm"
          variant={activeOp === "access" ? "default" : "outline"}
          onClick={() => setActiveOp(activeOp === "access" ? null : "access")}
          disabled={isAnimating}
          className="h-8 gap-1.5 text-xs"
        >
          <PointerIcon className="size-3.5" />
          Access
        </Button>
        <div className="ml-auto">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            disabled={isAnimating}
            className="h-8 gap-1.5 text-xs"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {activeOp && (
        <div className="flex flex-wrap items-end gap-2 border-b border-border/40 bg-secondary/30 px-3 py-3 md:px-4">
          {(activeOp === "insert" || activeOp === "search") && (
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Value
              </span>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. 15"
                className="h-8 w-20 rounded-md border border-border/60 bg-background px-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isAnimating}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (activeOp === "search") handleSearch()
                    else if (activeOp === "insert" && !inputIndex) handleInsert()
                    else if (activeOp === "insert" && inputIndex) handleInsertAt()
                  }
                }}
              />
            </label>
          )}
          {(activeOp === "insert" || activeOp === "delete" || activeOp === "access") && (
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Index {activeOp === "insert" && "(optional)"}
              </span>
              <input
                type="number"
                value={inputIndex}
                onChange={(e) => setInputIndex(e.target.value)}
                placeholder={`0-${Math.max(0, cells.length - (activeOp === "insert" ? 0 : 1))}`}
                className="h-8 w-20 rounded-md border border-border/60 bg-background px-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isAnimating}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (activeOp === "delete") handleDelete()
                    else if (activeOp === "access") handleAccess()
                    else if (activeOp === "insert" && inputIndex) handleInsertAt()
                    else if (activeOp === "insert") handleInsert()
                  }
                }}
              />
            </label>
          )}
          <Button
            size="sm"
            onClick={() => {
              if (activeOp === "insert" && inputIndex) handleInsertAt()
              else if (activeOp === "insert") handleInsert()
              else if (activeOp === "delete") handleDelete()
              else if (activeOp === "search") handleSearch()
              else if (activeOp === "access") handleAccess()
            }}
            disabled={isAnimating}
            className="h-8 gap-1.5 text-xs"
          >
            <ArrowRight className="size-3.5" />
            Run
          </Button>
        </div>
      )}

      <Tabs defaultValue="boxes" className="w-full">
        <div className="border-b border-border/40 px-3 pt-3 md:px-4">
          <TabsList className="h-8 w-full justify-start rounded-lg bg-muted/50">
            <TabsTrigger value="boxes" className="text-xs" aria-label="Indexed boxes view">
              Boxes
            </TabsTrigger>
            <TabsTrigger value="bars" className="text-xs" aria-label="Bar chart view">
              Bars
            </TabsTrigger>
            <TabsTrigger value="list" className="text-xs" aria-label="List view">
              List
            </TabsTrigger>
            <TabsTrigger value="ring" className="text-xs" aria-label="Ring view">
              Ring
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="overflow-x-auto px-3 py-6 md:px-6 md:py-8 transition-opacity duration-200">
          <TabsContent value="boxes" className="mt-0 outline-none">
            <BoxesView cells={cells} />
          </TabsContent>
          <TabsContent value="bars" className="mt-0 outline-none">
            <BarsView cells={cells} />
          </TabsContent>
          <TabsContent value="list" className="mt-0 outline-none">
            <ListView cells={cells} />
          </TabsContent>
          <TabsContent value="ring" className="mt-0 outline-none">
            <RingView cells={cells} />
          </TabsContent>
        </div>
      </Tabs>

      {log.length > 0 && (
        <div
          ref={logRef}
          className="max-h-32 overflow-y-auto border-t border-border/40 bg-code-bg px-3 py-2.5 md:px-4"
        >
          {log.map((entry, i) => (
            <div key={i} className="flex items-start gap-2 py-0.5">
              <span className="mt-0.5 font-mono text-[10px] text-muted-foreground/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-code-foreground leading-relaxed">
                {entry}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
