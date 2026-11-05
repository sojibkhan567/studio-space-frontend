import { Card } from "../ui/card"

export default function LoadingSkeleton() {
  return (
    <Card
      className="animate-pulse gap-0 overflow-hidden rounded-2xl py-0"
      aria-busy="true"
    >
      <div className="h-11 bg-muted/60" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3 border-t p-4">
          <div className="size-12 rounded-lg bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-1/3 rounded bg-muted" />
            <div className="h-3 w-1/4 rounded bg-muted" />
          </div>
        </div>
      ))}
    </Card>
  )
}
