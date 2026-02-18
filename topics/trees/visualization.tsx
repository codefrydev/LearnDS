"use client"

import { useState, useCallback } from "react"
import { Plus, RotateCcw, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TreeNodeData {
  value: number
  left?: TreeNodeData
  right?: TreeNodeData
}

function insertBST(root: TreeNodeData | undefined, value: number): TreeNodeData {
  if (!root) return { value }
  if (value < root.value) {
    return { ...root, left: insertBST(root.left, value) }
  } else if (value > root.value) {
    return { ...root, right: insertBST(root.right, value) }
  }
  return root
}

function TreeNodeViz({
  node,
  highlighted,
}: {
  node: TreeNodeData
  highlighted: number | null
}) {
  const isHighlighted = highlighted === node.value
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex size-10 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold transition-all duration-500 md:size-12 md:text-base ${
          isHighlighted
            ? "scale-110 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            : "border-border/60 bg-secondary text-foreground"
        }`}
      >
        {node.value}
      </div>
      {(node.left || node.right) && (
        <div className="flex gap-2 pt-2 md:gap-4 md:pt-3">
          {node.left ? (
            <div className="flex flex-col items-center">
              <div className="mb-1 h-4 w-px bg-border/60 md:h-5" />
              <TreeNodeViz node={node.left} highlighted={highlighted} />
            </div>
          ) : (
            <div className="w-10 md:w-12" />
          )}
          {node.right ? (
            <div className="flex flex-col items-center">
              <div className="mb-1 h-4 w-px bg-border/60 md:h-5" />
              <TreeNodeViz node={node.right} highlighted={highlighted} />
            </div>
          ) : (
            <div className="w-10 md:w-12" />
          )}
        </div>
      )}
    </div>
  )
}

const defaultValues = [8, 3, 10, 1, 6, 14]

export function TreeVisualization() {
  const [tree, setTree] = useState<TreeNodeData | undefined>(() => {
    let root: TreeNodeData | undefined
    for (const v of defaultValues) root = insertBST(root, v)
    return root
  })
  const [highlighted, setHighlighted] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleInsert = useCallback(() => {
    const value = Math.floor(Math.random() * 20) + 1
    setTree((prev) => insertBST(prev, value))
    setHighlighted(value)
    setIsAnimating(true)
    setTimeout(() => {
      setHighlighted(null)
      setIsAnimating(false)
    }, 1500)
  }, [])

  const handleReset = useCallback(() => {
    let root: TreeNodeData | undefined
    for (const v of defaultValues) root = insertBST(root, v)
    setTree(root)
    setHighlighted(null)
  }, [])

  const handleTraverse = useCallback(() => {
    if (!tree || isAnimating) return
    setIsAnimating(true)
    const order: number[] = []
    const inorder = (node?: TreeNodeData) => {
      if (!node) return
      inorder(node.left)
      order.push(node.value)
      inorder(node.right)
    }
    inorder(tree)

    let i = 0
    const interval = setInterval(() => {
      if (i < order.length) {
        setHighlighted(order[i])
        i++
      } else {
        clearInterval(interval)
        setHighlighted(null)
        setIsAnimating(false)
      }
    }, 400)
  }, [tree, isAnimating])

  return (
    <div className="rounded-lg border border-border/60 bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/40 px-4 py-3">
        <Button
          size="sm"
          variant="outline"
          onClick={handleInsert}
          disabled={isAnimating}
          className="h-8 gap-1.5 text-xs"
        >
          <Plus className="size-3.5" />
          Insert Node
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleTraverse}
          disabled={isAnimating}
          className="h-8 gap-1.5 text-xs"
        >
          <Play className="size-3.5" />
          In-order Traverse
        </Button>
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
      <div className="flex min-h-[280px] items-start justify-center overflow-x-auto p-6 md:min-h-[320px] md:p-8">
        {tree ? (
          <TreeNodeViz node={tree} highlighted={highlighted} />
        ) : (
          <p className="text-sm text-muted-foreground">
            {"Click \"Insert Node\" to begin building the tree."}
          </p>
        )}
      </div>
    </div>
  )
}
