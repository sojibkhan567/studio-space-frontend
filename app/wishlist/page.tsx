import Link from "next/link"
import { Building2, CirclePlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTokenFromServer } from "@/lib/getTokenFormServer"
import WishlistListingTable from "@/components/wishlist/wishlist-listing"

const WishlistPage = async () => {
  const token = await getTokenFromServer()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  const wishlist = data.wishlist
  //console.log(wishlist)
  return (
    <main className="min-h-screen bg-muted/30 pb-16">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge
              variant="secondary"
              className="mb-3 gap-1.5 bg-primary/10 text-[11px] font-bold tracking-wide text-primary uppercase hover:bg-primary/10"
            >
              <Building2 className="size-3" /> Host workspace manager
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Saved Listings
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your saved creative production spaces, rates, and listings
            </p>
          </div>
          <Button
            asChild
            className="h-10 shrink-0 rounded-xl px-5 font-semibold"
          >
            <Link href="/studios">
              <CirclePlus className="size-4" /> Add Wishlist
            </Link>
          </Button>
        </header>

        <WishlistListingTable studios={wishlist} />
      </div>
    </main>
  )
}

export default WishlistPage
