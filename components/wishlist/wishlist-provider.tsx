"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { toast } from "react-hot-toast"
import { getTokenFromClient } from "@/lib/getTokenFormClient"
import { useRouter } from "next/navigation"

interface WishlistContextType {
  wishlistIds: string[]
  loading: boolean
  isWishlisted: (studioId: string) => boolean
  toggleWishlist: (studioId: string) => Promise<void>
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const router = useRouter()

  // Get user's wishlist once
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const token = await getTokenFromClient()

        // User is not logged in
        if (!token) {
          setLoading(false)
          return
        }

        const res = await fetch(`${API_URL}/wishlist/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (res.status === 401) {
          setWishlistIds([])
          return
        }

        if (!res.ok) {
          throw new Error(data.message || "Wishlist request failed")
        }

        const ids = data.wishlist.map(
          (item: { studioId: string }) => item.studioId
        )

        setWishlistIds(ids)
      } catch (error) {
        console.error("Failed to load wishlist:", error)
      } finally {
        setLoading(false)
      }
    }

    loadWishlist()
  }, [API_URL])

  const isWishlisted = (studioId: string) => {
    return wishlistIds.includes(studioId)
  }

  const toggleWishlist = async (studioId: string) => {
    try {
      const token = await getTokenFromClient()

      if (!token) {
        toast.error("Please login to use wishlist")
        router.push("/login")
        return
      }

      const alreadyWishlisted = wishlistIds.includes(studioId)

      if (alreadyWishlisted) {
        // Remove
        const res = await fetch(`${API_URL}/wishlist/${studioId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message)
        }

        setWishlistIds((prev) => prev.filter((id) => id !== studioId))

        toast.error("Removed from wishlist")
      } else {
        // Add
        const res = await fetch(`${API_URL}/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studioId,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message)
        }

        setWishlistIds((prev) => [...prev, studioId])

        toast.success("Added to wishlist")
      }
    } catch (error) {
      console.error("Wishlist error:", error)

      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        loading,
        isWishlisted,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider")
  }

  return context
}
