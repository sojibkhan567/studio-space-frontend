import { BookingsHeader } from "@/components/bookings/bookings-header"
import { BookingList } from "@/components/bookings/booking-list"
import { getTokenFromServer } from "@/lib/getTokenFormServer"

export const metadata = { title: "My Bookings | Studio Space Application" }

export default async function BookingsPage() {
  const token = await getTokenFromServer()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/me`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()
  const bookings = Array.isArray(data) ? data : []

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <BookingsHeader />
        <BookingList initialBookings={bookings} />
      </div>
    </main>
  )
}
