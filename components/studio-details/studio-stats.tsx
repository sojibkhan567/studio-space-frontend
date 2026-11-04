import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Studio } from "@/types/studio"

export function StudioStats({ studio }: { studio: Studio }) {
  const stats = [
    {
      label: "Hourly Rate",
      value: <span className="text-primary">${studio.rate}/hr</span>,
    },
    { label: "Security Deposit", value: `$${studio.deposit}` },
    { label: "Max Capacity", value: `${studio.capacity} people` },
    {
      label: "Client Rating",
      value:
        studio.rating !== undefined ? (
          <span className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            {studio.rating.toFixed(1)}
          </span>
        ) : (
          "New listing"
        ),
    },
  ]

  return (
    <Card className="rounded-2xl py-0 shadow-sm">
      <CardContent className="grid grid-cols-2 gap-5 p-5 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <div className="mt-1 text-lg font-bold">{s.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
