"use client"

import { useEffect, useMemo, useState } from "react"
import type { SortKey, Studio } from "@/app/types/studio"
import { resolveCategory, toSlug } from "@/lib/category"
import { StudioHeader } from "./studio-header"
import { StudioFilters } from "./studio-filters"
import { StudioGrid } from "./studio-grid"

type PriceRange = { min?: number; max?: number }

type Props = {
  studios: Studio[]
  initialCategory?: string // from /studios?category=podcast
}

export function StudioExplorer({ studios, initialCategory }: Props) {
  // Categories come from your data, so new ones show up automatically
  const categories = useMemo(
    () => Array.from(new Set(studios.map((s) => s.category))).sort(),
    [studios]
  )

  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(() =>
    resolveCategory(initialCategory, categories)
  )
  const [sort, setSort] = useState<SortKey>("newest")
  const [price, setPrice] = useState<PriceRange>({})

  // If the URL changes (e.g. clicking a category link in the navbar), follow it
  useEffect(() => {
    setCategory(resolveCategory(initialCategory, categories))
  }, [initialCategory, categories])

  // Update the state and the URL (shareable link) without reloading the page
  const handleCategoryChange = (value: string) => {
    setCategory(value)
    const params = new URLSearchParams(window.location.search)
    if (value === "All") params.delete("category")
    else params.set("category", toSlug(value))
    const qs = params.toString()
    window.history.replaceState(
      null,
      "",
      qs ? `?${qs}` : window.location.pathname
    )
  }

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
          onCategoryChange={handleCategoryChange}
          onPriceApply={setPrice}
        />
        <StudioGrid studios={results} />
      </div>
    </main>
  )
}
