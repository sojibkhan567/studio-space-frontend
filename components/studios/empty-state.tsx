import { SearchX } from "lucide-react"

export function EmptyState() {
  return (
    <div className="mt-16 flex flex-col items-center gap-3 text-center text-muted-foreground">
      <SearchX className="size-8" />
      <p className="max-w-sm text-sm">
        No studios match these filters. Try a wider price range or a different
        category.
      </p>
    </div>
  )
}
