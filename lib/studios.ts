import type { Studio, StudioApi } from "@/app/types/studio"

// Mongo ObjectIds start with a creation timestamp (first 8 hex chars)
function timeFromObjectId(id: string): number {
  const t = parseInt(id.slice(0, 8), 16) * 1000
  return Number.isFinite(t) ? t : 0
}

export function normalizeStudio(raw: StudioApi): Studio {
  const id = typeof raw._id === "string" ? raw._id : raw._id.$oid

  let createdAt = timeFromObjectId(id)
  if (raw.createdAt) {
    const d =
      typeof raw.createdAt === "string" ? raw.createdAt : raw.createdAt.$date
    const parsed = Date.parse(d)
    if (!Number.isNaN(parsed)) createdAt = parsed
  }

  return {
    id,
    title: raw.title,
    category: raw.category,
    capacity: Number(raw.capacity) || 0,
    rate: Number(raw.rate) || 0,
    deposit: Number(raw.deposit) || 0,
    address: raw.address,
    description: raw.description,
    images: raw.images ?? [],
    amenities: raw.amenities ?? [],
    host: raw.user ?? null,
    rating: raw.rating,
    createdAt,
  }
}

export async function getStudios(): Promise<Studio[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Failed to load studios (${res.status})`)

  const json = await res.json()
  // Works if your API returns [] or { data: [] } or { studios: [] }
  const list: StudioApi[] = Array.isArray(json)
    ? json
    : (json.data ?? json.studios ?? [])

  return list.map(normalizeStudio)
}

// Single studio for the details page. Returns null when it doesn't exist.
export async function getStudioById(id: string): Promise<Studio | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/${encodeURIComponent(id)}`,
    { next: { revalidate: 60 } }
  )
  if (res.status === 404 || res.status === 400) return null
  if (!res.ok) throw new Error(`Failed to load studio (${res.status})`)

  const json = await res.json()
  // Works if your API returns {...} or { data: {...} } or { studio: {...} }
  const raw: StudioApi | undefined = json?.data ?? json?.studio ?? json
  return raw && raw.title ? normalizeStudio(raw) : null
}
