"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { CodeExample } from "@/lib/topic-content"

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:text-foreground"
      onClick={handleCopy}
      aria-label="Copy code"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </Button>
  )
}

function highlightCode(code: string): React.ReactNode[] {
  const lines = code.split("\n")
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = []
    let remaining = line

    // Simple syntax highlighting patterns
    const patterns: [RegExp, string][] = [
      // Comments (# or //)
      [/(#.*|\/\/.*)$/, "text-code-comment"],
      // Multi-word keywords
      [/\b(public static void main|public class|static class|import java|from collections|using namespace|#include)\b/, "text-code-keyword"],
      // Keywords
      [/\b(def|class|return|if|else|elif|while|for|in|not|and|or|None|True|False|self|import|from|print|raise|del|lambda|with|as|try|except|finally|yield|break|continue|pass|global|nonlocal|assert)\b/, "text-code-keyword"],
      [/\b(public|private|protected|static|void|int|String|boolean|new|null|this|super|final|abstract|interface|extends|implements|throws|throw|try|catch|finally|package|import|class|return|if|else|while|for|switch|case|break|continue|default|var|System)\b/, "text-code-keyword"],
      [/\b(int|void|bool|char|string|auto|const|struct|class|public|private|protected|virtual|override|return|if|else|while|for|using|namespace|include|new|delete|nullptr|cout|cin|endl|template|typename)\b/, "text-code-keyword"],
      // Strings
      [/("[^"]*"|'[^']*'|`[^`]*`)/, "text-code-string"],
      // Function calls
      [/\b([a-zA-Z_]\w*)\s*\(/, "text-code-function"],
      // Numbers
      [/\b(\d+\.?\d*)\b/, "text-amber-300"],
    ]

    if (remaining.trim() === "") {
      return (
        <div key={i} className="table-row">
          <span className="table-cell select-none pr-4 text-right text-muted-foreground/40 text-xs w-8">
            {i + 1}
          </span>
          <span className="table-cell">{"\n"}</span>
        </div>
      )
    }

    // For simplicity, just highlight the whole line based on first match
    let highlighted = false
    for (const [pattern, className] of patterns) {
      const match = remaining.match(pattern)
      if (match) {
        const idx = match.index ?? 0
        if (idx > 0) {
          parts.push(
            <span key={`${i}-pre`} className="text-code-foreground">
              {remaining.slice(0, idx)}
            </span>
          )
        }
        parts.push(
          <span key={`${i}-match`} className={className}>
            {match[0]}
          </span>
        )
        if (idx + match[0].length < remaining.length) {
          parts.push(
            <span key={`${i}-post`} className="text-code-foreground">
              {remaining.slice(idx + match[0].length)}
            </span>
          )
        }
        highlighted = true
        break
      }
    }

    if (!highlighted) {
      parts.push(
        <span key={`${i}-full`} className="text-code-foreground">
          {remaining}
        </span>
      )
    }

    return (
      <div key={i} className="table-row">
        <span className="table-cell select-none pr-4 text-right text-muted-foreground/40 text-xs w-8">
          {i + 1}
        </span>
        <span className="table-cell">{parts}</span>
      </div>
    )
  })
}

export function CodeBlock({ examples }: { examples: CodeExample[] }) {
  return (
    <Tabs defaultValue={examples[0]?.language} className="w-full">
      <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-border/60 bg-code-bg px-3 py-2">
        <TabsList className="h-7 bg-transparent p-0 gap-0.5">
          {examples.map((ex) => (
            <TabsTrigger
              key={ex.language}
              value={ex.language}
              className="h-7 rounded-md bg-transparent px-2.5 text-xs font-medium text-muted-foreground data-[state=active]:bg-secondary data-[state=active]:text-foreground"
            >
              {ex.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {examples.map((ex) => (
        <TabsContent key={ex.language} value={ex.language} className="mt-0">
          <div className="relative overflow-hidden rounded-b-lg border border-border/60 bg-code-bg">
            <div className="absolute right-2 top-2 z-10">
              <CopyButton code={ex.code} />
            </div>
            <div className="overflow-x-auto p-4 pr-12">
              <pre className="table font-mono text-sm leading-relaxed">
                {highlightCode(ex.code)}
              </pre>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
