"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, BookOpen, Code2, Eye, ListChecks, Lightbulb } from "lucide-react"
import type { Topic } from "@/lib/topics"
import type { TopicContent } from "@/lib/topic-content"
import { ComplexityTable } from "@/components/complexity-table"
import { CodeBlock } from "@/components/code-block"
import { InteractiveVisualization } from "@/components/interactive-visualization"
import { PracticeProblems } from "@/components/practice-problems"

// --- Section config (each tab = one section) ---
export type SectionId = "theory" | "code" | "visualization" | "problems"

const SECTION_CONFIG: Record<
  SectionId,
  { label: string; icon: React.ElementType }
> = {
  theory: { label: "Theory", icon: BookOpen },
  code: { label: "Code", icon: Code2 },
  visualization: { label: "Visualization", icon: Eye },
  problems: { label: "Problems", icon: ListChecks },
}

// --- Layout tree types ---
export interface LayoutLeaf {
  type: "leaf"
  id: string
  tabs: SectionId[]
  activeTab: SectionId | null
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

function createLeaf(tabs: SectionId[] = []): LayoutLeaf {
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

function findLeafWithTab(root: LayoutNode, tabId: SectionId): LayoutLeaf | null {
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
  tabId: SectionId
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
  tabId: SectionId,
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

// --- Initial layout: one row split, Theory+Code | Visualization+Problems ---
function createInitialLayout(): LayoutSplit {
  return {
    type: "split",
    id: "root",
    direction: "row",
    ratio: 50,
    first: createLeaf(["theory", "code"]),
    second: createLeaf(["visualization", "problems"]),
  }
}

// --- Section content renderer ---
function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType
  title: string
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="flex size-8 items-center justify-center rounded-lg bg-secondary">
        <Icon className="size-4 text-primary" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
  )
}

function SectionContent({
  sectionId,
  topic,
  content,
}: {
  sectionId: SectionId
  topic: Topic
  content: TopicContent
}) {
  switch (sectionId) {
    case "theory":
      return (
        <>
          <SectionHeader icon={BookOpen} title="Theory & Description" />
          <div className="mb-6 flex flex-col gap-4">
            {content.theory.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-foreground/85 md:text-base md:leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mb-6 rounded-lg border border-border/60 bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="size-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-foreground">
                Common Use Cases
              </h3>
            </div>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {content.useCases.map((uc) => (
                <li
                  key={uc}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-2 block size-1 shrink-0 rounded-full bg-primary" />
                  {uc}
                </li>
              ))}
            </ul>
          </div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Complexity Cheat Sheet
          </h3>
          <ComplexityTable
            rows={content.complexity}
            spaceComplexity={content.spaceComplexity}
          />
        </>
      )
    case "code":
      return (
        <>
          <SectionHeader icon={Code2} title="Code Examples" />
          <CodeBlock examples={content.codeExamples} />
        </>
      )
    case "visualization":
      return (
        <>
          <SectionHeader icon={Eye} title="Interactive Visualization" />
          <InteractiveVisualization topicName={topic.name} />
        </>
      )
    case "problems":
      return (
        <>
          <SectionHeader icon={ListChecks} title="Practice Problems" />
          <PracticeProblems problems={content.problems} />
        </>
      )
  }
}

// --- Drop zone overlay ---
function DropZoneOverlay({ zone }: { zone: "left" | "right" | "top" | "bottom" | "center" | null }) {
  if (!zone) return null
  const base = "absolute z-10 bg-primary/25 pointer-events-none border-2 border-primary rounded transition-all duration-75"
  const classes = {
    center: "inset-1",
    left: "top-0 bottom-0 left-0 w-1/3",
    right: "top-0 bottom-0 right-0 w-1/3",
    top: "top-0 left-0 right-0 h-1/3",
    bottom: "bottom-0 left-0 right-0 h-1/3",
  }
  return <div className={`${base} ${classes[zone]}`} />
}

// --- Draggable tab (section) ---
function PanelTab({
  sectionId,
  isActive,
  onClick,
}: {
  sectionId: SectionId
  isActive: boolean
  onClick: () => void
}) {
  const { label } = SECTION_CONFIG[sectionId]
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
      <span>{label}</span>
    </div>
  )
}

// --- Leaf pane: tab bar + drop zones + content ---
function LeafPane({
  node,
  topic,
  content,
  onTabClick,
  onMoveTab,
}: {
  node: LayoutLeaf
  topic: Topic
  content: TopicContent
  onTabClick: (nodeId: string, sectionId: SectionId) => void
  onMoveTab: (tabId: SectionId, targetNodeId: string, position: "left" | "right" | "top" | "bottom" | "center") => void
}) {
  const [dropZone, setDropZone] = useState<"left" | "right" | "top" | "bottom" | "center" | null>(null)

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
    const sectionId = e.dataTransfer.getData("sectionId") as SectionId | ""
    if (sectionId && Object.keys(SECTION_CONFIG).includes(sectionId) && dropZone) {
      onMoveTab(sectionId as SectionId, node.id, dropZone)
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
          <SectionContent
            sectionId={node.activeTab}
            topic={topic}
            content={content}
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

// --- Split pane: resizable divider + two children ---
function SplitPane({
  node,
  topic,
  content,
  onTabClick,
  onMoveTab,
  onRatioChange,
}: {
  node: LayoutSplit
  topic: Topic
  content: TopicContent
  onTabClick: (nodeId: string, sectionId: SectionId) => void
  onMoveTab: (tabId: SectionId, targetNodeId: string, position: "left" | "right" | "top" | "bottom" | "center") => void
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
          topic={topic}
          content={content}
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
          className={isRow ? "w-0.5 h-6 bg-border rounded-full" : "h-0.5 w-6 bg-border rounded-full"}
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
          topic={topic}
          content={content}
          onTabClick={onTabClick}
          onMoveTab={onMoveTab}
          onRatioChange={onRatioChange}
        />
      </div>
    </div>
  )
}

// --- Recursive layout tree ---
function LayoutTree({
  node,
  topic,
  content,
  onTabClick,
  onMoveTab,
  onRatioChange,
}: {
  node: LayoutNode
  topic: Topic
  content: TopicContent
  onTabClick: (nodeId: string, sectionId: SectionId) => void
  onMoveTab: (tabId: SectionId, targetNodeId: string, position: "left" | "right" | "top" | "bottom" | "center") => void
  onRatioChange: (splitId: string, ratio: number) => void
}) {
  if (node.type === "leaf") {
    return (
      <LeafPane
        node={node}
        topic={topic}
        content={content}
        onTabClick={onTabClick}
        onMoveTab={onMoveTab}
      />
    )
  }
  return (
    <SplitPane
      node={node}
      topic={topic}
      content={content}
      onTabClick={onTabClick}
      onMoveTab={onMoveTab}
      onRatioChange={onRatioChange}
    />
  )
}

// --- Main layout ---
interface TopicPageLayoutProps {
  topic: Topic
  content: TopicContent
}

export function TopicPageLayout({ topic, content }: TopicPageLayoutProps) {
  const [layout, setLayout] = useState<LayoutNode>(createInitialLayout)

  const handleMoveTab = useCallback(
    (tabId: SectionId, targetNodeId: string, position: "left" | "right" | "top" | "bottom" | "center") => {
      setLayout((prev) => {
        const { newRoot, removed } = removeTabFromTree(prev, tabId)
        if (!removed) return prev
        if (!findNodeAndParent(newRoot, targetNodeId)) return prev
        return insertTabIntoNode(newRoot, targetNodeId, tabId, position)
      })
    },
    []
  )

  const handleTabClick = useCallback((nodeId: string, sectionId: SectionId) => {
    setLayout((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as LayoutNode
      const res = findNodeAndParent(next, nodeId)
      if (!res || res.node.type !== "leaf") return prev
      res.node.activeTab = sectionId
      return next
    })
  }, [])

  const handleRatioChange = useCallback((splitId: string, ratio: number) => {
    setLayout((prev) => setSplitRatio(prev, splitId, ratio))
  }, [])

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-4 md:px-6 md:py-5 flex flex-col h-[calc(100vh-4.5rem)] min-h-[560px]">
      <nav aria-label="Breadcrumb" className="mb-2 shrink-0">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="size-3.5" />
          </li>
          <li className="font-medium text-foreground">{topic.name}</li>
        </ol>
      </nav>

      <header className="mb-2 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {topic.name}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">{topic.description}</p>
      </header>

      <div className="flex-1 min-h-0 flex flex-col rounded-lg overflow-hidden">
        <LayoutTree
          node={layout}
          topic={topic}
          content={content}
          onTabClick={handleTabClick}
          onMoveTab={handleMoveTab}
          onRatioChange={handleRatioChange}
        />
      </div>

      <div className="mt-2 shrink-0 border-t border-border/40 pt-2">
        <Link
          href="/"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          &larr; Back to All Topics
        </Link>
      </div>
    </div>
  )
}
