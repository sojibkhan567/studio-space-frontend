"use client"

import { useState } from "react"
import type { Booking } from "@/types/bookings"
import { BookingCard } from "./booking-card"
import { ReceiptDialog } from "./receipt-dialog"
import { CancelDialog } from "./cancel-dialog"
import EmptyState from "../common/empty-states"

export function BookingList({
  initialBookings,
}: {
  initialBookings: Booking[]
}) {
  const [bookings, setBookings] = useState(initialBookings)
  const [receipt, setReceipt] = useState<Booking | null>(null)
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null)

  // Called by the cancel dialog. Throws on failure so the dialog can show the error.
  const confirmCancel = async () => {
    if (!cancelTarget) return

    const res = await fetch(`/bookings/${cancelTarget._id}/cancel`, {
      method: "PATCH",
    })
    if (!res.ok) {
      const json = await res.json().catch(() => null)
      throw new Error(json?.message ?? "Could not cancel this booking.")
    }

    setBookings((prev) =>
      prev.map((b) =>
        b._id === cancelTarget._id ? { ...b, status: "cancelled" } : b
      )
    )
    setCancelTarget(null)
  }

  if (bookings.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState btnTitle="Explore Studios" href="/studios" />
      </div>
    )
  }

  return (
    <>
      <ul className="mt-8 space-y-4">
        {bookings.map((booking, i) => (
          <li key={i}>
            <BookingCard
              booking={booking}
              onReceipt={setReceipt}
              onCancel={setCancelTarget}
            />
          </li>
        ))}
      </ul>

      <ReceiptDialog booking={receipt} onClose={() => setReceipt(null)} />
      <CancelDialog
        booking={cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={confirmCancel}
      />
    </>
  )
}
