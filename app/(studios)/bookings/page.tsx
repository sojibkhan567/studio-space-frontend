import { getMyBookings } from "@/lib/bookings"
import { BookingsHeader } from "@/components/bookings/bookings-header"
import { BookingList } from "@/components/bookings/booking-list"

export const metadata = { title: "My Studio Bookings | Studio Space" }

export default async function BookingsPage() {
  const bookings = await getMyBookings()

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <BookingsHeader />
        <BookingList initialBookings={bookings} />
      </div>
    </main>
  )
}
