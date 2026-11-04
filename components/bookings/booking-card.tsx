"use client"

import { useState } from "react"
import {
  CalendarDays,
  CircleX,
  Clock,
  ImageOff,
  MapPin,
  Receipt,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatHours } from "@/lib/bookings"
import type { Booking } from "@/types/bookings"
import { StatusBadge } from "./status-badge"

type Props = {
  booking: Booking
  onReceipt: (booking: Booking) => void
  onCancel: (booking: Booking) => void
}

export function BookingCard({ booking: b, onReceipt, onCancel }: Props) {
  const [imageFailed, setImageFailed] = useState(false)
  const canCancel = b.status === "pending" || b.status === "confirmed"

  return (
    <Card className="rounded-2xl p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Thumbnail */}
        <div className="h-30 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-17.5 sm:w-23">
          {b.studio.image && !imageFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={b.studio.image}
              alt={b.studio.title}
              onError={() => setImageFailed(true)}
              className="size-full object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center bg-linear-to-br from-primary/20 to-muted text-primary/60">
              <ImageOff className="size-5" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={b.status} />
            <span className="text-[11px] text-muted-foreground">
              ID: {b._id}
            </span>
          </div>

          <h2 className="truncate text-base font-bold sm:text-lg">
            {b.studio.title}
          </h2>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="flex items-center gap-1.5 font-semibold">
              <CalendarDays className="size-3.5 text-primary" />
              {b.date}
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="size-3.5 text-primary" />
              {b.startTime}–{b.endTime} ({formatHours(b.hours)})
            </span>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{b.studio.address}</span>
          </p>
        </div>

        {/* Total + actions */}
        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <div className="sm:text-right">
            <p className="text-[11px] text-muted-foreground">
              Total Charged / Due
            </p>
            <p className="text-2xl font-extrabold text-primary">
              ${b.total.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={() => onReceipt(b)}
            >
              <Receipt className="size-3.5" /> Receipt
            </Button>
            {canCancel && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
                onClick={() => onCancel(b)}
              >
                <CircleX className="size-3.5" /> Cancel Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
