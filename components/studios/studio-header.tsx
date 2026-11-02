import { Badge } from "@/components/ui/badge"

export function StudioHeader({ count }: { count: number }) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Badge
          variant="secondary"
          className="mb-3 bg-primary/10 text-primary hover:bg-primary/10"
        >
          Full marketplace catalog
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Explore Creative Studios
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Discover sound stages, photography cycloramas, podcast hubs, and
          mixing rooms.
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-bold text-foreground">{count}</span>{" "}
        creative {count === 1 ? "space" : "spaces"}
      </p>
    </header>
  )
}
