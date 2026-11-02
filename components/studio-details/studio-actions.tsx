"use client"

import { useState } from "react"
import { Check, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function StudioActions({ title }: { title: string }) {
  const [wishlisted, setWishlisted] = useState(false) // connect to your API later
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      /* user cancelled share */
    }
  }

  return (
    <div className="flex shrink-0 gap-2">
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg"
        onClick={share}
      >
        {copied ? (
          <Check className="size-4 text-primary" />
        ) : (
          <Share2 className="size-4" />
        )}
        {copied ? "Link copied" : "Share"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg"
        aria-pressed={wishlisted}
        onClick={() => setWishlisted((v) => !v)}
      >
        <Heart
          className={cn("size-4", wishlisted && "fill-primary text-primary")}
        />
        Wishlist
      </Button>
    </div>
  )
}
