"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { Booking } from "@/types/bookings"

type Props = {
  booking: Booking | null
  onClose: () => void
  onConfirm: () => Promise<void> // throw an Error to show a message
}

export function CancelDialog({ booking, onClose, onConfirm }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      await onConfirm()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (open || loading) return
    setError(null)
    onClose()
  }

  return (
    <AlertDialog open={!!booking} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
          <AlertDialogDescription>
            {booking && (
              <>
                Your reservation for{" "}
                <span className="font-semibold text-foreground">
                  {booking.studio.title}
                </span>{" "}
                on {booking.date} will be cancelled. This can&apos;t be undone.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
          >
            {error}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} className="rounded-xl">
            Keep booking
          </AlertDialogCancel>
          <Button
            variant="destructive"
            className="rounded-xl"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? "Cancelling…" : "Yes, cancel booking"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
