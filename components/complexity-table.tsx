import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ComplexityRow } from "@/lib/topic-content"

interface ComplexityTableProps {
  rows: ComplexityRow[]
  spaceComplexity: string
}

export function ComplexityTable({ rows, spaceComplexity }: ComplexityTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60 bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Operation
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Average
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Worst
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.operation} className="border-border/40 hover:bg-secondary/30">
              <TableCell className="font-medium text-foreground">
                {row.operation}
              </TableCell>
              <TableCell>
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-primary">
                  {row.average}
                </code>
              </TableCell>
              <TableCell>
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {row.worst}
                </code>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="border-border/40 hover:bg-secondary/30">
            <TableCell className="font-medium text-foreground">
              Space Complexity
            </TableCell>
            <TableCell colSpan={2}>
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-primary">
                {spaceComplexity}
              </code>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
