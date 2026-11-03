import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function BookingsHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Badge
          variant="secondary"
          className="mb-3 gap-1.5 bg-primary/10 text-primary uppercase hover:bg-primary/10"
        >
          <CalendarDays className="size-3" /> Production schedule
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">
          My Studio Bookings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track reservation statuses, cancellation requests, and shoot times
        </p>
      </div>

      <Button asChild className="rounded-xl font-semibold">
        <Link href="/studios">
          Explore More Studios <ArrowRight className="size-4" />
        </Link>
      </Button>
    </header>
  )
}
