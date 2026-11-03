"use client"

import { useState } from "react"
import { CircleCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/getTokenFormClient"
import { Studio } from "@/app/types/studio"

type Props = {
  studio: Studio
  user?: { name?: string | null; email?: string | null } | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUnauthorized: () => void
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

const todayLocal = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)

export function BookingModal({ studio, user, open, onOpenChange }: Props) {
  const [date, setDate] = useState(todayLocal())
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("14:00")
  const [guests, setGuests] = useState("1")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  // Live cost summary
  const hours = Math.max(0, (toMinutes(endTime) - toMinutes(startTime)) / 60)
  const subtotal = studio.rate * hours
  const total = subtotal + studio.deposit
  const hoursLabel = Number(hours.toFixed(2))

  const validate = (): string | null => {
    if (!date) return "Please choose a shoot date."
    if (date < todayLocal()) return "The shoot date can't be in the past."
    if (!startTime || !endTime || hours <= 0)
      return "End time must be after start time."
    const g = Number(guests)
    if (!Number.isInteger(g) || g < 1 || g > studio.capacity)
      return `Crew count must be between 1 and ${studio.capacity}.`
    return null
  }

  const handleOpenChange = (next: boolean) => {
    if (submitting) return
    onOpenChange(next)
    if (!next) {
      setError(null)
      setDone(false)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data: session } = await authClient.getSession()
    const token = await getTokenFromClient()

    const problem = validate()
    if (problem) return setError(problem)

    setError(null)
    setSubmitting(true)

    const now = new Date()

    const bookingsData = {
      userId: session?.user.id,
      studioId: studio.id,
      studio: {
        title: studio.title,
        address: studio.address,
        image: studio.images?.[0] ?? null,
      },
      date,
      startTime,
      endTime,
      hours,
      guests: Number(guests),
      notes: String(notes).trim().slice(0, 500),
      rate: studio.rate,
      deposit: studio.deposit,
      total: Math.round(studio.rate * hours + studio.deposit),
      status: "pending",
      createdAt: now,
      updatedAt: now,
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingsData),
      })

      const json = await res.json().catch(() => null)
      if (!res.ok) {
        // e.g. 409 when the slot is already taken
        throw new Error(
          json?.message ?? "Could not reserve this slot. Please try again."
        )
      }
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:max-w-md">
        {done ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
              <CircleCheck className="size-8" />
            </div>
            <DialogTitle className="text-xl font-extrabold">
              Request sent!
            </DialogTitle>
            <DialogDescription className="text-sm">
              Your reservation for{" "}
              <span className="font-semibold text-foreground">
                {studio.title}
              </span>{" "}
              is now{" "}
              <span className="font-semibold text-foreground">Pending</span>{" "}
              host approval. You won&apos;t be charged until it&apos;s
              confirmed.
            </DialogDescription>
            <Button
              className="mt-2 w-full rounded-xl"
              onClick={() => handleOpenChange(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <DialogHeader className="text-left">
              <p className="text-[11px] font-bold tracking-wider text-primary uppercase">
                Reserve creative slot
              </p>
              <DialogTitle className="text-2xl leading-tight font-extrabold">
                {studio.title}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Rate: ${studio.rate}/hr • Deposit: ${studio.deposit}
              </DialogDescription>
            </DialogHeader>

            {user && (
              <p className="rounded-xl bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                Booking as{" "}
                <span className="font-semibold text-foreground">
                  {user.name || user.email}
                </span>
                {user.name && user.email ? ` · ${user.email}` : ""}
              </p>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="date">Shoot Date</Label>
              <Input
                id="date"
                type="date"
                min={todayLocal()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 rounded-xl bg-muted/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="start">Start Time</Label>
                <Input
                  id="start"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-11 rounded-xl bg-muted/50"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="end">End Time</Label>
                <Input
                  id="end"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-11 rounded-xl bg-muted/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="guests">
                Expected Crew / Talent Count (Max {studio.capacity})
              </Label>
              <Input
                id="guests"
                type="number"
                min={1}
                max={studio.capacity}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="h-11 rounded-xl bg-muted/50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">
                Production Requirements / Gear Notes{" "}
                <span className="font-normal text-muted-foreground">
                  (Optional)
                </span>
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Bringing high-output lighting, smoke machine, heavy rigging…"
                className="min-h-20 rounded-xl bg-muted/50"
                maxLength={500}
              />
            </div>

            {/* Cost summary */}
            <div className="space-y-2 rounded-2xl bg-muted/60 p-4 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  ${studio.rate} × {hoursLabel} shoot{" "}
                  {hoursLabel === 1 ? "hour" : "hours"}
                </span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Refundable Security Deposit</span>
                <span>${studio.deposit.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2.5 text-sm font-bold">
                <span>Total Estimated Cost</span>
                <span className="text-base text-primary">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="h-11 w-full rounded-xl font-semibold"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting
                ? "Checking Availability & Reserving…"
                : "Reserve Slot"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
