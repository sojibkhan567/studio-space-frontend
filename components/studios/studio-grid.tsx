import type { Studio } from "@/types/studio"
import { StudioCard } from "./studio-card"
import { EmptyState } from "./empty-state"

export function StudioGrid({ studios }: { studios: Studio[] }) {
  if (studios.length === 0) return <EmptyState />

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((s) => (
        <StudioCard key={s.id} studio={s} />
      ))}
    </div>
  )
}
