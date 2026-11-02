"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SORT_OPTIONS, type SortKey } from "@/app/types/studio"

export function SortSelect({
  value,
  onChange,
}: {
  value: SortKey
  onChange: (v: SortKey) => void
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortKey)}>
      <SelectTrigger className="h-11! w-full rounded-xl sm:w-52">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SORT_OPTIONS).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            Sort: {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
