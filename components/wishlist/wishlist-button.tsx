"use client"

import { Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useWishlist } from "./wishlist-provider"

interface WishlistButtonProps {
  studioId: string
  label?: string
  className?: string
}

export default function WishlistButton({
  studioId,
  label,
  className,
}: WishlistButtonProps) {
  const { loading, isWishlisted, toggleWishlist } = useWishlist()

  const wishlisted = isWishlisted(studioId)

  return (
    <Button
      type="button"
      variant="outline"
      size={label ? "sm" : "icon"}
      className={cn(className)}
      aria-pressed={wishlisted}
      onClick={() => toggleWishlist(studioId)}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Heart
          className={cn("size-4", wishlisted && "fill-primary text-primary")}
        />
      )}

      {label && <span>{wishlisted ? "Wishlisted" : label}</span>}
    </Button>
  )
}
