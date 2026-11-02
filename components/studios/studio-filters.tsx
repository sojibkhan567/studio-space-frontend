"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import type { SortKey } from "@/app/types/studio"
import { SortSelect } from "./sort-select"
import { CategoryFilter } from "./category-filter"
import { PriceFilter } from "./price-filter"

type Props = {
  query: string
  onQueryChange: (v: string) => void
  sort: SortKey
  onSortChange: (v: SortKey) => void
  categories: string[]
  category: string
  onCategoryChange: (v: string) => void
  onPriceApply: (range: { min?: number; max?: number }) => void
}

export function StudioFilters(p: Props) {
  return (
    <Card className="mt-6 rounded-2xl py-0 shadow-sm">
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={p.query}
              onChange={(e) => p.onQueryChange(e.target.value)}
              placeholder="Search studios by title, equipment, city…"
              className="h-11 rounded-xl bg-muted/50 pl-9"
            />
          </div>
          {/* Search is live as you type; this button is kept for the familiar look */}
          <Button className="h-11 rounded-xl px-6 font-semibold">Search</Button>
          <SortSelect value={p.sort} onChange={p.onSortChange} />
        </div>

        <div className="flex flex-col gap-3 border-t pt-4 lg:flex-row lg:items-center lg:justify-between">
          <CategoryFilter
            categories={p.categories}
            value={p.category}
            onChange={p.onCategoryChange}
          />
          <PriceFilter onApply={p.onPriceApply} />
        </div>
      </CardContent>
    </Card>
  )
}
