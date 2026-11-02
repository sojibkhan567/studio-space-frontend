"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  onApply: (range: { min?: number; max?: number }) => void
}

export function PriceFilter({ onApply }: Props) {
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")

  const apply = () =>
    onApply({
      min: min ? Number(min) : undefined,
      max: max ? Number(max) : undefined,
    })

  const reset = () => {
    setMin("")
    setMax("")
    onApply({})
  }

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>Rate:</span>
      <Input
        value={min}
        onChange={(e) => setMin(e.target.value)}
        inputMode="numeric"
        placeholder="Min $"
        className="h-8 w-20 text-xs"
      />
      <span>–</span>
      <Input
        value={max}
        onChange={(e) => setMax(e.target.value)}
        inputMode="numeric"
        placeholder="Max $"
        className="h-8 w-20 text-xs"
      />
      <Button size="sm" variant="secondary" onClick={apply}>
        Apply
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="size-8"
        onClick={reset}
        aria-label="Reset price filter"
      >
        <RotateCcw className="size-4" />
      </Button>
    </div>
  )
}
