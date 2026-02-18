"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { BookOpen, Code2, Eye, ChevronRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProblemCodeEditor } from "@/components/problem-code-editor"
import { ProblemVisualization } from "@/components/problem-visualization"
import type { ProblemWithTopic } from "@/lib/problems"
import { uiStrings } from "@/lib/ui-strings"

// --- Section config (same pattern as topic-page-layout) ---
export type PracticeSectionId = "description" | "code" | "visualization"

const SECTION_ICONS: Record<PracticeSectionId, React.ElementType> = {
  description: BookOpen,
  code: Code2,
  visualization: Eye,
}

function getPracticeSectionConfig(): Record<
  PracticeSectionId,
  { label: string; icon: React.ElementType }
> {
  const s = uiStrings.sections
  return {
    description: { label: s.description, icon: SECTION_ICONS.description },
    code: { label: s.code, icon: SECTION_ICONS.code },
    visualization: { label: s.visualization, icon: SECTION_ICONS.visualization },
  }
}

const SECTION_CONFIG = getPracticeSectionConfig()

// --- Layout tree types (mirror topic-page-layout) ---
export interface LayoutLeaf {
  type: "leaf"
  id: string
  tabs: PracticeSectionId[]
  activeTab: PracticeSectionId | null
}

export interface LayoutSplit {
  type: "split"
  id: string
  direction: "row" | "col"
  ratio: number
  first: LayoutNode
  second: LayoutNode
}

export type LayoutNode = LayoutLeaf | LayoutSplit

function createLeaf(tabs: PracticeSectionId[] = []): LayoutLeaf {
  return {
    type: "leaf",
    id: `leaf-${Math.random().toString(36).slice(2, 9)}`,
    tabs,
    activeTab: tabs.length > 0 ? tabs[0] : null,
  }
}

function findNodeAndParent(
  root: LayoutNode,
  targetId: string,
  parent: LayoutSplit | null = null
): { node: LayoutNode; parent: LayoutSplit | null } | null {
  if (!root) return null
  if (root.id === targetId) return { node: root, parent }
  if (root.type === "split") {
    const firstRes = findNodeAndParent(root.first, targetId, root)
    if (firstRes) return firstRes
    const secondRes = findNodeAndParent(root.second, targetId, root)
    if (secondRes) return secondRes
  }
  return null
}

function findLeafWithTab(
  root: LayoutNode,
  tabId: PracticeSectionId
): LayoutLeaf | null {
  if (root.type === "leaf") {
    if (root.tabs.includes(tabId)) return root
    return null
  }
  const f = findLeafWithTab(root.first, tabId)
  if (f) return f
  return findLeafWithTab(root.second, tabId)
}

function removeTabFromTree(
  root: LayoutNode,
  tabId: PracticeSectionId
): { newRoot: LayoutNode; removed: boolean } {
  const newRoot = JSON.parse(JSON.stringify(root)) as LayoutNode
  const targetLeaf = findLeafWithTab(newRoot, tabId)
  if (!targetLeaf) return { newRoot, removed: false }

  targetLeaf.tabs = targetLeaf.tabs.filter((t) => t !== tabId)
  if (targetLeaf.activeTab === tabId) {
    targetLeaf.activeTab =
      targetLeaf.tabs.length > 0 ? targetLeaf.tabs[0] : null
  }

  if (targetLeaf.tabs.length > 0) return { newRoot, removed: true }

  if (newRoot.type === "leaf") return { newRoot, removed: true }

  const { parent } = findNodeAndParent(newRoot, targetLeaf.id) ?? {}
  if (!parent) return { newRoot, removed: true }

  const sibling =
    parent.first.id === targetLeaf.id ? parent.second : parent.first
  const { parent: grandparent } = findNodeAndParent(newRoot, parent.id) ?? {}

  if (!grandparent) {
    return { newRoot: sibling, removed: true }
  }
  if (grandparent.first.id === parent.id) grandparent.first = sibling
  else grandparent.second = sibling
  return { newRoot, removed: true }
}

function insertTabIntoNode(
  root: LayoutNode,
  targetNodeId: string,
  tabId: PracticeSectionId,
  position: "left" | "right" | "top" | "bottom" | "center"
): LayoutNode {
  let newRoot = JSON.parse(JSON.stringify(root)) as LayoutNode
  const searchResult = findNodeAndParent(newRoot, targetNodeId)
  if (!searchResult) return newRoot

  const { node, parent } = searchResult
  if (node.type !== "leaf") return newRoot

  if (position === "center") {
    if (!node.tabs.includes(tabId)) {
      node.tabs.push(tabId)
      node.activeTab = tabId
    }
    return newRoot
  }

  const newLeaf = createLeaf([tabId])
  const isRow = position === "left" || position === "right"
  const newSplit: LayoutSplit = {
    type: "split",
    id: `split-${Math.random().toString(36).slice(2, 9)}`,
    direction: isRow ? "row" : "col",
    ratio: 50,
    first: (position === "left" || position === "top") ? newLeaf : node,
    second: (position === "left" || position === "top") ? node : newLeaf,
  }

  if (!parent) return newSplit
  if (parent.first.id === node.id) parent.first = newSplit
  else parent.second = newSplit
  return newRoot
}

function setSplitRatio(
  root: LayoutNode,
  splitId: string,
  ratio: number
): LayoutNode {
  const next = JSON.parse(JSON.stringify(root)) as LayoutNode
  const res = findNodeAndParent(next, splitId)
  if (!res || res.node.type !== "split") return next
  res.node.ratio = Math.min(85, Math.max(15, ratio))
  return next
}

function createInitialLayout(): LayoutSplit {
  return {
    type: "split",
    id: "root",
    direction: "row",
    ratio: 50,
    first: createLeaf(["description", "code"]),
    second: createLeaf(["visualization"]),
  }
}

// --- Section content (practice-specific) ---
const difficultyStyles: Record<string, string> = {
  Easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/15 text-rose-400 border-rose-500/20",
}

function PracticeSectionContent({
  sectionId,
  problem,
  code,
  onCodeChange,
}: {
  sectionId: PracticeSectionId
  problem: ProblemWithTopic
  code: string
  onCodeChange: (value: string) => void
}) {
  switch (sectionId) {
    case "description":
      return (
        <>
          <nav
            aria-label={uiStrings.breadcrumb.ariaLabel}
            className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="size-3.5 shrink-0" />
            <Link
              href={`/problems/${problem.topicSlug}`}
              className="transition-colors hover:text-foreground"
            >
              {problem.topicName}
            </Link>
            <ChevronRight className="size-3.5 shrink-0" />
            <span className="truncate font-semibold text-foreground">
              {problem.name}
            </span>
          </nav>
          <Badge
            variant="outline"
            className={`mb-4 text-xs ${difficultyStyles[problem.difficulty]}`}
          >
            {problem.difficulty}
          </Badge>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Solve this problem in the Code tab and use the Visualization tab to
            understand the algorithm. Open on LeetCode for the full statement and
            to submit.
          </p>
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
          >
            Open on LeetCode
            <ExternalLink className="size-3.5" />
          </a>
        </>
      )
    case "code":
      return (
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex-1 min-h-[280px]">
            <ProblemCodeEditor value={code} onChange={onCodeChange} />
          </div>
        </div>
      )
    case "visualization":
      return (
        <ProblemVisualization
          topicSlug={problem.topicSlug}
          problemId={problem.id}
          problemName={problem.name}
        />
      )
  }
}

// --- Drop zone overlay ---
function DropZoneOverlay({
  zone,
}: {
  zone: "left" | "right" | "top" | "bottom" | "center" | null
}) {
  if (!zone) return null
  const base =
    "absolute z-10 bg-primary/25 pointer-events-none border-2 border-primary rounded transition-all duration-75"
  const classes = {
    center: "inset-1",
    left: "top-0 bottom-0 left-0 w-1/3",
    right: "top-0 bottom-0 right-0 w-1/3",
    top: "top-0 left-0 right-0 h-1/3",
    bottom: "bottom-0 left-0 right-0 h-1/3",
  }
  return <div className={`${base} ${classes[zone]}`} />
}

function PanelTab({
  sectionId,
  isActive,
  onClick,
}: {
  sectionId: PracticeSectionId
  isActive: boolean
  onClick: () => void
}) {
  const { label, icon: Icon } = SECTION_CONFIG[sectionId]
  return (
    <div
      role="tab"
      aria-selected={isActive}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("sectionId", sectionId)
        e.dataTransfer.effectAllowed = "move"
      }}
      onClick={onClick}
      className={`
        cursor-grab active:cursor-grabbing flex items-center gap-2 px-3 py-1.5 text-xs select-none border-r border-border/60 last:border-r-0
        ${isActive ? "bg-secondary text-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"}
      `}
    >
      <Icon className="size-3.5 shrink-0" />
      <span>{label}</span>
    </div>
  )
}

function LeafPane({
  node,
  problem,
  code,
  onCodeChange,
  onTabClick,
  onMoveTab,
}: {
  node: LayoutLeaf
  problem: ProblemWithTopic
  code: string
  onCodeChange: (value: string) => void
  onTabClick: (nodeId: string, sectionId: PracticeSectionId) => void
  onMoveTab: (
    tabId: PracticeSectionId,
    targetNodeId: string,
    position: "left" | "right" | "top" | "bottom" | "center"
  ) => void
}) {
  const [dropZone, setDropZone] = useState<
    "left" | "right" | "top" | "bottom" | "center" | null
  >(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const w = rect.width
    const h = rect.height
    const t = 0.25
    if (x < w * t) setDropZone("left")
    else if (x > w * (1 - t)) setDropZone("right")
    else if (y < h * t) setDropZone("top")
    else if (y > h * (1 - t)) setDropZone("bottom")
    else setDropZone("center")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const sectionId = e.dataTransfer.getData("sectionId") as PracticeSectionId | ""
    if (
      sectionId &&
      Object.keys(SECTION_CONFIG).includes(sectionId) &&
      dropZone
    ) {
      onMoveTab(sectionId as PracticeSectionId, node.id, dropZone)
    }
    setDropZone(null)
  }

  return (
    <div
      className="flex flex-col w-full h-full min-h-0 relative rounded-lg border border-border/60 bg-card overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={() => setDropZone(null)}
      onDrop={handleDrop}
    >
      <DropZoneOverlay zone={dropZone} />
      <div className="shrink-0 flex items-center border-b border-border/60 bg-muted/30 overflow-x-auto">
        {node.tabs.map((sectionId) => (
          <PanelTab
            key={sectionId}
            sectionId={sectionId}
            isActive={node.activeTab === sectionId}
            onClick={() => onTabClick(node.id, sectionId)}
          />
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-auto p-4">
        {node.activeTab ? (
          <PracticeSectionContent
            sectionId={node.activeTab}
            problem={problem}
            code={code}
            onCodeChange={onCodeChange}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            Drag a section here or split from another pane
          </div>
        )}
      </div>
    </div>
  )
}

function SplitPane({
  node,
  problem,
  code,
  onCodeChange,
  onTabClick,
  onMoveTab,
  onRatioChange,
}: {
  node: LayoutSplit
  problem: ProblemWithTopic
  code: string
  onCodeChange: (value: string) => void
  onTabClick: (nodeId: string, sectionId: PracticeSectionId) => void
  onMoveTab: (
    tabId: PracticeSectionId,
    targetNodeId: string,
    position: "left" | "right" | "top" | "bottom" | "center"
  ) => void
  onRatioChange: (splitId: string, ratio: number) => void
}) {
  const [ratio, setRatio] = useState(node.ratio)
  useEffect(() => {
    setRatio(node.ratio)
  }, [node.id, node.ratio])
  const isRow = node.direction === "row"

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault()
    const startPos = isRow ? e.clientX : e.clientY
    const startRatio = ratio
    const container = e.currentTarget.parentElement
    if (!container) return

    const doDrag = (e: MouseEvent) => {
      const currentPos = isRow ? e.clientX : e.clientY
      const total = isRow ? container.offsetWidth : container.offsetHeight
      const delta = ((currentPos - startPos) / total) * 100
      const next = Math.min(85, Math.max(15, startRatio + delta))
      setRatio(next)
      onRatioChange(node.id, next)
    }
    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag)
      document.removeEventListener("mouseup", stopDrag)
    }
    document.addEventListener("mousemove", doDrag)
    document.addEventListener("mouseup", stopDrag)
  }

  return (
    <div
      className={`flex w-full h-full min-h-0 ${isRow ? "flex-row" : "flex-col"}`}
    >
      <div
        style={{
          [isRow ? "width" : "height"]: `${ratio}%`,
          [isRow ? "minWidth" : "minHeight"]: 0,
        }}
        className="relative min-w-0 min-h-0"
      >
        <LayoutTree
          node={node.first}
          problem={problem}
          code={code}
          onCodeChange={onCodeChange}
          onTabClick={onTabClick}
          onMoveTab={onMoveTab}
          onRatioChange={onRatioChange}
        />
      </div>
      <div
        role="separator"
        onMouseDown={startResize}
        className={`
          shrink-0 flex items-center justify-center hover:bg-primary/20 transition-colors
          ${isRow ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize"}
        `}
      >
        <div
          className={
            isRow
              ? "w-0.5 h-6 bg-border rounded-full"
              : "h-0.5 w-6 bg-border rounded-full"
          }
        />
      </div>
      <div
        style={{
          [isRow ? "width" : "height"]: `${100 - ratio}%`,
          [isRow ? "minWidth" : "minHeight"]: 0,
        }}
        className="relative min-w-0 min-h-0"
      >
        <LayoutTree
          node={node.second}
          problem={problem}
          code={code}
          onCodeChange={onCodeChange}
          onTabClick={onTabClick}
          onMoveTab={onMoveTab}
          onRatioChange={onRatioChange}
        />
      </div>
    </div>
  )
}

function LayoutTree({
  node,
  problem,
  code,
  onCodeChange,
  onTabClick,
  onMoveTab,
  onRatioChange,
}: {
  node: LayoutNode
  problem: ProblemWithTopic
  code: string
  onCodeChange: (value: string) => void
  onTabClick: (nodeId: string, sectionId: PracticeSectionId) => void
  onMoveTab: (
    tabId: PracticeSectionId,
    targetNodeId: string,
    position: "left" | "right" | "top" | "bottom" | "center"
  ) => void
  onRatioChange: (splitId: string, ratio: number) => void
}) {
  if (node.type === "leaf") {
    return (
      <LeafPane
        node={node}
        problem={problem}
        code={code}
        onCodeChange={onCodeChange}
        onTabClick={onTabClick}
        onMoveTab={onMoveTab}
      />
    )
  }
  return (
    <SplitPane
      node={node}
      problem={problem}
      code={code}
      onCodeChange={onCodeChange}
      onTabClick={onTabClick}
      onMoveTab={onMoveTab}
      onRatioChange={onRatioChange}
    />
  )
}

export function PracticeLayout({ problem }: { problem: ProblemWithTopic }) {
  const [layout, setLayout] = useState<LayoutNode>(createInitialLayout)
  const [code, setCode] = useState("")

  const handleMoveTab = useCallback(
    (
      tabId: PracticeSectionId,
      targetNodeId: string,
      position: "left" | "right" | "top" | "bottom" | "center"
    ) => {
      setLayout((prev) => {
        const { newRoot, removed } = removeTabFromTree(prev, tabId)
        if (!removed) return prev
        if (!findNodeAndParent(newRoot, targetNodeId)) return prev
        return insertTabIntoNode(newRoot, targetNodeId, tabId, position)
      })
    },
    []
  )

  const handleTabClick = useCallback(
    (nodeId: string, sectionId: PracticeSectionId) => {
      setLayout((prev) => {
        const next = JSON.parse(JSON.stringify(prev)) as LayoutNode
        const res = findNodeAndParent(next, nodeId)
        if (!res || res.node.type !== "leaf") return prev
        res.node.activeTab = sectionId
        return next
      })
    },
    []
  )

  const handleRatioChange = useCallback((splitId: string, ratio: number) => {
    setLayout((prev) => setSplitRatio(prev, splitId, ratio))
  }, [])

  return (
    <div className="flex w-full flex-col h-[calc(100vh-3.5rem)] min-h-[480px]">
      <p className="mb-2 shrink-0 px-4 text-sm text-muted-foreground md:px-6">
        {problem.name} · {problem.difficulty}
      </p>

      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <LayoutTree
          node={layout}
          problem={problem}
          code={code}
          onCodeChange={setCode}
          onTabClick={handleTabClick}
          onMoveTab={handleMoveTab}
          onRatioChange={handleRatioChange}
        />
      </div>
    </div>
  )
}
