export interface Topic {
  slug: string
  name: string
  description: string
  icon: string
  color: string
}

export const topics: Topic[] = [
  {
    slug: "arrays",
    name: "Arrays",
    description: "Contiguous memory blocks providing O(1) indexed access -- the most fundamental building block in programming.",
    icon: "LayoutGrid",
    color: "text-blue-400",
  },
  {
    slug: "linked-lists",
    name: "Linked Lists",
    description: "Dynamic node chains connected through pointers for flexible insertion and deletion.",
    icon: "Link",
    color: "text-emerald-400",
  },
  {
    slug: "stacks",
    name: "Stacks",
    description: "Last-In-First-Out structures powering undo systems and expression parsing.",
    icon: "Layers",
    color: "text-amber-400",
  },
  {
    slug: "queues",
    name: "Queues",
    description: "First-In-First-Out buffers for task scheduling and breadth-first traversals.",
    icon: "ListOrdered",
    color: "text-rose-400",
  },
  {
    slug: "hash-tables",
    name: "Hash Tables",
    description: "Key-value stores enabling near-constant-time lookups through hashing.",
    icon: "Hash",
    color: "text-cyan-400",
  },
  {
    slug: "trees",
    name: "Trees",
    description: "Hierarchical structures for efficient searching, sorting, and data organization.",
    icon: "GitBranch",
    color: "text-violet-400",
  },
  {
    slug: "graphs",
    name: "Graphs",
    description: "Networks of vertices and edges modeling complex relationships and pathways.",
    icon: "Share2",
    color: "text-pink-400",
  },
  {
    slug: "tries",
    name: "Tries",
    description: "Prefix trees for ultra-fast string searching and autocomplete features.",
    icon: "FileText",
    color: "text-orange-400",
  },
]

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug)
}
