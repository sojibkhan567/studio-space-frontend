import Link from "next/link"
import { CalendarX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyBookings() {
  return (
    <div className="mt-16 flex flex-col items-center gap-3 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
        <CalendarX className="size-7" />
      </div>
      <h2 className="text-xl font-bold">No bookings yet</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        When you reserve a studio, it will show up here with its status and
        shoot time.
      </p>
      <Button asChild className="mt-2 rounded-xl">
        <Link href="/studios">Explore studios</Link>
      </Button>
    </div>
  )
}
