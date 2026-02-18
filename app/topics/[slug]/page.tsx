import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight, BookOpen, Code2, Eye, ListChecks, Lightbulb } from "lucide-react"
import { topics, getTopicBySlug } from "@/lib/topics"
import { getTopicContent } from "@/lib/topic-content"
import { ComplexityTable } from "@/components/complexity-table"
import { CodeBlock } from "@/components/code-block"
import { InteractiveVisualization } from "@/components/interactive-visualization"
import { PracticeProblems } from "@/components/practice-problems"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) return { title: "Not Found" }
  return {
    title: `${topic.name} - DSA Lab`,
    description: topic.description,
  }
}

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

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  const content = getTopicContent(slug)

  if (!topic || !content) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
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

      {/* Page Title */}
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {topic.name}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">{topic.description}</p>
      </header>

      {/* Sections */}
      <div className="flex flex-col gap-12">
        {/* Theory */}
        <section>
          <SectionHeader icon={BookOpen} title="Theory & Description" />
          <div className="mb-6 flex flex-col gap-4">
            {content.theory.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/85 md:text-base md:leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Use Cases */}
          <div className="mb-6 rounded-lg border border-border/60 bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="size-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-foreground">Common Use Cases</h3>
            </div>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {content.useCases.map((uc) => (
                <li key={uc} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 block size-1 shrink-0 rounded-full bg-primary" />
                  {uc}
                </li>
              ))}
            </ul>
          </div>

          {/* Complexity Cheat Sheet */}
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Complexity Cheat Sheet
          </h3>
          <ComplexityTable rows={content.complexity} spaceComplexity={content.spaceComplexity} />
        </section>

        {/* Code Examples */}
        <section>
          <SectionHeader icon={Code2} title="Code Examples" />
          <CodeBlock examples={content.codeExamples} />
        </section>

        {/* Interactive Visualization */}
        <section>
          <SectionHeader icon={Eye} title="Interactive Visualization" />
          <InteractiveVisualization topicName={topic.name} />
        </section>

        {/* Practice Problems */}
        <section>
          <SectionHeader icon={ListChecks} title="Practice Problems" />
          <PracticeProblems problems={content.problems} />
        </section>
      </div>

      {/* Footer Nav */}
      <div className="mt-16 border-t border-border/40 pt-6">
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
