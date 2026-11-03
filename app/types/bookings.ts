export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed"

export type Booking = {
  id: string
  status: BookingStatus
  date: string // YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string // HH:mm
  hours: number
  guests: number
  total: number // rate x hours + deposit
  studio: {
    id: string
    title: string
    address: string
    image?: string
    rate: number
    deposit: number
  }
}
