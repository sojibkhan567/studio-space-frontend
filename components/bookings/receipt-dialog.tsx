"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { formatHours } from "@/lib/bookings"
import type { Booking } from "@/types/bookings"
import { StatusBadge } from "./status-badge"

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

export function ReceiptDialog({
  booking: b,
  onClose,
}: {
  booking: Booking | null
  onClose: () => void
}) {
  return (
    <Dialog open={!!b} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-3xl sm:max-w-md">
        {b && (
          <>
            <DialogHeader className="text-left">
              <p className="text-[11px] font-bold tracking-wider text-primary uppercase">
                Booking receipt
              </p>
              <DialogTitle className="text-xl leading-tight font-extrabold">
                {b.studio.title}
              </DialogTitle>
              <DialogDescription>Booking {b._id}</DialogDescription>
            </DialogHeader>

            <div className="space-y-2.5">
              <Row label="Status" value={<StatusBadge status={b.status} />} />
              <Row label="Date" value={b.date} />
              <Row
                label="Time"
                value={`${b.startTime}–${b.endTime} (${formatHours(b.hours)})`}
              />
              <Row label="Crew / talent" value={b.guests} />
              <Row label="Location" value={b.studio.address} />
            </div>

            <Separator />

            <div className="space-y-2.5">
              <Row
                label={`$${b.studio.rate} × ${formatHours(b.hours)}`}
                value={`$${b.studio.rate * b.hours}`}
              />
              <Row
                label="Refundable security deposit"
                value={`$${b.studio.deposit}`}
              />
              <div className="flex items-center justify-between border-t pt-3 font-bold">
                <span>Total</span>
                <span className="text-lg text-primary">
                  ${b.total.toLocaleString()}
                </span>
              </div>
            </div>

            <Button variant="outline" className="rounded-xl" onClick={onClose}>
              Close
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
