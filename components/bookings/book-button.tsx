"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingModal, type BookableStudio } from "./booking-modal"
import { authClient } from "@/lib/auth-client"

export function BookButton({ studio }: { studio: BookableStudio }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [checking, setChecking] = useState(false)

  const returnUrl = `/studios/${studio.id}`

  const loginUrl = `/login?redirect=${encodeURIComponent(returnUrl)}`

  const handleClick = async () => {
    try {
      setChecking(true)

      const { data: session } = await authClient.getSession()

      if (!session) {
        router.push(loginUrl)
        return
      }

      setOpen(true)
    } catch (error) {
      console.error("Session check failed:", error)
    } finally {
      setChecking(false)
    }
  }

  return (
    <>
      <Button
        size="lg"
        className="h-11 w-full rounded-xl font-semibold"
        onClick={handleClick}
        disabled={checking}
      >
        {checking ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <CalendarDays className="size-4" />
        )}
        {checking ? "Checking account…" : "Book Workspace Now"}
      </Button>

      <BookingModal
        studio={studio}
        open={open}
        onOpenChange={setOpen}
        onUnauthorized={() => router.push(loginUrl)}
      />
    </>
  )
}
