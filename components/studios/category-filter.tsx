"use client"

import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  categories: string[]
  value: string
  onChange: (v: string) => void
}

export function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <SlidersHorizontal className="size-3.5" /> Category:
      </span>
      {["All", ...categories].map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          aria-pressed={value === c}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            value === c
              ? "border-primary bg-primary text-primary-foreground"
              : "bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
