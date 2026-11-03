import Link from "next/link"
import { CalendarDays, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Studio } from "@/app/types/studio"
import { BookButton } from "../booking/book-button"

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{children}</span>
    </div>
  )
}

export function BookingCard({ studio }: { studio: Studio }) {
  return (
    <Card className="rounded-3xl py-0 shadow-lg">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-baseline justify-between">
          <p>
            <span className="text-3xl font-extrabold text-primary">
              ${studio.rate}
            </span>
            <span className="ml-1.5 text-sm text-muted-foreground">/ hour</span>
          </p>
          {studio.rating !== undefined && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
              {studio.rating.toFixed(1)}
            </span>
          )}
        </div>

        <Separator />

        <div className="space-y-2.5">
          <Row label="Security Deposit">${studio.deposit}</Row>
          <Row label="Cancellation Policy">
            <span className="text-primary">Free before shoot confirmation</span>
          </Row>
          <Row label="Availability">Instant Request Slots</Row>
        </div>

        <BookButton studio={studio} />

        {/* <Button
          asChild
          size="lg"
          className="h-11 w-full rounded-xl font-semibold"
        >
          <Link href={`/booking`}>
            <CalendarDays className="size-4" /> Book Workspace Now
          </Link>
        </Button> */}

        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          You won&apos;t be charged immediately. Your reservation will enter
          Pending status for host approval.
        </p>
      </CardContent>
    </Card>
  )
}
