"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getTopicBySlug } from "@/lib/topics"

export function SiteHeader() {
  const pathname = usePathname()
  const topicMatch = pathname?.match(/^\/topics\/([^/]+)/)
  const slug = topicMatch?.[1]
  const topic = slug ? getTopicBySlug(slug) : null

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {topic ? (
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="font-semibold text-foreground truncate">{topic.name}</span>
            </nav>
          ) : (
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground shrink-0">
              <Code2 className="size-5 text-primary" />
              <span className="text-base">DSA Lab</span>
            </Link>
          )}
        </div>
        <nav className="flex shrink-0 items-center gap-1">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Topics
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
