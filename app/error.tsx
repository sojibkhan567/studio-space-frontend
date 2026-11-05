"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <AlertTriangle className="h-12 w-12 text-destructive" />

      <h2 className="text-2xl font-semibold">Something went wrong!</h2>

      <p className="text-muted-foreground">
        We couldn&apos;t load the data. Please try again.
      </p>

      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  )
}
