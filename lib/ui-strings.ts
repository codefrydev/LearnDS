import uiJson from "@/content/ui.json"

export interface UIStrings {
  sections: Record<string, string>
  sectionTitles: Record<string, string> // theoryAndDescription, codeExamples, etc.
  difficulty: Record<string, string>
  practice: {
    tableHeaders: Record<string, string>
    markComplete: string
    practiceButton: string
    noProblems: string
  }
  codeBlock: {
    copyCode: string
  }
  visualizationPlaceholder: {
    title: string
    comingSoon: string
  }
  codeEditor: {
    loading: string
  }
  breadcrumb: {
    ariaLabel: string
  }
}

export const uiStrings: UIStrings = uiJson as UIStrings
