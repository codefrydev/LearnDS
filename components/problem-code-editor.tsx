"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { uiStrings } from "@/lib/ui-strings"

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  { ssr: false }
)

const DEFAULT_STARTER = `// Write your solution here
// Example: Two Sum
function twoSum(nums, target) {
  // your code
  return [];
}
`

export function ProblemCodeEditor({
  value,
  onChange,
  language = "javascript",
}: {
  value?: string
  onChange?: (value: string) => void
  language?: string
}) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== "light"

  return (
    <div className="h-full min-h-[280px] rounded-lg border border-border/60 overflow-hidden bg-code-bg">
      <MonacoEditor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={value ?? DEFAULT_STARTER}
        onChange={(v) => onChange?.(v ?? "")}
        theme={isDark ? "vs-dark" : "vs"}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
        loading={
          <div className="flex h-[280px] items-center justify-center bg-muted/30 text-sm text-muted-foreground">
            {uiStrings.codeEditor.loading}
          </div>
        }
      />
    </div>
  )
}
