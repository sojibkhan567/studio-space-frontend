// Shape of one document coming from your API (MongoDB)
export type StudioApi = {
  _id: string | { $oid: string }
  title: string
  category: string
  capacity: string | number
  rate: string | number
  deposit: string | number
  address: string
  description: string
  images?: string[]
  amenities?: string[]
  user?: { name: string; email: string }
  rating?: number // optional, only if you add reviews later
  createdAt?: string | { $date: string }
}

// Clean shape used by the UI
export type Studio = {
  id: string
  title: string
  category: string
  capacity: number
  rate: number
  deposit: number
  address: string
  description: string
  images: string[]
  amenities: string[]
  host: { name: string; email: string } | null
  rating?: number
  createdAt: number // ms timestamp
}

export const SORT_OPTIONS = {
  newest: "Newest Listings",
  priceAsc: "Price: Low to High",
  priceDesc: "Price: High to Low",
} as const

export type SortKey = keyof typeof SORT_OPTIONS

export type Listing = {
  id: string
  title: string
  category: string
  address: string
  rate: number
  deposit: number
  capacity: number
  image?: string
}
