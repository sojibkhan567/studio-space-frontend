import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Studio } from "@/types/studio"
import { StudioActions } from "./studio-actions"

export function StudioDetailHeader({ studio }: { studio: Studio }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
            {studio.category}
          </Badge>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 text-primary" />
            {studio.address}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {studio.title}
        </h1>
      </div>
      <StudioActions title={studio.title} studioId={studio.id} />
    </header>
  )
}
