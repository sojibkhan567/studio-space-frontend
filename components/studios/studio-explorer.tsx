"use client"

import { useMemo, useState } from "react"
import type { SortKey, Studio } from "@/app/types/studio"
import { StudioHeader } from "./studio-header"
import { StudioFilters } from "./studio-filters"
import { StudioGrid } from "./studio-grid"

type PriceRange = { min?: number; max?: number }

export function StudioExplorer({ studios }: { studios: Studio[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState<SortKey>("newest")
  const [price, setPrice] = useState<PriceRange>({})

  // Categories come from your data, so new ones show up automatically
  const categories = useMemo(
    () => Array.from(new Set(studios.map((s) => s.category))).sort(),
    [studios]
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return studios
      .filter((s) => {
        if (category !== "All" && s.category !== category) return false
        if (price.min !== undefined && s.rate < price.min) return false
        if (price.max !== undefined && s.rate > price.max) return false
        if (!q) return true
        const haystack = [s.title, s.description, s.address, ...s.amenities]
          .join(" ")
          .toLowerCase()
        return haystack.includes(q)
      })
      .sort((a, b) => {
        if (sort === "priceAsc") return a.rate - b.rate
        if (sort === "priceDesc") return b.rate - a.rate
        return b.createdAt - a.createdAt
      })
  }, [studios, query, category, price, sort])

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <StudioHeader count={results.length} />
        <StudioFilters
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          onPriceApply={setPrice}
        />
        <StudioGrid studios={results} />
      </div>
    </main>
  )
}
