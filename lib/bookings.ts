import type { Booking } from "@/app/types/bookings"

// "#a582c2" style short id
export const shortId = (id: string) => `#${id.slice(-6)}`

export const formatHours = (h: number) => `${h} ${h === 1 ? "hr" : "hrs"}`

// Sample data so the page works right away.
// Replace with your API, e.g.:
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/me`, { cache: "no-store" });
export async function getMyBookings(): Promise<Booking[]> {
  const img =
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=80"

  return [
    {
      id: "6a1f0c2e895e5c5efba582c2",
      status: "pending",
      date: "2026-10-29",
      startTime: "10:00",
      endTime: "14:00",
      hours: 4,
      guests: 4,
      total: 690,
      studio: {
        id: "s1",
        title: "Neon Vault 4K Cinema Soundstage & Cyclorama",
        address: "Arts District, Downtown Los Angeles, CA",
        image: img,
        rate: 135,
        deposit: 150,
      },
    },
    {
      id: "6a1f0c2e895e5c5efb4d6157",
      status: "cancelled",
      date: "2026-10-29",
      startTime: "10:00",
      endTime: "14:00",
      hours: 4,
      guests: 4,
      total: 690,
      studio: {
        id: "s1",
        title: "Neon Vault 4K Cinema Soundstage & Cyclorama",
        address: "Arts District, Downtown Los Angeles, CA",
        image: img,
        rate: 135,
        deposit: 150,
      },
    },
    {
      id: "6a1f0c2e895e5c5efb2563de",
      status: "pending",
      date: "2026-11-15",
      startTime: "10:00",
      endTime: "15:00",
      hours: 5,
      guests: 8,
      total: 775,
      studio: {
        id: "s2",
        title: "The Prism Cyc & Cinema Soundstage",
        address: "Brooklyn Navy Yard, Brooklyn, NY",
        image: img,
        rate: 125,
        deposit: 150,
      },
    },
  ]
}
